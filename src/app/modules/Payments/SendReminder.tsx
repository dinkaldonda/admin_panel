import React, { useState } from 'react'
import { Modal, Col, Row } from 'react-bootstrap';
import { ApiPost } from '../../../apiCommon/helpers/API/ApiData';
import { KTSVG } from '../../../_metronic/helpers';
import moment from 'moment'
import { SuccessToast } from '../../../apiCommon/helpers/Toast';


interface ButtonProps {
    show: any;
    handleClose: any
    showModal: any
    tenancyPayement: any
    tenancy: any
    getTenancyReminder: any
    totalPayments: any
    selectedPayments: any
    // 👇️ turn off type checking
    // sethandleSubmitIdv:any;
}
const SendReminder = ({ show,
    handleClose,
    showModal,
    tenancy,
    getTenancyReminder,
    tenancyPayement,
    totalPayments,
    selectedPayments
}: ButtonProps) => {
    const [message, setMessage] = useState('')
    const [checkId, setCheckId] = useState('')
    const paymentIds: any = []
    const handlesetIds = (id: any) => {
        paymentIds.push(id)
    }    

    const handleSendReminder = () => {

        let body = {
            reminderDate: moment(tenancyPayement[0]?.paymentRemainder).format('YYYY-MM-DD'),
            scheduledDate: moment(tenancyPayement[0]?.paymentSchedule).format('YYYY-MM-DD'),
            reminderType: 0,
            message: message,
            paymentIds: paymentIds,
            tenantId: tenancyPayement[0]?.tenantId,
            tenancyId: tenancyPayement[0]?.tenancyId
        }
        ApiPost('cooperate/reminder', body)
            .then((res) => {
                SuccessToast(res?.data?.message)
            })
            .catch((err) => console.log('err', err))
        handleClose()
        getTenancyReminder()
        setMessage('')
    }
   
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
                <h1>Payment Reminder</h1>
                <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
                    <KTSVG className='svg-icon-1 text-black' path='/media/icons/duotune/arrows/arr061.svg' />
                </div>
            </div>
            <div className="modal-body">
                <Row>
                    <Col md={9} className=''>
                        <div className='payment-reminder-item'>
                            <h6 className='text-muted'>
                                Dear
                                <span className='mx-1' style={{ color: 'black' }}>{tenancy[0]?.tenant[0]?.firstName} {tenancy[0]?.tenant[0]?.lastName}</span>
                            </h6>
                        </div>
                    </Col>
                    <Col md={3} className=''>
                        <a
                            // onClick={() => setShowCreateAppModal(true)}
                            className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_create_app'
                            // onClick={() => setShowSendRemModal(true)}
                            onClick={() => handleSendReminder()}
                        >
                            Send Reminder
                        </a>
                    </Col>
                </Row>
                <Row>

                    <div className='pt-0 table-responsive mt-5'>
                        <div className='payment-reminder-item'>
                            <div className="mb-5 d-flex" style={{ alignItems: "center" }}>
                                <label className="form-label me-10">Message </label>
                                <input type="text" className="form-control form-control-solid" placeholder="" name="contractNo" onChange={(e) => setMessage(e.target.value)} />
                            </div>

                            <h6 className='text-muted'>
                                You have an upcoming payment of  AED {totalPayments} due on {moment(tenancyPayement[0]?.paymentSchedule).format('DD-MM-YYYY')}.
                            </h6>
                            <h6 className='text-muted'>
                                Please ensure you settle this payment on time.
                            </h6>
                            <h6 className='text-muted'>
                                Thank you and have a great day
                            </h6>
                        </div>
                    </div>

                    <h3 className="mx-10 my-5">Payments</h3>
                    <div className='pt-0 table-responsive mt-5'>
                        <table
                            className='table align-middle table-row-dashed fs-6 gy-5'
                            id='kt_ecommerce_sales_table'
                        >
                            <thead>
                                <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                                    <th className=' min-w-100px'></th>
                                    <th className=' min-w-100px'>PAYMENT</th>
                                    <th className=' min-w-100px'>TYPE</th>
                                    <th className=' min-w-100px'>AMOUNT</th>
                                    <th className=' min-w-100px'>STATUS</th>
                                    <th className=' min-w-100px'>PAYMENT SCHEDULED</th>
                                    <th className=' min-w-100px'>PAYMENT METHOD</th>
                                    <th className=' min-w-100px'>AMOUNT PAID</th>
                                    <th className=' min-w-100px'> OUTSTANDING BALANCE</th>
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
                                            <td>{v?.amount}</td>
                                            <td>
                                                {v?.status === 0
                                                    ? 'Paid'
                                                    : v?.status === 1
                                                        ? 'Upcoming'
                                                        : 'Overdue'}
                                            </td>
                                            <td>{moment(v?.paymentSchedule).format('DD/MM/YYYY')}</td>
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
                                            <td>{v?.amountPaid} AED</td>
                                            <td>{v?.amountPaid - v?.amountReceived} AED</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </Row>
            </div>

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

export default SendReminder
