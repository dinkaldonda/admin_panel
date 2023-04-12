import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ApiDelete, ApiGet, ApiPost, ApiPut} from '../../../apiCommon/helpers/API/ApiData'
import {ErrorToast, SuccessToast} from '../../../apiCommon/helpers/Toast'
import {CreateAppModal} from '../../../_metronic/partials'
import swal from 'sweetalert2'
import AddBuilding from './AddBuilding'
import {TbChevronDown} from 'react-icons/tb'
import {KTSVG} from '../../../_metronic/helpers'
import noData from '../../../img/NoData1.svg'
import {Dropdown} from 'react-bootstrap'

const Community = () => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [tableData, setTableData] = useState([])
  const [updateDataId, setUpdateDataId] = useState('')
  const [propertiType, setPropertiType] = useState('Communities')
  const [show, setShow] = useState(false)
  const [showCom, setShowCom] = useState(false)
  const [page, setPage] = useState(1)
  const [pageLimit, setPageLimit] = useState<any>(1)
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

  const building = async (a: any, b: any) => {
    if (propertiType === 'Buildings') {
      const body = {
        page: page,
        limit: 100,
        type: 0,
      }
      await ApiPost('cooperate/building/get', body)
        .then((res) => {
          setTableData(res?.data?.data?.building_data)
          setPageLimit(res?.data?.data?.state?.page_limit)
          console.log('res', res)
          // setFormData({
          //   portfolioType: a,
          //   portfolio: b,
          // })
        })
        .catch((e) => {
          console.log(e)
        })
    }
    if (propertiType === 'Communities') {
      const body = {
        page: page,
        limit: 100,
      }
      await ApiPost('cooperate/communities/get', body)
        .then((res) => {
          setTableData(res?.data?.data?.communities_data)
          console.log('res', res)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  const deleteProperty = (id: any) => {
    console.log('deleteProperty', id)
    if (propertiType === 'Buildings') {
      ApiDelete(`cooperate/building/${id}`)
        .then((res: any) => {
          SuccessToast(res?.data?.message)
          building(formData?.portfolioType, formData?.portfolio)
        })

        .catch((err) => ErrorToast(err.message))
    } else {
      ApiDelete(`cooperate/communities/${id}`)
        .then((res: any) => {
          SuccessToast(res?.data?.message)
          building(formData?.portfolioType, formData?.portfolio)
        })

        .catch((err) => ErrorToast(err.message))
    }
  }

  const editBtn = (id: any) => {
    setUpdateDataId(id)
    setIsEdit(true)
    setShowCreateAppModal(true)
    ApiGet(`cooperate/communities/${id}`)
      .then((res) => {
        console.log('res', res?.data?.data[0])
        setFormData(res?.data?.data[0])
      })
      .catch((err) => console.log('err', err))
  }

  const handleSubmit = () => {
    if (isEdit) {
      delete formData._id
      delete formData.updatedBy
      delete formData.status
      if (propertiType === 'Buildings') {
        const body = {...formData, managerId: formData?.managerId, id: updateDataId}
        ApiPut('cooperate/properties', body)
          .then((res) => {
            SuccessToast(res?.data?.message)
            building(formData?.portfolioType, formData?.portfolio)
            setIsEdit(false)
            console.log('addProperty', res)
            setShowCreateAppModal(false)
            setFormData({
              portfolioType: formData?.portfolioType,
              portfolio: formData.portfolio,
            })
          })
          .catch((err) => ErrorToast(err.message))
      } else {
        const body = {
          name: formData?.name,
          city: formData?.city,
          street: formData?.street,
          area: formData?.area,
          totalFloors: 0,
          totalClusters: 0,
          unitClusters: formData?.totalZones,
          buildingClusters: formData?.totalBuildings,
          mixedClusters: 0,
          managerId: formData?.managerId,
          id: updateDataId,
        }
        ApiPut('cooperate/communities', body)
          .then((res) => {
            SuccessToast(res?.data?.message)
            building(formData?.portfolioType, formData?.portfolio)
            setIsEdit(false)
            console.log('addProperty', res)
            setShowCreateAppModal(false)
            setFormData({
              portfolioType: formData?.portfolioType,
              portfolio: formData.portfolio,
            })
          })
          .catch((err) => ErrorToast(err.message))
      }
    } else {
      if (propertiType === 'Buildings') {
        // const body = {...formData, managerId: formData?.managerId}
        const body = {
          name: formData?.name,
          managerId: formData?.managerId,
          type: 0,
          totalFloors: formData?.totalFloors,
          city: formData?.city,
          street: formData?.street,
          area: formData?.area,
        }
        ApiPost('cooperate/building', body)
          .then((res) => {
            SuccessToast(res?.data?.message)
            building(formData?.portfolioType, formData?.portfolio)
            console.log('addProperty', res)
            setShowCreateAppModal(false)
            setFormData({
              portfolioType: formData?.portfolioType,
              portfolio: formData.portfolio,
            })
          })
          .catch((err) => ErrorToast(err.message))
      } else {
        // const body = {...formData, managerId: formData?.managerId}
        const body = {
          name: formData?.name,
          city: formData?.city,
          street: formData?.street,
          area: formData?.area,
          totalFloors: 0,
          totalClusters: 0,
          unitClusters: formData?.totalZones,
          buildingClusters: formData?.totalBuildings,
          mixedClusters: 0,
          managerId: formData?.managerId,
        }
        console.log('body', body)
        ApiPost('cooperate/communities', body)
          .then((res) => {
            SuccessToast(res?.data?.message)
            building(formData?.portfolioType, formData?.portfolio)
            console.log('addProperty', res)
            setShowCreateAppModal(false)
            setFormData({
              portfolioType: formData?.portfolioType,
              portfolio: formData.portfolio,
            })
          })
          .catch((err) => ErrorToast(err.message))
      }
    }
  }
  const handleSubmitCom = () => {
    if (isEdit) {
      delete formData._id
      delete formData.updatedBy
      delete formData.status
      const body = {...formData, managerId: '6329ee43396e812bcc0964e5', id: updateDataId}
      ApiPut('cooperate/properties', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building(formData?.portfolioType, formData?.portfolio)
          setIsEdit(false)
          console.log('addProperty', res)
          setShowCreateAppModal(false)
          setFormData({
            portfolioType: formData?.portfolioType,
            portfolio: formData.portfolio,
          })
        })
        .catch((err) => ErrorToast(err.message))
    } else {
      // const body = {...formData, managerId: '6329ee43396e812bcc0964e5'}
      const body = {
        portfolioType: formData?.portfolioType,
        portfolio: formData?.portfolio,
        name: formData?.name,
        city: formData?.city,
        location: formData?.location,
        street: formData?.street,
        totalZones: formData?.totalZones,
        totalBuildings: formData?.totalBuildings,
        managerId: '632aa52cacdb90269c4655d5',
      }
      console.log('formData', formData)
      ApiPost('cooperate/properties', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building(formData?.portfolioType, formData?.portfolio)
          console.log('addProperty', res)
          setShowCreateAppModal(false)
          setFormData({
            portfolioType: formData?.portfolioType,
            portfolio: formData.portfolio,
          })
        })
        .catch((err) => ErrorToast(err.message))
    }
  }

  useEffect(() => {
    building(page, limit)
  }, [propertiType, page])

  useEffect(() => {
    building(page, limit)

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
            <ul className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2'>
              <li className='nav-item'>
                <h1
                  className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0 me-15'
                  style={{padding: '0.5rem 0'}}
                >
                  Developments
                </h1>
              </li>
              <li
                className='nav-item'
                style={{fontSize: '15px'}}
                onClick={() => {
                  setFormData({...formData, portfolio: 'building'})
                  building(formData?.portfolioType, 'building')
                  navigate('/building')
                }}
              >
                <a
                  className='nav-link text-active-primary pb-4  cursor-pointer'
                  data-bs-toggle='tab'
                >
                  Buildings
                </a>
              </li>
              <li
                className='nav-item '
                style={{fontSize: '15px'}}
                onClick={() => {
                  setFormData({...formData, portfolio: 'communities'})
                  building(formData?.portfolioType, 'communities')
                  navigate('/Community')
                }}
              >
                <a
                  className='nav-link text-active-primary pb-4 cursor-pointer active'
                  data-bs-toggle='tab'
                >
                  Communities
                </a>
              </li>
            </ul>
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

          <div className='d-flex align-items-center gap-2 gap-lg-3'>
            <div className=''>
              <div className='form-check form-check-custom form-check-solid form-check-sm'>
                <input
                  className='form-check-input'
                  type='radio'
                  value='residential'
                  id='residential'
                  name='portfolioType'
                  checked={formData?.portfolioType == 'residential'}
                  onChange={() => {
                    setFormData({...formData, portfolioType: 'residential'})
                    building('residential', formData?.portfolio)
                  }}
                />
                <label className='form-check-label' htmlFor='residential'>
                  Residential
                </label>
              </div>
            </div>
            <div className=''>
              <div className='form-check form-check-custom form-check-solid form-check-sm'>
                <input
                  className='form-check-input'
                  type='radio'
                  value='commercial'
                  id='commercial'
                  name='portfolioType'
                  checked={formData?.portfolioType == 'commercial'}
                  onChange={() => {
                    setFormData({...formData, portfolioType: 'commercial'})
                    building('commercial', formData?.portfolio)
                  }}
                />
                <label className='form-check-label' htmlFor='commercial'>
                  Commercial
                </label>
              </div>
            </div>
            {/* <a
              onClick={() => setShowCreateAppModal(true)}
              className='btn btn-sm fw-bold btn-primary btn-green'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_create_app'
            >
              Add Building
            </a> */}
          </div>
        </div>
        {/* </div> */}
        {propertiType === 'Buildings' && (
          <div className='app-container container-xxl d-flex flex-stack pt-3 mt-5'>
            <a
              className='btn btn-sm fw-bold btn-primary btn-green'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_create_app'
              onClick={() => {
                setShowCreateAppModal(true)
              }}
            >
              Add Building
            </a>
          </div>
        )}
        {propertiType === 'Communities' && (
          <div className='app-container container-xxl d-flex flex-stack pt-3 mt-5'>
            <a
              className='btn btn-sm fw-bold btn-primary btn-green'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_create_app'
              onClick={() => {
                setShowCreateAppModal(true)
              }}
            >
              Add Community
            </a>
          </div>
        )}
        <div id='kt_app_content' className='app-content flex-column-fluid pt-0'>
          <div id='kt_app_content_container' className='app-container container-xxl'>
            <div className='card card-flush mb-10'>
              {show && propertiType === 'Buildings' && (
                <>
                  <h3 className='m-9'>ADD NEW BUILDINGS</h3>
                  <div
                    className='card-header align-items-center gap-md-2 image-none'
                    style={{justifyContent: 'flex-start'}}
                  >
                    <div className='mb-10  min-w-200px mx-10'>
                      <label className='form-label fw-semibold'>Building Name:</label>
                      <div>
                        <input
                          className='form-select form-select-solid'
                          type='text'
                          // data-kt-select2='true'
                          // data-placeholder='Select option'
                          // data-dropdown-parent='#kt_menu_631f08e971923'
                          // data-allow-clear='true'
                          name='name'
                          value={formData?.name}
                          onChange={handleChnage}
                        />
                      </div>
                    </div>
                    <div className='mb-10  min-w-200px mx-10'>
                      <label className='form-label fw-semibold'>Total Floor</label>
                      <div>
                        <input
                          className='form-select form-select-solid'
                          type='text'
                          data-kt-select2='true'
                          data-placeholder='Select option'
                          data-dropdown-parent='#kt_menu_631f08e971923'
                          data-allow-clear='true'
                          name='totalFloors'
                          value={formData?.totalFloors}
                          onChange={handleChnage}
                        />
                      </div>
                    </div>
                    <div className='mb-10  min-w-200px mx-10'>
                      <label className='form-label fw-semibold'>City</label>
                      <div>
                        <input
                          className='form-select form-select-solid'
                          type='text'
                          data-kt-select2='true'
                          data-placeholder='Select option'
                          data-dropdown-parent='#kt_menu_631f08e971923'
                          data-allow-clear='true'
                          name='city'
                          value={formData?.city}
                          onChange={handleChnage}
                        />
                      </div>
                    </div>
                    <div className='mb-10  min-w-200px mx-10'>
                      <label className='form-label fw-semibold'>Location</label>
                      <div>
                        <input
                          className='form-select form-select-solid'
                          type='text'
                          data-kt-select2='true'
                          data-placeholder='Select option'
                          data-dropdown-parent='#kt_menu_631f08e971923'
                          data-allow-clear='true'
                          name='location'
                          value={formData?.location}
                          onChange={handleChnage}
                        />
                      </div>
                    </div>
                    <div className='mb-10  min-w-200px mx-10'>
                      <label className='form-label fw-semibold'>Street</label>
                      <div>
                        <input
                          className='form-select form-select-solid'
                          type='text'
                          data-kt-select2='true'
                          data-placeholder='Select option'
                          data-dropdown-parent='#kt_menu_631f08e971923'
                          data-allow-clear='true'
                          name='street'
                          value={formData?.street}
                          onChange={handleChnage}
                        />
                      </div>
                    </div>
                    <div className='mb-10  min-w-200px mx-10'>
                      <label className='form-label fw-semibold'>Building Manager</label>
                      <div>
                        <input
                          className='form-select form-select-solid'
                          type='text'
                          data-kt-select2='true'
                          data-placeholder='Select option'
                          data-dropdown-parent='#kt_menu_631f08e971923'
                          data-allow-clear='true'
                          name='managerId'
                          value={formData?.managerId}
                          onChange={handleChnage}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className='d-flex justify-content-end'>
                    <div
                      className='d-flex align-items-center gap-2 gap-lg-3'
                      style={{alignSelf: 'end', marginBottom: '20px', marginRight: '30px'}}
                      // style={{marginLeft: '30px'}}
                    >
                      <a
                        className='btn btn-sm fw-bold btn-primary btn-green'
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_create_app'
                        onClick={handleSubmit}
                      >
                        Save
                      </a>
                    </div>
                    <div
                      className='d-flex align-items-center gap-2 gap-lg-3'
                      style={{alignSelf: 'end', marginBottom: '20px', marginRight: '30px'}}
                      // style={{marginLeft: '30px'}}
                    >
                      <a
                        className='btn btn-sm fw-bold btn-primary btn-green'
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_create_app'
                        onClick={() => setShow(false)}
                      >
                        Cancel
                      </a>
                    </div>
                  </div> */}
                  <div className='d-flex justify-content-end mb-4 px-4 '>
                    <div className='me-2'>
                      <button
                        type='button'
                        className='btn btn-lg btn-light-primary me-3'
                        data-kt-stepper-action='previous'
                        onClick={() => setShow(false)}
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
                        onClick={handleSubmit}
                      >
                        Submit{' '}
                        <KTSVG
                          path='/media/icons/duotune/arrows/arr064.svg'
                          className='svg-icon-3 ms-2 me-0'
                        />
                      </button>
                    </div>
                  </div>
                </>
              )}
              {showCom && propertiType === 'Communities' && (
                <>
                  <h3 className='m-9'>ADD NEW COMMUNITIES</h3>
                  <div
                    className='card-header align-items-center gap-md-2 image-none'
                    style={{justifyContent: 'flex-start'}}
                  >
                    <div className='mb-10  min-w-200px mx-10'>
                      <label className='form-label fw-semibold'>Communities Name:</label>
                      <div>
                        <input
                          className='form-select form-select-solid'
                          type='text'
                          data-kt-select2='true'
                          data-placeholder='Select option'
                          data-dropdown-parent='#kt_menu_631f08e971923'
                          data-allow-clear='true'
                          name='name'
                          value={formData?.name}
                          onChange={handleChnage}
                        />
                      </div>
                    </div>
                    <div className='mb-10  min-w-200px mx-10'>
                      <label className='form-label fw-semibold'>City</label>
                      <div>
                        <input
                          className='form-select form-select-solid'
                          type='text'
                          data-kt-select2='true'
                          data-placeholder='Select option'
                          data-dropdown-parent='#kt_menu_631f08e971923'
                          data-allow-clear='true'
                          name='city'
                          value={formData?.city}
                          onChange={handleChnage}
                        />
                      </div>
                    </div>
                    <div className='mb-10  min-w-200px mx-10'>
                      <label className='form-label fw-semibold'>Location</label>
                      <div>
                        <input
                          className='form-select form-select-solid'
                          type='text'
                          data-kt-select2='true'
                          data-placeholder='Select option'
                          data-dropdown-parent='#kt_menu_631f08e971923'
                          data-allow-clear='true'
                          name='location'
                          value={formData?.location}
                          onChange={handleChnage}
                        />
                      </div>
                    </div>
                    <div className='mb-10  min-w-200px mx-10'>
                      <label className='form-label fw-semibold'>Street</label>
                      <div>
                        <input
                          className='form-select form-select-solid'
                          type='text'
                          data-kt-select2='true'
                          data-placeholder='Select option'
                          data-dropdown-parent='#kt_menu_631f08e971923'
                          data-allow-clear='true'
                          name='street'
                          value={formData?.street}
                          onChange={handleChnage}
                        />
                      </div>
                    </div>
                    <div className='mb-10  min-w-200px mx-10'>
                      <label className='form-label fw-semibold'>Community Manager</label>
                      <div>
                        <input
                          className='form-select form-select-solid'
                          type='text'
                          data-kt-select2='true'
                          data-placeholder='Select option'
                          data-dropdown-parent='#kt_menu_631f08e971923'
                          data-allow-clear='true'
                          name='managerId'
                          value={formData?.managerId}
                          onChange={handleChnage}
                        />
                      </div>
                    </div>
                    <div className='mb-10  min-w-200px mx-10'>
                      <label className='form-label fw-semibold'>Total Zones</label>
                      <div>
                        <input
                          className='form-select form-select-solid'
                          type='text'
                          data-kt-select2='true'
                          data-placeholder='Select option'
                          data-dropdown-parent='#kt_menu_631f08e971923'
                          data-allow-clear='true'
                          name='totalZones'
                          value={formData?.totalZones}
                          onChange={handleChnage}
                        />
                      </div>
                    </div>
                    <div className='mb-10  min-w-200px mx-10'>
                      <label className='form-label fw-semibold'>Total Buildings</label>
                      <div>
                        <input
                          className='form-select form-select-solid'
                          type='text'
                          data-kt-select2='true'
                          data-placeholder='Select option'
                          data-dropdown-parent='#kt_menu_631f08e971923'
                          data-allow-clear='true'
                          name='totalBuildings'
                          value={formData?.totalBuildings}
                          onChange={handleChnage}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className='d-flex justify-content-end'>
                    <div
                      className='d-flex align-items-center gap-2 gap-lg-3'
                      style={{alignSelf: 'end', marginBottom: '20px', marginRight: '30px'}}
                      // style={{marginLeft: '30px'}}
                    >
                      <a
                        className='btn btn-sm fw-bold btn-primary btn-green'
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_create_app'
                        onClick={handleSubmitCom}
                      >
                        Save
                      </a>
                    </div>
                    <div
                      className='d-flex align-items-center gap-2 gap-lg-3'
                      style={{alignSelf: 'end', marginBottom: '20px', marginRight: '30px'}}
                      // style={{marginLeft: '30px'}}
                    >
                      <a
                        className='btn btn-sm fw-bold btn-primary btn-green'
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_create_app'
                        onClick={() => setShowCom(false)}
                      >
                        Cancel
                      </a>
                    </div>
                  </div> */}
                  <div className='d-flex justify-content-end mb-4 px-4 '>
                    <div className='me-2'>
                      <button
                        type='button'
                        className='btn btn-lg btn-light-primary me-3'
                        data-kt-stepper-action='previous'
                        onClick={() => setShowCom(false)}
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
                        onClick={handleSubmitCom}
                      >
                        Submit{' '}
                        <KTSVG
                          path='/media/icons/duotune/arrows/arr064.svg'
                          className='svg-icon-3 ms-2 me-0'
                        />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
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
                      <th className='text-center min-w-100px'>
                        {propertiType === 'Buildings' ? 'BUILDING NAME' : ' COMMUNITY NAME'}
                      </th>
                      <th className='text-center min-w-100px'>
                        {' '}
                        {propertiType === 'Buildings' ? 'TOTAL FLOORS' : ' TOTAL CLUSTERS'}
                      </th>
                      <th className='text-center min-w-70px'>
                        {propertiType === 'Buildings' ? 'TOTAL PROPERTIES' : ' UNIT CLUSTERS'}
                      </th>
                      {propertiType === 'Buildings' ? (
                        ''
                      ) : (
                        <>
                          <th className='text-center min-w-100px'>BUILDING CLUSTERS</th>
                          <th className='text-center min-w-100px'>MIXED CLUSTERS</th>
                          <th className='text-center min-w-100px'>TOTAL PROPERTIES</th>
                        </>
                      )}
                      <th className='text-center min-w-100px'>
                        {propertiType === 'Buildings' ? 'BUILDING MANAGER' : ' COMMUNITY MANAGER'}
                      </th>
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
                            {propertiType === 'Buildings' ? (
                              <>
                                {' '}
                                <td className='text-center'>{i + 1}</td>
                                <td
                                  className='text-center'
                                  data-kt-ecommerce-order-filter='order_id'
                                >
                                  {v?.name}
                                </td>
                                <td className='text-center'>{v?.totalFloors}</td>
                                <td className='text-center'>{v?.totalProperties}</td>
                                <td className='text-center'>{v?.managerId}</td>
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
                                <td className='text-center'>{v?.totalClusters}</td>
                                <td className='text-center'>{v?.unitClusters}</td>
                                <td className='text-center'>{v?.buildingClusters}</td>
                                <td className='text-center'>{v?.mixedClusters}</td>
                                <td className='text-center'>{v?.totalProperties}</td>
                                <td className='text-center'>{v?.managerId}</td>
                              </>
                            )}
                            <td className='text-center'>
                              <div className='menu-item px-3'>
                                {/* <a
                                onClick={() => navigate(`/area/${v?._id}`)}
                                className='btn btn-sm fw-bold btn-primary btn-green'
                                data-bs-toggle='modal'
                                data-bs-target='#kt_modal_create_app'
                              >
                                Area
                              </a> */}
                                <div
                                  onClick={() => {
                                    propertiType === 'Communities'
                                      ? navigate(`/areaCom/${v?._id}`)
                                      : navigate(`/area/${v?._id}`)
                                  }}
                                  className='btn btn-sm fw-bold btn-primary btn-green hover-none'
                                >
                                  {propertiType === 'Communities' ? 'Clusters' : 'Floors'}
                                </div>
                              </div>
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
                                    // }}
                                    onClick={() => editBtn(v?._id)}
                                    className='menu-link px-3'
                                  >
                                    Edit
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    href='#/action-2'
                                    onClick={() => {
                                      swal
                                        .fire({
                                          text: 'Are you sure you want to permanently delete this community? Deleting this community will delete all the data registered under the community.',
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
        </div>
        {/* </div> */}
      </div>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'Property Management '})}</PageTitle>
      <DashboardPage /> */}
      {showCreateAppModal && (
        <AddBuilding
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
          handleSubmit={handleSubmit}
        />
      )}
    </>
  )
}

export default Community
