import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ApiDelete, ApiGet, ApiPost, ApiPut} from '../../../apiCommon/helpers/API/ApiData'
import {ErrorToast, SuccessToast} from '../../../apiCommon/helpers/Toast'
import AddArea from './AddArea'
import swal from 'sweetalert2'
import Card1 from './card'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {setUserInfo} from '../../../apiCommon/utils/user.util'
import update from 'immutability-helper'
import {Col, Row} from 'react-bootstrap'

const style = {
  width: '100 %',
}
const Area = () => {
  const [showCreateAppModal, setShowCreateAppModal] = useState(false)
  const [tableData, setTableData] = useState([])
  const [updateDataId, setUpdateDataId] = useState('')
  const [info, setInfo] = useState([])
  console.log('info', info)
  console.log('🚀 ~ file: Building.tsx ~ line 10 ~ Building ~ updateDataId', updateDataId)
  const [isEdit, setIsEdit] = useState(false)
  console.log('🚀 ~ file: Building.tsx ~ line 12 ~ Building ~ isEdit', isEdit)
  const [formData, setFormData] = useState({
    propertyId: window.location.pathname?.split('/')[2],
  })
  console.log('formData', formData)

  const handleChnage = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const building = async () => {
    const body = {
      // propertyId: window.location.pathname?.split('/')[2],
      // isBuilding: false,
      page: 1,
      limit: 1000,
      buildingId: window.location.pathname?.split('/')[2],
    }
    await ApiPost(`cooperate/floor/get`, body)
      .then((res) => {
        setTableData(res?.data?.data?.floor_data)
        console.log('res', res)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const moveCard = (dragIndex, hoverIndex) => {
    console.log(dragIndex, hoverIndex)
    const dragCard = tableData[dragIndex]
    console.log(dragCard, 'ccd')
    console.log(dragIndex, 'cxv')
    console.log(hoverIndex, 'cxvcxv')
    const body = {
      propertyAreaId: dragCard._id,
      index: hoverIndex + 1,
    }
    ApiPost('cooperate/floor/set_sequence', body)
      .then((res) => {
        console.log(res)

        setTableData(
          update(tableData, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          })
        )
      })
      .catch((err) => {
        console.log('Error')
      })
  }
  const deleteProperty = (id) => {
    console.log('deleteProperty', id)
    ApiDelete(`cooperate/floor/${id}`)
      .then((res) => {
        SuccessToast(res?.data?.message)
        building()
        getArea()
      })
      .catch((err) => ErrorToast(err.message))
  }
  const handleSubmit = () => {
    if (isEdit) {
      delete formData._id
      delete formData.updatedBy
      delete formData.status
      // const body = {...formData, managerId: '6329ee43396e812bcc0964e5', id: updateDataId}
      const body = {
        id: updateDataId,
        name: formData?.name,
        totalProperties: formData?.totalProperties,
        managerId: '6329ee43396e812bcc0964e5',
        buildingId: formData?.propertyId,
      }
      ApiPut('cooperate/floor', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building()
          getArea()
          setIsEdit(false)
          console.log('addProperty', res)
          setShowCreateAppModal(false)
          // setFormData({propertyId: window.location.pathname?.split('/')[2]})
        })
        .catch((err) => ErrorToast(err.message))
    } else {
      // const body = {...formData, managerId: '6329ee43396e812bcc0964e5'}
      const body = {
        name: formData?.name,
        areaType: 'floor',
        managerId: 'John',
        buildingId: formData?.propertyId,
      }
      ApiPost('cooperate/floor', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building()
          getArea()
          console.log('addProperty', res)
          setShowCreateAppModal(false)
          // setFormData({propertyId: window.location.pathname?.split('/')[2]})
        })
        .catch((err) => ErrorToast(err.message))
    }
  }
  const getArea = () => {
    const id = window.location.pathname?.split('/')[2]
    ApiGet(`cooperate/building/${id}`)
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
      ApiGet(`cooperate/floor/${updateDataId}`)
        .then((response) => {
          console.log('response', response)
          setFormData(response?.data?.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [isEdit, formData])

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
          {/* <div className='d-flex align-items-center gap-2 gap-lg-3'>
            <a
              onClick={() => setShowCreateAppModal(true)}
              className='btn btn-sm fw-bold btn-primary btn-green'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_create_app'
            >
              Add Floor
            </a>
          </div> */}
        </div>
        {/* </div> */}
        <div id='kt_app_content' className='app-content flex-column-fluid'>
          <div id='kt_app_content_container' className='app-container container-xxl'>
            {/* <div className='card-header align-items-center py-5 gap-2 gap-md-5'>
                <div
                  className='card-header align-items-center py-5  gap-md-2'
                >
                  <div className='mb-5  min-w-200px'>
                    <h5 className='border text-center p-5'>
                      Building Name: <span className='fw-semibold'>{info?.name}</span>
                    </h5>
                  </div>
                  <div className='mb-5  min-w-200px'>
                    <h5 className='border text-center p-5'>
                      Total Floor: <span className='fw-semibold'>{info?.totalFloors}</span>
                    </h5>
                  </div>
                  <div className='mb-5  min-w-200px'>
                    <h5 className='border text-center p-5'>
                      Total Properties: <span className='fw-semibold'>{info?.totalProperties}</span>
                    </h5>
                  </div>
                  <div className='mb-5  min-w-200px'>
                    <h5 className='border text-center p-5'>
                      City: <span className='fw-semibold'>{info?.city}</span>
                    </h5>
                  </div>
                  <div className='mb-5 min-w-200px'>
                    <h5 className='border text-center p-5'>
                      Area: <span className='fw-semibold'>{info?.area}</span>
                    </h5>
                  </div>
                  <div className='mb-5  min-w-200px'>
                    <h5 className='border text-center p-5'>
                      Street: <span className='fw-semibold'>{info?.street}</span>
                    </h5>
                  </div>
                  <div className='mb-5  min-w-200px'>
                    <h5 className='border text-center p-5'>
                      Building Manager: <span className='fw-semibold'>{info?.managerId}</span>
                    </h5>
                  </div>
                </div>
              </div> */}
            <div className='d-flex align-items-center flex-wrap mr-1 '>
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
                      onClick={() => navigate('/building')}
                    >
                      Communities
                    </a>
                  </li>
                  {/* <li className='breadcrumb-item '>
                            <a
                              className='text-muted px-2 cursor-pointer text-uppercase'
                              // onClick={() => navigate('/building')}
                            >
                              Clusters
                            </a>
                          </li> */}
                  <li className='breadcrumb-item '>
                    <a className='text-muted px-2 cursor-pointer'>Buildings</a>
                  </li>
                  <li className='breadcrumb-item active'>
                    <a className='px-2'>Floor</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='card card-flush mt-8'>
              <Row>
                <Col md={5}>
                  <div className=' container  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap '></div>
                  <div className='container  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap mt-5'>
                    <h2>Cluster</h2>
                  </div>
                  {/* <div className='container  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap mt-5'>
                    <h5 className='text-muted'>
                      Community{' '}
                      <span className='fw-semibold mx-5 text-uppercase' style={{color: 'black'}}>
                        {info[0]?.name}
                      </span>
                    </h5>
                  </div> */}
                  <div className='container  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap'>
                    <div className='d-flex align-items-center gap-2 gap-lg-3 my-7'>
                      <a
                        onClick={() => setShowCreateAppModal(true)}
                        className='btn btn-sm fw-bold btn-primary btn-green'
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_create_app'
                      >
                        Add Floor
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
                        Building Name{' '}
                        <span className='mx-1' style={{color: 'black'}}>
                          {info?.name}
                        </span>
                      </h6>
                    </div>
                    <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                      <h6 className='mx-10 text-muted'>
                        Total Floor{' '}
                        <span className='mx-1' style={{color: 'black'}}>
                          {info?.totalFloors}
                        </span>
                      </h6>
                    </div>
                    <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                      <h6 className='mx-10 text-muted'>
                        Total Properties{' '}
                        <span className='mx-1' style={{color: 'black'}}>
                          {info?.totalProperties}
                        </span>
                      </h6>
                    </div>
                    <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                      <h6 className='mx-10 text-muted'>
                        City{' '}
                        <span className='mx-1' style={{color: 'black'}}>
                          {info?.city}
                        </span>
                      </h6>
                    </div>
                    <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                      <h6 className='mx-10 text-muted'>
                        Area{' '}
                        <span className='mx-1' style={{color: 'black'}}>
                          {info?.area}
                        </span>
                      </h6>
                    </div>
                    <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                      <h6 className='mx-10 text-muted'>
                        Street{' '}
                        <span className='mx-1' style={{color: 'black'}}>
                          {info?.street}
                        </span>
                      </h6>
                    </div>
                    <div className='  min-w-200px'>
                      <h6 className='mx-10 text-muted'>
                        Community Manager{' '}
                        <span className='mx-1' style={{color: 'black'}}>
                          {info?.managerId}
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
            <div className='card card-flush mt-10'>
              <div className='card-body pt-0 table-responsive'>
                <table
                  className='table align-middle table-row-dashed fs-6 gy-5'
                  id='kt_ecommerce_sales_table'
                >
                  <thead>
                    <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                      <th className='text-center min-w-100px'>#</th>
                      <th className='text-center min-w-100px'>FLOORS NAME </th>
                      <th className='text-center min-w-100px'>TOTAL PROPERTIES</th>
                      <th className='text-center min-w-100px'></th>

                      <th className='text-end min-w-100px'></th>
                    </tr>
                  </thead>

                  {/* <tbody className='fw-semibold text-gray-600'>
                    {tableData?.map((v) => {
                      return (
                        <tr>
                          
                          <td data-kt-ecommerce-order-filter='order_id'>{v?.name}</td>
                          <td className='text-center'>{v?.totalProperties}</td>
                          <td className='text-center'>
                            <a
                              onClick={() =>
                                navigate(
                                  `/units/${window.location.pathname?.split('/')[2]}/${v?._id}`
                                )
                              }
                              className='btn btn-sm fw-bold btn-primary btn-green'
                            >
                              Units
                            </a>
                          </td>

                          <td className='text-end'>
                            <a
                              className='btn btn-sm btn-light btn-active-light-primary'
                              data-kt-menu-trigger='click'
                              data-kt-menu-placement='bottom-end'
                            >
                              Actions
                              <span className='svg-icon svg-icon-5 m-0'>
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
                                 
                                  onClick={() => {
                                    swal
                                      .fire({
                                        text: ' Are you sure you want to permanently delete this property?  Deleting this property will delete all the data belonging to the property.',
                                        icon: 'warning',
                                        showConfirmButton: true,
                                        confirmButtonColor: '#D72852',
                                        confirmButtonText: 'Yes',
                                        showCancelButton: true,
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
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody> */}
                </table>
                <DndProvider backend={HTML5Backend}>
                  <div lg='10' md='10' sm='10' style={style}>
                    {console.log(tableData)}
                    {tableData.map((card, i) => (
                      <Card1
                        key={card._id}
                        index={i}
                        id={card._id}
                        text={card.name}
                        text1={card.totalProperties}
                        path={card.image}
                        moveCard={moveCard}
                        building={building}
                      />
                    ))}
                  </div>
                </DndProvider>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'Property Management '})}</PageTitle>
      <DashboardPage /> */}
      <AddArea
        show={showCreateAppModal}
        handleClose={() => setShowCreateAppModal(false)}
        building={building}
        updateDataId={updateDataId}
        isEdit={isEdit}
        formData={formData}
        handleSubmit={handleSubmit}
        handleChnage={handleChnage}
      />
    </>
  )
}

export default Area
