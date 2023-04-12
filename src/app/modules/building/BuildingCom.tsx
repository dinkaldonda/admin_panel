import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ApiDelete, ApiGet, ApiPost, ApiPut} from '../../../apiCommon/helpers/API/ApiData'
import {ErrorToast, SuccessToast} from '../../../apiCommon/helpers/Toast'
import {CreateAppModal} from '../../../_metronic/partials'
import swal from 'sweetalert2'
import AddBuilding from './AddBuilding'

const BuildingCom = () => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [tableData, setTableData] = useState([])
  const [updateDataId, setUpdateDataId] = useState('')
  const [propertiType, setPropertiType] = useState('Overview')
  const [show, setShow] = useState(false)
  const [showCom, setShowCom] = useState(false)
  console.log('🚀 ~ file: Building.tsx ~ line 10 ~ Building ~ updateDataId', updateDataId)
  const [isEdit, setIsEdit] = useState(false)
  const [formData, setFormData] = useState<any>({
    portfolioType: 'residential',
    portfolio: 'overview',
  })
  console.log('formData', formData)

  const handleChnage = (e: any) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const building = async (a: any, b: any) => {
    const body = {
      portfolioType: a,
      portfolio: b,
      page: 1,
      limit: 1000,
    }
    await ApiPost('cooperate/properties/get', body)
      .then((res) => {
        setTableData(res?.data?.data?.properties_data)
        console.log('res', res)
        setFormData({
          portfolioType: a,
          portfolio: b,
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const deleteProperty = (id: any) => {
    console.log('deleteProperty', id)
    ApiDelete(`cooperate/properties/${id}`)
      .then((res: any) => {
        SuccessToast(res?.data?.message)
        building(formData?.portfolioType, formData?.portfolio)
      })

      .catch((err) => ErrorToast(err.message))
  }

  const handleSubmit = () => {
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
      const body = {...formData, managerId: '6329ee43396e812bcc0964e5'}
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
    building(formData?.portfolioType, formData?.portfolio)
  }, [])

  useEffect(() => {
    building(formData?.portfolioType, formData?.portfolio)

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
  }, [isEdit])

  const navigate = useNavigate()
  return (
    <>
      <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
        {/* <div className='d-flex flex-column flex-column-fluid'> */}
        {/* <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'> */}
        <div id='' className='app-container container-xxl d-flex flex-stack pt-0 mt-0'>
          <div className='page-title d-flex flex-column justify-content-center flex-wrap me-3'>
            <h1 className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0'>
              Property Registration
            </h1>
          </div>
          <div className='d-flex align-items-center gap-2 gap-lg-3'>
            <ul className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2'>
              <li
                className='nav-item'
                onClick={() => {
                  setFormData({...formData, portfolio: 'overview'})
                  building(formData?.portfolioType, 'overview')
                  setPropertiType('Overview')
                }}
              >
                <a className='nav-link text-active-primary pb-4 active' data-bs-toggle='tab'>
                  Overview
                </a>
              </li>
              <li
                className='nav-item'
                onClick={() => {
                  setFormData({...formData, portfolio: 'building'})
                  building(formData?.portfolioType, 'building')
                  setPropertiType('Buildings')
                }}
              >
                <a className='nav-link text-active-primary pb-4' data-bs-toggle='tab'>
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
            {/* <div className=''>
              <div className='form-check form-check-custom form-check-solid form-check-sm'>
                <input
                  className='form-check-input'
                  type='radio'
                  value='overview'
                  id='overview'
                  name='portfolio'
                  // checked={formData?.portfolio == 'overview'}
                  onChange={handleChnage}
                />
                <label className='form-check-label' htmlFor='overview'>
                  Overview
                </label>
              </div>
            </div>{' '}
            <div className=''>
              <div className='form-check form-check-custom form-check-solid form-check-sm'>
                <input
                  className='form-check-input'
                  type='radio'
                  value='buildings'
                  id='buildings'
                  name='portfolio'
                  // checked={formData?.portfolio == 'buildings'}
                  onChange={handleChnage}
                />
                <label className='form-check-label' htmlFor='buildings'>
                  Buildings
                </label>
              </div>
            </div>{' '}
            <div className=''>
              <div className='form-check form-check-custom form-check-solid form-check-sm'>
                <input
                  className='form-check-input'
                  type='radio'
                  value='communities'
                  id='communities'
                  name='portfolio'
                  checked={formData?.portfolio == 'communities'}
                  onChange={handleChnage}
                />
                <label className='form-check-label' htmlFor='communities'>
                  Communities
                </label>
              </div>
            </div> */}
          </div>
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
          <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
            <a
              className='btn btn-sm fw-bold btn-primary btn-green'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_create_app'
              onClick={() => {
                setShow(true)
              }}
            >
              Add Building
            </a>
          </div>
        )}
        {propertiType === 'Communities' && (
          <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
            <a
              className='btn btn-sm fw-bold btn-primary btn-green'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_create_app'
              onClick={() => {
                setShowCom(true)
              }}
            >
              Add Communities
            </a>
          </div>
        )}
        <div id='kt_app_content' className='app-content flex-column-fluid'>
          <div id='kt_app_content_container' className='app-container container-xxl'>
            <div className='card card-flush'>
              {show && propertiType === 'Buildings' && (
                <>
                  <div
                    className='card-header align-items-center py-5  gap-md-2'
                    style={{justifyContent: 'flex-start'}}
                  >
                    <div className='mb-10  min-w-200px'>
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
                    <div className='mb-10  min-w-200px'>
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
                    <div className='mb-10  min-w-200px'>
                      <label className='form-label fw-semibold'>City</label>
                      <div>
                        <input
                          className='form-select form-select-solid'
                          type='text'
                          data-kt-select2='true'
                          data-placeholder='Select option'
                          data-dropdown-parent='#kt_menu_631f08e971923'
                          data-allow-clear='true'
                          name='totalFloors'
                          value={formData?.city}
                          onChange={handleChnage}
                        />
                      </div>
                    </div>
                    <div className='mb-10  min-w-200px'>
                      <label className='form-label fw-semibold'>Location</label>
                      <div>
                        <input
                          className='form-select form-select-solid'
                          type='text'
                          data-kt-select2='true'
                          data-placeholder='Select option'
                          data-dropdown-parent='#kt_menu_631f08e971923'
                          data-allow-clear='true'
                          name='totalFloors'
                          value={formData?.location}
                          onChange={handleChnage}
                        />
                      </div>
                    </div>
                    <div className='mb-10  min-w-200px'>
                      <label className='form-label fw-semibold'>Street</label>
                      <div>
                        <input
                          className='form-select form-select-solid'
                          type='text'
                          data-kt-select2='true'
                          data-placeholder='Select option'
                          data-dropdown-parent='#kt_menu_631f08e971923'
                          data-allow-clear='true'
                          name='totalFloors'
                          value={formData?.street}
                          onChange={handleChnage}
                        />
                      </div>
                    </div>
                    <div className='mb-10  min-w-200px'>
                      <label className='form-label fw-semibold'>Building Manager</label>
                      <div>
                        <input
                          className='form-select form-select-solid'
                          type='text'
                          data-kt-select2='true'
                          data-placeholder='Select option'
                          data-dropdown-parent='#kt_menu_631f08e971923'
                          data-allow-clear='true'
                          name='totalFloors'
                          value={formData?.managerId}
                          onChange={handleChnage}
                        />
                      </div>
                    </div>
                    <div
                      className='d-flex align-items-center gap-2 gap-lg-3'
                      // style={{alignSelf: 'end', marginBottom: '20px', marginRight: '30px'}}
                      style={{marginLeft: '30px'}}
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
                  </div>
                </>
              )}
              {showCom && propertiType === 'Communities' && (
                <>
                  <div
                    className='card-header align-items-center py-5  gap-md-2'
                    style={{justifyContent: 'flex-start'}}
                  >
                    <div className='mb-10  min-w-200px'>
                      <label className='form-label fw-semibold'>Communities Name:</label>
                      <div>
                        <input
                          className='form-select form-select-solid'
                          type='text'
                          data-kt-select2='true'
                          data-placeholder='Select option'
                          data-dropdown-parent='#kt_menu_631f08e971923'
                          data-allow-clear='true'
                        />
                      </div>
                    </div>
                    <div className='mb-10  min-w-200px'>
                      <label className='form-label fw-semibold'>City</label>
                      <div>
                        <input
                          className='form-select form-select-solid'
                          type='text'
                          data-kt-select2='true'
                          data-placeholder='Select option'
                          data-dropdown-parent='#kt_menu_631f08e971923'
                          data-allow-clear='true'
                        />
                      </div>
                    </div>
                    <div className='mb-10  min-w-200px'>
                      <label className='form-label fw-semibold'>Location</label>
                      <div>
                        <input
                          className='form-select form-select-solid'
                          type='text'
                          data-kt-select2='true'
                          data-placeholder='Select option'
                          data-dropdown-parent='#kt_menu_631f08e971923'
                          data-allow-clear='true'
                        />
                      </div>
                    </div>
                    <div className='mb-10  min-w-200px'>
                      <label className='form-label fw-semibold'>Street</label>
                      <div>
                        <input
                          className='form-select form-select-solid'
                          type='text'
                          data-kt-select2='true'
                          data-placeholder='Select option'
                          data-dropdown-parent='#kt_menu_631f08e971923'
                          data-allow-clear='true'
                        />
                      </div>
                    </div>
                    <div className='mb-10  min-w-200px'>
                      <label className='form-label fw-semibold'>Community Manager</label>
                      <div>
                        <input
                          className='form-select form-select-solid'
                          type='text'
                          data-kt-select2='true'
                          data-placeholder='Select option'
                          data-dropdown-parent='#kt_menu_631f08e971923'
                          data-allow-clear='true'
                        />
                      </div>
                    </div>

                    <div
                      className='d-flex align-items-center gap-2 gap-lg-3'
                      // style={{alignSelf: 'end', marginBottom: '20px', marginRight: '30px'}}
                      style={{marginLeft: '30px'}}
                    >
                      <a
                        className='btn btn-sm fw-bold btn-primary btn-green'
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_create_app'
                      >
                        Save
                      </a>
                    </div>
                  </div>
                </>
              )}

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
                      <th className='min-w-100px'>BUILDING NAME </th>
                      <th className='text-center min-w-100px'>TOTAL FLOORS</th>
                      <th className='text-center min-w-70px'>TOTAL PROPERTIES</th>
                      <th className='text-center min-w-100px'>BUILDING MANAGER</th>
                      <th className='text-center min-w-100px'>Add Area</th>

                      <th className='text-end min-w-100px'>Actions</th>
                    </tr>
                  </thead>
                  <tbody className='fw-semibold text-gray-600'>
                    {tableData?.map((v: any) => {
                      return (
                        <tr>
                          {/* <td>
                        <div className='form-check form-check-sm form-check-custom form-check-solid'>
                          <input className='form-check-input' type='checkbox' value='1' />
                        </div>
                      </td> */}
                          <td data-kt-ecommerce-order-filter='order_id'>{v?.name}</td>
                          <td className='text-center'>{v?.totalFloors}</td>
                          <td className='text-center pe-0'>{v?.totalProperties}</td>
                          <td className='text-center pe-0'>{v?.managerId}</td>
                          <td className='text-center pe-0'>
                            <div className='menu-item px-3'>
                              {/* <a
                                onClick={() => navigate(`/area/${v?._id}`)}
                                className='btn btn-sm fw-bold btn-primary btn-green'
                                data-bs-toggle='modal'
                                data-bs-target='#kt_modal_create_app'
                              >
                                Area
                              </a> */}
                              <a
                                onClick={() => navigate(`/area/${v?._id}`)}
                                className='menu-link px-3 '
                                style={{color: '#15ac8e', display: 'contents'}}
                              >
                                Area
                              </a>
                            </div>
                          </td>

                          <td className='text-end'>
                            <a
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
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
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

export default BuildingCom
