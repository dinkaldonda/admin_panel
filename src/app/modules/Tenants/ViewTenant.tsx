import moment from 'moment'
import React from 'react'
import {Col, Row} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {ApiGet} from '../../../apiCommon/helpers/API/ApiData'
import img from "../../../img/300-1.jpg"
import {
  Bucket,
} from '../../../apiCommon/helpers/API/ApiData'

const ViewTenant = () => {
  const navigate = useNavigate()
  const [tenantData, setTenantData] = React.useState<any>([])
  const [paymentData, setPaymentData] = React.useState<any>({})
  const [propertiType, setPropertiType] = React.useState('')

  const getTenantData = async () => {
    await ApiGet(`cooperate/tenant/${window.location.pathname.split('/')[2]}`)
      .then((res) => {
        // setTableData(res?.data?.data)
        setTenantData(res?.data?.data)
        //   console.log('first', res?.data?.data[0]?.tenantType === 1 ? 'Payments & Rent' : 'Documents')
        setPropertiType(res?.data?.data[0]?.tenantType === 1 ? 'Messages' : 'Documents')
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const getPaymentData = async () => {
    await ApiGet(`cooperate/tenant/payment_and_rent/${window.location.pathname.split('/')[2]}`)
      .then((res) => {
        // setTableData(res?.data?.data)
        setPaymentData(res?.data?.data)
        //   console.log('first', res?.data?.data[0]?.tenantType === 1 ? 'Payments & Rent' : 'Documents')
        //   setPropertiType(res?.data?.data[0]?.tenantType === 1 ? 'Messages' : 'Documents')
      })
      .catch((e) => {
        console.log(e)
      })
  }
  React.useEffect(() => {
    getTenantData()
    getPaymentData()
  }, [window.location.pathname.split('/')[2]])
  return (
    <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
      <div className='d-flex flex-column flex-column-fluid'>
        <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'>
          <div
            id='kt_app_toolbar_container'
            className='app-container container-xxl d-flex flex-stack'
          >
            <div className='page-title d-flex flex-column justify-content-center flex-wrap me-3'>
              <h1 className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0'>
                View Tenant Details
              </h1>
              <ul className='breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1'>
                <li className='breadcrumb-item text-muted'>
                  <div
                    className='text-muted cursor-pointer'
                    onClick={() => navigate('/tenants')}
                  >
                    Tenant
                  </div>
                </li>
                <li className='breadcrumb-item'>
                  <span className='bullet bg-gray-400 w-5px h-2px'></span>
                </li>
                <li className='breadcrumb-item active'>
                  <a className='px-2'>Tenant details</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id='kt_app_content' className='app-content flex-column-fluid'>
          <div id='kt_app_content_container' className='app-container container-xxl'>
            <div className='d-flex flex-column flex-lg-row'>
              <div className='flex-column flex-lg-row-auto w-lg-250px w-xl-350px mb-10'>
                <div className='card mb-5 mb-xl-8'>
                  <div className='card-body'>
                    <div className='d-flex flex-stack fs-4 py-3'>
                      <div
                        className='fw-bold rotate collapsible'
                        data-bs-toggle='collapse'
                        role='button'
                        aria-expanded='false'
                        aria-controls='kt_user_view_details'
                      ></div>
                      
                    </div>
                    
                    <div id='kt_user_view_details' className='collapse show'>
                      <div className='pb-5 fs-6'>
                        <div className="row">
                          <div className='col-lg-6 col-md-6 symbol symbol-100px symbol'>
                            <img style={{width: '100px', borderRadius:'50%'}} src={img} alt='image' />
                          </div>
                          <div className='col-lg-6 col-md-6' style={{textAlign:'right'}}>
                          <a
                            // onClick={() => setShowCreateAppModal(true)}
                            className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_create_app'
                            // onClick={handleSubmit}
                            onClick={() => {
                              navigate(`/edit-tenant/${window.location.pathname.split('/')[2]}`)
                            }}
                          >
                            Edit
                          </a>
                          </div>
                          <div className='col-12 mt-3'>
                            <span className='text-gray-600' style={{fontSize: '16px', textTransform: 'capitalize', fontWeight:600}}>
                              {tenantData[0]?.firstName} {tenantData[0]?.lastName}  
                            </span>
                          </div>
                        </div>
                        <div className='fw-bold mt-5'>Type <span className='text-gray-600'>{tenantData[0]?.tenantType === 0 ? 'Main' : tenantData[0]?.tenantType === 1 ? 'Sub' : ''}</span></div>
                        <div className='fw-bold mt-5'>DOB <span className='text-gray-600'>{moment(tenantData[0]?.DOB).format('DD/MM/YYYY')}</span></div>

                        <div className='fw-bold mt-5'>ID <span className='text-gray-600'>{tenantData[0]?._id}</span></div>

                        <div className='fw-bold mt-5'>Nationality <span className='text-gray-600'>{tenantData[0]?.nationality}</span></div>

                        <div className='fw-bold mt-5'>Email <span className='text-gray-600'>{tenantData[0]?.email}</span></div>

                        <div className='fw-bold mt-5'>Mobile No. <span className='text-gray-600'>+{tenantData[0]?.countryCode} {tenantData[0]?.phoneNumber}</span></div>

                        <div className='fw-bold mt-5'>Source <span className='text-gray-600'>{tenantData[0]?.tenantSource === 1 ? 'Direct' : tenantData[0]?.tenantSource === 0 ? 'Agent' : ''}</span></div>

                        <div className='d-flex mt-5 justify-content-between align-items-end'>
                          <div><div className='fw-bold mt-5'> Tenancy Status <span className='text-gray-600'>{tenantData[0]?.tenancy?.tenancyStatus === 0 ? 'Booked' : tenantData[0]?.tenancy?.tenancyStatus === 1 ? 'Active' : 'Expiring'}</span></div>
                          </div>
                          <div><a
                            // onClick={() => setShowCreateAppModal(true)}
                            className='btn btn-sm fw-bold btn-primary btn-green '
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_create_app'
                            // onClick={handleSubmit}
                            onClick={() => {
                              navigate(`/tenancy-details/${tenantData[0]?.tenancy?._id}`)
                              // navigate(`tenancy-details`)
                              // console.log('`tenancy-details/${tenantData[0]?.teancy?._id}`', `tenancy-details/${tenantData[0]?.tenancy?._id}`)
                            }}
                          >
                            View Tenancy
                          </a></div>
                        </div>
                        <div className='fw-bold mt-5'> Unit No. <span className='text-gray-600'>{tenantData[0]?.tenancy?.unit[0]?.unitNo}</span></div>
                        
                        <div className='fw-bold mt-5'> Unit Type <span className='text-gray-600'>{tenantData[0]?.tenancy?.unit[0]?.unitType === 'town_house'
                          ? 'TownHouse'
                          : tenantData[0]?.tenancy?.unit[0]?.unitType === 'other'
                            ? 'Other'
                            : tenantData[0]?.tenancy?.unit[0]?.unitType === 'common_area'
                              ? 'Common Area'
                              : tenantData[0]?.tenancy?.unit[0]?.unitType === 'villa'
                                ? 'Villa'
                                : tenantData[0]?.tenancy?.unit[0]?.unitType === 'apartment'
                                  ? 'Apartment'
                                  : tenantData[0]?.tenancy?.unit[0]?.unitType === 'penthouse'
                                    ? 'Penthouse'
                                    : ''}</span></div>
                        
                        {tenantData[0]?.tenancy?.unit[0]?.floor[0]?.name ? <div className='fw-bold mt-5'> Floor <span className='text-gray-600'>{tenantData[0]?.tenancy?.unit[0]?.floor[0]?.name}</span>
                        </div> : ''}
                        
                        {tenantData[0]?.tenancy?.community[0]?.name ? <div className='fw-bold mt-5'> Development Name <span className='text-gray-600'>{tenantData[0]?.tenancy?.community[0]?.name}</span></div> : ''}
                        
                        <div className=''>
                          <div></div>
                          <div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex-lg-row-fluid ms-lg-15'>
                <ul
                  className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-8'
                  role='tablist'
                >
                  {tenantData[0]?.tenantType === 0 && <li className='nav-item' role='presentation'>
                    <a
                      className={propertiType === "Documents" ? "nav-link text-active-primary pb-4 active" : "nav-link text-active-primary pb-4"}
                      data-bs-toggle='tab'
                      aria-selected='false'
                      role='tab'
                      tabIndex={-1}
                      onClick={() => setPropertiType('Documents')}
                    >
                      Documents
                    </a>
                  </li>}
                  {tenantData[0]?.tenantType === 0 && <li className='nav-item' role='presentation'>
                    <a
                      //   className='nav-link text-active-primary pb-4'
                      className={propertiType === "Payments & Rent" ? "nav-link text-active-primary pb-4 active" : "nav-link text-active-primary pb-4"}
                      data-kt-countup-tabs='true'
                      data-bs-toggle='tab'
                      data-kt-initialized='1'
                      aria-selected='false'
                      role='tab'
                      tabIndex={-1}
                      onClick={() => setPropertiType('Payments & Rent')}
                    >
                      Payments & Rent
                    </a>
                  </li>}
                  <li className='nav-item' role='presentation'>
                    <a
                      className={propertiType === "Messages" ? "nav-link text-active-primary pb-4 active" : "nav-link text-active-primary pb-4"}
                      data-bs-toggle='tab'
                      aria-selected='true'
                      role='tab'
                      onClick={() => setPropertiType('Messages')}
                    >
                      Messages
                    </a>
                  </li>
                  <li className='nav-item' role='presentation'>
                    <a
                      className={propertiType === "Requests" ? "nav-link text-active-primary pb-4 active" : "nav-link text-active-primary pb-4"}
                      data-bs-toggle='tab'
                      aria-selected='true'
                      role='tab'
                    //   onClick={() => setPropertiType('Requests')}
                    >
                      Requests
                    </a>
                  </li>
                </ul>
                <div>
                  {propertiType === 'Documents' && (
                    <>
                      <div className='card card-flush mb-6 mb-xl-9'>
                        <div className='card-body d-flex flex-column'>
                          <div className="row justify-content-center text-center">
                            <div className='mt-2 mb-2 col-lg-4 col-md-4 text-center'><a
                              // onClick={() => setShowCreateAppModal(true)}
                              className='btn btn-sm fw-bold btn-primary btn-green '
                              href={`${Bucket}${tenantData[0]?.tenancy?.document?.contract}`} target="_blank"
                              style={{width:'130px'}}
                            >
                              View Contract
                            </a></div>
                            <div className='mt-2 mb-2 col-lg-4 col-md-4 text-center'><a
                              // onClick={() => setShowCreateAppModal(true)}
                              className='btn btn-sm fw-bold btn-primary btn-green '
                              href={`${Bucket}${tenantData[0]?.tenancy?.document?.other}`} target="_blank"
                              style={{width:'130px'}}
                            >
                              View Other
                            </a></div>
                            <div className='mt-2 mb-2 col-lg-4 col-md-4 text-center'><a
                              // onClick={() => setShowCreateAppModal(true)}
                              className='btn btn-sm fw-bold btn-primary btn-green '
                              href={`${Bucket}${tenantData[0]?.document?.passport}`} target="_blank"
                              style={{width:'130px'}}
                              // onClick={handleSubmit}
                            >
                              View Passport
                            </a></div>
                            <div className='mt-2 mb-2 col-lg-4 col-md-4 text-center'><a
                              // onClick={() => setShowCreateAppModal(true)}
                              className='btn btn-sm fw-bold btn-primary btn-green '
                              href={`${Bucket}${tenantData[0]?.document?.residency}`} target="_blank"
                              style={{width:'130px'}}
                              // onClick={handleSubmit}
                            >
                              View Residency
                            </a></div>
                            <div className='mt-2 mb-2 col-lg-4 col-md-4 text-center'><a
                              // onClick={() => setShowCreateAppModal(true)}
                              className='btn btn-sm fw-bold btn-primary btn-green '
                              href={`${Bucket}${tenantData[0]?.document?.id}`} target="_blank"
                              style={{width:'130px'}}
                              // onClick={handleSubmit}
                            >
                              View ID
                            </a></div>
                            <div className='mt-2 mb-2 col-lg-4 col-md-4 text-center'><a
                              // onClick={() => setShowCreateAppModal(true)}
                              className='btn btn-sm fw-bold btn-primary btn-green '
                              href={`${Bucket}${tenantData[0]?.document?.other}`} target="_blank"
                              style={{width:'130px'}}
                              // onClick={handleSubmit}
                            >
                              View Other
                            </a></div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {propertiType === 'Payments & Rent' && (
                    <>
                      <div className='card pt-4 mb-6 mb-xl-9'>
                        <div className='card-header border-0'>
                          <div className='card-title d-flex justify-content-between w-100'>
                            <h2></h2>
                            <a
                              className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                              onClick={() => navigate(`/tenancy-details/${tenantData[0]?.tenancy?._id}/payment-rent`)}
                            >
                              View Payments
                            </a>
                          </div>
                        </div>
                        <div className='card-body pt-0 pb-5'>
                          <div className='row gy-4 my-5'>
                            <div className='col-lg-4 fs-6 fw-semibold text-gray-600'>
                              Total Payments <span style={{ color: "black" }}>{paymentData?.total_payments}</span>
                            </div>
                            <div className='col-lg-4 fw-semibold text-gray-600'>
                              Paid <span style={{ color: "black" }}>{paymentData?.paid_count} AED</span>
                            </div>
                            <div className='col-lg-4 fw-semibold text-gray-600'>
                              Overdue <span style={{ color: "black" }} >{paymentData?.overdue_count} AED</span>
                            </div>
                            <div className='col-lg-4 fw-semibold text-gray-600'>
                              Outstanding Balance <span style={{ color: "black" }}>{paymentData?.outstanding_count} AED</span>
                            </div>
                            <div className='col-lg-4 fw-semibold text-gray-600'>
                              Rent <span style={{ color: "black" }}>{paymentData?.rent_count} AED</span>
                            </div>
                            <div className='col-lg-4 fw-semibold text-gray-600'>
                              Security Deposit <span style={{ color: "black" }}>{paymentData?.security_count} AED</span>
                            </div>
                            <div className='col-lg-4 fw-semibold text-gray-600'>
                              Booking <span style={{ color: "black" }}>{paymentData?.booking_count} AED</span>
                            </div>
                            {paymentData?.other.map((v: any) => {
                              return (
                                <div className='col-lg-4 fw-semibold text-gray-600'>
                                  {v?._id ? v?._id : "Other"} <span style={{ color: "black" }}>{v?.count ? v?.count : 0} AED</span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {propertiType === 'Messages' && (
                    <>
                      <div className='card pt-4 mb-6 mb-xl-9'>
                        <div className='card-header border-0'>
                          <div className='card-title d-flex justify-content-between w-100'>
                            <h2></h2>
                            <a
                              className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                              data-bs-toggle='modal'
                              data-bs-target='#kt_modal_create_app'
                            >
                              New Message
                            </a>
                          </div>
                        </div>
                        <div className='card-body pt-0 pb-5'>
                          <div className='table-responsive'>
                            <table
                              className='table align-middle table-row-dashed gy-5'
                              id='kt_table_users_login_session'
                            >
                              <thead>
                                <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                                  <th className=' min-w-100px'>Message ID </th>
                                  <th className=' min-w-100px'>Subject</th>
                                  <th className=' min-w-100px'>Date</th>
                                  <th className=' min-w-100px'>Messages Received</th>
                                  <th className=' min-w-100px'></th>
                                </tr>
                              </thead>
                              <tbody className='fw-semibold text-gray-600'>
                                <tr>
                                  <td>12345</td>
                                  <td>Subject Title</td>
                                  <td>10/02/2022</td>
                                  <td>10</td>
                                  <td>
                                    <a
                                      // onClick={() => setShowCreateAppModal(true)}
                                      className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                                      data-bs-toggle='modal'
                                      data-bs-target='#kt_modal_create_app'
                                    // onClick={handleSubmit}
                                    // onClick={() => {
                                    //   navigate(-1)
                                    // }}
                                    >
                                      View
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {propertiType === 'Requests' && (
                    <>
                      <div className='card pt-4 mb-6 mb-xl-9'>
                        <div className='card-header border-0'>
                          <div className='card-title d-flex justify-content-between w-100'>
                            <h2></h2>
                            <a
                              className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                              data-bs-toggle='modal'
                              data-bs-target='#kt_modal_create_app'
                            >
                              New Message
                            </a>
                          </div>
                        </div>
                        <div className='card-body pt-0 pb-5'>
                          <div className='table-responsive'>
                            <table
                              className='table align-middle table-row-dashed gy-5'
                              id='kt_table_users_login_session'
                            >
                              <thead>
                                <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                                  <th className=' min-w-100px'>Request ID </th>
                                  <th className=' min-w-100px'>Job ID </th>
                                  <th className=' min-w-100px'>Urgency</th>
                                  <th className=' min-w-100px'>Service Name</th>
                                  <th className=' min-w-100px'>Assigned To</th>
                                  <th className=' min-w-100px'>Status</th>
                                  <th className=' min-w-100px'>Schedule</th>
                                  <th className=' min-w-100px'>Rating</th>
                                  <th className=' min-w-100px'></th>
                                </tr>
                              </thead>
                              <tbody className='fw-semibold text-gray-600'>
                                <tr>
                                  <td>12345</td>
                                  <td>987</td>
                                  <td>Emergency</td>
                                  <td>Water Leak</td>
                                  <td>Smith</td>
                                  <td>In-Progress</td>
                                  <td>10/11/2022</td>
                                  <td className='' data-order='2022-09-11'>
                                    <span className='svg-icon svg-icon-2' style={{ color: '#ffad0f' }}>
                                      <svg
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                      >
                                        <path
                                          d='M11.1359 4.48359C11.5216 3.82132 12.4784 3.82132 12.8641 4.48359L15.011 8.16962C15.1523 8.41222 15.3891 8.58425 15.6635 8.64367L19.8326 9.54646C20.5816 9.70867 20.8773 10.6186 20.3666 11.1901L17.5244 14.371C17.3374 14.5803 17.2469 14.8587 17.2752 15.138L17.7049 19.382C17.7821 20.1445 17.0081 20.7069 16.3067 20.3978L12.4032 18.6777C12.1463 18.5645 11.8537 18.5645 11.5968 18.6777L7.69326 20.3978C6.99192 20.7069 6.21789 20.1445 6.2951 19.382L6.7248 15.138C6.75308 14.8587 6.66264 14.5803 6.47558 14.371L3.63339 11.1901C3.12273 10.6186 3.41838 9.70867 4.16744 9.54646L8.3365 8.64367C8.61089 8.58425 8.84767 8.41222 8.98897 8.16962L11.1359 4.48359Z'
                                          fill='currentColor'
                                        ></path>
                                      </svg>
                                    </span>
                                    4.0
                                  </td>
                                  <td>
                                    <a
                                      // onClick={() => setShowCreateAppModal(true)}
                                      className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                                      data-bs-toggle='modal'
                                      data-bs-target='#kt_modal_create_app'
                                    // onClick={handleSubmit}
                                    // onClick={() => {
                                    //   navigate(-1)
                                    // }}
                                    >
                                      View
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewTenant
