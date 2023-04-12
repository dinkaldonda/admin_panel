import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ApiDelete, ApiGet, ApiPost, ApiPut} from '../../../apiCommon/helpers/API/ApiData'
import {ErrorToast, SuccessToast} from '../../../apiCommon/helpers/Toast'
import AddArea from './AddArea'
import swal from 'sweetalert2'
import {TbChevronDown} from 'react-icons/tb'
import AddAreaCom from './AddAreaCom'
import {Col, Dropdown, Row} from 'react-bootstrap'
import noData from '../../../img/NoData1.svg'

const AreaCom = () => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [tableData, setTableData] = useState([])
  const [type, setType] = useState(0)
  const [updateDataId, setUpdateDataId] = useState('')
  const [info, setInfo] = useState<any>([])
  const [unit, setUnit] = useState<any>('0')
  const [page, setPage] = useState<any>(1)
  const [pageLimit, setPageLimit] = useState<any>(1)
  console.log('🚀 ~ file: Building.tsx ~ line 10 ~ Building ~ updateDataId', updateDataId)
  const [isEdit, setIsEdit] = useState(false)
  console.log('🚀 ~ file: Building.tsx ~ line 12 ~ Building ~ isEdit', isEdit)
  const [formData, setFormData] = useState<any>({
    // propertyId: window.location.pathname?.split('/')[2],
  })
  console.log('formData', formData)

  const handleChnage = (e: any) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }
  console.log('typeeeee', type)

  const building = async () => {
    const body = {
      page: page,
      limit: 1000,
      search: '',
      // propertyId: window.location.pathname?.split('/')[2],
      communityId: window.location.pathname?.split('/')[2],
    }
    await ApiPost(`cooperate/cluster/get`, body)
      .then((res) => {
        setTableData(res?.data?.data?.cluster_data)
        setPageLimit(res?.data?.data?.state?.page_limit)
        console.log('res', res)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const editBtn = (id: any) => {
    setUpdateDataId(id)
    setIsEdit(true)
    setShowCreateAppModal(true)
    ApiGet(`cooperate/cluster/${id}`)
      .then((res) => {
        console.log('res', res?.data?.data[0])
        setFormData(res?.data?.data[0])
      })
      .catch((err) => console.log('err', err))
  }

  const deleteProperty = (id: any) => {
    console.log('deleteProperty', id)
    ApiDelete(`cooperate/cluster/${id}`)
      .then((res: any) => {
        SuccessToast(res?.data?.message)
        building()
      })
      .catch((err) => ErrorToast(err.message))
  }
  const handleSubmit = () => {
    console.log('formData?.totalBuildings', formData?.totalUnits);
    if (isEdit) {
      delete formData._id
      delete formData.updatedBy
      delete formData.status
      //   const body = {...formData, managerId: '6329ee43396e812bcc0964e5', id: updateDataId}
      const body = {
        id: updateDataId,
        // ...formData,
        managerId: 'max',
        name: formData?.name,
        totalBuildings: formData?.totalBuildings,
        type: type,
        communityId: window.location.pathname?.split('/')[2],
        totalUnits : formData?.totalUnits
      }
      console.log('body', body)
      ApiPut('cooperate/cluster', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building()
          setIsEdit(false)
          console.log('addProperty', res)
          setShowCreateAppModal(false)
          setFormData({propertyId: window.location.pathname?.split('/')[2]})
        })
        .catch((err) => ErrorToast(err.message))
    } else {
      const body = {
        ...formData,
        managerId: 'max',
        type: type,
        communityId: window.location.pathname?.split('/')[2],
      }
      ApiPost('cooperate/cluster', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building()
          getArea()
          console.log('addProperty', res)
          setShowCreateAppModal(false)
          setFormData({})
          // setFormData({propertyId: window.location.pathname?.split('/')[2]})
        })
        .catch((err) => ErrorToast(err.message))
    }
  }
  const getArea = () => {
    const id = window.location.pathname?.split('/')[2]
    ApiGet(`cooperate/communities/${id}`)
      .then((res) => {
        console.log('res', res?.data?.data)
        setInfo(res?.data?.data)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  useEffect(() => {
    building()
    getArea()

    if (isEdit) {
      ApiGet(`cooperate/properties_area/${updateDataId}`)
        .then((response) => {
          console.log('response', response)
          setFormData(response?.data?.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [isEdit, page])

  const navigate = useNavigate()
  return (
    <>
      <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
        {/* <div className='d-flex flex-column flex-column-fluid'> */}
        {/* <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'> */}
        <div id='' className='app-container container-xxl d-flex flex-stack pt-0 mt-0'>
          {/* <div className='page-title d-flex flex-column justify-content-center flex-wrap me-3'>
            <h1 className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0'>
              Property Registration
            </h1>
          </div> */}
        </div>
        {/* </div> */}
        <div id='kt_app_content' className='app-content flex-column-fluid'>
          <div id='kt_app_content_container' className='app-container container-xxl'>
            <div className='d-flex align-items-center flex-wrap mr-1'>
              <div className='d-flex align-items-baseline flex-wrap mr-5'>
                <ul className='breadcrumb breadcrumb-transparent breadcrumb-line font-weight-bold p-0 my-2 font-size-sm'>
                  <li className='breadcrumb-item '>
                    <a
                      className='text-muted px-2 cursor-pointer'
                      onClick={() => navigate('/dashboard')}
                    >
                      Manage Properties
                    </a>
                  </li>
                  <li className='breadcrumb-item '>
                    <a
                      className='text-muted px-2 cursor-pointer'
                      onClick={() => navigate('/community')}
                    >
                      Communities
                    </a>
                  </li>
                  <li className='breadcrumb-item '>
                    <a
                      className='text-muted px-2 cursor-pointer text-uppercase'
                      // onClick={() => navigate('/building')}
                    >
                      {info[0]?.name}
                    </a>
                  </li>
                  <li className='breadcrumb-item  active'>
                    <a className='px-2'>Clusters</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='card card-flush'>
              <Row>
                <Col md={5}>
                  <div className=' container  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap'></div>
                  <div className='container  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap mt-5'>
                    <h2>Clusters</h2>
                  </div>
                  <div className='container  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap mt-5'>
                    <h5 className='text-muted'>
                      Community{' '}
                      <span className='fw-semibold mx-5 text-uppercase' style={{color: 'black'}}>
                        {info[0]?.name}
                      </span>
                    </h5>
                  </div>
                  <div className='container  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap'>
                    <div className='d-flex align-items-center gap-2 gap-lg-3 my-7'>
                      <a
                        onClick={() => setShowCreateAppModal(true)}
                        className='btn btn-sm fw-bold btn-primary btn-green'
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_create_app'
                      >
                        Add Cluster
                      </a>
                    </div>
                  </div>
                </Col>
                <Col md={7} className='m-auto'>
                  <div
                    className='card-header align-items-center py-5  gap-md-2 d-flex border-0'
                    style={{justifyContent: 'end', flexWrap: 'wrap'}}
                  >
                    <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                      <h6 className='mx-10 text-muted'>
                        Units Clusters{' '}
                        <span className='mx-1' style={{color: 'black'}}>
                          {info[0]?.unitClusters}
                        </span>
                      </h6>
                    </div>
                    <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                      <h6 className='mx-10 text-muted'>
                        Building Clusters{' '}
                        <span className='mx-1' style={{color: 'black'}}>
                          {info[0]?.buildingClusters}
                        </span>
                      </h6>
                    </div>
                    <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                      <h6 className='mx-10 text-muted'>
                        Mixed Clusters{' '}
                        <span className='mx-1' style={{color: 'black'}}>
                          {info[0]?.mixedClusters}
                        </span>
                      </h6>
                    </div>
                    {/* <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                      <h6 className='mx-10 text-muted'>
                        City{' '}
                        <span className='mx-1' style={{color: 'black'}}>
                          {info[0]?.city}
                        </span>
                      </h6>
                    </div>
                    <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                      <h6 className='mx-10 text-muted'>
                        Area{' '}
                        <span className='mx-1' style={{color: 'black'}}>
                          {info[0]?.area}
                        </span>
                      </h6>
                    </div>
                    <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                      <h6 className='mx-10 text-muted'>
                        Street{' '}
                        <span className='mx-1' style={{color: 'black'}}>
                          {info[0]?.street}
                        </span>
                      </h6>
                    </div> */}
                    <div className='  min-w-200px'>
                      <h6 className='mx-10 text-muted'>
                        Community Manager{' '}
                        <span className='mx-1' style={{color: 'black'}}>
                          {info[0]?.managerId}
                        </span>
                      </h6>
                    </div>
                  </div>
                  {/* <div
                    className='card-header align-items-center py-5  gap-md-2 d-flex'
                    style={{justifyContent: 'end'}}
                  >
                    <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                      <h6 className='gray-500 mx-10'>
                        Buildings : <span className='fw-semibold'></span>
                      </h6>
                    </div>
                    <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                      <h5 className='gray-500 mx-10'>
                        Communities : <span className='fw-semibold'></span>
                      </h5>
                    </div>
                    <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                      <h5 className='gray-500 mx-10'>
                        Units : <span className='fw-semibold'></span>
                      </h5>
                    </div>
                  </div> */}
                </Col>
              </Row>
            </div>
            <div className='card-body pt-0 table-responsive mt-5'>
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
                    <th className='text-center min-w-100px'>Cluster Type </th>
                    <th className='text-center min-w-100px'>Cluster Name</th>
                    <th className='text-center min-w-100px'>Total Units</th>
                    <th className='text-center min-w-100px'></th>

                    <th className='text-end min-w-100px'></th>
                  </tr>
                </thead>
                <tbody className='fw-semibold text-gray-800'>
                  {tableData?.length ? (
                    tableData?.map((v: any, i: any) => {
                      return (
                        <tr>
                          {/* <td>
                        <div className='form-check form-check-sm form-check-custom form-check-solid'>
                          <input className='form-check-input' type='checkbox' value='1' />
                        </div>
                      </td> */}
                          <td className='text-center'>{i + 1}</td>
                          <td data-kt-ecommerce-order-filter='order_id' className='text-center'>
                            {v?.type === 0
                              ? 'Units Cluster'
                              : v?.type === 1
                              ? 'Building Cluster'
                              : 'Mixed Cluster'}
                          </td>
                          <td className='text-center'>{v?.name}</td>
                          <td className='text-center'>{v?.totalUnits}</td>
                          <td className='text-center'>
                            {v?.type === 0 ? (
                              <a
                                onClick={() =>
                                  navigate(
                                    `/unitscom/${window.location.pathname?.split('/')[2]}/${v?._id}`
                                  )
                                }
                                className='btn btn-sm fw-bold btn-primary btn-green'
                                style={{width: '122px'}}
                              >
                                Units
                              </a>
                            ) : v?.type === 1 ? (
                              <a
                                onClick={() =>
                                  navigate(
                                    `/buildingcluster/${window.location.pathname?.split('/')[2]}/${
                                      v?._id
                                    }`
                                  )
                                }
                                className='btn btn-sm fw-bold btn-primary btn-green'
                                // style={{color: '#15ac8e', cursor: 'pointer'}}
                                style={{width: '122px'}}
                              >
                                Buildings
                              </a>
                            ) : (
                              <a
                                onClick={() =>
                                  navigate(
                                    `/unitsmcom/${window.location.pathname?.split('/')[2]}/${
                                      v?._id
                                    }`
                                  )
                                }
                                className='btn btn-sm fw-bold btn-primary btn-green'
                                // style={{color: '#15ac8e', cursor: 'pointer'}}
                                style={{width: '122px'}}
                              >
                                Mixed Clusters
                              </a>
                            )}
                          </td>

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
                                  // onClick={() => {
                                  //   console.log('clicked')

                                  //   setUpdateDataId(v?._id)
                                  //   setIsEdit(true)
                                  //   setShowCreateAppModal(true)
                                  // {v?.type === 0
                                  //   ? 'Units Cluster'
                                  //   : v?.type === 1
                                  //   ? 'Building Cluster'
                                  //   : 'Mixed Cluster'}
                                  // }}
                                  onClick={() => {
                                    setUnit(v?.type === 0 ? '0' : v?.type === 1 ? '1' : '2')
                                    editBtn(v?._id)
                                  }}
                                  className='menu-link px-3'
                                >
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  href='#/action-2'
                                  onClick={() => {
                                    swal
                                      .fire({
                                        text: 'Are you sure you want to permanently delete this cluster? Deleting this cluster will delete all the data registered under the cluster.',
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
                                </Dropdown.Item>
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
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className='text-center'>
                        <img src={noData} alt='' width={350} />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className='row'>
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
                      {pageLimit >= 2 && <li className={`paginate_button page-item + ${page === 2 ? 'active' : ''}`}>
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
                      </li>}
                      {pageLimit >= 3 && <li className={`paginate_button page-item + ${page === 3 ? 'active' : ''}`}>
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
                      </li>}
                      {pageLimit >= 4 && <li className={`paginate_button page-item + ${page === 4 ? 'active' : ''}`}>
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
                      </li>}
                      {pageLimit >= 5 && <li className={`paginate_button page-item + ${page === 5 ? 'active' : ''}`}>
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
                      </li>}
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
        {/* </div> */}
      </div>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'Property Management '})}</PageTitle>
      <DashboardPage /> */}
      <AddAreaCom
        show={showCreateAppModal}
        handleClose={() => setShowCreateAppModal(false)}
        building={building}
        unit={unit}
        setUnit={setUnit}
        updateDataId={updateDataId}
        setType={setType}
        isEdit={isEdit}
        formData={formData}
        handleSubmit={handleSubmit}
        handleChnage={handleChnage}
      />
    </>
  )
}

export default AreaCom
