import moment from 'moment';
import React, { useRef, useState } from 'react'
import { Modal, Col, Row } from 'react-bootstrap';
import ReactToPrint from 'react-to-print';
import { ApiGet, ApiPost, ApiUpload } from '../../../apiCommon/helpers/API/ApiData';
import { ErrorToast } from '../../../apiCommon/helpers/Toast';
import { KTSVG } from '../../../_metronic/helpers'
import PhoneInput from 'react-phone-input-2'

interface ButtonProps {
    show: any;
    handleClose: any
    tenancy: any
    selectedPayments: any
    // 👇️ turn off type checking
    // sethandleSubmitIdv:any;
}
const AddSubTenant = ({ show,
    handleClose,
    tenancy,
    selectedPayments
}: ButtonProps) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [mobileNo, setMobileNo] = useState("")


    const handleNumber = (Phone: any, e: any) => {
        // let CountryCode = e.dialCode
        // let PhoneNumber = Phone.split(CountryCode)[1]
        console.log('Phone',Phone)
        setMobileNo(Phone)
    }

    const addSubTenant = () => {
        let body = {
            page: 1,
            limit: 10,
            tenancyId: window.location.pathname.split('/')[2],
          }
        ApiPost('cooperate/reminder/get', body)
        .then((res) => {
            // SuccessToast(res?.data?.message)
        })
        .catch((err) => console.log('err', err))
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
                <h1>Add Sub Tenant</h1>
                <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
                    <KTSVG className='svg-icon-1 text-black' path='/media/icons/duotune/arrows/arr061.svg' />
                </div>
            </div>

            <div className="modal-body">
                <Row>
                    <Col md={6}>
                        <div className='payment-receipt-item mt-5'>
                            <h6 className='text-muted'>
                                First Name
                                {/* {tenancyData[0]?.receivedDate} */}
                                <span className='mx-5'>
                                    <input
                                        type='text'
                                        className='form-control d-inline-block form-control-solid'
                                        placeholder='Enter'
                                        name='first_name'
                                        style={{ width: '200px' }}
                                        onChange={(e) => { setFirstName(e.target.value) }}
                                    />
                                </span>
                            </h6>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='payment-receipt-item mt-5'>
                            <h6 className='text-muted'>
                                Last Name
                                {/* {tenancyData[0]?.receivedDate} */}
                                <span className='mx-5'>
                                    <input
                                        type='text'
                                        className='form-control d-inline-block form-control-solid'
                                        placeholder='Enter'
                                        name='last_name'
                                        style={{ width: '200px' }}
                                        onChange={(e) => { setLastName(e.target.value) }}
                                    />
                                </span>
                                
                            </h6>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='payment-receipt-item mt-5'>
                            <h6 className='text-muted'>
                                Email 
                                {/* {tenancyData[0]?.receivedDate} */}
                                <span className='mx-5'>
                                    <input
                                        type='email'
                                        className='form-control d-inline-block form-control-solid'
                                        placeholder='Enter'
                                        name='Email'
                                        style={{ width: '200px' }}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                </span>
                                
                            </h6>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='payment-receipt-item mt-5'>
                            <h6 className='text-muted'>
                                Mobile No
                                {/* {tenancyData[0]?.receivedDate} */}
                                <span className='subtenant-mobile-wrapper mx-5'>
                                    <PhoneInput
                                        placeholder='Enter phone number'
                                        inputClass='d-flex'
                                        value={''}
                                        inputProps={{width: '120px'}}
                                        onChange={(phone, e) => handleNumber(phone, e)}
                                        // className='block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                                        />
                                </span>
                            </h6>
                        </div>
                    </Col>
                    <Col md={12} className="text-center mt-5">
                        <a
                            className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                            data-kt-stepper-action='previous'
                            onClick={() => {
                            addSubTenant()
                            // setCard('')
                            }}
                            style={{width:'120px'}}
                        >
                            Add
                        </a>
                        <a
                            className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                            data-kt-stepper-action='previous'
                            onClick={() => {
                                handleClose()
                            }}
                            style={{width:'120px'}}
                        >
                            Cancel
                        </a>
                    </Col>
                </Row>
            </div>
            
        </Modal>
    )
}

export default AddSubTenant
