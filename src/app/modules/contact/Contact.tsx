import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ApiDelete, ApiGet, ApiPost, ApiPut} from '../../../apiCommon/helpers/API/ApiData'
import {ErrorToast, SuccessToast} from '../../../apiCommon/helpers/Toast'
import {CreateAppModal} from '../../../_metronic/partials'
import swal from 'sweetalert2'
import {TbChevronDown} from 'react-icons/tb'
import {KTSVG} from '../../../_metronic/helpers'
import noData from '../../../img/NoData1.svg'
import {Dropdown, Modal} from 'react-bootstrap'
import moment from 'moment'

const Contact = () => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [category, setCategoryData] = useState([])
  const [tableData, setTableData] = useState([])
  const [viewModal, setViewModal] = useState(false)
  const [viewData, setViewData] = useState<any>({})
  const [updateDataId, setUpdateDataId] = useState('')
  const [propertiType, setPropertiType] = useState('Buildings')
  const [show, setShow] = useState(false)
  const [showCom, setShowCom] = useState(false)
  const [pageLimit, setPageLimit] = useState<any>(1)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  console.log('🚀 ~ file: Building.tsx ~ line 10 ~ Building ~ updateDataId', updateDataId)
  const [isEdit, setIsEdit] = useState(false)
  const [formData, setFormData] = useState<any>({
    // portfolioType: 'residential',
    // portfolio: 'building',
  })
  console.log('formData', formData)

  const handleChnage = (e: any) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const building = async () => {
    await ApiGet('contact/getContact')
      .then((res) => {
        console.log('res?.data', res?.data)
        setTableData(res?.data?.contact)
      })
      .catch((err) => ErrorToast(err?.message))
  }
  const Category = async () => {
    await ApiGet('category/get-category')
      .then((res) => {
        console.log('res?.data', res?.data)
        setCategoryData(res?.data?.category)
      })
      .catch((err) => ErrorToast(err?.message))
  }

  const deleteProperty = (id: any) => {
    ApiDelete(`contact/deleteContact?id=${id}`)
      .then((res: any) => {
        SuccessToast(res?.data?.message)
        building()
        // building(formData?.portfolioType, formData?.portfolio)
      })

      .catch((err) => ErrorToast(err.message))
  }

  const editBtn = (id: any) => {
    setUpdateDataId(id?._id)
    setIsEdit(true)
    setShowCreateAppModal(true)
    setFormData(id)
  }

  const handleSubmit = () => {
    if (isEdit) {
      const body = {
        name: formData?.name,
        // id:updateDataId
      }
      ApiPut(`subcategory/update-subcategory?id=${updateDataId}`, body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          setFormData({})
          setShowCreateAppModal(false)
          building()
          setIsEdit(false)
        })
        .catch((err) => ErrorToast(err.message))
    } else {
      // const body = {...formData, managerId: formData?.managerId}
      const body = {
        categoryId: formData?.categoryName ?? '6413497393ceee7fb0a90425',
        name: formData?.name,
      }
      ApiPost('subcategory/add-subcategory', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          setFormData({})
          setShowCreateAppModal(false)
          building()
        })
        .catch((err) => ErrorToast(err.message))
    }
  }
  const viewBtnClick = (row: any) => {
    setViewModal(true)
    setViewData(row)
    console.log(row)
  }

  useEffect(() => {
    building()
    Category()
  }, [])

  useEffect(() => {
    building()

    if (isEdit) {
      ApiGet(`cooperate/properties/${updateDataId}`)
        .then((response) => {
          console.log('response', response)
          setFormData(response?.data?.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [propertiType, page])

  const navigate = useNavigate()
  return (
    <>
      <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
        {/* <div className='d-flex flex-column flex-column-fluid'> */}
        {/* <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'> */}
        <div id='' className='app-container container-xxl d-flex flex-stack pt-0 mt-0'>
          <div className='page-title d-flex flex-column justify-content-center flex-wrap me-3'>
            {/* <ul className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2'>
              <li className='nav-item'>
                <h1
                  className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0 me-15'
                  style={{padding: '0.5rem 0'}}
                >
                  Category
                </h1>
              </li>
            </ul> */}
          </div>
          {/* <div className='d-flex align-items-center gap-2 gap-lg-3'>
            <ul className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2'>
              <li
                className='nav-item'
                onClick={() => {
                  setFormData({...formData, portfolio: 'building'})
                  building(formData?.portfolioType, 'building')
                  setPropertiType('Buildings')
                }}
              >
                <a className='nav-link text-active-primary pb-4 active' data-bs-toggle='tab'>
                  Buildings
                </a>
              </li>
              <li
                className='nav-item'
                onClick={() => {
                  setFormData({...formData, portfolio: 'communities'})
                  building(formData?.portfolioType, 'communities')
                  setPropertiType('Communities')
                }}
              >
                <a className='nav-link text-active-primary pb-4' data-bs-toggle='tab'>
                  Communities
                </a>
              </li>
            </ul>
          </div> */}
        </div>
        {/* </div> */}
        {/* <div className='app-container container-xxl d-flex flex-stack pt-3 mt-5'>
          <a
            className='btn btn-sm fw-bold btn-primary btn-green'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_create_app'
            onClick={() => {
              setShowCreateAppModal(true)
            }}
          >
            Add SubCategory
          </a>
        </div> */}
        <div id='kt_app_content' className='app-content flex-column-fluid pt-0'>
          <div id='kt_app_content_container' className='app-container container-xxl'>
            <div className='card card-flush mb-10'></div>
            <div className='card card-flush'>
              <div className='card-body pt-0 table-responsive'>
                <table
                  className='table align-middle table-row-dashed fs-6 gy-5'
                  id='kt_ecommerce_sales_table'
                >
                  <thead>
                    <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                      {/* <th className='w-10px pe-2'>
                        <div className='form-check form-check-sm form-check-custom form-check-solid me-3'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            data-kt-check='true'
                            data-kt-check-target='#kt_ecommerce_sales_table .form-check-input'
                            value='1'
                          />
                        </div>
                      </th> */}
                      <th className='text-center min-w-100px'>#</th>
                      {/* <th className='text-center min-w-100px'>Name</th> */}
                      <th className='text-center min-w-100px'>Email</th>
                      <th className='text-center min-w-100px'>Subject</th>
                      <th className='text-center min-w-100px'>Message</th>

                      <th className='text-end min-w-100px'></th>
                    </tr>
                  </thead>
                  <tbody className='fw-semibold text-gray-800'>
                    {tableData?.length ? (
                      tableData?.map((v: any, i: any) => {
                        console.log('v?.categoryId?.name', v?.categoryId?.name)
                        return (
                          <tr>
                            {/* <td>
                        <div className='form-check form-check-sm form-check-custom form-check-solid'>
                          <input className='form-check-input' type='checkbox' value='1' />
                        </div>
                      </td> */}
                            {propertiType === 'Buildings' ? (
                              <>
                                {' '}
                                <td className='text-center'>{i + 1}</td>
                                {/* <td
                                  className='text-center'
                                  data-kt-ecommerce-order-filter='order_id'
                                >
                                  {v?.name}
                                </td> */}
                                <td className='text-center'>{v?.email}</td>
                                <td className='text-center'>{v?.subject || '-'}</td>
                                <td className='text-center'>{v?.message || '-'}</td>
                              </>
                            ) : (
                              <>
                                {' '}
                                <td className='text-center'>{i + 1}</td>
                                <td
                                  className='text-center'
                                  data-kt-ecommerce-order-filter='order_id'
                                >
                                  {v?.name}
                                </td>
                                <td
                                  className='text-center'
                                  data-kt-ecommerce-order-filter='order_id'
                                >
                                  {v?.categoryId?.name}
                                </td>
                              </>
                            )}

                            <td className='text-end d-flex ' style={{justifyContent: 'end'}}>
                              <Dropdown className='' style={{width: 'fit-content'}}>
                                <Dropdown.Toggle
                                  variant='success'
                                  id='dropdown-basic'
                                  className='btn btn-sm btn-light btn-active-light-primary text-hover-green'
                                >
                                  Actions <TbChevronDown />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    href='#/action-1'
                                    onClick={() => {
                                        swal
                                          .fire({
                                            text: 'Are you sure you want Delete it?',
                                            icon: 'warning',
                                            showConfirmButton: true,
                                            confirmButtonColor: '#D72852',
                                            confirmButtonText: 'Yes',
                                            showCancelButton: true,
                                            // cancelButtonColor: "transparent",
                                            cancelButtonText: 'Cancel',
                                          })
                                          .then((res) => {
                                            if (res.isConfirmed) {
                                              deleteProperty(v?._id)
                                            }
                                          })
                                      }}
                                    className='menu-link px-3'
                                  >
                                    Delete
                                  </Dropdown.Item>
                                  
                                </Dropdown.Menu>
                              </Dropdown>
                              
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan={propertiType === 'Buildings' ? 7 : 10} className='text-center'>
                          <img src={noData} alt='' width={350} />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className='row mb-6'>
                <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'>
                  {/* <div className='dataTables_length' id='kt_ecommerce_sales_table_length'>
                <label>
                  <select
                    name='kt_ecommerce_sales_table_length'
                    aria-controls='kt_ecommerce_sales_table'
                    className='form-select form-select-sm form-select-solid'
                  >
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                    <option value='100'>100</option>
                  </select>
                </label>
              </div> */}
                </div>
                <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
                  <div
                    className='dataTables_paginate paging_simple_numbers'
                    id='kt_ecommerce_sales_table_paginate'
                  >
                    <ul className='pagination'>
                      <li
                        className='paginate_button page-item previous disabled'
                        id='kt_ecommerce_sales_table_previous'
                      >
                        <a
                          href='#'
                          aria-controls='kt_ecommerce_sales_table'
                          data-dt-idx='0'
                          tabIndex={0}
                          className='page-link'
                        >
                          <i className='previous'></i>
                        </a>
                      </li>
                      <li className={`paginate_button page-item + ${page === 1 ? 'active' : ''}`}>
                        <a
                          href='#'
                          aria-controls='kt_ecommerce_sales_table'
                          data-dt-idx='1'
                          tabIndex={0}
                          className='page-link'
                          onClick={() => setPage(1)}
                        >
                          1
                        </a>
                      </li>
                      {pageLimit >= 2 && (
                        <li className={`paginate_button page-item + ${page === 2 ? 'active' : ''}`}>
                          <a
                            href='#'
                            aria-controls='kt_ecommerce_sales_table'
                            data-dt-idx='2'
                            tabIndex={0}
                            className='page-link'
                            onClick={() => setPage(2)}
                          >
                            2
                          </a>
                        </li>
                      )}
                      {pageLimit >= 3 && (
                        <li className={`paginate_button page-item + ${page === 3 ? 'active' : ''}`}>
                          <a
                            href='#'
                            aria-controls='kt_ecommerce_sales_table'
                            data-dt-idx='3'
                            tabIndex={0}
                            className='page-link'
                            onClick={() => setPage(3)}
                          >
                            3
                          </a>
                        </li>
                      )}
                      {pageLimit >= 4 && (
                        <li className={`paginate_button page-item + ${page === 4 ? 'active' : ''}`}>
                          <a
                            href='#'
                            aria-controls='kt_ecommerce_sales_table'
                            data-dt-idx='4'
                            tabIndex={0}
                            className='page-link'
                            onClick={() => setPage(4)}
                          >
                            4
                          </a>
                        </li>
                      )}
                      {pageLimit >= 5 && (
                        <li className={`paginate_button page-item + ${page === 5 ? 'active' : ''}`}>
                          <a
                            href='#'
                            aria-controls='kt_ecommerce_sales_table'
                            data-dt-idx='5'
                            tabIndex={0}
                            className='page-link'
                            onClick={() => setPage(5)}
                          >
                            5
                          </a>
                        </li>
                      )}
                      <li
                        className='paginate_button page-item next'
                        id='kt_ecommerce_sales_table_next'
                      >
                        <a
                          href='#'
                          aria-controls='kt_ecommerce_sales_table'
                          data-dt-idx='6'
                          tabIndex={0}
                          className='page-link'
                        >
                          <i className='next'></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
      <Modal show={viewModal} onHide={() => setViewModal(false)} centered className='modal-width'>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='text-center' style={{marginBottom: '1.75rem'}}>
              <img
                src={
                  viewData?.image ||
                  'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
                }
                alt=''
                className=' rounded-pill object-cover'
                height='100px'
                width='100px'
              />
            </div>
            <div className='row py-2'>
              <div className='col-md-5 fw-bold'>Name</div>
              <div className='col-md-7 text-capitalize'>{viewData?.name}</div>
            </div>
            <div className='row py-2'>
              <div className='col-md-5 fw-bold'>Email</div>
              <div className='col-md-7 text-capitalize'>{viewData?.email}</div>
            </div>
            <div className='row py-2'>
              <div className='col-md-5 fw-bold'>Bank Name</div>
              <div className='col-md-7 text-capitalize'>{viewData?.bankName || '-'}</div>
            </div>
            <div className='row py-2'>
              <div className='col-md-5 fw-bold'>Account Number</div>
              <div className='col-md-7 text-capitalize'>{viewData?.accountNumber || '-'}</div>
            </div>
            <div className='row py-2'>
              <div className='col-md-5 fw-bold'>Ifsc Code</div>
              <div className='col-md-7 text-capitalize'>{viewData?.ifscCode || '-'}</div>
            </div>
            <div className='row py-2'>
              <div className='col-md-5 fw-bold'>Phone Number</div>
              <div className='col-md-7 text-capitalize'>{viewData?.phone || '-'}</div>
            </div>
            <div className='row py-2'>
              <div className='col-md-5 fw-bold'>Address</div>
              <div className='col-md-7 text-capitalize'>{viewData?.address || '-'}</div>
            </div>
            <div className='row py-2'>
              <div className='col-md-5 fw-bold'>City</div>
              <div className='col-md-7 text-capitalize'>{viewData?.city || '-'}</div>
            </div>
            <div className='row py-2'>
              <div className='col-md-5 fw-bold'>State</div>
              <div className='col-md-7 text-capitalize'>{viewData?.state || '-'}</div>
            </div>
            <div className='row py-2'>
              <div className='col-md-5 fw-bold'>Country</div>
              <div className='col-md-7 text-capitalize'>{viewData?.country || '-'}</div>
            </div>
            <div className='row py-2'>
              <div className='col-md-5 fw-bold'>Pincode</div>
              <div className='col-md-7 text-capitalize'>{viewData?.pincode || '-'}</div>
            </div>
            <div className='row py-2'>
              <div className='col-md-5 fw-bold'>Role</div>
              <div className='col-md-7 text-capitalize'>{viewData?.role?.role || '-'}</div>
            </div>
            <div className='row py-2'>
              <div className='col-md-5 fw-bold'>CreatedAt</div>
              <div className='col-md-7 text-capitalize'>
                {moment(viewData?.createdAt).format('DD-MM-YYYY')}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-color' onClick={() => setViewModal(false)}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'Property Management '})}</PageTitle>
      <DashboardPage /> */}
      {/* {showCreateAppModal && (
        <AddCategory
          show={showCreateAppModal}
          handleClose={() => {
            setShowCreateAppModal(false)
            setIsEdit(false)
          }}
          building={building}
          handleChnage={handleChnage}
          updateDataId={updateDataId}
          isEdit={isEdit}
          propertiType={propertiType}
          formData={formData}
          category={category}
          handleSubmit={handleSubmit}
        />
      )} */}
    </>
  )
}

export default Contact
