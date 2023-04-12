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

const Product = () => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [category, setCategoryData] = useState([])
  const [tableData, setTableData] = useState([])
  const [viewModal, setViewModal] = useState(false)
  const [viewData, setViewData] = useState<any>({})
  const [updateDataId, setUpdateDataId] = useState('')
  const [propertiType, setPropertiType] = useState('Buildings')
  const [status, setStatus] = useState('Approved')
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
    await ApiPost(`product/get-product?status=${status}`,{})
      .then((res) => {
        console.log('res?.data', res?.data)
        setTableData(res?.data?.product)
      })
      .catch((err) => ErrorToast(err?.message))
  }
  //   const Category = async () => {
  //     await ApiGet(`product/get-product?status=${status}`)
  //       .then((res) => {
  //         console.log('res?.data', res?.data)
  //         setCategoryData(res?.data?.category)
  //       })
  //       .catch((err) => ErrorToast(err?.message))
  //   }

  const deleteProperty = (id: any) => {
    ApiDelete(`subcategory/delete-subcategory?id=${id}`)
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

  const approveProperty = (id: any) => {
    ApiPost(`superAdmin/updateProductStatus?id=${id}&status=Approved`)
      .then((res) => {
        SuccessToast(res?.data?.message)
        setFormData({})
        setShowCreateAppModal(false)
        building()
      })
      .catch((err) => ErrorToast(err.message))
  }
  const rejectProperty = (id: any) => {
    ApiPost(`superAdmin/updateProductStatus?id=${id}&status=Rejected`)
      .then((res) => {
        SuccessToast(res?.data?.message)
        setFormData({})
        setShowCreateAppModal(false)
        building()
      })
      .catch((err) => ErrorToast(err.message))
  }

  useEffect(() => {
    building()
  }, [status])

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
        <div className='app-container container-xxl d-flex flex-stack pt-3 mt-5'>
          <select
            className='form-select w-25'
            data-kt-select2='true'
            data-placeholder='Select option'
            data-dropdown-parent='#kt_menu_631f08e971923'
            data-allow-clear='true'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value='Approved'>Approved</option>
            <option value='Pending'>Pending</option>
            <option value='Rejected'>Rejected</option>
            {/* <option value='2'>In Process</option>
                    <option value='2'>Rejected</option> */}
          </select>
        </div>
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
                      <th className='text-center min-w-100px'>Image</th>

                      <th className='text-center min-w-100px'>Name</th>
                      <th className='text-center min-w-100px'>Furniture Category</th>
                      <th className='text-center min-w-100px'>Furniture Type</th>
                      <th className='text-center min-w-100px'>Material</th>
                      <th className='text-center min-w-100px'>price</th>
                      {/* <th className='text-center min-w-100px'>Role</th> */}

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
                                <td
                                  className='text-center'
                                  data-kt-ecommerce-order-filter='order_id'
                                >
                                                                      <span className='me-3'><img src={v?.image} alt="" style={{width:"50px",height:"50px"}} className="rounded" /></span>

                                </td>
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
                                  {v?.category?.name}
                                </td>
                                <td
                                  className='text-center'
                                  data-kt-ecommerce-order-filter='order_id'
                                >
                                  {v?.subCategory?.name}
                                </td>
                                <td className='text-center'>{v?.material || '-'}</td>
                                <td className='text-center'>{v?.price || '-'}₹</td>
                                {/* <td className='text-center'>{v?.role?.role || '-'}</td> */}
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

                            {status === 'Pending' && (
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
                                      onClick={() => viewBtnClick(v)}
                                      className='menu-link px-3'
                                    >
                                      View
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      href='#/action-1'
                                      onClick={() => {
                                        swal
                                          .fire({
                                            text: 'Are you sure you want Approve it?',
                                            icon: 'success',
                                            showConfirmButton: true,
                                            confirmButtonColor: '#D72852',
                                            confirmButtonText: 'Yes',
                                            showCancelButton: true,
                                            // cancelButtonColor: "transparent",
                                            cancelButtonText: 'Cancel',
                                          })
                                          .then((res) => {
                                            if (res.isConfirmed) {
                                              approveProperty(v?._id)
                                            }
                                          })
                                      }}
                                      className='menu-link px-3'
                                    >
                                      Approve
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      href='#/action-1'
                                      onClick={() => {
                                        swal
                                          .fire({
                                            text: 'Are you sure you want Reject it?',
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
                                              rejectProperty(v?._id)
                                            }
                                          })
                                      }}
                                      className='menu-link px-3'
                                    >
                                      Reject
                                    </Dropdown.Item>
                                    {/* <Dropdown.Item
                                    href='#/action-2'
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
                                    data-kt-ecommerce-order-filter='delete_row'
                                  >
                                    Delete{' '}
                                  </Dropdown.Item> */}
                                  </Dropdown.Menu>
                                </Dropdown>
                                {/* <a
                              className='btn btn-sm btn-light btn-active-light-primary text-hover-green'
                              data-kt-menu-trigger='click'
                              data-kt-menu-placement='bottom-end'
                            >
                              <span className='text-hover-green'>Actions</span>
                              <span className='svg-icon svg-icon-5 m-0 text-hover-green'>
                                <svg
                                  width='24'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z'
                                    fill='currentColor'
                                  />
                                </svg>
                              </span>
                            </a>
                            <div
                              className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4'
                              data-kt-menu='true'
                            >
                              <div className='menu-item px-3'>
                                <a
                                  onClick={() => {
                                    console.log('clicked')

                                    setUpdateDataId(v?._id)
                                    setIsEdit(true)
                                    setShowCreateAppModal(true)
                                  }}
                                  className='menu-link px-3'
                                >
                                  Edit
                                </a>
                              </div>
                              <div className='menu-item px-3'>
                                <a
                                  // onClick={() => deleteProperty(v?._id)}
                                  onClick={() => {
                                    swal
                                      .fire({
                                        text: 'Are you sure you want to permanently delete this building? Deleting this building will delete all the data registered under the building.',
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
                                  data-kt-ecommerce-order-filter='delete_row'
                                >
                                  Delete
                                </a>
                              </div>
                            </div> */}
                              </td>
                            )}
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
          <Modal.Title>Property Details</Modal.Title>
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
              <div className='col-md-5 fw-bold'>Furniture Category</div>
              <div className='col-md-7 text-capitalize'>{viewData?.category?.name}</div>
            </div>
            <div className='row py-2'>
              <div className='col-md-5 fw-bold'>Furniture Type</div>
              <div className='col-md-7 text-capitalize'>{viewData?.subCategory?.name}</div>
            </div>
            <div className='row py-2'>
              <div className='col-md-5 fw-bold'>Material</div>
              <div className='col-md-7 text-capitalize'>{viewData?.material || '-'}</div>
            </div>
            <div className='row py-2'>
              <div className='col-md-5 fw-bold'>Price</div>
              <div className='col-md-7 text-capitalize'>{viewData?.price || '-'}₹</div>
            </div>
            <div className='row py-2'>
              <div className='col-md-5 fw-bold'>Discount Price</div>
              <div className='col-md-7 text-capitalize'>{viewData?.discPrice || '-'}₹</div>
            </div>
            <div className='row py-2'>
              <div className='col-md-5 fw-bold'>Quantity</div>
              <div className='col-md-7 text-capitalize'>
                {viewData?.quantity}
              </div>
            </div>
            <div className='row py-2'>
              <div className='col-md-5 fw-bold'>Shipping Days</div>
              <div className='col-md-7 text-capitalize'>
                {viewData?.shippingDays  || '-'} Days
              </div>
            </div>
            <div className='row py-2'>
              <div className='col-md-5 fw-bold'>Size</div>
              <div className='col-md-7 text-capitalize'>
                {viewData?.size  || '-'} Inch
              </div>
            </div>
            <div className='row py-2'>
              <div className='col-md-5 fw-bold'>Discription</div>
              <div className='col-md-7 text-capitalize'>{viewData?.desc || '-'}</div>
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

export default Product
