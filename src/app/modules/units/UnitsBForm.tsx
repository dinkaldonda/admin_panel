import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ApiDelete, ApiGet, ApiPost, ApiPut, ApiUpload} from '../../../apiCommon/helpers/API/ApiData'
import {ErrorToast, SuccessToast} from '../../../apiCommon/helpers/Toast'
import swal from 'sweetalert2'
import AddUnits from './AddUnits'
import appartment from '../../../img/Apartment.svg'
import penthouse from '../../../img/PentHouse.svg'
import common_area from '../../../img/common_area.svg'
import other from '../../../img/other.svg'
import SVG from 'react-inlinesvg'
import {toAbsoluteUrl} from '../../../apiCommon/helpers/AssetsHelpers'

const UnitBForm = () => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [tableData, setTableData] = useState([])
  const [updateDataId, setUpdateDataId] = useState('')
  const [propertiType, setPropertiType] = useState('Apartment')
  const [show, setShow] = useState(false)
  const [showPen, setShowPen] = useState(false)
  const [showCom, setShowCom] = useState(false)
  const [showOth, setShowOth] = useState(false)
  const [imgUrl, setImgUrl] = useState([])
  const [create, setCreate] = useState<any>(false)
  const [header, setHeader] = useState<any>({})
  const [headerB, setHeaderB] = useState<any>([])
  console.log('🚀 ~ file: Building.tsx ~ line 10 ~ Building ~ updateDataId', updateDataId)
  const [isEdit, setIsEdit] = useState(false)
  console.log('🚀 ~ file: Building.tsx ~ line 12 ~ Building ~ isEdit', isEdit)
  const [formData, setFormData] = useState<any>({
    propertyId: window.location.pathname?.split('/')[2],
    propertyAreaId: window.location.pathname?.split('/')[3],
  })
  console.log('formData', formData)

  const handleChnage = (e: any) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const building = async () => {
    const body = {
      page: 1,
      limit: 1000,
      propertyAreaId: window.location.pathname?.split('/')[3],
    }
    await ApiPost(`cooperate/properties_area_unit/get`, body)
      .then((res) => {
        setTableData(res?.data?.data?.property_area_unit_data)
        console.log('res', res)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const imageChange = async (e: any) => {
    let file = e.target.files[0]
    let fileURL = URL.createObjectURL(file)
    file.fileURL = fileURL
    let formData = new FormData()
    formData.append('image', file)
    await ApiUpload('upload/image/apartment', formData)
      .then((res) => setImgUrl(res?.data?.data?.image))
      .catch((err) => {
        console.log('res_blob', err)
        ErrorToast(err?.message)
      })
  }
  const imageChangePen = async (e: any) => {
    let file = e.target.files[0]
    let fileURL = URL.createObjectURL(file)
    file.fileURL = fileURL
    let formData = new FormData()
    formData.append('image', file)
    await ApiUpload('upload/image/penthouse', formData)
      .then((res) => setImgUrl(res?.data?.data?.image))
      .catch((err) => {
        console.log('res_blob', err)
        ErrorToast(err?.message)
      })
  }
  const imageChangeCom = async (e: any) => {
    let file = e.target.files[0]
    let fileURL = URL.createObjectURL(file)
    file.fileURL = fileURL
    let formData = new FormData()
    formData.append('image', file)
    await ApiUpload('upload/image/common_area', formData)
      .then((res) => setImgUrl(res?.data?.data?.image))
      .catch((err) => {
        console.log('res_blob', err)
        ErrorToast(err?.message)
      })
  }
  const imageChangeOth = async (e: any) => {
    let file = e.target.files[0]
    let fileURL = URL.createObjectURL(file)
    file.fileURL = fileURL
    let formData = new FormData()
    formData.append('image', file)
    await ApiUpload('upload/image/other', formData)
      .then((res) => setImgUrl(res?.data?.data?.image))
      .catch((err) => {
        console.log('res_blob', err)
        ErrorToast(err?.message)
      })
  }
  const handleSubmit = () => {
    if (isEdit) {
      delete formData._id
      delete formData.updatedBy
      delete formData.status
      const body = {...formData, managerId: '6329ee43396e812bcc0964e5', id: updateDataId}
      ApiPut('cooperate/properties_area_unit', body)
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
      // const body = {...formData, managerId: '6329ee43396e812bcc0964e5', images: [imgUrl]}
      const body = {
        unitNo: formData?.unitNo,
        bedrooms: formData?.bedrooms,
        size: formData?.size,
        sizeType: formData?.sizeType,
        occupy: 1,
        images: [imgUrl],
        unitType: 'apartment',
        premiseNo: formData?.premiseNo,
        managerId: formData?.propertyManager,
        propertyId: formData?.propertyId,
        propertyAreaId: formData?.propertyAreaId,
      }
      console.log('body', body)
      ApiPost('cooperate/properties_area_unit', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building()
          console.log('addProperty', res)
          setShowCreateAppModal(false)
          setFormData({propertyId: window.location.pathname?.split('/')[2]})
          navigate(
            `/unitbcoms/${window.location.pathname?.split('/')[2]}/${
              window.location.pathname?.split('/')[3]
            }`
          )
        })
        .catch((err) => ErrorToast(err.message))
    }
  }
  const handleSubmitPen = () => {
    if (isEdit) {
      delete formData._id
      delete formData.updatedBy
      delete formData.status
      const body = {...formData, managerId: '6329ee43396e812bcc0964e5', id: updateDataId}
      ApiPut('cooperate/properties_area_unit', body)
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
      // const body = {...formData, managerId: '6329ee43396e812bcc0964e5'}
      const body = {
        unitNo: formData?.unitNo,
        bedrooms: formData?.bedrooms,
        size: formData?.size,
        sizeType: formData?.sizeType,
        occupy: 1,
        unitType: 'penthouse',
        images: [imgUrl],
        premiseNo: formData?.premiseNo,
        managerId: formData?.propertyManager,
        propertyId: formData?.propertyId,
        propertyAreaId: formData?.propertyAreaId,
      }
      ApiPost('cooperate/properties_area_unit', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building()
          console.log('addProperty', res)
          setShowCreateAppModal(false)
          setFormData({propertyId: window.location.pathname?.split('/')[2]})
          navigate(
            `/unitbcoms/${window.location.pathname?.split('/')[2]}/${
              window.location.pathname?.split('/')[3]
            }`
          )
        })
        .catch((err) => ErrorToast(err.message))
    }
  }
  const handleSubmitCom = () => {
    if (isEdit) {
      delete formData._id
      delete formData.updatedBy
      delete formData.status
      const body = {...formData, managerId: '6329ee43396e812bcc0964e5', id: updateDataId}
      ApiPut('cooperate/properties_area_unit', body)
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
      // const body = {...formData, managerId: '6329ee43396e812bcc0964e5'}
      const body = {
        unitNo: formData?.commonAreaName,
        occupy: 0,
        unitType: 'common_area ',
        images: [imgUrl],
        premiseNo: formData?.premiseNo,
        managerId: formData?.propertyManager,
        propertyId: formData?.propertyId,
        propertyAreaId: formData?.propertyAreaId,
      }
      ApiPost('cooperate/properties_area_unit', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building()
          console.log('addProperty', res)
          setShowCreateAppModal(false)
          setFormData({propertyId: window.location.pathname?.split('/')[2]})
          navigate(
            `/unitbcoms/${window.location.pathname?.split('/')[2]}/${
              window.location.pathname?.split('/')[3]
            }`
          )
        })
        .catch((err) => ErrorToast(err.message))
    }
  }
  const handleSubmitOth = () => {
    if (isEdit) {
      delete formData._id
      delete formData.updatedBy
      delete formData.status
      const body = {...formData, managerId: '6329ee43396e812bcc0964e5', id: updateDataId}
      ApiPut('cooperate/properties_area_unit', body)
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
      // const body = {...formData, managerId: '6329ee43396e812bcc0964e5'}
      const body = {
        unitNo: formData?.unitNo,
        bedrooms: formData?.bedrooms,
        size: formData?.size,
        sizeType: formData?.sizeType,
        occupy: 1,
        images: [imgUrl],
        unitType: formData?.unitType,
        premiseNo: formData?.premiseNo,
        managerId: formData?.propertyManager,
        propertyId: formData?.propertyId,
        propertyAreaId: formData?.propertyAreaId,
      }
      ApiPost('cooperate/properties_area_unit', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building()
          console.log('addProperty', res)
          setShowCreateAppModal(false)
          setFormData({propertyId: window.location.pathname?.split('/')[2]})
          navigate(
            `/unitbcoms/${window.location.pathname?.split('/')[2]}/${
              window.location.pathname?.split('/')[3]
            }`
          )
        })
        .catch((err) => ErrorToast(err.message))
    }
  }
  const getHeaderfData = () => {
    ApiGet(`cooperate/properties_area/${formData?.propertyAreaId}`)
      .then((res) => {
        console.log('res', res?.data?.data)
        setHeader(res?.data?.data)
      })
      .catch((err) => console.log('err', err))
  }
  const getHeaderbData = () => {
    ApiGet(`cooperate/properties/${formData?.propertyId}`)
      .then((res) => {
        console.log('res', res?.data?.data)
        setHeaderB(res?.data?.data)
      })
      .catch((err) => console.log('err', err))
  }

  useEffect(() => {
    building()
    getHeaderfData()
    getHeaderbData()

    if (isEdit) {
      ApiGet(`cooperate/properties_area_unit/${updateDataId}`)
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
        <div id='' className='app-container container-xxl flex-stack pt-0 mt-0'>
          <div className='page-title d-flex flex-column justify-content-center flex-wrap me-3'>
            <h1 className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0'>
              Units
            </h1>
          </div>
          <div className='card card-flush mt-8'>
            <div className='card-header align-items-center py-5  gap-md-2 text-center pt-15'>
              <div className='mb-10  min-w-200px'>
                <h4 className='fw-bold'>
                  Building Name: <span className='fw-semibold'>{headerB[0]?.name}</span>
                </h4>
              </div>
              <div className='mb-10  min-w-200px'>
                <h4 className='fw-bold'>
                  Area: <span className='fw-semibold'>{header?.name}</span>
                </h4>
              </div>
              {/* <div className='mb-10  min-w-200px'>
                <h4 className='fw-bold'>
                  Total Properties: <span className='fw-semibold'>1</span>
                </h4>
              </div>
              <div className='mb-10  min-w-200px'>
                <h4 className='fw-bold'>
                  Total Apartments: <span className='fw-semibold'>2</span>
                </h4>
              </div>
              <div className='mb-10 min-w-200px'>
                <h4 className='fw-bold'>
                  Total Penthouses: <span className='fw-semibold'>2</span>
                </h4>
              </div>
              <div className='mb-10  min-w-200px'>
                <h4 className='fw-bold'>
                  Total Common Areas: <span className='fw-semibold'>5</span>
                </h4>
              </div>
              <div className='mb-10  min-w-200px'>
                <h4 className='fw-bold'>
                  Total Other: <span className='fw-semibold'>0</span>
                </h4>
              </div> */}
              <div className='mb-10  min-w-200px'>
                <h4 className='fw-bold'>
                  Building Manager: <span className='fw-semibold'>{header?.managerId}</span>
                </h4>
              </div>
            </div>
          </div>
          <div
            className='d-flex align-items-center gap-2 gap-lg-3 mt-8 justfy-content-center'
            style={{justifyContent: 'center'}}
          >
            <ul className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2'>
              <li
                className='nav-item cursor-pointer'
                onClick={() => {
                  //   setFormData({...formData, portfolio: 'overview'})
                  //   building(formData?.portfolioType, 'overview')
                  setPropertiType('Apartment')
                  setCreate(false)
                }}
              >
                <a
                  className='nav-link text-active-primary pb-4 active text-center mx-10'
                  data-bs-toggle='tab'
                >
                  <div className='mb-2'>
                    <img src={appartment} alt='' width='30px' />
                  </div>
                  Apartment
                </a>
              </li>
              <li
                className='nav-item cursor-pointer'
                onClick={() => {
                  //   setFormData({...formData, portfolio: 'overview'})
                  //   building(formData?.portfolioType, 'overview')
                  setPropertiType('Penthouse')
                  setCreate(false)
                }}
              >
                <a
                  className='nav-link text-active-primary pb-4 text-center mx-10'
                  data-bs-toggle='tab'
                >
                  <div className='svg-icon svg-icon-md svg-icon-primary mb-2'>
                    <img src={penthouse} alt='' width='30px' />{' '}
                  </div>
                  Penthouse
                </a>
              </li>
              <li
                className='nav-item cursor-pointer'
                onClick={() => {
                  //   setFormData({...formData, portfolio: 'overview'})
                  //   building(formData?.portfolioType, 'overview')
                  setPropertiType('CommonArea')
                  setCreate(false)
                }}
              >
                <a
                  className='nav-link text-active-primary pb-4 text-center mx-10'
                  data-bs-toggle='tab'
                >
                  <div className='svg-icon svg-icon-md svg-icon-primary mb-2'>
                    <img src={common_area} alt='' width='30px' />{' '}
                  </div>
                  Common Area
                </a>
              </li>
              <li
                className='nav-item cursor-pointer'
                onClick={() => {
                  //   setFormData({...formData, portfolio: 'overview'})
                  //   building(formData?.portfolioType, 'overview')
                  setPropertiType('Other')
                  setCreate(false)
                }}
              >
                <a
                  className='nav-link text-active-primary pb-4 text-center mx-10'
                  data-bs-toggle='tab'
                >
                  <div className='svg-icon svg-icon-md svg-icon-primary mb-2'>
                    <img src={other} alt='' width='30px' />{' '}
                  </div>
                  Other
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* {propertiType === 'Apartment' && (
          <div
            className='app-container container-xxl d-flex flex-stack mt-0'
            style={{paddingTop: '30px'}}
          >
            <a
              // onClick={() => setShowCreateAppModal(true)}
              className='btn btn-sm fw-bold btn-primary btn-green'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_create_app'
              onClick={() => {
                setShowCreateAppModal(true)
              }}
            >
              Add Unit
            </a>
          </div>
        )} */}

        {propertiType === 'Apartment' && (
          <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
            <a
              // onClick={() => setShowCreateAppModal(true)}
              className='btn btn-sm fw-bold btn-primary btn-green'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_create_app'
              onClick={handleSubmit}
            >
              Add
            </a>
          </div>
        )}
        {propertiType === 'Penthouse' && (
          <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
            <a
              // onClick={() => setShowCreateAppModal(true)}
              className='btn btn-sm fw-bold btn-primary btn-green'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_create_app'
              onClick={handleSubmitPen}
            >
              Add
            </a>
          </div>
        )}
        {propertiType === 'CommonArea' && (
          <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
            <a
              // onClick={() => setShowCreateAppModal(true)}
              className='btn btn-sm fw-bold btn-primary btn-green'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_create_app'
              onClick={handleSubmitCom}
            >
              Add
            </a>
          </div>
        )}
        {propertiType === 'Other' && (
          <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
            <a
              // onClick={() => setShowCreateAppModal(true)}
              className='btn btn-sm fw-bold btn-primary btn-green'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_create_app'
              onClick={handleSubmitOth}
            >
              Add
            </a>
          </div>
        )}
        {/* </div> */}
        <div
          id='kt_app_content'
          className='app-content flex-column-fluid pt-0'
          style={{paddingTop: '0px'}}
        >
          <div id='kt_app_content_container' className='app-container container-xxl mt-10'>
            <div className='card card-flush mb-10'>
              {propertiType === 'Apartment' && (
                <>
                  {/* <h3 className='m-9'>Add New Apartment</h3> */}
                  <div className='mx-10 mb-10 mt-10'>
                    <label htmlFor='exampleFormControlInput1' className='required form-label'>
                      Upload Image
                    </label>
                    <input
                      type='file'
                      className='form-control form-control-solid w-auto'
                      placeholder='Ex-JAS001'
                      name='unitNo'
                      onChange={imageChange}
                      // value={formData?.unitNo}
                      // onChange={handleChnage}
                    />
                  </div>
                  <h3 className='mx-10 mb-5 '> Unit Details </h3>
                  <div
                    className='card-header align-items-center gap-md-2'
                    style={{justifyContent: 'flex-start'}}
                  >
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Unit No
                      </label>
                      <input
                        type='text'
                        className='form-control form-control-solid'
                        placeholder='Ex-JAS001'
                        name='unitNo'
                        value={formData?.unitNo}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Bedrooms
                      </label>
                      {/* <input
                        type='number'
                        className='form-control form-control-solid'
                        placeholder='Enter Bedrooms'
                        name='bedrooms'
                        value={formData?.bedrooms}
                        onChange={handleChnage}
                      /> */}
                      <select
                        name='bedrooms'
                        className='form-select form-select-solid'
                        value={formData?.bedrooms}
                        onChange={handleChnage}
                        style={{width: '150px'}}
                      >
                        <option disabled selected>
                          Ex - 3
                        </option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                      </select>
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Size
                      </label>
                      <div className='d-flex'>
                        <input
                          type='number'
                          className='form-control form-control-solid mx-1'
                          placeholder='Ex - 1000'
                          name='size'
                          value={formData?.size}
                          onChange={handleChnage}
                          style={{width: '150px'}}
                        />
                        <select
                          name='sizeType'
                          className='form-select form-select-solid'
                          value={formData?.sizeType}
                          onChange={handleChnage}
                          style={{width: '150px'}}
                        >
                          <option className='fst-italic' disabled selected>
                            Ex-Sq ft
                          </option>
                          <option className='fst-italic' value={0}>
                            Sq ft
                          </option>
                          <option className='fst-italic' value={1}>
                            Sq m
                          </option>
                        </select>
                      </div>
                    </div>
                    {/* <div className='mb-10 min-w-200px mx-10'>
                      <label className='required form-label'>
                        <span className=''>Size Type</span>
                      </label>

                      <select
                        name='sizeType'
                        className='form-select form-select-solid'
                        value={formData?.sizeType}
                        onChange={handleChnage}
                        style={{width: '230px'}}
                      >
                        <option disabled selected>
                          Select Size Type
                        </option>
                        <option value={0}>Meter</option>
                        <option value={1}>Sequre Meter</option>
                      </select>
                    </div> */}

                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Premise No
                      </label>
                      <input
                        type='number'
                        className='form-control form-control-solid'
                        placeholder='Ex-52525252'
                        name='premiseNo'
                        value={formData?.premiseNo}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Property Id
                      </label>
                      <input
                        type='number'
                        className='form-control form-control-solid'
                        placeholder='Ex-159753'
                        name='managerId'
                        value={formData?.managerId}
                        onChange={handleChnage}
                      />
                    </div>
                  </div>
                  <h3 className='mx-10 mb-5'>Tenancy</h3>
                  <div className='mb-10 min-w-200px mx-15'>
                    <label className='required form-label'>
                      <span className=''>Occupancy</span>
                    </label>

                    {/* <select
                        name='OccupancyType'
                        className='form-select form-select-solid'
                        value={formData?.OccupancyType}
                        onChange={handleChnage}
                        style={{width: '230px'}}
                      >
                        <option disabled selected>
                          Select Occupancy
                        </option>
                        <option value={0}>Vacant</option>
                        <option value={1}>Occupied</option>
                      </select> */}
                    <div className='d-flex'>
                      <div className='form-check form-check-custom form-check-solid form-check-sm'>
                        <input
                          className='form-check-input'
                          type='radio'
                          value={0}
                          id='vacant'
                          name='occupancyType'
                          checked={formData?.OccupancyType}
                          onChange={handleChnage}
                          onClick={() => setCreate(false)}
                        />
                        <label className='form-check-label' htmlFor='vacant'>
                          vacant
                        </label>
                      </div>
                      <div className='form-check form-check-custom form-check-solid form-check-sm ms-3'>
                        <input
                          className='form-check-input'
                          type='radio'
                          value={1}
                          id='occupied'
                          name='occupancyType'
                          checked={formData?.OccupancyType}
                          onChange={handleChnage}
                          onClick={() => setCreate(true)}
                        />
                        <label className='form-check-label' htmlFor='occupied'>
                          occupied
                        </label>
                      </div>
                      {create && (
                        <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
                          <a
                            // onClick={() => setShowCreateAppModal(true)}
                            className='btn btn-sm fw-bold btn-primary btn-green'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_create_app'
                            // onClick={handleSubmitCom}
                          >
                            Create Tenancy
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className='mx-10 mb-5 '>Manager</h3>
                  <div className='mb-10 min-w-200px mx-15'>
                    <label htmlFor='exampleFormControlInput1' className='required form-label'>
                      Property Manager
                    </label>
                    {/* <input
                        type='text'
                        className='form-control form-control-solid'
                        placeholder='Enter Manager Name'
                        name='propertyManager'
                        value={formData?.propertyManager}
                        onChange={handleChnage}
                      /> */}
                    <select
                      name='propertyManager'
                      className='form-select form-select-solid'
                      value={formData?.propertyManager}
                      onChange={handleChnage}
                      style={{width: '230px'}}
                    >
                      <option disabled selected>
                        Ex-John Deo
                      </option>
                      <option value='John'>John</option>
                      <option value='Max'>Max</option>
                      <option value='Root'>Root</option>
                      {/* <option value='Al Ain'>Al Ain</option> */}
                    </select>
                  </div>
                  {/* <div
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
                  </div> */}
                </>
              )}
              {propertiType === 'Penthouse' && (
                <>
                  <div className='mx-10 mb-10 mt-10'>
                    <label htmlFor='exampleFormControlInput1' className='required form-label'>
                      Upload Image
                    </label>
                    <input
                      type='file'
                      className='form-control form-control-solid w-auto'
                      placeholder='Ex-JAS001'
                      name='unitNo'
                      onChange={imageChangePen}
                      // value={formData?.unitNo}
                      // onChange={handleChnage}
                    />
                  </div>
                  <h3 className='mx-10 mb-5 '> Unit Details </h3>
                  <div
                    className='card-header align-items-center gap-md-2'
                    style={{justifyContent: 'flex-start'}}
                  >
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Unit No
                      </label>
                      <input
                        type='text'
                        className='form-control form-control-solid'
                        placeholder='Ex-JAS001'
                        name='unitNo'
                        value={formData?.unitNo}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Bedrooms
                      </label>
                      {/* <input
                        type='number'
                        className='form-control form-control-solid'
                        placeholder='Enter Bedrooms'
                        name='bedrooms'
                        value={formData?.bedrooms}
                        onChange={handleChnage}
                      /> */}
                      <select
                        name='bedrooms'
                        className='form-select form-select-solid'
                        value={formData?.bedrooms}
                        onChange={handleChnage}
                        style={{width: '150px'}}
                      >
                        <option disabled selected>
                          Ex - 3
                        </option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                      </select>
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Size
                      </label>
                      <div className='d-flex'>
                        <input
                          type='number'
                          className='form-control form-control-solid mx-1'
                          placeholder='Ex - 1000'
                          name='size'
                          value={formData?.size}
                          onChange={handleChnage}
                          style={{width: '150px'}}
                        />
                        <select
                          name='sizeType'
                          className='form-select form-select-solid fst-italic'
                          value={formData?.sizeType}
                          onChange={handleChnage}
                          style={{width: '150px'}}
                        >
                          <option className='fst-italic' disabled selected>
                            Ex-Sq ft
                          </option>
                          <option className='fst-italic' value={0}>
                            Sq ft
                          </option>
                          <option className='fst-italic' value={1}>
                            Sq m
                          </option>
                        </select>
                      </div>
                    </div>
                    {/* <div className='mb-10 min-w-200px mx-10'>
                      <label className='required form-label'>
                        <span className=''>Size Type</span>
                      </label>

                      <select
                        name='sizeType'
                        className='form-select form-select-solid'
                        value={formData?.sizeType}
                        onChange={handleChnage}
                        style={{width: '230px'}}
                      >
                        <option disabled selected>
                          Select Size Type
                        </option>
                        <option value={0}>Meter</option>
                        <option value={1}>Sequre Meter</option>
                      </select>
                    </div> */}
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Premise No
                      </label>
                      <input
                        type='number'
                        className='form-control form-control-solid'
                        placeholder='Ex-52525252'
                        name='premiseNo'
                        value={formData?.premiseNo}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Property Id
                      </label>
                      <input
                        type='number'
                        className='form-control form-control-solid'
                        placeholder='Ex-159753'
                        name='managerId'
                        value={formData?.managerId}
                        onChange={handleChnage}
                      />
                    </div>
                  </div>
                  <h3 className='mx-10 mb-5'>Tenancy</h3>
                  <div className='mb-10 min-w-200px mx-15'>
                    <label className='required form-label'>
                      <span className=''>Occupancy</span>
                    </label>

                    {/* <select
                        name='OccupancyType'
                        className='form-select form-select-solid'
                        value={formData?.OccupancyType}
                        onChange={handleChnage}
                        style={{width: '230px'}}
                      >
                        <option disabled selected>
                          Select Occupancy
                        </option>
                        <option value={0}>Vacant</option>
                        <option value={1}>Occupied</option>
                      </select> */}
                    <div className='d-flex'>
                      <div className='form-check form-check-custom form-check-solid form-check-sm'>
                        <input
                          className='form-check-input'
                          type='radio'
                          value={0}
                          id='vacant'
                          name='occupancyType'
                          checked={formData?.OccupancyType}
                          onChange={handleChnage}
                          onClick={() => setCreate(false)}
                        />
                        <label className='form-check-label' htmlFor='vacant'>
                          vacant
                        </label>
                      </div>
                      <div className='form-check form-check-custom form-check-solid form-check-sm ms-3'>
                        <input
                          className='form-check-input'
                          type='radio'
                          value={1}
                          id='occupied'
                          name='occupancyType'
                          checked={formData?.OccupancyType}
                          onChange={handleChnage}
                          onClick={() => setCreate(true)}
                        />
                        <label className='form-check-label' htmlFor='occupied'>
                          occupied
                        </label>
                      </div>
                      {create && (
                        <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
                          <a
                            // onClick={() => setShowCreateAppModal(true)}
                            className='btn btn-sm fw-bold btn-primary btn-green'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_create_app'
                            // onClick={handleSubmitCom}
                          >
                            Create Tenancy
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className='mx-10 mb-5 '>Manager</h3>
                  <div className='mb-10 min-w-200px mx-15'>
                    <label htmlFor='exampleFormControlInput1' className='required form-label'>
                      Property Manager
                    </label>
                    {/* <input
                        type='text'
                        className='form-control form-control-solid'
                        placeholder='Enter Manager Name'
                        name='propertyManager'
                        value={formData?.propertyManager}
                        onChange={handleChnage}
                      /> */}
                    <select
                      name='propertyManager'
                      className='form-select form-select-solid'
                      value={formData?.propertyManager}
                      onChange={handleChnage}
                      style={{width: '230px'}}
                    >
                      <option disabled selected>
                        Ex-John Deo
                      </option>
                      <option value='John'>John</option>
                      <option value='Max'>Max</option>
                      <option value='Root'>Root</option>
                      {/* <option value='Al Ain'>Al Ain</option> */}
                    </select>
                  </div>
                  {/* <div
                    className='d-flex align-items-center gap-2 gap-lg-3'
                    style={{alignSelf: 'end', marginBottom: '20px', marginRight: '30px'}}
                    // style={{marginLeft: '30px'}}
                  >
                    <a
                      className='btn btn-sm fw-bold btn-primary btn-green'
                      data-bs-toggle='modal'
                      data-bs-target='#kt_modal_create_app'
                      onClick={handleSubmitPen}
                    >
                      Save
                    </a>
                  </div> */}
                </>
              )}
              {propertiType === 'CommonArea' && (
                <>
                  <div className='mx-10 mb-10 mt-10'>
                    <label htmlFor='exampleFormControlInput1' className='required form-label'>
                      Upload Image
                    </label>
                    <input
                      type='file'
                      className='form-control form-control-solid w-auto'
                      placeholder='Ex-JAS001'
                      name='unitNo'
                      onChange={imageChangeCom}
                      // value={formData?.unitNo}
                      // onChange={handleChnage}
                    />
                  </div>
                  <h3 className='mx-10 mb-5 '> Unit Details </h3>
                  <div
                    className='card-header align-items-center gap-md-2'
                    style={{justifyContent: 'flex-start'}}
                  >
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Common Area Name
                      </label>
                      <input
                        type='text'
                        className='form-control form-control-solid'
                        placeholder='Ex-Gym'
                        name='commonAreaName'
                        value={formData?.commonAreaName}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Property Id
                      </label>
                      <input
                        type='number'
                        className='form-control form-control-solid'
                        placeholder='Ex-159753'
                        name='managerId'
                        value={formData?.managerId}
                        onChange={handleChnage}
                      />
                    </div>
                    {/* <div className='mb-10 min-w-200px mx-10'>
                      <label className='required form-label'>
                        <span className=''>Occupancy</span>
                      </label>

                      <select
                        name='OccupancyType'
                        className='form-select form-select-solid'
                        value={formData?.OccupancyType}
                        onChange={handleChnage}
                      >
                        <option disabled selected>
                          Select Occupancy
                        </option>
                        <option value={0}>Vacant</option>
                        <option value={1}>Occupied</option>
                      </select>
                    </div> */}
                  </div>
                  <h3 className='mx-10 mb-5 '>Manager</h3>
                  <div className='mb-10 min-w-200px mx-15'>
                    <label htmlFor='exampleFormControlInput1' className='required form-label'>
                      Property Manager
                    </label>
                    {/* <input
                        type='text'
                        className='form-control form-control-solid'
                        placeholder='Enter Manager Name'
                        name='propertyManager'
                        value={formData?.propertyManager}
                        onChange={handleChnage}
                      /> */}
                    <select
                      name='propertyManager'
                      className='form-select form-select-solid'
                      value={formData?.propertyManager}
                      onChange={handleChnage}
                      style={{width: '230px'}}
                    >
                      <option disabled selected>
                        Ex-John Deo
                      </option>
                      <option value='John'>John</option>
                      <option value='Max'>Max</option>
                      <option value='Root'>Root</option>
                      {/* <option value='Al Ain'>Al Ain</option> */}
                    </select>
                  </div>
                  {/* <div
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
                  </div> */}
                </>
              )}
              {propertiType === 'Other' && (
                <>
                  <div className='mx-10 mb-10 mt-10'>
                    <label htmlFor='exampleFormControlInput1' className='required form-label'>
                      Upload Image
                    </label>
                    <input
                      type='file'
                      className='form-control form-control-solid w-auto'
                      placeholder='Ex-JAS001'
                      name='unitNo'
                      onChange={imageChangeOth}
                      // value={formData?.unitNo}
                      // onChange={handleChnage}
                    />
                  </div>
                  <h3 className='mx-10 mb-5 '> Unit Details </h3>
                  <div
                    className='card-header align-items-center gap-md-2'
                    style={{justifyContent: 'flex-start'}}
                  >
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Unit No
                      </label>
                      <input
                        type='text'
                        className='form-control form-control-solid'
                        placeholder='Ex-JAS001'
                        name='unitNo'
                        value={formData?.unitNo}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Bedrooms
                      </label>
                      {/* <input
                        type='number'
                        className='form-control form-control-solid'
                        placeholder='Enter Bedrooms'
                        name='bedrooms'
                        value={formData?.bedrooms}
                        onChange={handleChnage}
                      /> */}
                      <select
                        name='bedrooms'
                        className='form-select form-select-solid'
                        value={formData?.bedrooms}
                        onChange={handleChnage}
                        style={{width: '150px'}}
                      >
                        <option disabled selected>
                          Ex - 3
                        </option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                      </select>
                    </div>
                    <div className='mb-10  min-w-200px mx-10'>
                      <label className='form-label fw-semibold'>Unit Type</label>
                      <div>
                        <input
                          className='form-control form-control-solid'
                          type='text'
                          name='unitType'
                          placeholder='Enter Unit Type'
                          value={formData?.unitType}
                          onChange={handleChnage}
                        />
                      </div>
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Size
                      </label>
                      <div className='d-flex'>
                        <input
                          type='number'
                          className='form-control form-control-solid mx-1'
                          placeholder='Ex - 1000'
                          name='size'
                          value={formData?.size}
                          onChange={handleChnage}
                          style={{width: '150px'}}
                        />
                        <select
                          name='sizeType'
                          className='form-select form-select-solid'
                          value={formData?.sizeType}
                          onChange={handleChnage}
                          style={{width: '150px'}}
                        >
                          <option className='fst-italic' disabled selected>
                            Ex-Sq ft
                          </option>
                          <option className='fst-italic' value={0}>
                            Sq ft
                          </option>
                          <option className='fst-italic' value={1}>
                            Sq m
                          </option>
                        </select>
                      </div>
                    </div>
                    {/* <div className='mb-10 min-w-200px mx-10'>
                      <label className='required form-label'>
                        <span className=''>Size Type</span>
                      </label>

                      <select
                        name='sizeType'
                        className='form-select form-select-solid'
                        value={formData?.sizeType}
                        onChange={handleChnage}
                        style={{width: '230px'}}
                      >
                        <option disabled selected>
                          Select Size Type
                        </option>
                        <option value={0}>Meter</option>
                        <option value={1}>Sequre Meter</option>
                      </select>
                    </div> */}
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Premise No
                      </label>
                      <input
                        type='number'
                        className='form-control form-control-solid'
                        placeholder='Ex-52525252'
                        name='premiseNo'
                        value={formData?.premiseNo}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Property Id
                      </label>
                      <input
                        type='number'
                        className='form-control form-control-solid'
                        placeholder='Ex-159753'
                        name='managerId'
                        value={formData?.managerId}
                        onChange={handleChnage}
                      />
                    </div>
                  </div>
                  <h3 className='mx-10 mb-5'>Tenancy</h3>
                  <div className='mb-10 min-w-200px mx-15'>
                    <label className='required form-label'>
                      <span className=''>Occupancy</span>
                    </label>

                    {/* <select
                        name='OccupancyType'
                        className='form-select form-select-solid'
                        value={formData?.OccupancyType}
                        onChange={handleChnage}
                        style={{width: '230px'}}
                      >
                        <option disabled selected>
                          Select Occupancy
                        </option>
                        <option value={0}>Vacant</option>
                        <option value={1}>Occupied</option>
                      </select> */}
                    <div className='d-flex'>
                      <div className='form-check form-check-custom form-check-solid form-check-sm'>
                        <input
                          className='form-check-input'
                          type='radio'
                          value={0}
                          id='vacant'
                          name='occupancyType'
                          checked={formData?.OccupancyType}
                          onChange={handleChnage}
                          onClick={() => setCreate(false)}
                        />
                        <label className='form-check-label' htmlFor='vacant'>
                          vacant
                        </label>
                      </div>
                      <div className='form-check form-check-custom form-check-solid form-check-sm ms-3'>
                        <input
                          className='form-check-input'
                          type='radio'
                          value={1}
                          id='occupied'
                          name='occupancyType'
                          checked={formData?.OccupancyType}
                          onChange={handleChnage}
                          onClick={() => setCreate(true)}
                        />
                        <label className='form-check-label' htmlFor='occupied'>
                          occupied
                        </label>
                      </div>
                      {create && (
                        <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
                          <a
                            // onClick={() => setShowCreateAppModal(true)}
                            className='btn btn-sm fw-bold btn-primary btn-green'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_create_app'
                            // onClick={handleSubmitCom}
                          >
                            Create Tenancy
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className='mx-10 mb-5 '>Manager</h3>
                  <div className='mb-10 min-w-200px mx-15'>
                    <label htmlFor='exampleFormControlInput1' className='required form-label'>
                      Property Manager
                    </label>
                    {/* <input
                        type='text'
                        className='form-control form-control-solid'
                        placeholder='Enter Manager Name'
                        name='propertyManager'
                        value={formData?.propertyManager}
                        onChange={handleChnage}
                      /> */}
                    <select
                      name='propertyManager'
                      className='form-select form-select-solid'
                      value={formData?.propertyManager}
                      onChange={handleChnage}
                      style={{width: '230px'}}
                    >
                      <option disabled selected>
                        Ex-John Deo
                      </option>
                      <option value='John'>John</option>
                      <option value='Max'>Max</option>
                      <option value='Root'>Root</option>
                      {/* <option value='Al Ain'>Al Ain</option> */}
                    </select>
                  </div>
                  {/* <div
                    className='d-flex align-items-center gap-2 gap-lg-3'
                    style={{alignSelf: 'end', marginBottom: '20px', marginRight: '30px'}}
                    // style={{marginLeft: '30px'}}
                  >
                    <a
                      className='btn btn-sm fw-bold btn-primary btn-green'
                      data-bs-toggle='modal'
                      data-bs-target='#kt_modal_create_app'
                      onClick={handleSubmitOth}
                    >
                      Save
                    </a>
                  </div> */}
                </>
              )}
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'Property Management '})}</PageTitle>
      <DashboardPage /> */}
      <AddUnits
        show={showCreateAppModal}
        handleClose={() => setShowCreateAppModal(false)}
        building={building}
        updateDataId={updateDataId}
        isEdit={isEdit}
        formData={formData}
        propertiType={propertiType}
        handleSubmit={handleSubmit}
        handleChnage={handleChnage}
        imageChange={imageChange}
      />
    </>
  )
}

export default UnitBForm
