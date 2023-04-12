import React from 'react'
import { Col, Modal, Row } from 'react-bootstrap';
import { ApiGet } from '../../../apiCommon/helpers/API/ApiData';
import { KTSVG } from '../../../_metronic/helpers';
import moment from 'moment'
interface ButtonProps {
    show: any;
    handleClose: any
    showModal: any
    reminderId: any
    // 👇️ turn off type checking
    // sethandleSubmitIdv:any;
}
const ViewReminder = ({ show,
    handleClose,
    showModal,
    reminderId

}: ButtonProps) => {
    const [reminderData, setReminderData] = React.useState<any>([])
    const viewReminder = async () => {
        await ApiGet(`cooperate/reminder/${reminderId}`)
            .then((res) => {
                setReminderData(res?.data?.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    React.useEffect(() => {
        if(reminderId){
            viewReminder()
        }
    }, [reminderId])
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
                <h1>View Reminder</h1>
                <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
                    <KTSVG className='svg-icon-1 text-black' path='/media/icons/duotune/arrows/arr061.svg' />
                </div>
            </div>
          {reminderData?.map((item:any)=>{
            return <div className="modal-body">
            <Row>
                <Col md={6} className=''>
                    <div className='payment-receipt-item'>
                        <h6 className='text-muted'>
                            Reminder Type.
                            <span className='mx-1' style={{ color: 'black' }}>{item?.reminderType === 0 ? 'Rent' : item?.reminderType === 1 ? 'Security Deposit' : item?.reminderType === 2 ? 'Booking' : item?.reminderType === 3 ? 'Other' : ''}</span>
                        </h6>
                    </div>
                    <div className='payment-receipt-item'>
                        <h6 className='text-muted'>
                            Reminder Status
                            <span className='mx-1' style={{ color: 'black' }}>{item?.reminderStatus === 1 ? 'paid' : item?.reminderStatus === 2 ? 'Overdue' : item?.reminderStatus === 0 ? 'Upcoming' : ''}</span>
                        </h6>
                    </div>
                    <div className='payment-receipt-item'>
                        <h6 className='text-muted'>
                            Message
                            <span className='mx-1' style={{ color: 'black' }}>   {item?.message}</span>
                        </h6>
                    </div>
                </Col>
                <Col md={6} className=''>
                    <div className='payment-receipt-item'>
                        <h6 className='text-muted'>
                            Reminder Date
                            <span className='mx-1' style={{ color: 'black' }}>{moment(item?.reminderDate).format('DD/MM/YYYY')}</span>
                        </h6>
                    </div>
                    <div className='payment-receipt-item'>
                        <h6 className='text-muted'>
                           Schedule Date:
                            <span className='mx-1' style={{ color: 'black' }}>{moment(item?.scheduledDate).format('DD/MM/YYYY')}</span>
                        </h6>
                    </div>
                </Col>
            </Row>
        </div>
          })  
}
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

export default ViewReminder
