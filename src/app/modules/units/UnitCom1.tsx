import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ApiDelete, ApiGet, ApiPost, ApiPut, ApiUpload} from '../../../apiCommon/helpers/API/ApiData'
import {ErrorToast, SuccessToast} from '../../../apiCommon/helpers/Toast'
import townhouse from '../../../img/TownHouse.svg'
import villa from '../../../img/Villa.svg'
import common_area from '../../../img/common_area.svg'
import other from '../../../img/other.svg'
import noData from '../../../img/NoData1.svg'
import {TbChevronDown} from 'react-icons/tb'
import {BsExclamationCircleFill} from 'react-icons/bs'

import swal from 'sweetalert2'
import AddUnits from './AddUnits'
import {Col, Dropdown, Row} from 'react-bootstrap'

const UnitsCom1 = () => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [tableData, setTableData] = useState([])
  const [updateDataId, setUpdateDataId] = useState('')
  const [propertiType, setPropertiType] = useState('Townhouse')
  const [show, setShow] = useState(false)
  const [showPen, setShowPen] = useState(false)
  const [showCom, setShowCom] = useState(false)
  const [showOth, setShowOth] = useState(false)
  const [imgUrl, setImgUrl] = useState([])
  const [header, setHeader] = useState<any>({})
  const [pageLimit, setPageLimit] = useState<any>(1)

  const [headerB, setHeaderB] = useState<any>([])
  const [clusterId, setClusterId] = useState<any>('')
  const [page, setPage] = useState<any>(1)
  console.log('🚀 ~ file: Building.tsx ~ line 10 ~ Building ~ updateDataId', updateDataId)
  const [isEdit, setIsEdit] = useState(false)
  console.log('🚀 ~ file: Building.tsx ~ line 12 ~ Building ~ isEdit', isEdit)
  const [formData, setFormData] = useState<any>({
    propertyId: window.location.pathname?.split('/')[2],
    floorId: window.location.pathname?.split('/')[3],
  })
  console.log('formData', formData)

  const handleChnage = (e: any) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  // const building = async () => {
  //   const body = {
  //     page: 1,
  //     limit: 10,
  //     floorId: window.location.pathname?.split('/')[3],
  //   }
  //   await ApiPost(`cooperate/unit/get`, body)
  //     .then((res) => {
  //       setTableData(res?.data?.data?.unit_data)
  //       console.log('res', res)
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  // }
  const building = async () => {
    const body = {
      page: page,
      limit: 100,
      unitGroupId: window.location.pathname?.split('/')[3],
    }
    await ApiPost(`cooperate/unit/get`, body)
      .then((res) => {
        setTableData(res?.data?.data?.unit_data)
        setPageLimit(res?.data?.data?.state?.page_limit)
        console.log('res', res)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const deleteProperty = (id: any) => {
    console.log('deleteProperty', id)
    ApiDelete(`cooperate/unit/${id}`)
      .then((res: any) => {
        SuccessToast(res?.data?.message)
        building()
      })
      .catch((err) => ErrorToast(err.message))
  }
  const imageChange = async (e: any) => {
    let file = e.target.files[0]
    let fileURL = URL.createObjectURL(file)
    file.fileURL = fileURL
    let formData = new FormData()
    formData.append('image', file)
    await ApiUpload('upload/image/town_house', formData)
      .then((res) => setImgUrl(res?.data?.data?.image))
      .catch((err) => {
        console.log('res_blob', err)
        ErrorToast(err?.message)
      })
  }
  const imageChangeVil = async (e: any) => {
    let file = e.target.files[0]
    let fileURL = URL.createObjectURL(file)
    file.fileURL = fileURL
    let formData = new FormData()
    formData.append('image', file)
    await ApiUpload('upload/image/villa', formData)
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
      // const body = {...formData, managerId: '6329ee43396e812bcc0964e5'}
      const body = {
        unitNo: formData?.unitNo,
        bedrooms: formData?.bedrooms,
        size: formData?.size,
        sizeType: formData?.sizeType,
        occupy: formData?.OccupancyType,
        images: [imgUrl],
        unitType: 'town_house',
        premiseNo: formData?.premiseNo,
        managerId: formData?.propertyManager,
        propertyId: formData?.propertyId,
        propertyAreaId: formData?.floorId,
      }
      ApiPost('cooperate/properties_area_unit', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building()
          console.log('addProperty', res)
          setShowCreateAppModal(false)
          setFormData({propertyId: window.location.pathname?.split('/')[2]})
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
        occupy: formData?.OccupancyType,
        images: [imgUrl],
        unitType: 'villa',
        premiseNo: formData?.premiseNo,
        managerId: formData?.propertyManager,
        propertyId: formData?.propertyId,
        propertyAreaId: formData?.floorId,
      }
      ApiPost('cooperate/properties_area_unit', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building()
          console.log('addProperty', res)
          setShowCreateAppModal(false)
          setFormData({propertyId: window.location.pathname?.split('/')[2]})
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
        images: [imgUrl],
        unitType: 'common_area',
        premiseNo: formData?.premiseNo,
        managerId: formData?.propertyManager,
        propertyId: formData?.propertyId,
        propertyAreaId: formData?.floorId,
      }
      ApiPost('cooperate/properties_area_unit', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building()
          console.log('addProperty', res)
          setShowCreateAppModal(false)
          setFormData({propertyId: window.location.pathname?.split('/')[2]})
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
        occupy: formData?.OccupancyType,
        images: [imgUrl],
        unitType: formData?.unitType,
        premiseNo: formData?.premiseNo,
        managerId: formData?.propertyManager,
        propertyId: formData?.propertyId,
        propertyAreaId: formData?.floorId,
      }
      ApiPost('cooperate/properties_area_unit', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building()
          console.log('addProperty', res)
          setShowCreateAppModal(false)
          setFormData({propertyId: window.location.pathname?.split('/')[2]})
        })
        .catch((err) => ErrorToast(err.message))
    }
  }
  const getHeaderfData = () => {
    ApiGet(`cooperate/unit_group/${formData?.floorId}`)
      .then((res) => {
        console.log('res22222222', res?.data?.data[0]?.clusterId)
        setClusterId(res?.data?.data[0]?.clusterId)
      })
      .catch((err) => console.log('err', err))
  }
  const getCluster = () => {
    ApiGet(`cooperate/cluster/${clusterId}`)
      .then((res) => {
        console.log('res22222222', res?.data?.data[0]?.clusterId)
        setHeader(res?.data?.data)
      })
      .catch((err) => console.log('err', err))
  }
  const getHeaderbData = () => {
    ApiGet(`cooperate/communities/${formData?.propertyId}`)
      .then((res) => {
        console.log('res', res?.data?.data)
        setHeaderB(res?.data?.data)
      })
      .catch((err) => console.log('err', err))
  }

  useEffect(() => {
    building()
    getCluster()
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
  }, [isEdit, page])

  const navigate = useNavigate()
  return (
    <>
      <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
        {/* <div className='d-flex flex-column flex-column-fluid'> */}
        {/* <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'> */}
        <div id='' className='app-container container-xxl flex-stack pt-0 mt-0'>
          <div className=' container  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap'>
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
                      onClick={() => navigate('/building')}
                    >
                      Communities
                    </a>
                  </li>
                  <li className='breadcrumb-item '>
                    <a
                      className='text-muted px-2 cursor-pointer'
                      // onClick={() => navigate('/building')}
                      onClick={() => navigate(`/areaCom/${window.location.pathname.split('/')[2]}`)}
                    >
                      Clusters
                    </a>
                  </li>
                  {/* <li className='breadcrumb-item '>
                          <a
                            className='text-muted px-2 cursor-pointer'
                            // onClick={() => navigate('/building')}
                            onClick={() =>
                              navigate(
                                `/unitsmcom/${window.location.pathname.split('/')[2]}/${
                                  window.location.pathname.split('/')[3]
                                }`
                              )
                            }
                          >
                            Mixed Clusters
                          </a>
                        </li> */}
                  <li className='breadcrumb-item  active'>
                    <a className='px-2'>Unit </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='card card-flush'>
            <Row>
              <Col md={5}>
                <div className='container  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap mt-5'>
                  <h2>Units</h2>
                </div>
                <div className='container  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap mt-5'>
                  <h5 className='text-muted'>
                    Community{' '}
                    <span className='fw-semibold mx-5 text-uppercase' style={{color: 'black'}}>
                      {headerB[0]?.name}
                    </span>
                  </h5>
                </div>
                <div className='container  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap'>
                  <div className='d-flex align-items-center gap-2 gap-lg-3 my-7'>
                    <a
                      // onClick={() => setShowCreateAppModal(true)}
                      className='btn btn-sm fw-bold btn-primary btn-green'
                      data-bs-toggle='modal'
                      data-bs-target='#kt_modal_create_app'
                      onClick={() => {
                        // localStorage.setItem('propertyId', window.location.pathname?.split('/')[2])
                        // localStorage.setItem('floorId', window.location.pathname?.split('/')[3])
                        navigate(
                          `/unitComform1/${window.location.pathname?.split('/')[2]}/${
                            window.location.pathname?.split('/')[3]
                          }`
                        )
                      }}
                    >
                      Add Unit
                    </a>
                  </div>
                </div>
              </Col>
              <Col md={7} className='m-auto'>
                <div
                  className='card-header align-items-center py-5  gap-md-2 d-flex border-0 p-0'
                  style={{justifyContent: 'flex-start', flexWrap: 'wrap'}}
                >
                  <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                    <h6 className='mx-10 text-muted'>
                      Cluster Type{' '}
                      <span className='mx-1' style={{color: 'black'}}>
                        Units Cluster
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                    <h6 className='mx-10 text-muted'>
                      Cluster Name{' '}
                      <span className='mx-1' style={{color: 'black'}}>
                        {header[0]?.name}
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                    <h6 className='mx-10 text-muted'>
                      Total Unit{' '}
                      <span className='mx-1' style={{color: 'black'}}>
                        {header[0]?.totalUnits}
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                    <h6 className='mx-10 text-muted'>
                      Community Manager{' '}
                      <span className='mx-1' style={{color: 'black'}}>
                        {header[0]?.managerId}
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                    <h6 className='mx-10 text-muted'>
                      Total Townhouses{' '}
                      <span className='mx-1' style={{color: 'black'}}>
                        {header[0]?.totalTownHouse}
                      </span>
                    </h6>
                  </div>
                  <div className='  min-w-200px'>
                    <h6 className='mx-10 text-muted'>
                      Total Villas{' '}
                      <span className='mx-1' style={{color: 'black'}}>
                        {header[0]?.totalVilla}
                      </span>
                    </h6>
                  </div>
                  <div className='  min-w-200px'>
                    <h6 className='mx-10 text-muted'>
                      Total Common Areas{' '}
                      <span className='mx-1' style={{color: 'black'}}>
                        {header[0]?.totalCommonAreas}
                      </span>
                    </h6>
                  </div>
                  <div className='  min-w-200px'>
                    <h6 className='mx-10 text-muted'>
                      Total Other{' '}
                      <span className='mx-1' style={{color: 'black'}}>
                        {header[0]?.totalOthers}
                      </span>
                    </h6>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className='d-flex align-items-center gap-2 gap-lg-3'>
            {/* <ul className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2'>
              <li
                className='nav-item'
                onClick={() => {
                  //   setFormData({...formData, portfolio: 'overview'})
                  //   building(formData?.portfolioType, 'overview')
                  setPropertiType('Townhouse')
                }}
              >
                <a className='nav-link text-active-primary pb-4 active' data-bs-toggle='tab'>
                  <span className='svg-icon svg-icon-md svg-icon-primary'>
                    <img src={townhouse} alt='' width='20px' />{' '}
                  </span>
                  Townhouse
                </a>
              </li>
              <li
                className='nav-item'
                onClick={() => {
                  //   setFormData({...formData, portfolio: 'overview'})
                  //   building(formData?.portfolioType, 'overview')
                  setPropertiType('Villa')
                }}
              >
                <a className='nav-link text-active-primary pb-4' data-bs-toggle='tab'>
                  <span className='svg-icon svg-icon-md svg-icon-primary'>
                    <img src={villa} alt='' width='20px' />{' '}
                  </span>
                  Villa
                </a>
              </li>
              <li
                className='nav-item'
                onClick={() => {
                  //   setFormData({...formData, portfolio: 'overview'})
                  //   building(formData?.portfolioType, 'overview')
                  setPropertiType('CommonArea')
                }}
              >
                <a className='nav-link text-active-primary pb-4' data-bs-toggle='tab'>
                  <span className='svg-icon svg-icon-md svg-icon-primary'>
                    <img src={common_area} alt='' width='20px' />{' '}
                  </span>
                  Common Area
                </a>
              </li>
              <li
                className='nav-item'
                onClick={() => {
                  //   setFormData({...formData, portfolio: 'overview'})
                  //   building(formData?.portfolioType, 'overview')
                  setPropertiType('Other')
                }}
              >
                <a className='nav-link text-active-primary pb-4' data-bs-toggle='tab'>
                  <span className='svg-icon svg-icon-md svg-icon-primary'>
                    <img src={other} alt='' width='20px' />{' '}
                  </span>
                  Other
                </a>
              </li>
            </ul> */}
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
        </div>
        {/* <div
          className='app-container container-xxl d-flex flex-stack mt-0'
          style={{paddingTop: '30px'}}
        >
          <a
            // onClick={() => setShowCreateAppModal(true)}
            className='btn btn-sm fw-bold btn-primary btn-green'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_create_app'
            onClick={() => {
              // localStorage.setItem('propertyId', window.location.pathname?.split('/')[2])
              // localStorage.setItem('floorId', window.location.pathname?.split('/')[3])
              navigate(
                `/unitComform1/${window.location.pathname?.split('/')[2]}/${
                  window.location.pathname?.split('/')[3]
                }`
              )
            }}
          >
            Add Unit
          </a>
        </div> */}
        {/* {propertiType === 'Villa' && (
          <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
            <a
              // onClick={() => setShowCreateAppModal(true)}
              className='btn btn-sm fw-bold btn-primary btn-green'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_create_app'
              onClick={() => {
                setShowCreateAppModal(true)
              }}
            >
              Add Villa
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
              onClick={() => {
                setShowCreateAppModal(true)
              }}
            >
              Add Common Area
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
              onClick={() => {
                setShowCreateAppModal(true)
              }}
            >
              Add Other Area
            </a>
          </div>
        )} */}
        {/* </div> */}
        <div
          id='kt_app_content'
          className='app-content flex-column-fluid'
          style={{paddingTop: '0px'}}
        >
          <div id='kt_app_content_container' className='app-container container-xxl'>
            <div className='card card-flush mb-10'>
              {show && propertiType === 'Townhouse' && (
                <>
                  <h3 className='m-9'>Add New Townhouse</h3>
                  <div className='mx-10 mb-10 '>
                    <label htmlFor='exampleFormControlInput1' className='required form-label'>
                      Upload Image
                    </label>
                    <input
                      type='file'
                      className='form-control form-control-solid w-auto'
                      placeholder='Enter Unit No'
                      name='unitNo'
                      onChange={imageChange}
                      // value={formData?.unitNo}
                      // onChange={handleChnage}
                    />
                  </div>
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
                        placeholder='Enter Unit No'
                        name='unitNo'
                        value={formData?.unitNo}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Bedrooms
                      </label>
                      <input
                        type='number'
                        className='form-control form-control-solid'
                        placeholder='Enter Bedrooms'
                        name='bedrooms'
                        value={formData?.bedrooms}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Size
                      </label>
                      <input
                        type='number'
                        className='form-control form-control-solid'
                        placeholder='Enter Size'
                        name='size'
                        value={formData?.size}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
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
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Premise No
                      </label>
                      <input
                        type='number'
                        className='form-control form-control-solid'
                        placeholder='Enter Premise No'
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
                        placeholder='Enter Manager Id'
                        name='managerId'
                        value={formData?.managerId}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label className='required form-label'>
                        <span className=''>Occupancy</span>
                      </label>

                      <select
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
                      </select>
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Property Manager
                      </label>
                      <input
                        type='text'
                        className='form-control form-control-solid'
                        placeholder='Enter Manager Name'
                        name='propertyManager'
                        value={formData?.propertyManager}
                        onChange={handleChnage}
                      />
                    </div>
                  </div>
                  <div
                    className='d-flex align-items-center gap-2 gap-lg-3'
                    style={{alignSelf: 'end', marginBottom: '20px', marginRight: '30px'}}
                    //   style={{marginLeft: '30px'}}
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
                </>
              )}
              {showPen && propertiType === 'Villa' && (
                <>
                  <h3 className='m-9'>Add New Villa</h3>
                  <div className='mx-10 mb-10 '>
                    <label htmlFor='exampleFormControlInput1' className='required form-label'>
                      Upload Image
                    </label>
                    <input
                      type='file'
                      className='form-control form-control-solid w-auto'
                      placeholder='Enter Unit No'
                      name='unitNo'
                      onChange={imageChangeVil}
                      // value={formData?.unitNo}
                      // onChange={handleChnage}
                    />
                  </div>
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
                        placeholder='Enter Unit No'
                        name='unitNo'
                        value={formData?.unitNo}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Bedrooms
                      </label>
                      <input
                        type='number'
                        className='form-control form-control-solid'
                        placeholder='Enter Bedrooms'
                        name='bedrooms'
                        value={formData?.bedrooms}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Size
                      </label>
                      <input
                        type='number'
                        className='form-control form-control-solid'
                        placeholder='Enter Size'
                        name='size'
                        value={formData?.size}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
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
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Premise No
                      </label>
                      <input
                        type='number'
                        className='form-control form-control-solid'
                        placeholder='Enter Premise No'
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
                        placeholder='Enter Manager Id'
                        name='managerId'
                        value={formData?.managerId}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label className='required form-label'>
                        <span className=''>Occupancy</span>
                      </label>

                      <select
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
                      </select>
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Property Manager
                      </label>
                      <input
                        type='text'
                        className='form-control form-control-solid'
                        placeholder='Enter Manager Name'
                        name='propertyManager'
                        value={formData?.propertyManager}
                        onChange={handleChnage}
                      />
                    </div>
                  </div>
                  <div
                    className='d-flex align-items-center gap-2 gap-lg-3'
                    style={{alignSelf: 'end', marginBottom: '20px', marginRight: '30px'}}
                    //   style={{marginLeft: '30px'}}
                  >
                    <a
                      className='btn btn-sm fw-bold btn-primary btn-green'
                      data-bs-toggle='modal'
                      data-bs-target='#kt_modal_create_app'
                      onClick={handleSubmitPen}
                    >
                      Save
                    </a>
                  </div>
                </>
              )}
              {showCom && propertiType === 'CommonArea' && (
                <>
                  <h3 className='m-9'>Add New Common Area</h3>
                  <div className='mx-10 mb-10 '>
                    <label htmlFor='exampleFormControlInput1' className='required form-label'>
                      Upload Image
                    </label>
                    <input
                      type='file'
                      className='form-control form-control-solid w-auto'
                      placeholder='Enter Unit No'
                      name='unitNo'
                      onChange={imageChangeCom}
                      // value={formData?.unitNo}
                      // onChange={handleChnage}
                    />
                  </div>
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
                        placeholder='Enter Common Area Name'
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
                        placeholder='Enter Manager Id'
                        name='managerId'
                        value={formData?.managerId}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Property Manager
                      </label>
                      <input
                        type='text'
                        className='form-control form-control-solid'
                        placeholder='Enter Manager Name'
                        name='propertyManager'
                        value={formData?.propertyManager}
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
                  <div
                    className='d-flex align-items-center gap-2 gap-lg-3'
                    style={{alignSelf: 'end', marginBottom: '20px', marginRight: '30px'}}
                    //   style={{marginLeft: '30px'}}
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
                </>
              )}
              {showOth && propertiType === 'Other' && (
                <>
                  <h3 className='m-9'>Add New Other Area</h3>
                  <div className='mx-10 mb-10 '>
                    <label htmlFor='exampleFormControlInput1' className='required form-label'>
                      Upload Image
                    </label>
                    <input
                      type='file'
                      className='form-control form-control-solid w-auto'
                      placeholder='Enter Unit No'
                      name='unitNo'
                      onChange={imageChangeOth}
                      // value={formData?.unitNo}
                      // onChange={handleChnage}
                    />
                  </div>
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
                        placeholder='Enter Unit No'
                        name='unitNo'
                        value={formData?.unitNo}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Bedrooms
                      </label>
                      <input
                        type='number'
                        className='form-control form-control-solid'
                        placeholder='Enter Bedrooms'
                        name='bedrooms'
                        value={formData?.bedrooms}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label className='form-label fw-semibold'>Unit Type</label>
                      <div>
                        <input
                          type='text'
                          name='unitType'
                          className='form-control form-control-solid'
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
                      <input
                        type='number'
                        className='form-control form-control-solid'
                        placeholder='Enter Size'
                        name='size'
                        value={formData?.size}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
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
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Premise No
                      </label>
                      <input
                        type='number'
                        className='form-control form-control-solid'
                        placeholder='Enter Premise No'
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
                        placeholder='Enter Manager Id'
                        name='managerId'
                        value={formData?.managerId}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label className='required form-label'>
                        <span className=''>Occupancy</span>
                      </label>

                      <select
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
                      </select>
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Property Manager
                      </label>
                      <input
                        type='text'
                        className='form-control form-control-solid'
                        placeholder='Enter Manager Name'
                        name='propertyManager'
                        value={formData?.propertyManager}
                        onChange={handleChnage}
                      />
                    </div>
                  </div>
                  <div
                    className='d-flex align-items-center gap-2 gap-lg-3'
                    style={{alignSelf: 'end', marginBottom: '20px', marginRight: '30px'}}
                    //   style={{marginLeft: '30px'}}
                  >
                    <a
                      className='btn btn-sm fw-bold btn-primary btn-green'
                      data-bs-toggle='modal'
                      data-bs-target='#kt_modal_create_app'
                      onClick={handleSubmitOth}
                    >
                      Save
                    </a>
                  </div>
                </>
              )}
            </div>

            {/* <div className='card-header align-items-center py-5  gap-md-2 text-center'>
                <div className='mb-10  min-w-200px'>
                  <h5 className='gray-500'>
                    Community Name: <span className='fw-semibold'>abc</span>
                  </h5>
                </div>
                <div className='mb-10  min-w-200px'>
                  <h5 className='gray-500'>
                    Area: <span className='fw-semibold'>mnq</span>
                  </h5>
                </div>
                <div className='mb-10  min-w-200px'>
                  <h5 className='gray-500'>
                    Total Properties: <span className='fw-semibold'>1</span>
                  </h5>
                </div>
                <div className='mb-10  min-w-200px'>
                  <h5 className='gray-500'>
                    Total Townhouses: <span className='fw-semibold'>2</span>
                  </h5>
                </div>
                <div className='mb-10 min-w-200px'>
                  <h5 className='gray-500'>
                    Total villas: <span className='fw-semibold'>2</span>
                  </h5>
                </div>
                <div className='mb-10  min-w-200px'>
                  <h5 className='gray-500'>
                    Total Common Areas: <span className='fw-semibold'>5</span>
                  </h5>
                </div>
                <div className='mb-10  min-w-200px'>
                  <h5 className='gray-500'>
                    Total Other: <span className='fw-semibold'>0</span>
                  </h5>
                </div>
                <div className='mb-10  min-w-200px'>
                  <h5 className='gray-500'>
                    Community Manager: <span className='fw-semibold'>xyz</span>
                  </h5>
                </div>
              </div> */}

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
                    <th className='text-center min-w-100px'> Unit ID </th>
                    <th className='text-center min-w-100px'> Unit No. </th>
                    <th className='text-center min-w-100px'> Unit Type </th>
                    <th className='text-center min-w-100px'> Bedrooms </th>
                    <th className='text-center min-w-100px'> Size </th>
                    <th className='text-center min-w-100px'> Premise No. </th>
                    <th className='text-center min-w-100px'> Occupancy </th>
                    <th className='text-center min-w-100px'> Property Manager</th>
                    <th className='text-center min-w-100px'>Tenancy Status</th>

                    <th className='text-end min-w-100px'>Actions</th>
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
                            {v?.id}
                          </td>
                          <td className='text-center'>{v?.unitNo}</td>
                          <td className='text-center'>
                            {v?.unitType === 'town_house'
                              ? 'TownHouse'
                              : v?.unitType === 'villa'
                              ? 'Villa'
                              : v?.unitType === 'common_area'
                              ? 'Common Area'
                              : v?.unitType}
                          </td>
                          <td className='text-center'>{v?.bedrooms}</td>
                          <td className='text-center '>
                            {v?.size}{' '}
                            <span className='fst-italic'>
                              {v?.sizeType == '0' ? 'Sq ft' : 'sq m'}
                            </span>
                          </td>
                          <td className='text-center'>{v?.premiseNo}</td>
                          <td className='text-center'>
                            {v?.occupy == '0' ? 'Vacant ' : 'Occupied'}
                          </td>
                          <td className='text-center'>{v?.managerId}</td>
                          <td className='text-center'>
                            {v?.id !== null ? (
                              (v?.occupy == '0' && v?.tenancyStatus === 3) ||
                              (v?.occupy == '0' && v?.tenancyStatus === 5) ? (
                                <a
                                  // onClick={() => setShowCreateAppModal(true)}
                                  className='btn btn-sm fw-bold btn-primary btn-green'
                                  data-bs-toggle='modal'
                                  data-bs-target='#kt_modal_create_app'
                                  style={{width: '145px'}}
                                  // onClick={handleSubmitCom}
                                  onClick={() => {
                                    // setShowCreateAppModal(true)
                                    localStorage.setItem(
                                      'CommunityId',
                                      window.location.pathname?.split('/')[2]
                                    )
                                    localStorage.setItem(
                                      'ClusterId',
                                      window.location.pathname?.split('/')[3]
                                    )
                                    localStorage.setItem('UnitId', v?._id)
                                    // setPropertiType('tenancy')
                                    navigate('/create-tenancy')
                                  }}
                                >
                                  Create Tenancy
                                </a>
                              ) : (v?.occupy == '1' && v?.tenancyStatus === 3) ||
                                (v?.occupy == '1' && v?.tenancyStatus === 5) ? (
                                <a
                                  // onClick={() => setShowCreateAppModal(true)}
                                  className='btn btn-sm fw-bold btn-primary btn-green'
                                  data-bs-toggle='modal'
                                  data-bs-target='#kt_modal_create_app'
                                  // onClick={handleSubmitCom}
                                  style={{width: '145px'}}
                                  onClick={() => {
                                    localStorage.setItem(
                                      'CommunityId',
                                      window.location.pathname?.split('/')[2]
                                    )
                                    localStorage.setItem(
                                      'ClusterId',
                                      window.location.pathname?.split('/')[3]
                                    )
                                    localStorage.setItem('UnitId', v?._id)
                                    // setShowCreateAppModal(true)
                                    // setPropertiType('tenancy')
                                    navigate('/create-tenancy')
                                  }}
                                >
                                  Create Tenancy <BsExclamationCircleFill color='#fdfd0a' />
                                </a>
                              ) : v?.tenancyStatus === 0 ? (
                                <a
                                  // onClick={() => setShowCreateAppModal(true)}
                                  className='btn btn-sm fw-bold btn-primary btn-green'
                                  data-bs-toggle='modal'
                                  data-bs-target='#kt_modal_create_app'
                                  style={{width: '145px'}}
                                  // onClick={handleSubmitCom}
                                  // onClick={() => {
                                  //   // setShowCreateAppModal(true)
                                  //   localStorage.setItem(
                                  //     'CommunityId',
                                  //     window.location.pathname?.split('/')[2]
                                  //   )
                                  //   localStorage.setItem(
                                  //     'ClusterId',
                                  //     window.location.pathname?.split('/')[3]
                                  //   )
                                  //   localStorage.setItem('UnitId', v?._id)
                                  //   // setPropertiType('tenancy')
                                  //   navigate('/create-tenancy')
                                  // }}
                                >
                                  Booked
                                </a>
                              ) : v?.tenancyStatus === 1 ? (
                                <a
                                  // onClick={() => setShowCreateAppModal(true)}
                                  className='btn btn-sm fw-bold btn-primary btn-green'
                                  data-bs-toggle='modal'
                                  data-bs-target='#kt_modal_create_app'
                                  style={{width: '145px'}}
                                  // onClick={handleSubmitCom}
                                  // onClick={() => {
                                  //   // setShowCreateAppModal(true)
                                  //   localStorage.setItem(
                                  //     'CommunityId',
                                  //     window.location.pathname?.split('/')[2]
                                  //   )
                                  //   localStorage.setItem(
                                  //     'ClusterId',
                                  //     window.location.pathname?.split('/')[3]
                                  //   )
                                  //   localStorage.setItem('UnitId', v?._id)
                                  //   // setPropertiType('tenancy')
                                  //   navigate('/create-tenancy')
                                  // }}
                                >
                                  Active
                                </a>
                              ) : v?.tenancyStatus === 2 ? (
                                <a
                                  // onClick={() => setShowCreateAppModal(true)}
                                  className='btn btn-sm fw-bold btn-primary btn-green'
                                  data-bs-toggle='modal'
                                  data-bs-target='#kt_modal_create_app'
                                  style={{width: '145px'}}
                                  // onClick={handleSubmitCom}
                                  // onClick={() => {
                                  //   // setShowCreateAppModal(true)
                                  //   localStorage.setItem(
                                  //     'CommunityId',
                                  //     window.location.pathname?.split('/')[2]
                                  //   )
                                  //   localStorage.setItem(
                                  //     'ClusterId',
                                  //     window.location.pathname?.split('/')[3]
                                  //   )
                                  //   localStorage.setItem('UnitId', v?._id)
                                  //   // setPropertiType('tenancy')
                                  //   navigate('/create-tenancy')
                                  // }}
                                >
                                  Expiring
                                </a>
                              ) : (
                                <a
                                  // onClick={() => setShowCreateAppModal(true)}
                                  className='btn btn-sm fw-bold btn-primary btn-green'
                                  data-bs-toggle='modal'
                                  data-bs-target='#kt_modal_create_app'
                                  style={{width: '145px'}}
                                  // onClick={handleSubmitCom}
                                  // onClick={() => {
                                  //   // setShowCreateAppModal(true)
                                  //   localStorage.setItem(
                                  //     'CommunityId',
                                  //     window.location.pathname?.split('/')[2]
                                  //   )
                                  //   localStorage.setItem(
                                  //     'ClusterId',
                                  //     window.location.pathname?.split('/')[3]
                                  //   )
                                  //   localStorage.setItem('UnitId', v?._id)
                                  //   // setPropertiType('tenancy')
                                  //   navigate('/create-tenancy')
                                  // }}
                                >
                                  Renewed
                                </a>
                              )
                            ) : (
                              '-'
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
                                  // }}
                                  onClick={() =>
                                    navigate(
                                      `/unitComUpform1/${window.location.pathname?.split('/')[2]}/${
                                        window.location.pathname?.split('/')[3]
                                      }/${v?._id}`
                                    )
                                  }
                                  className='menu-link px-3'
                                >
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  href='#/action-2'
                                  onClick={() => {
                                    swal
                                      .fire({
                                        text: 'Are you sure you want to permanently delete this unit? Deleting this unit will delete all the data registered under the unit.',
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
                      <td colSpan={10} className='text-center'>
                        <img src={noData} alt='' width={350} />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className='row mb-5'>
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
      />
    </>
  )
}

export default UnitsCom1
