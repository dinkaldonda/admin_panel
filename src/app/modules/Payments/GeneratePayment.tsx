import moment from 'moment';
import React, { useRef, useState } from 'react'
import { Modal, Col, Row } from 'react-bootstrap';
import ReactToPrint from 'react-to-print';
import { ApiGet, ApiPost, ApiUpload } from '../../../apiCommon/helpers/API/ApiData';
import { ErrorToast } from '../../../apiCommon/helpers/Toast';
import { KTSVG } from '../../../_metronic/helpers'

interface ButtonProps {
    show: any;
    handleClose: any
    showModal: any
    tenancy: any
    selectedPayments: any
    selectedIds: any
    // 👇️ turn off type checking
    // sethandleSubmitIdv:any;
}
const GeneratePayment = ({ show,
    handleClose,
    showModal,
    tenancy,
    selectedPayments,
    selectedIds
}: ButtonProps) => {
    const [tenancyPayment, setTenancyPayment] = React.useState<any>([])
    const [tenancyData, setTenancyData] = React.useState<any>([])
    const [electronicSignature, setElectronicSignature] = React.useState<boolean>(true)
    const [manualSignature, setManualSignature] = React.useState<boolean>(false)
    const [date, setDate] = useState<any>("")
    const [recieptNumber, setRecieptNumber] = useState<any>("")
    const [receivedBy, setReceivedBy] = useState<any>("")
    const [uploadedFile, setUploadedFile] = useState<any>("")
    const [uploadedSign, setUploadedSign] = useState<any>("")
    const getTenancyPayment = async () => {
        const body = {
            page: 1,
            limit: 10,
            status: 1,
            tenancyId: tenancy?._id
        }
        await ApiPost(`cooperate/tenancy_payment/get`, body)
            .then((res) => {
                setTenancyPayment(res?.data?.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const getTenancy = async () => {
        await ApiGet(`cooperate/tenancy/${window.location.pathname.split('/')[2]}`)
            .then((res) => {
                // setTableData(res?.data?.data)
                setTenancyData(res?.data?.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    React.useEffect(() => {
        getTenancyPayment()
        getTenancy()
    }, [])

    const handleSubmitReciept = async (status: any) => {
        const payload = {
            receiptNo: recieptNumber,
            receiptDate: date,
            tenancyId: tenancy?.[0]?._id,
            tenantId: tenancy?.[0]?.tenantId,
            tenancyPaymentIds: selectedIds,
            uploadSignPdf: uploadedFile,
            uploadSign: uploadedSign,
            receivedBy : receivedBy,
            signatureType: manualSignature === true ? 0 : electronicSignature === true ? 1 : '',
            image: "",
            status: status
        }

        await ApiPost(`cooperate/payment_receipt`, payload)
            .then((res) => {
                console.log("response", res);

                handleClose()
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const uploadFilelHandler = async (e: any) => {
        let file = e.target.files[0]
        let fileURL = URL.createObjectURL(file)
        file.fileURL = fileURL
        let formData = new FormData()
        formData.append('image', file)
        await ApiUpload('upload/image/document', formData)
            .then((res:any) => setUploadedFile(res?.data?.data?.image))
            .catch((err:any) => {
                console.log('res_blob', err)
                ErrorToast(err?.message)
            })
        
    }

    const uploadSignHandler = async (e: any) => {
        let file = e.target.files[0]
        let fileURL = URL.createObjectURL(file)
        file.fileURL = fileURL
        let formData = new FormData()
        formData.append('image', file)
        await ApiUpload('upload/image/document', formData)
            .then((res:any) => setUploadedSign(res?.data?.data?.image))
            .catch((err:any) => {
                console.log('res_blob', err)
                ErrorToast(err?.message)
            })
        
    }

    const ref = useRef();

    return (
        <Modal
            id='kt_modal_create_app'
            tabIndex={-1}
            aria-hidden='true'
            dialogClassName='modal-dialog modal-dialog-centered mw-900px'
            show={show}
            onHide={() => {
                handleClose()
            }}
            backdrop={true}
        >
            <div className="modal-header">
                <h1>Payment Receipt</h1>
                <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
                    <KTSVG className='svg-icon-1 text-black' path='/media/icons/duotune/arrows/arr061.svg' />
                </div>
            </div>
            <div className='d-flex align-tems-center mt-5' style={{ height: "33px", paddingLeft: '23px', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className='checkbtn-wrapper d-flex'>
                    <div className='form-check form-check-custom form-check-solid form-check-sm me-3'>
                        <input
                            className='form-check-input'
                            type='checkbox'
                            id='occupied'
                            name='electronicSignature'
                            checked={electronicSignature}
                            onClick={() => { setElectronicSignature(true); setManualSignature(false) }}
                        />
                        <label className='form-check-label' htmlFor='occupied'>
                            Electronic Signature
                        </label>
                    </div>
                
                <div className='form-check form-check-custom form-check-solid form-check-sm me-3'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        id='occupied1'
                        name='manualSignature'
                        checked={manualSignature}
                        onClick={() => { setManualSignature(true); setElectronicSignature(false) }}
                    />
                    <label className='form-check-label' htmlFor='occupied1'>
                        Manual Signature
                    </label>
                </div>

                {manualSignature && <>
                    {/* <ReactToPrint
                            trigger={() => {
                                return <a href="#">Print & Sign</a>;
                            },
                            content={() => ref}
                        }
                        /> */}
                    <ReactToPrint
                        trigger={() => <button className='btn btn-sm fw-bold btn-primary btn-green mx-3 position-relative'>Print & Sign</button>}
                        content={(): any => ref.current}
                    />
                    <a className='btn btn-sm fw-bold btn-primary btn-green mx-3 position-relative' >
                        Upload Signed
                        <input onChange={uploadFilelHandler} type="file" className='position-absolute top-0 start-0 bottom-0 end-0 opacity-0' />
                    </a></>}
                </div>
                <div className='savebtn-wrapper'>
                    <button onClick={() => handleSubmitReciept(0)} className='btn btn-sm fw-bold btn-primary btn-green' style={{ margin: "23px" }}>Save</button>
                </div>
            </div>
            <Col ref={ref}>
                <div className="modal-body" style={{ padding: '23px' }}>
                    <Row>
                        <Col>
                            <Row>
                                <Col md={8} className=''>
                                    <div className='payment-receipt-item'>
                                        <h6 className='text-muted'>
                                            Received From.
                                            <span className='mx-1' style={{ color: 'black' }}>{tenancyData[0]?.tenant[0]?.firstName}</span>
                                        </h6>
                                    </div>
                                    <div className='payment-receipt-item d-flex align-items-center mb-2'>
                                        <h6 className='text-muted m-0'>
                                            Total Amount Received AED  </h6>
                                        {/* <input
                                type='text'
                                className='form-control form-control-solid'
                                placeholder=''
                                name='Total Amount Received AED'
                               style={{width:'200px'}}
                            /> */}
                                        <span className='mx-1'>{selectedPayments.reduce((acc: any, cur: any) => acc + cur?.amount, 0)}</span>

                                    </div>
                                    <div className='payment-receipt-item'>
                                        <h6 className='text-muted'>
                                            Against Contract No.
                                            <span className='mx-1' style={{ color: 'black' }}>{tenancyData[0]?.contractNo}</span>
                                        </h6>
                                    </div>
                                    <div className='payment-receipt-item'>
                                        <h6 className='text-muted'>
                                            Unit
                                            <span className='mx-1' style={{ color: 'black' }}> {tenancyData[0]?.unit[0]?.unitNo
                                            }</span>
                                        </h6>
                                    </div>
                                    <div className='payment-receipt-item'>
                                        <h6 className='text-muted'>
                                            Tenancy Period
                                            <span className='mx-1' style={{ color: 'black' }}> {moment(tenancyData[0]?.duration?.start_date).format('DD/MM/YYYY')} -{' '}
                                                {moment(tenancyData[0]?.duration?.end_date).format('DD/MM/YYYY')}</span>
                                        </h6>
                                    </div>
                                </Col>
                                <Col md={4} className=''>
                                    <div className='payment-receipt-item d-flex align-items-center'>
                                        <h6 className='text-muted'>
                                            Date
                                        </h6>
                                        <input
                                            type='date'
                                            className='form-control form-control-solid'
                                            placeholder=''
                                            name='Total Amount Received AED'
                                            onChange={(e) => { setDate(e.target.value) }}
                                        />
                                    </div>
                                    <div className='payment-receipt-item'>
                                        <h6 className='text-muted'>
                                            Receipt No :
                                        </h6>
                                        <input
                                            type='text'
                                            className='form-control form-control-solid'
                                            placeholder=''
                                            name='Total Amount Received AED'
                                            onChange={(e) => { setRecieptNumber(e.target.value) }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <div className='pt-0 table-responsive mt-5'>
                            <table
                                className='table align-middle table-row-dashed fs-6 gy-5'
                                id='kt_ecommerce_sales_table'
                            >
                                <thead>
                                    <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                                        <th className=' min-w-100px'>Payment</th>
                                        <th className=' min-w-100px'>Type</th>
                                        <th className=' min-w-100px'>Payment Method</th>
                                        <th className=' min-w-100px'>Payment Ref No.</th>
                                        <th className=' min-w-100px'>Payment Date</th>
                                        <th className=' min-w-100px'>Amount Received</th>
                                    </tr>
                                </thead>
                                <tbody className='fw-semibold text-gray-600'>
                                    {selectedPayments?.map((v: any, i: any) => {
                                        return (
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{v?.rentType === 0 ? 'Rent' : v?.rentType === 1 ? 'Security Deposite' : v?.rentType === 2 ? 'Booking' : v?.rentType === 3 ? 'Others' : ''}</td>
                                                <td>
                                                    {v?.paymentMethod === 0
                                                        ? 'Card (Recurring Payments)'
                                                        : v?.paymentMethod === 1
                                                            ? 'Card (Individual Payments)'
                                                            : v?.paymentMethod === 2
                                                                ? 'Cheque'
                                                                : v?.paymentMethod === 3
                                                                    ? 'Bank'
                                                                    : 'Cash'}
                                                </td>
                                                <td>{v?.paymentNo === null ? '-' : v?.paymentNo}</td>

                                                <td>
                                                    {v?.status === 0
                                                        ? 'Paid'
                                                        : v?.status === 1
                                                            ? 'Upcoming'
                                                            : 'Overdue'}
                                                </td>

                                                <td>{v?.amountReceived} AED</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Row>

                    <Row>
                        <Col md={9} className=''>
                            <div className='payment-receipt-item'>
                                <h6 className='text-muted'>
                                    Received By
                                    {/* {tenancyData[0]?.receivedDate} */}
                                    <input
                                        type='text'
                                        className='form-control d-inline-block form-control-solid'
                                        placeholder='Enter'
                                        name='Total Amount Received AED'
                                        style={{ width: '200px' }}
                                        onChange={(e) => { setReceivedBy(e.target.value) }}
                                    />
                                </h6>
                            </div>
                            {electronicSignature && <div className='payment-receipt-item d-flex align-items-center mt-2'>
                                <h6 className='text-muted'>
                                    Date
                                </h6>
                                <input
                                    type='date'
                                    className='form-control form-control-solid'
                                    placeholder=''
                                    name='Total Amount Received AED'
                                    style={{ width: '200px' }}
                                />
                            </div>}
                        </Col>
                        <Col md={3} className=''>
                            <div className='payment-receipt-item d-flex align-items-center'>
                                <h6 className='text-muted'>
                                    Signature
                                </h6>
                                {electronicSignature ? <div className='btn btn-sm ms-1 fw-bold btn-primary btn-green position-relative'>
                                    Upload Signature
                                    <input type="file" onChange={uploadSignHandler} className='position-absolute top-0 start-0 bottom-0 end-0 opacity-0' />
                                </div> :
                                    <div className='border-bottom border-dark' style={{ height: "15px", width: "150px" }}></div>
                                }
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col className='align-self-end'>
                <button onClick={() => handleSubmitReciept(1)} className='btn btn-sm fw-bold btn-primary btn-green mt-0' style={{ margin: "23px" }}>
                    Submit Receipt
                </button>
            </Col>

            {/* <div className='modal-footer'>
                <div className='flex-row-fluid '>
                    <div className='d-flex justify-content-end '>
                        <div className='me-2'>
                            <button
                                type='button'
                                className='btn btn-lg btn-light-primary me-3'
                                data-kt-stepper-action='previous'
                                onClick={() => {
                                    handleClose()
                                }}
                            >
                                <KTSVG
                                    path='/media/icons/duotune/arrows/arr063.svg'
                                    className='svg-icon-3 me-1 text-green'
                                />{' '}
                                Cancel
                            </button>
                        </div>
                        <div>
                            <button
                                type='button'
                                className='btn btn-lg btn-primary btn-green'
                                data-kt-stepper-action='submit'
                               
                            >
                                Apply{' '}
                                <KTSVG
                                    path='/media/icons/duotune/arrows/arr064.svg'
                                    className='svg-icon-3 ms-2 me-0'
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}
        </Modal>
    )
}

export default GeneratePayment
