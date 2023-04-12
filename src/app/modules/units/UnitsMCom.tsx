import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ApiDelete, ApiGet, ApiPost, ApiPut, ApiUpload} from '../../../apiCommon/helpers/API/ApiData'
import {ErrorToast, SuccessToast} from '../../../apiCommon/helpers/Toast'
import swal from 'sweetalert2'
import AddUnits from './AddUnits'
import appartment from '../../../img/Apartment.svg'
import penthouse from '../../../img/PentHouse.svg'
import common_area from '../../../img/common_area.svg'
import {TbChevronDown} from 'react-icons/tb'
import other from '../../../img/other.svg'
import SVG from 'react-inlinesvg'
import {toAbsoluteUrl} from '../../../apiCommon/helpers/AssetsHelpers'
import {Col, Dropdown, Row} from 'react-bootstrap'
import AddUnitsCluster from './Addcluster'

const UnitsMCom = () => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [tableData, setTableData] = useState([])
  const [table, setTable] = useState([])
  const [updateDataId, setUpdateDataId] = useState('')
  const [propertiType, setPropertiType] = useState('Unit')
  const [add, setAdd] = useState(0)
  const [show, setShow] = useState(false)
  const [showPen, setShowPen] = useState(false)
  const [showCom, setShowCom] = useState(false)
  const [showOth, setShowOth] = useState(false)
  const [imgUrl, setImgUrl] = useState([])
  const [header, setHeader] = useState<any>({})
  const [pageLimit, setPageLimit] = useState<any>(1)

  const [headerB, setHeaderB] = useState<any>([])
  const [page, setPage] = useState<any>(1)
  console.log('🚀 ~ file: Building.tsx ~ line 10 ~ Building ~ updateDataId', updateDataId)
  const [isEdit, setIsEdit] = useState(false)
  console.log('🚀 ~ file: Building.tsx ~ line 12 ~ Building ~ isEdit', isEdit)
  const [formData, setFormData] = useState<any>({
    propertyId: window.location.pathname?.split('/')[2],
    propertyAreaId: window.location.pathname?.split('/')[3],
  })
  console.log('formData', window.location.pathname?.split('/')[3])

  const handleChnage = (e: any) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const building = async () => {
    const body = {
      page: page,
      limit: 100,
      clusterId: window.location.pathname?.split('/')[3],
    }
    await ApiPost(`cooperate/unit_group/get`, body)
      .then((res) => {
        setTableData(res?.data?.data?.unit_group_data)
        setPageLimit(res?.data?.data?.state?.page_limit)
        console.log('res', res)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const buildingData = async () => {
    const body = {
      page: page,
      limit: 100,
      type: 1,
      clusterId: window.location.pathname?.split('/')[3],
    }
    await ApiPost(`cooperate/building/get`, body)
      .then((res) => {
        // setTableData(res?.data?.data?.building_data)
        setTable(res?.data?.data?.building_data)
        console.log('res', res)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const deleteProperty = (id: any) => {
    console.log('deleteProperty', id)
    ApiDelete(`cooperate/unit_group/${id}`)
      .then((res: any) => {
        SuccessToast(res?.data?.message)
        building()
        buildingData()
      })
      .catch((err) => ErrorToast(err.message))
  }
  const deleteProperty1 = (id: any) => {
    console.log('deleteProperty', id)
    ApiDelete(`cooperate/building/${id}`)
      .then((res: any) => {
        SuccessToast(res?.data?.message)
        building()
        buildingData()
      })
      .catch((err) => ErrorToast(err.message))
  }

  const editBtn = (id: any) => {
    setPropertiType('Unit')
    setUpdateDataId(id)
    setIsEdit(true)
    setShowCreateAppModal(true)

    ApiGet(`cooperate/unit_group/${id}`)
      .then((res) => {
        console.log('res', res?.data?.data[0])
        setFormData(res?.data?.data[0])
      })
      .catch((err) => console.log('err', err))
  }
  const editBtn2 = (id: any) => {
    setPropertiType('Building')
    setUpdateDataId(id)
    setIsEdit(true)
    setShowCreateAppModal(true)

    ApiGet(`cooperate/building/${id}`)
      .then((res) => {
        console.log('res', res?.data?.data)
        setFormData(res?.data?.data)
      })
      .catch((err) => console.log('err', err))
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
      // const body = {...formData, managerId: '6329ee43396e812bcc0964e5', id: updateDataId}
      if (propertiType === 'Unit') {
        const body = {
          id: updateDataId,
          name: formData?.name,
          totalUnits: formData?.totalUnits,
          clusterId: window.location.pathname?.split('/')[3],
          managerId: 'max',
          communityId: window.location.pathname?.split('/')[2],
        }
        ApiPut('cooperate/unit_group', body)
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
          id: updateDataId,
          name: formData?.name,
          totalUnits: formData?.totalUnits,
          clusterId: window.location.pathname?.split('/')[3],
          managerId: 'max',
          communityId: window.location.pathname?.split('/')[2],
        }
        ApiPut('cooperate/building', body)
          .then((res) => {
            SuccessToast(res?.data?.message)
            building()
            setIsEdit(false)
            console.log('addProperty', res)
            setShowCreateAppModal(false)
            setFormData({propertyId: window.location.pathname?.split('/')[2]})
          })
          .catch((err) => ErrorToast(err.message))
      }
    } else {
      // const body = {...formData, managerId: '6329ee43396e812bcc0964e5', images: [imgUrl]}
      if (add === 0) {
        const body = {
          // unitNo: formData?.unitNo,
          // bedrooms: formData?.bedrooms,
          // size: formData?.size,
          // sizeType: formData?.sizeType,
          // occupy: formData?.OccupancyType,
          // images: imgUrl,
          // unitType: 'apartment',
          // premiseNo: formData?.premiseNo,
          // managerId: formData?.managerId,
          // propertyId: formData?.propertyId,
          // propertyAreaId: formData?.floorId,
          name: formData?.name,
          totalUnits: formData?.totalUnits,
          clusterId: window.location.pathname?.split('/')[3],
          managerId: 'max',
          communityId: window.location.pathname?.split('/')[2],
        }
        console.log('formData', formData)
        console.log('body', body)
        ApiPost('cooperate/unit_group', body)
          .then((res) => {
            SuccessToast(res?.data?.message)
            building()
            buildingData()
            console.log('addProperty', res)
            setShowCreateAppModal(false)
            setFormData({propertyId: window.location.pathname?.split('/')[2]})
          })
          .catch((err) => ErrorToast(err.message))
      } else {
        const body = {
          // unitNo: formData?.unitNo,
          // bedrooms: formData?.bedrooms,
          // size: formData?.size,
          // sizeType: formData?.sizeType,
          // occupy: formData?.OccupancyType,
          // images: imgUrl,
          // unitType: 'apartment',
          // premiseNo: formData?.premiseNo,
          // managerId: formData?.managerId,
          // propertyId: formData?.propertyId,
          // propertyAreaId: formData?.floorId,
          name: formData?.name,
          totalFloors: formData?.totalFloors,
          type: 1,
          clusterId: window.location.pathname?.split('/')[3],
          managerId: 'max',
          communityId: window.location.pathname?.split('/')[2],
        }
        console.log('formData', formData)
        console.log('body', body)
        ApiPost('cooperate/building', body)
          .then((res) => {
            SuccessToast(res?.data?.message)
            building()
            buildingData()
            console.log('addProperty', res)
            setShowCreateAppModal(false)
            setFormData({propertyId: window.location.pathname?.split('/')[2]})
          })
          .catch((err) => ErrorToast(err.message))
      }
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
        unitType: 'penthouse',
        images: [imgUrl],
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
        unitType: 'common_area ',
        images: [imgUrl],
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
    ApiGet(`cooperate/communities/${window.location.pathname?.split('/')[2]}`)
      .then((res) => {
        console.log('res', res?.data?.data)
        setHeader(res?.data?.data)
      })
      .catch((err) => console.log('err', err))
  }
  const getHeaderbData = () => {
    ApiGet(`cooperate/cluster/${window.location.pathname?.split('/')[3]}`)
      .then((res) => {
        console.log('res', res?.data?.data)
        setHeaderB(res?.data?.data)
      })
      .catch((err) => console.log('err', err))
  }

  useEffect(() => {
    building()
    buildingData()
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
                <li className='breadcrumb-item '>
                  <a
                    className='text-muted px-2 cursor-pointer'
                    // onClick={() => navigate('/building')}
                    onClick={() => navigate(`/areaCom/${window.location.pathname.split('/')[2]}`)}
                  >
                    {/* {info[0]?.name} */}Clusters
                  </a>
                </li>
                <li className='breadcrumb-item active'>
                  <a
                    className=' px-2 cursor-pointer'
                    // onClick={() => navigate('/building')}
                    // onClick={() =>
                    //   navigate(
                    //     `/unitscom/${window.location.pathname.split('/')[2]}/${
                    //       window.location.pathname.split('/')[3]
                    //     }`
                    //   )
                    // }
                  >
                    {/* {info[0]?.name} */}Mixed Clusters
                  </a>
                </li>
                {/* <li className='breadcrumb-item  active'>
                          <a className='px-2'>Add</a>
                        </li> */}
              </ul>
            </div>
          </div>
          <div className='card card-flush'>
            <Row>
              <Col md={5}>
                <div className=' container  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap '></div>
                <div className='container  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap mt-5'>
                  <h2>Mixed Clusters</h2>
                </div>
                <div className='container  d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap mt-5 pb-5'>
                  <h5 className='text-muted'>
                    Community{' '}
                    <span className='fw-semibold mx-5 text-uppercase' style={{color: 'black'}}>
                      {header[0]?.name}
                    </span>
                  </h5>
                </div>
              </Col>
              <Col md={7} className='m-auto'>
                <div
                  className='card-header align-items-center py-5  gap-md-2 d-flex border-0 p-0'
                  style={{justifyContent: 'end', flexWrap: 'wrap'}}
                >
                  <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                    <h6 className='mx-10 text-muted'>
                      Cluster Type{' '}
                      <span className='mx-1' style={{color: 'black'}}>
                        Mixed Cluster
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
                      Total Units{' '}
                      <span className='mx-1' style={{color: 'black'}}>
                        {headerB[0]?.totalUnits}
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                    <h6 className='mx-10 text-muted'>
                      Community Manager{' '}
                      <span className='mx-1' style={{color: 'black'}}>
                        Max
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
          {/* <div className='card-header align-items-center py-5  gap-md-2 text-center pt-15'>
              <div className='mb-5 min-w-200px'>
                <h4 className='border text-center p-5'>
                  Community Name : <span className='fw-semibold'>{header[0]?.name}</span>
                </h4>
              </div>
              <div className='mb-5 min-w-200px'>
                <h4 className='border text-center p-5'>
                  Cluster Type: <span className='fw-semibold'>Mixed Cluster</span>
                </h4>
              </div>
              <div className='mb-5 min-w-200px'>
                <h4 className='border text-center p-5'>
                  Cluster Name: <span className='fw-semibold'>{headerB[0]?.name}</span>
                </h4>
              </div>
              <div className='mb-5 min-w-200px'>
                <h4 className='border text-center p-5'>
                  Total Units: <span className='fw-semibold'>{headerB[0]?.totalUnits}</span>
                </h4>
              </div>
              <div className='mb-5 min-w-200px'>
                <h4 className='border text-center p-5'>
                  Community Manager: <span className='fw-semibold'>Max</span>
                </h4>
              </div>
            </div> */}

          {/* <div className='d-flex align-items-center gap-2 gap-lg-3'>
            <ul className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2'>
              <li
                className='nav-item'
                onClick={() => {
                  //   setFormData({...formData, portfolio: 'overview'})
                  //   building(formData?.portfolioType, 'overview')
                  setPropertiType('Apartment')
                }}
              >
                <a className='nav-link text-active-primary pb-4 active' data-bs-toggle='tab'>
                  <span className='svg-icon svg-icon-md svg-icon-primary'>
                    <img src={appartment} alt='' width='20px' />{' '}
                  </span>
                  Apartment
                </a>
              </li>
              <li
                className='nav-item'
                onClick={() => {
                  //   setFormData({...formData, portfolio: 'overview'})
                  //   building(formData?.portfolioType, 'overview')
                  setPropertiType('Penthouse')
                }}
              >
                <a className='nav-link text-active-primary pb-4' data-bs-toggle='tab'>
                  <span className='svg-icon svg-icon-md svg-icon-primary'>
                    <img src={penthouse} alt='' width='20px' />{' '}
                  </span>
                  Penthouse
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
            </ul>
          </div> */}
        </div>

        <div
          className='app-container container-xxl d-flex flex-stack mt-0'
          style={{paddingTop: '30px', justifyContent: 'flex-start'}}
        >
          <a
            // onClick={() => setShowCreateAppModal(true)}
            className='btn btn-sm fw-bold btn-primary btn-green mx-2'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_create_app'
            onClick={() => {
              setPropertiType('Unit')
              setShowCreateAppModal(true)
              setAdd(0)
              // localStorage.setItem('propertyId', window.location.pathname?.split('/')[2])
              // localStorage.setItem('floorId', window.location.pathname?.split('/')[3])
              //   navigate(
              //     `/unitbform/${window.location.pathname?.split('/')[2]}/${
              //       window.location.pathname?.split('/')[3]
              //     }`
              //   )
            }}
          >
            Add Unit Group
          </a>
          <a
            // onClick={() => setShowCreateAppModal(true)}
            className='btn btn-sm fw-bold btn-primary btn-green mx-2'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_create_app'
            onClick={() => {
              setPropertiType('Building')
              setShowCreateAppModal(true)
              setAdd(1)
              // localStorage.setItem('propertyId', window.location.pathname?.split('/')[2])
              // localStorage.setItem('floorId', window.location.pathname?.split('/')[3])
              //   navigate(
              //     `/unitbform/${window.location.pathname?.split('/')[2]}/${
              //       window.location.pathname?.split('/')[3]
              //     }`
              //   )
            }}
          >
            Add Building
          </a>
        </div>

        {propertiType === 'Penthouse' && (
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
              Add Penthouse
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
        )}
        {/* </div> */}
        <div
          id='kt_app_content'
          className='app-content flex-column-fluid pt-0'
          style={{paddingTop: '0px'}}
        >
          <div id='kt_app_content_container' className='app-container container-xxl'>
            <div className='card card-flush mb-10'>
              {show && propertiType === 'Apartment' && (
                <>
                  <h3 className='m-9'>Add New Apartment</h3>
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
                </>
              )}
              {showPen && propertiType === 'Penthouse' && (
                <>
                  <h3 className='m-9'>ADD NEW PENTHOUSE</h3>
                  <div className='mx-10 mb-10 '>
                    <label htmlFor='exampleFormControlInput1' className='required form-label'>
                      Upload Image
                    </label>
                    <input
                      type='file'
                      className='form-control form-control-solid w-auto'
                      placeholder='Enter Unit No'
                      name='unitNo'
                      onChange={imageChangePen}
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
                  </div>
                </>
              )}
              {showCom && propertiType === 'CommonArea' && (
                <>
                  <h3 className='m-9'>ADD NEW COMMON AREA</h3>
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
                </>
              )}
              {showOth && propertiType === 'Other' && (
                <>
                  <h3 className='m-9'>ADD NEW OTHER AREA</h3>
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
                  </div>
                </>
              )}
            </div>

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
                    <th className='text-center min-w-100px'>Mixed Cluster Type </th>
                    <th className='text-center min-w-100px'> Name</th>
                    <th className='text-center min-w-100px'>Total Units</th>
                    <th className='text-center min-w-100px'></th>

                    <th className='text-end min-w-100px'></th>
                  </tr>
                </thead>
                <tbody className='fw-semibold text-gray-800'>
                  {tableData?.map((v: any, i: any) => {
                    return (
                      <tr>
                        {/* <td>
                        <div className='form-check form-check-sm form-check-custom form-check-solid'>
                          <input className='form-check-input' type='checkbox' value='1' />
                        </div>
                      </td> */}
                        <td className='text-center'>{i + 1}</td>
                        <td data-kt-ecommerce-order-filter='order_id' className='text-center'>
                          {v?.areaType ? 'Building' : 'Units Group'}
                        </td>
                        <td className='text-center'>{v?.name}</td>
                        <td className='text-center'>{v?.totalUnits}</td>
                        <td className='text-center'>
                          {v?.areaType === 'zone' ? (
                            <a
                              onClick={() => navigate(`/area/${v?._id}`)}
                              className='btn btn-sm fw-bold btn-primary btn-green'
                              // style={{color: '#15ac8e', cursor: 'pointer'}}
                            >
                              Buildings
                            </a>
                          ) : (
                            <a
                              onClick={() =>
                                navigate(
                                  `/unitscom1/${window.location.pathname?.split('/')[2]}/${v?._id}`
                                )
                              }
                              className='btn btn-sm fw-bold btn-primary btn-green'
                              // style={{color: '#15ac8e', cursor: 'pointer'}}
                              style={{width: '90px'}}
                            >
                              Units
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
                  })}
                  {table?.map((v: any, i: any) => {
                    return (
                      <tr>
                        {/* <td>
                        <div className='form-check form-check-sm form-check-custom form-check-solid'>
                          <input className='form-check-input' type='checkbox' value='1' />
                        </div>
                      </td> */}
                        <td className='text-center'>{i + 1}</td>
                        <td data-kt-ecommerce-order-filter='order_id' className='text-center'>
                          Building
                        </td>
                        <td className='text-center'>{v?.name}</td>
                        <td className='text-center'>{v?.totalFloors}</td>
                        <td className='text-center'>
                          <a
                            onClick={() => navigate(`/area/${v?._id}`)}
                            className='btn btn-sm fw-bold btn-primary btn-green'
                            style={{width: '90px'}}
                          >
                            Floors
                          </a>
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
                                onClick={() => {
                                  editBtn2(v?._id)
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
                                        deleteProperty1(v?._id)
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
                  })}
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
      <AddUnitsCluster
        show={showCreateAppModal}
        handleClose={() => {
          setShowCreateAppModal(false)
          setFormData({})
        }}
        building={building}
        updateDataId={updateDataId}
        isEdit={isEdit}
        formData={formData}
        setAdd={setAdd}
        propertiType={propertiType}
        handleSubmit={handleSubmit}
        handleChnage={handleChnage}
        imageChange={imageChange}
      />
    </>
  )
}

export default UnitsMCom
