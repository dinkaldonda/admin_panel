import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {
  ApiDelete,
  ApiGet,
  ApiGetNoAuth,
  ApiPost,
  ApiPut,
  ApiUpload,
} from '../../../apiCommon/helpers/API/ApiData'
import {ErrorToast, SuccessToast} from '../../../apiCommon/helpers/Toast'
import {Col, Row} from 'react-bootstrap'
import TenanciesFilter from './TenanciesFilter'
import {Modal} from 'react-bootstrap'
import {KTSVG} from '../../../_metronic/helpers'
import {AiFillDelete} from 'react-icons/ai'
import swal from 'sweetalert2'
import {DatePicker} from 'antd'
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons'
import {Button, Form, Input, Space} from 'antd'
import ReactPhoneInput from 'react-phone-input-2'
import 'antd/dist/antd.css'
import 'react-phone-input-2/lib/style.css'
import type {RangePickerProps} from 'antd/es/date-picker'
import moment from 'moment'
import PhoneInput from 'react-phone-input-2'

const CreateTenancy = () => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [showCheange, setShowCheange] = useState<boolean>(false)
  const [tableData, setTableData] = useState([])
  const [country, setCountry] = useState([])
  const [updateDataId, setUpdateDataId] = useState('')
  const [showModal, setShowModal] = useState<any>('Filter')
  const [type, setType] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [totalDays, setTotalDays] = useState('0 Days')
  console.log('totalDays', totalDays)
  const [propertiType, setPropertiType] = useState('Tenancy')
  const [payment, setPayment] = useState<number>(0)
  const [option, setOption] = useState(1)
  const [imgPassport, setImgPassport] = useState('')
  const [imgId, setImgId] = useState('')
  const [imgResidency, setImgResidency] = useState('')
  const [imgContract, setImgContract] = useState('')
  const [imgOther, setImgOther] = useState('')
  const [imgOtherT, setImgOtherT] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [arry, setArry] = useState<any>([])
  const [create, setCreate] = useState<any>(false)
  const [header, setHeader] = useState<any>({})
  const [unitData, setUnitData] = useState<any>([])
  const [optionArry, setOptionArry] = useState<any>([])
  const [headerB, setHeaderB] = useState<any>([])
  console.log('🚀 ~ file: Building.tsx ~ line 10 ~ Building ~ updateDataId', updateDataId)
  const [isEdit, setIsEdit] = useState(false)
  console.log('🚀 ~ file: Building.tsx ~ line 12 ~ Building ~ isEdit', isEdit)
  const [formData, setFormData] = useState<any>({
    propertyId: window.location.pathname?.split('/')[2],
    propertyAreaId: window.location.pathname?.split('/')[3],
  })
  const [tenancyData, setTenancyData] = useState<any>({})
  const [paymentData, setPaymentData] = useState<any>({})
  const [bank, setBank] = useState<any>({})
  const [card, setCard] = useState<any>({})

  const [subTenant, setSubTenant] = useState<any>({})
  const [value, setValue] = useState('')
  console.log('value', value)
  const [subTenantData, setSubTenantData] = useState<any>([])
  console.log('popData', formData)
  const {RangePicker} = DatePicker
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day')
  }
  const dateFormat = 'YYYY-MM-DD'
  const handleChnage = (e: any) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }
  const handleChnageTenancy = (e: any) => {
    const {name, value} = e.target
    setTenancyData({...tenancyData, [name]: value})
  }
  const handleChnagePayment = (e: any) => {
    
    const {name, value} = e.target
    setPaymentData({...paymentData, [name]: value})
  }
  const handleChnagePopBank = (e: any) => {
    const {name, value} = e.target
    setBank({...bank, [name]: value})
  }
  const handleChnagePopCard = (e: any) => {
    const {name, value} = e.target
    setCard({...card, [name]: value})
  }
  const handleChnageOption = (e: any) => {
    const {name, checked} = e.target
    setOptionArry({...optionArry, [name]: checked})
  }
  const handleChnageSubTenant = (e: any) => {
    const {name, value} = e.target
    setSubTenant({...subTenant, [name]: value})
  }
  const handleOnChange = (value: any) => {
    console.log(value)
    // this.setState({phone: value}, () => {
    //   console.log(this.state.phone)
    // })
  }
  const handleChnageTenancyDate = (e: any) => {
    console.log('e', e)
    setStart(moment(e[0]?._d).format('YYYY-MM-DD'))
    // console.log('e', moment(e[1]?._d).format('YYYY-MM-DD'))
    setEnd(moment(e[1]?._d).format('YYYY-MM-DD'))
    // const {name, value} = e.target
    // setPaymentData({...paymentData, [name]: value})
    var start = moment(e[0]?._d)
    var end = moment(e[1]?._d)
    console.log(end.diff(start, 'days', true) + ' days')
    setTotalDays(end.diff(start, 'days', true) + ' days')
  }
  let ClusterId = localStorage?.getItem('ClusterId')
  let CommunityId = localStorage?.getItem('CommunityId')
  let UnitId = localStorage?.getItem('UnitId')
  console.log('communityId', UnitId)

  const building = async () => {
    const body = {
      unitId: UnitId,
    }
    await ApiPost(`cooperate/tenant/get/unitId`, body)
      .then((res) => {
        setTableData(res?.data?.data)
        console.log('res', res)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const addFileds = () => {
    setPayment(payment + 1)
    for (let i = 0; i <= payment; i++) {
      setArry([...arry, i])
    }
  }
  const addSubTenant = () => {
    // var data = subTenant
    // data.push({countryCode: countryCode})
    // data.push({phoneNumber: phoneNumber})
    // setSubTenant(data)
    setSubTenantData([...subTenantData, subTenant])
    setSubTenant({})
    setCreate(false)
    console.log('subTenant', subTenant)
  }
  console.log('subTenantData', subTenantData)

  console.log('arry', arry)

  const deleteRow = (i: any) => {
    console.log('i', i)
    setArry(arry.filter((v: any, index: any) => index !== i))
  }

  const imagePassport = async (e: any) => {
    let file = e.target.files[0]
    let fileURL = URL.createObjectURL(file)
    file.fileURL = fileURL
    let formData = new FormData()
    formData.append('image', file)
    await ApiUpload('upload/image/document', formData)
      .then((res) => setImgPassport(res?.data?.data?.image))
      .catch((err) => {
        console.log('res_blob', err)
        ErrorToast(err?.message)
      })
  }
  const imageId = async (e: any) => {
    let file = e.target.files[0]
    let fileURL = URL.createObjectURL(file)
    file.fileURL = fileURL
    let formData = new FormData()
    formData.append('image', file)
    await ApiUpload('upload/image/document', formData)
      .then((res) => setImgId(res?.data?.data?.image))
      .catch((err) => {
        console.log('res_blob', err)
        ErrorToast(err?.message)
      })
  }
  const imageResidency = async (e: any) => {
    let file = e.target.files[0]
    let fileURL = URL.createObjectURL(file)
    file.fileURL = fileURL
    let formData = new FormData()
    formData.append('image', file)
    await ApiUpload('upload/image/document', formData)
      .then((res) => setImgResidency(res?.data?.data?.image))
      .catch((err) => {
        console.log('res_blob', err)
        ErrorToast(err?.message)
      })
  }
  const imageOther = async (e: any) => {
    let file = e.target.files[0]
    let fileURL = URL.createObjectURL(file)
    file.fileURL = fileURL
    let formData = new FormData()
    formData.append('image', file)
    await ApiUpload('upload/image/document', formData)
      .then((res) => setImgOther(res?.data?.data?.image))
      .catch((err) => {
        console.log('res_blob', err)
        ErrorToast(err?.message)
      })
  }
  const onFinish = (values: any) => {
    console.log('Received values of form:', values)
  }

  const imageContract = async (e: any) => {
    let file = e.target.files[0]
    let fileURL = URL.createObjectURL(file)
    file.fileURL = fileURL
    let formData = new FormData()
    formData.append('image', file)
    await ApiUpload('upload/image/document', formData)
      .then((res) => setImgContract(res?.data?.data?.image))
      .catch((err) => {
        console.log('res_blob', err)
        ErrorToast(err?.message)
      })
  }
  const imageOtherT = async (e: any) => {
    let file = e.target.files[0]
    let fileURL = URL.createObjectURL(file)
    file.fileURL = fileURL
    let formData = new FormData()
    formData.append('image', file)
    await ApiUpload('upload/image/document', formData)
      .then((res) => setImgOtherT(res?.data?.data?.image))
      .catch((err) => {
        console.log('res_blob', err)
        ErrorToast(err?.message)
      })
  }
  const handleNumber = (Phone: any, e: any) => {
    let phone1 = phone
    let CountryCode = e.dialCode
    let PhoneNumber = phone1.split(countryCode)[1]

    console.log('countryCode', countryCode)
    console.log('phoneNumber', phoneNumber)
    console.log('phone', phone)
    setPhone(Phone)
    setCountryCode(CountryCode)
    setPhoneNumber(PhoneNumber)
    // setsignUpData({
    //   ...signUpData,
    //   countryCode,
    //   phoneNumber,
    // });
  }
  const handleSubmit = () => {
    if (isEdit) {
      delete formData._id
      delete formData.updatedBy
      delete formData.status
      const body = {...formData, managerId: '6329ee43396e812bcc0964e5', id: updateDataId}
      ApiPut('cooperate/unit', body)
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
      // const body = {
      //   firstName: formData?.First,
      //   lastName: formData?.Last,
      //   phoneNumber: formData?.number,
      //   countryCode: formData?.Mobile,
      //   email: formData?.email,
      //   nationality: formData?.nationality,
      //   tenantSource: formData?.Tenant,
      //   unitId: UnitId,
      //   communityId: CommunityId,
      //   DOB: formData?.dob,
      //   document: {
      //     passport: imgPassport,
      //     residency: imgResidency,
      //     id: imgId,
      //     other: imgOther,
      //   },
      // }
      const body = {
        unitId: UnitId,
        communityId: CommunityId,
        tenant: {
          firstName: formData?.First,
          lastName: formData?.Last,
          phoneNumber: Number(phoneNumber),
          countryCode: countryCode,
          email: formData?.email,
          nationality: formData?.nationality,
          tenantSource: formData?.Tenant,

          DOB: formData?.dob,
          document: {
            passport: imgPassport,
            residency: imgResidency,
            id: imgId,
            other: imgOther,
          },
        },
        subTenant: subTenantData,
        tenancy: {
          contractNo: tenancyData?.contractNo,
          duration: {
            start_date: start,
            end_date: end,
            days: totalDays.split(' ')[0],
          },
          // duration: totalDays,
          // end: end,
          benefits: optionArry,
          other: tenancyData?.other,
          // start: start,
          tenancyStatus: tenancyData?.tenancyStatus,
          totalAmounts: tenancyData?.totalamount,
          totalPayments: tenancyData?.totalpayment,
          document: {
            contract: imgContract,
            other: imgOtherT,
          },
        },
        payment: [
          {
            payement: paymentData?.name,
            amount: paymentData?.amount,
            paymentMethod: paymentData?.method,
            currency: 'AED',
            paymentRemainder: paymentData?.reminder,
            paymentSchedule: paymentData?.schedule,
            status: paymentData?.status,
            // type: paymentData?.type,
            paymentValue: {
              card,
            },
          },
        ],
      }
      console.log('body', body)
      ApiPost('cooperate/tenancy/form', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building()
          console.log('addProperty', res)
          navigate(-1)
          // setShowCreateAppModal(false)
          // setFormData({propertyId: window.location.pathname?.split('/')[2]})
          // navigate(
          //   `/units/${window.location.pathname?.split('/')[2]}/${
          //     window.location.pathname?.split('/')[3]
          //   }`
          // )
        })
        .catch((err) => ErrorToast(err.message))
    }
  }
  const handleSubmitBank = () => {
    if (isEdit) {
      delete formData._id
      delete formData.updatedBy
      delete formData.status
      const body = {...formData, managerId: '6329ee43396e812bcc0964e5', id: updateDataId}
      ApiPut('cooperate/unit', body)
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
      // const body = {
      //   firstName: formData?.First,
      //   lastName: formData?.Last,
      //   phoneNumber: formData?.number,
      //   countryCode: formData?.Mobile,
      //   email: formData?.email,
      //   nationality: formData?.nationality,
      //   tenantSource: formData?.Tenant,
      //   unitId: UnitId,
      //   communityId: CommunityId,
      //   DOB: formData?.dob,
      //   document: {
      //     passport: imgPassport,
      //     residency: imgResidency,
      //     id: imgId,
      //     other: imgOther,
      //   },
      // }
      const body = {
        unitId: UnitId,
        communityId: CommunityId,
        tenant: {
          firstName: formData?.First,
          lastName: formData?.Last,
          phoneNumber: Number(phoneNumber),
          countryCode: countryCode,
          email: formData?.email,
          nationality: formData?.nationality,
          tenantSource: formData?.Tenant,

          DOB: formData?.dob,
          document: {
            passport: imgPassport,
            residency: imgResidency,
            id: imgId,
            other: imgOther,
          },
        },
        subTenant: subTenantData,
        tenancy: {
          contractNo: tenancyData?.contractNo,
          duration: {
            start_date: start,
            end_date: end,
            days: totalDays.split(' ')[0],
          },
          // duration: totalDays,
          // end: end,
          benefits: optionArry,
          other: tenancyData?.other,
          // start: start,
          tenancyStatus: tenancyData?.tenancyStatus,
          totalAmounts: tenancyData?.totalamount,
          totalPayments: tenancyData?.totalpayment,
          document: {
            contract: imgContract,
            other: imgOtherT,
          },
        },
        payment: [
          {
            payement: paymentData?.name,
            amount: paymentData?.amount,
            paymentMethod: paymentData?.method,
            currency: 'AED',
            paymentRemainder: paymentData?.reminder,
            paymentSchedule: paymentData?.schedule,
            status: paymentData?.status,
            // type: paymentData?.type,
            paymentValue: {
              bank: {
                bank,
              },
            },
          },
        ],
      }
      console.log('body', body)
      ApiPost('cooperate/tenancy/form', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building()
          console.log('addProperty', res)
          navigate(-1)
          // setShowCreateAppModal(false)
          // setFormData({propertyId: window.location.pathname?.split('/')[2]})
          // navigate(
          //   `/units/${window.location.pathname?.split('/')[2]}/${
          //     window.location.pathname?.split('/')[3]
          //   }`
          // )
        })
        .catch((err) => ErrorToast(err.message))
    }
  }
  const handleSubmitDraft = () => {
    if (isEdit) {
      delete formData._id
      delete formData.updatedBy
      delete formData.status
      const body = {...formData, managerId: '6329ee43396e812bcc0964e5', id: updateDataId}
      ApiPut('cooperate/unit', body)
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
      // const body = {
      //   firstName: formData?.First,
      //   lastName: formData?.Last,
      //   phoneNumber: formData?.number,
      //   countryCode: formData?.Mobile,
      //   email: formData?.email,
      //   nationality: formData?.nationality,
      //   tenantSource: formData?.Tenant,
      //   unitId: UnitId,
      //   communityId: CommunityId,
      //   DOB: formData?.dob,
      //   document: {
      //     passport: imgPassport,
      //     residency: imgResidency,
      //     id: imgId,
      //     other: imgOther,
      //   },
      // }
      const body = {
        unitId: UnitId,
        communityId: CommunityId,
        isDraft: true,
        tenant: {
          firstName: formData?.First,
          lastName: formData?.Last,
          phoneNumber: phoneNumber,
          countryCode: countryCode,
          email: formData?.email,
          nationality: formData?.nationality,
          tenantSource: formData?.Tenant,

          DOB: formData?.dob,
          document: {
            passport: imgPassport,
            residency: imgResidency,
            id: imgId,
            other: imgOther,
          },
        },
        subTenant: subTenantData,
        tenancy: {
          contractNo: tenancyData?.contractNo,
          duration: {
            start_date: start,
            end_date: end,
            days: totalDays.split(' ')[0],
          },
          // duration: totalDays,
          // end: end,
          benefits: optionArry,
          other: tenancyData?.other,
          // start: start,
          tenancyStatus: tenancyData?.tenancyStatus,
          totalamount: tenancyData?.totalamount,
          totalpayment: tenancyData?.totalpayment,
          document: {
            contract: imgContract,
            other: imgOtherT,
          },
        },
        payment: [
          {
            payement: paymentData?.name,
            amount: paymentData?.amount,
            paymentMethod: paymentData?.method,
            currency: 'AED',
            paymentRemainder: paymentData?.reminder,
            paymentSchedule: paymentData?.schedule,
            status: paymentData?.status,
            // type: paymentData?.type,
            paymentValue: {
              bank: {
                card,
              },
            },
          },
        ],
      }
      console.log('body', body)
      ApiPost('cooperate/tenancy/form', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building()
          console.log('addProperty', res)
          navigate(-1)
        })
        .catch((err) => ErrorToast(err.message))
    }
  }
  const getUnitById = () => {
    ApiGet(`cooperate/unit/${UnitId}`)
      .then((res) => {
        console.log('resunit', res?.data?.data)
        setUnitData(res?.data?.data)
      })
      .catch((err) => console.log('err', err))
  }
  const getCommunityById = () => {
    ApiGet(`cooperate/communities/${CommunityId}`)
      .then((res) => {
        console.log('rescommunity', res?.data?.data)
        setHeader(res?.data?.data)
      })
      .catch((err) => console.log('err', err))
  }
  const getClusterById = () => {
    ApiGet(`cooperate/cluster/${ClusterId}`)
      .then((res) => {
        console.log('rescluster', res?.data?.data)
        setHeaderB(res?.data?.data)
      })
      .catch((err) => console.log('err', err))
  }
  const getCountry = async () => {
    await ApiGetNoAuth('country')
      .then((res) => {
        console.log('res', res)
        setCountry(res?.data?.data)
      })
      .catch((e) => {
        console.log('e', e)
      })
  }
  useEffect(() => {
    building()
    getUnitById()
    getCommunityById()
    getClusterById()
    getCountry()

    if (isEdit) {
      ApiGet(`cooperate/unit/${updateDataId}`)
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
        <div id='' className='app-container container-xxl pt-0 mt-0'>
          <div className='page-title d-flex flex-column justify-content-center flex-wrap me-3'>
            <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
              <div className=''>
                <a
                  // onClick={() => setShowCreateAppModal(true)}
                  className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_create_app'
                  // onClick={handleSubmit}
                  onClick={() => {
                    navigate(-1)
                  }}
                >
                  Back
                </a>
                <a
                  // onClick={() => setShowCreateAppModal(true)}
                  className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_create_app'
                  onClick={handleSubmitDraft}
                >
                  Save
                </a>
              </div>
              <div className=''>
                <a
                  // onClick={() => setShowCreateAppModal(true)}
                  className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_create_app'
                  // onClick={
                  //   paymentData?.method === 0 || paymentData?.method === 1
                  //     ? handleSubmit
                  //     : handleSubmitBank
                  // }
                  onClick={handleSubmit}
                >
                  Create
                </a>
              </div>
            </div>
          </div>
          <div className='card card-flush mt-8'>
            <Row>
              <Col md={3} className='m-5'>
                <h2>Property Details</h2>
              </Col>
              <Col md={8} className='m-5'>
                <a
                  onClick={() => setShowCreateAppModal(true)}
                  className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_create_app'
                  // onClick={handleSubmit}
                >
                  Select Another Property
                </a>
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <div className='m-5'>
                  <img
                    src='https://cdn.britannica.com/08/187508-050-D6FB5173/Shanghai-Tower-Gensler-San-Francisco-world-Oriental-2015.jpg'
                    alt=''
                    width={170}
                    height={150}
                  />
                </div>
              </Col>
              <Col md={10} className='m-auto'>
                <div className='card-header align-items-center py-5  gap-md-2 d-flex border-0 p-0'>
                  <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                    <h6 className='mx-10 text-muted'>
                      Property ID
                      <span className='mx-1' style={{color: 'black'}}>
                        {unitData?.id}
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                    <h6 className='mx-10 text-muted'>
                      Unit No.{' '}
                      <span className='mx-1' style={{color: 'black'}}>
                        {unitData?.unitNo}
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                    <h6 className='mx-10 text-muted'>
                      Bedrooms{' '}
                      <span className='mx-1' style={{color: 'black'}}>
                        {unitData?.bedrooms}
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                    <h6 className='mx-10 text-muted'>
                      Unit Type{' '}
                      <span className='mx-1' style={{color: 'black'}}>
                        {unitData?.unitType === 'town_house'
                          ? 'TownHouse'
                          : unitData?.unitType === 'other'
                          ? 'Other'
                          : unitData?.unitType === 'common_area'
                          ? 'Common Area'
                          : unitData?.unitType === 'villa'
                          ? 'Villa'
                          : unitData?.unitType === 'apartment'
                          ? 'Apartment'
                          : unitData?.unitType === 'penthouse'
                          ? 'Penthouse'
                          : ''}
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                    <h6 className='mx-10 text-muted'>
                      Property Manager{' '}
                      <span className='mx-1' style={{color: 'black'}}>
                        {unitData?.managerId}
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                    <h6 className='mx-10 text-muted'>
                      Occupancy{' '}
                      <span className='mx-1' style={{color: 'black'}}>
                        {unitData?.occupy === 0 ? 'Vacant ' : 'Occupied'}
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                    <h6 className='mx-10 text-muted'>
                      Development{' '}
                      <span className='mx-1' style={{color: 'black'}}>
                        {header[0]?.name}
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                    <h6 className='mx-10 text-muted'>
                      Cluster{' '}
                      <span className='mx-1' style={{color: 'black'}}>
                        {unitData?.buildingId ? 'Building' : 'Unit'}
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                    <h6 className='mx-10 text-muted'>
                      Unit Group{' '}
                      <span className='mx-1' style={{color: 'black'}}>
                        -
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                    <h6 className='mx-10 text-muted'>
                      Building{' '}
                      <span className='mx-1' style={{color: 'black'}}>
                        -
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                    <h6 className='mx-10 text-muted'>
                      Floor{' '}
                      <span className='mx-1' style={{color: 'black'}}>
                        -
                      </span>
                    </h6>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div
            className='d-flex align-items-center gap-2 gap-lg-3 mt-8 justfy-content-center'
            style={{justifyContent: 'center'}}
          >
            <ul className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2'>
              <li
                className='nav-item cursor-pointer'
                onClick={() => {
                  setPropertiType('Tenancy')
                }}
              >
                <a
                  className='nav-link text-active-primary pb-4 active text-center mx-10'
                  data-bs-toggle='tab'
                >
                  Tenancy
                </a>
              </li>
              <li
                className='nav-item cursor-pointer'
                onClick={() => {
                  setPropertiType('Tenants')
                }}
              >
                <a
                  className='nav-link text-active-primary pb-4 text-center mx-10'
                  data-bs-toggle='tab'
                >
                  {/* <div className='svg-icon svg-icon-md svg-icon-primary mb-2'>
                    <img src={penthouse} alt='' width='30px' />{' '}
                  </div> */}
                  Tenants
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* </div> */}
        <div
          id='kt_app_content'
          className='app-content flex-column-fluid pt-0'
          style={{paddingTop: '0px'}}
        >
          <div id='kt_app_content_container' className='app-container container-xxl mt-10'>
            <div className='card card-flush mb-10'>
              {propertiType === 'Tenancy' && (
                <>
                  <h3 className='mx-10 mb-10 mt-10'>Contract Details </h3>
                  <div
                    className='card-header align-items-center gap-md-2'
                    style={{justifyContent: 'flex-start'}}
                  >
                    {/* <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Contract ID
                      </label>
                      <input
                        type='text'
                        className='form-control form-control-solid'
                        placeholder=''
                        name='contractId'
                        value={tenancyData?.contractId}
                        onChange={handleChnageTenancy}
                      />
                    </div> */}
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Contract No.
                      </label>
                      <input
                        type='text'
                        className='form-control form-control-solid'
                        placeholder=''
                        name='contractNo'
                        value={tenancyData?.contractNo}
                        onChange={handleChnageTenancy}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Tenancy Status
                      </label>

                      <select
                        name='tenancyStatus'
                        className='form-select form-select-solid'
                        value={tenancyData?.tenancyStatus}
                        onChange={handleChnageTenancy}
                      >
                        <option disabled selected>
                          Select
                        </option>
                        <option value={0}>Booked</option>
                        <option value={1}>Active</option>
                        <option value={2}>Renewed</option>
                      </select>
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Start - End
                      </label>
                      <RangePicker
                        // disabledDate={disabledDate}
                        // defaultValue={[moment(start), moment(end)]}
                        defaultValue={[
                          moment(start !== '' ? moment(start) : new Date(), dateFormat),
                          moment(end !== '' ? moment(end) : new Date(), dateFormat),
                        ]}
                        format={dateFormat}
                        onChange={handleChnageTenancyDate}
                        name='start'
                        className='form-control form-control-solid'
                      />
                      {/* <div className='d-flex'>
                        <input
                          type='date'
                          className='form-control form-control-solid mx-1'
                          placeholder=''
                          name='start'
                          value={tenancyData?.start}
                          onChange={handleChnageTenancy}
                        />
                      </div> */}
                    </div>
                    {/* <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        End
                      </label>
                      <div className='d-flex'>
                        <input
                          type='date'
                          className='form-control form-control-solid mx-1'
                          placeholder=''
                          name='end'
                          value={tenancyData?.end}
                          onChange={handleChnageTenancy}
                        />
                      </div>
                    </div> */}

                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Duration
                      </label>
                      <div className='form-control form-control-solid'>{totalDays}</div>
                    </div>
                    <div className='d-flex'>
                      <div className='mb-10 min-w-200px mx-10'>
                        <label htmlFor='exampleFormControlInput1' className='required form-label'>
                          Upload Contract
                        </label>
                        <input
                          type='file'
                          className='form-control form-control-solid'
                          placeholder=''
                          name='contract'
                          value={tenancyData?.contract}
                          onChange={imageContract}
                        />
                      </div>
                      <div className='mb-10 min-w-200px mx-10'>
                        <label htmlFor='exampleFormControlInput1' className='required form-label'>
                          Upload Other
                        </label>
                        <input
                          type='file'
                          className='form-control form-control-solid'
                          placeholder=''
                          name='otherT'
                          value={tenancyData?.otherT}
                          onChange={imageOtherT}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='mb-10 min-w-200px mx-15'>
                    <label className='required form-label'>
                      <span className=''>Benefits</span>
                    </label>
                    <div className='d-flex'>
                      <div className='form-check form-check-custom form-check-solid form-check-sm'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          id='vacant'
                          name='none'
                          // defaultChecked
                          checked={optionArry?.none === true ? true : false}
                          onChange={handleChnageOption}
                          onClick={() => {
                            setOption(1)
                          }}
                        />
                        <label className='form-check-label' htmlFor='vacant'>
                          None
                        </label>
                      </div>
                      <div className='form-check form-check-custom form-check-solid form-check-sm ms-3'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          id='occupied'
                          name='chillerFree'
                          checked={optionArry?.chillerFree === true ? true : false}
                          onChange={handleChnageOption}
                          disabled={optionArry?.none === true ? true : false}
                          onClick={() => {
                            setOption(2)
                          }}
                        />
                        <label className='form-check-label' htmlFor='occupied'>
                          Chiller Free
                        </label>
                      </div>
                      <div className='form-check form-check-custom form-check-solid form-check-sm ms-3'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          id='occupied'
                          name='maintenanceFree'
                          checked={optionArry?.maintenanceFree === true ? true : false}
                          disabled={optionArry?.none === true ? true : false}
                          onChange={handleChnageOption}
                          onClick={() => {
                            setOption(3)
                          }}
                        />
                        <label className='form-check-label' htmlFor='occupied'>
                          Maintenance Free
                        </label>
                      </div>
                      <div className='form-check form-check-custom form-check-solid form-check-sm ms-3'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          id='occupied'
                          name='other'
                          checked={optionArry?.other === true ? true : false}
                          disabled={optionArry?.none === true ? true : false}
                          onChange={handleChnageOption}
                          onClick={() => {
                            setOption(4)
                          }}
                        />
                        <label className='form-check-label' htmlFor='occupied'>
                          Other
                        </label>
                        {option === 4 && (
                          <input
                            type='other'
                            className='form-control form-control-solid mx-3'
                            placeholder=''
                            name='other'
                            value={tenancyData?.other}
                            onChange={handleChnageTenancy}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <h3 className='mx-10 mb-10 mt-5'>Financials</h3>
                  <div
                    className='card-header align-items-center gap-md-2'
                    style={{justifyContent: 'space-between'}}
                  >
                    <div className='d-flex'>
                      <div className='mb-10 min-w-200px mx-10'>
                        <label htmlFor='exampleFormControlInput1' className='required form-label'>
                          Total Amount
                        </label>
                        <div className='d-flex'>
                          <input
                            type='text'
                            className='form-control form-control-solid mx-1'
                            placeholder=''
                            name='totalamount'
                            // disabled={tenancyData?.totalamount ? true : false}
                            value={tenancyData?.totalamount}
                            onChange={handleChnageTenancy}
                          />
                        </div>
                      </div>
                      <div className='mb-10 min-w-200px mx-10'>
                        <label htmlFor='exampleFormControlInput1' className='required form-label'>
                          Total Payments
                        </label>
                        <div className='d-flex'>
                          <input
                            type='text'
                            className='form-control form-control-solid mx-1'
                            placeholder=''
                            name='totalpayment'
                            value={tenancyData?.totalpayment}
                            disabled={tenancyData?.totalpayment ? true : false}
                            onChange={handleChnageTenancy}
                          />
                        </div>
                      </div>
                    </div>
                    <div className=''>
                      <a
                        onClick={addFileds}
                        className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_create_app'
                        // onClick={handleSubmit}
                      >
                        Add Payment
                      </a>
                    </div>
                  </div>
                  {/* <div className='row'>
                    <Col md={6} className=''>
                      <h3 className='mx-10 mb-5'>Financials</h3>
                      <div className='mb-10 min-w-200px mx-15'>
                        <label htmlFor='exampleFormControlInput1' className='required form-label'>
                          Rent Amount
                        </label>
                        <input
                          type='number'
                          className='form-control form-control-solid w-auto'
                          placeholder=''
                          name='rent'
                          value={formData?.rent}
                          onChange={handleChnage}
                        />
                      </div>
                      <div className='mb-10 min-w-200px mx-15'>
                        <label htmlFor='exampleFormControlInput1' className='required form-label'>
                          Security Deposit
                        </label>
                        <input
                          type='number'
                          className='form-control form-control-solid w-auto'
                          placeholder=''
                          name='Security'
                          value={formData?.Security}
                          onChange={handleChnage}
                        />
                      </div>
                      <div className='mb-10 min-w-200px mx-15'>
                        <label htmlFor='exampleFormControlInput1' className='required form-label'>
                          Booking Amount
                        </label>
                        <input
                          type='number'
                          className='form-control form-control-solid w-auto'
                          placeholder=''
                          name='Booking'
                          value={formData?.Booking}
                          onChange={handleChnage}
                        />
                      </div>
                      <div className='mb-10 min-w-200px mx-15'>
                        <label htmlFor='exampleFormControlInput1' className='required form-label'>
                          Payment Name
                        </label>
                        <input
                          type='number'
                          className='form-control form-control-solid w-auto'
                          placeholder=''
                          name='Payment'
                          value={formData?.Payment}
                          onChange={handleChnage}
                        />
                      </div>
                    </Col>
                    <Col md={6} className=''>
                      <a
                        // onClick={() => setShowCreateAppModal(true)}
                        className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_create_app'
                        // onClick={handleSubmit}
                      >
                        Add Another Payment
                      </a>
                    </Col>
                  </div>
                  <h3 className='mx-10 mb-10 mt-10'>Payments</h3>
                  <div
                    className='card-header align-items-center gap-md-2'
                    style={{justifyContent: 'flex-start'}}
                  >
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Set Total No. of Payments
                      </label>
                      <input
                        type='number'
                        className='form-control form-control-solid'
                        placeholder=''
                        name='unitNo'
                        // value={formData?.unitNo}
                        // onChange={handleChnage}
                      />
                    </div>
                  </div> */}
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
              {propertiType === 'Tenants' && (
                <>
                  <h3 className='mx-10 mb-5 mt-10'>Main Tenant Details </h3>
                  <div
                    className='card-header align-items-center gap-md-2'
                    style={{justifyContent: 'flex-start'}}
                  >
                    {/* <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Tenant ID
                      </label>
                      <input
                        type='text'
                        className='form-control form-control-solid'
                        placeholder=''
                        name='tenantid'
                        value={formData?.tenantid}
                        onChange={handleChnage}
                      />
                    </div> */}
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Tenant Source
                      </label>
                      {/* <input
                        type='text'
                        className='form-control form-control-solid'
                        placeholder=''
                        name='unitNo'
                        value={formData?.unitNo}
                        onChange={handleChnage}
                      /> */}
                      <select
                        name='Tenant'
                        className='form-select form-select-solid'
                        value={formData?.Tenant}
                        onChange={handleChnage}
                      >
                        <option disabled selected>
                          Select
                        </option>
                        <option value={0}>Agent</option>
                        <option value={1}>Direct</option>
                        {/* <option value={2}>Renewed</option> */}
                      </select>
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        First Name
                      </label>
                      <input
                        type='text'
                        className='form-control form-control-solid'
                        placeholder=''
                        name='First'
                        value={formData?.First}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Last Name
                      </label>
                      <input
                        type='text'
                        className='form-control form-control-solid'
                        placeholder=''
                        name='Last'
                        value={formData?.Last}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Date of Birth
                      </label>
                      <input
                        type='date'
                        className='form-control form-control-solid'
                        placeholder=''
                        max={new Date().toISOString().split('T')[0]}
                        name='dob'
                        value={formData?.dob}
                        onChange={handleChnage}
                      />
                    </div>

                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Nationality
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
                        name='nationality'
                        className='form-select form-select-solid'
                        value={formData?.nationality}
                        onChange={handleChnage}
                        style={{width: '150px'}}
                      >
                        <option value='' disabled selected>
                          Select country
                        </option>
                        {country?.map((v: any) => (
                          <option value={v.country}>{v.country}</option>
                        ))}
                      </select>
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Email
                      </label>
                      <input
                        type='email'
                        className='form-control form-control-solid'
                        placeholder=''
                        name='email'
                        value={formData?.email}
                        onChange={handleChnage}
                      />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Mobile No.
                      </label>
                      <div className='d-flex'>
                        <PhoneInput
                          placeholder='Enter phone number'
                          value=''
                          onChange={(phone, e) => handleNumber(phone, e)}
                          // className='block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                        />
                        {/* <select
                          name='Mobile'
                          className='form-select form-select-solid fst-italic'
                          value={formData?.Mobile}
                          onChange={handleChnage}
                          style={{width: '100px'}}
                        >
                          <option className='fst-italic' disabled selected>
                            Select
                          </option>
                          <option className='fst-italic' value={971}>
                            +971
                          </option>
                          <option className='fst-italic' value={91}>
                            +91
                          </option>
                          <option className='fst-italic' value={1}>
                            +1
                          </option>
                          <option className='fst-italic' value={74}>
                            +74
                          </option>
                          <option className='fst-italic' value={48}>
                            +48
                          </option>
                        </select>
                        <input
                          type='number'
                          className='form-control form-control-solid mx-1'
                          placeholder=''
                          name='number'
                          value={formData?.number}
                          onChange={handleChnage}
                          style={{width: '150px'}}
                        /> */}
                      </div>
                    </div>
                    {/* <div className='d-flex'>
                      <div className='mb-10'>
                        <label htmlFor='Passport' className='form-label'>
                          <a
                            // onClick={() => setShowCreateAppModal(true)}
                            // onClick={() => setCreate(true)}
                            className='btn btn-sm fw-bold btn-primary btn-green mx-3 mb-10'
                            // data-bs-toggle='modal'
                            // data-bs-target='#kt_modal_create_app'
                            // onClick={handleSubmit}
                          >
                            Upload Passport
                          </a>
                        </label>
                        <input
                          type='file'
                          id='Passport'
                          hidden
                          className='form-control form-control-solid '
                          placeholder=''
                          name='Passport'
                          value={formData?.Passport}
                          onChange={imagePassport}
                        />
                      </div>
                      <div className='mb-10 '>
                        <label htmlFor='Residency' className=' form-label'>
                          <a
                            // onClick={() => setShowCreateAppModal(true)}
                            // onClick={() => setCreate(true)}
                            className='btn btn-sm fw-bold btn-primary btn-green mx-3 mb-10'
                            // data-bs-toggle='modal'
                            // data-bs-target='#kt_modal_create_app'
                            // onClick={handleSubmit}
                          >
                            Upload Residency
                          </a>
                        </label>
                        <input
                          type='file'
                          className='form-control form-control-solid'
                          id='Residency'
                          placeholder=''
                          hidden
                          name='Residency'
                          value={formData?.Residency}
                          onChange={imageResidency}
                        />
                      </div>
                      <div className='mb-10 '>
                        <label htmlFor='ID' className='form-label'>
                          <a
                            // onClick={() => setShowCreateAppModal(true)}
                            // onClick={() => setCreate(true)}
                            className='btn btn-sm fw-bold btn-primary btn-green mx-3 mb-10'
                            // data-bs-toggle='modal'
                            // data-bs-target='#kt_modal_create_app'
                            // onClick={handleSubmit}
                          >
                            Upload ID
                          </a>
                        </label>
                        <input
                          type='file'
                          className='form-control form-control-solid'
                          id='ID'
                          hidden
                          placeholder=''
                          name='ID'
                          value={formData?.ID}
                          onChange={imageId}
                        />
                      </div>
                      <div className='mb-10  '>
                        <label htmlFor='Other' className='form-label'>
                          <a
                            // onClick={() => setShowCreateAppModal(true)}
                            // onClick={() => setCreate(true)}
                            className='btn btn-sm fw-bold btn-primary btn-green mx-3 mb-10'
                            // data-bs-toggle='modal'
                            // data-bs-target='#kt_modal_create_app'
                            // onClick={handleSubmit}
                          >
                            Upload Other
                          </a>
                        </label>
                        <input
                          type='file'
                          id='Other'
                          hidden
                          className='form-control form-control-solid'
                          placeholder=''
                          name='Other'
                          value={formData?.Other}
                          onChange={imageOther}
                        />
                      </div>
                    </div> */}
                  </div>
                  {/* <div className='text-end'>
                    <a
                      // onClick={() => setShowCreateAppModal(true)}
                      onClick={() => setCreate(true)}
                      className='btn btn-sm fw-bold btn-primary btn-green mx-3 mb-10'
                      data-bs-toggle='modal'
                      data-bs-target='#kt_modal_create_app'
                      // onClick={handleSubmit}
                    >
                      Add Sub Tenant
                    </a>
                  </div> */}
                  <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
                    <div className='d-flex'>
                      <div className='mb-10'>
                        <label htmlFor='Passport' className='form-label'>
                          <a
                            // onClick={() => setShowCreateAppModal(true)}
                            // onClick={() => setCreate(true)}
                            className='btn btn-sm fw-bold btn-primary btn-green mx-3 mb-10'
                            // data-bs-toggle='modal'
                            // data-bs-target='#kt_modal_create_app'
                            // onClick={handleSubmit}
                          >
                            Upload Passport
                          </a>
                        </label>
                        <input
                          type='file'
                          id='Passport'
                          hidden
                          className='form-control form-control-solid '
                          placeholder=''
                          name='Passport'
                          value={formData?.Passport}
                          onChange={imagePassport}
                        />
                      </div>
                      <div className='mb-10 '>
                        <label htmlFor='Residency' className=' form-label'>
                          {/* Upload Residency */}
                          <a
                            // onClick={() => setShowCreateAppModal(true)}
                            // onClick={() => setCreate(true)}
                            className='btn btn-sm fw-bold btn-primary btn-green mx-3 mb-10'
                            // data-bs-toggle='modal'
                            // data-bs-target='#kt_modal_create_app'
                            // onClick={handleSubmit}
                          >
                            Upload Residency
                          </a>
                        </label>
                        <input
                          type='file'
                          className='form-control form-control-solid'
                          id='Residency'
                          placeholder=''
                          hidden
                          name='Residency'
                          value={formData?.Residency}
                          onChange={imageResidency}
                        />
                      </div>
                      <div className='mb-10 '>
                        <label htmlFor='ID' className='form-label'>
                          <a
                            // onClick={() => setShowCreateAppModal(true)}
                            // onClick={() => setCreate(true)}
                            className='btn btn-sm fw-bold btn-primary btn-green mx-3 mb-10'
                            // data-bs-toggle='modal'
                            // data-bs-target='#kt_modal_create_app'
                            // onClick={handleSubmit}
                          >
                            Upload ID
                          </a>
                        </label>
                        <input
                          type='file'
                          className='form-control form-control-solid'
                          id='ID'
                          hidden
                          placeholder=''
                          name='ID'
                          value={formData?.ID}
                          onChange={imageId}
                        />
                      </div>
                      <div className='mb-10  '>
                        <label htmlFor='Other' className='form-label'>
                          <a
                            // onClick={() => setShowCreateAppModal(true)}
                            // onClick={() => setCreate(true)}
                            className='btn btn-sm fw-bold btn-primary btn-green mx-3 mb-10'
                            // data-bs-toggle='modal'
                            // data-bs-target='#kt_modal_create_app'
                            // onClick={handleSubmit}
                          >
                            Upload Other
                          </a>
                        </label>
                        <input
                          type='file'
                          id='Other'
                          hidden
                          className='form-control form-control-solid'
                          placeholder=''
                          name='Other'
                          value={formData?.Other}
                          onChange={imageOther}
                        />
                      </div>
                    </div>
                    <div className=''>
                      <a
                        // onClick={() => setShowCreateAppModal(true)}
                        className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_create_app'
                        // onClick={
                        //   paymentData?.method === 0 || paymentData?.method === 1
                        //     ? handleSubmit
                        //     : handleSubmitBank
                        // }
                        onClick={() => setCreate(true)}
                      >
                        Add Sub Tenant
                      </a>
                    </div>
                  </div>
                  {create && (
                    <>
                      <div className='d-flex justify-content-between'>
                        <div className=''>
                          <h3 className='mx-10 mb-5 '>Add Sub Tenant</h3>
                        </div>
                        <div className=''>
                          <a
                            // onClick={() => setShowCreateAppModal(true)}
                            className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_create_app'
                            onClick={addSubTenant}
                          >
                            Add
                          </a>
                          <a
                            onClick={() => setCreate(false)}
                            className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_create_app'
                            // onClick={handleSubmit}
                          >
                            Cancel
                          </a>
                        </div>
                      </div>
                      <div
                        className='card-header align-items-center gap-md-2'
                        style={{justifyContent: 'flex-start'}}
                      >
                        <div className='mb-10 min-w-200px mx-10'>
                          <label htmlFor='exampleFormControlInput1' className='required form-label'>
                            First Name
                          </label>
                          <input
                            type='text'
                            className='form-control form-control-solid'
                            placeholder=''
                            name='firstName'
                            value={subTenant?.firstName}
                            onChange={handleChnageSubTenant}
                          />
                        </div>
                        <div className='mb-10 min-w-200px mx-10'>
                          <label htmlFor='exampleFormControlInput1' className='required form-label'>
                            Last Name
                          </label>
                          <input
                            type='text'
                            className='form-control form-control-solid'
                            placeholder=''
                            name='lastName'
                            value={subTenant?.lastName}
                            onChange={handleChnageSubTenant}
                          />
                        </div>
                        <div className='mb-10 min-w-200px mx-10'>
                          <label htmlFor='exampleFormControlInput1' className='required form-label'>
                            Email
                          </label>
                          <input
                            type='email'
                            className='form-control form-control-solid'
                            placeholder=''
                            name='email'
                            value={subTenant?.email}
                            onChange={handleChnageSubTenant}
                          />
                        </div>
                        <div className='mb-10 min-w-200px mx-10'>
                          <label htmlFor='exampleFormControlInput1' className='required form-label'>
                            Mobile No.
                          </label>
                          <div className='d-flex'>
                            {/* <PhoneInput
                              placeholder='Enter phone number'
                              value={phone}
                              onChange={(phone, e) => handleNumber(phone, e)}
                              // className='block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                            /> */}
                            <PhoneInput
                              placeholder='Enter phone number'
                              value=''
                              onChange={(phone, e) => handleNumber(phone, e)}
                              // className='block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                            />
                            {/* <select
                              name='countryCode'
                              className='form-select form-select-solid fst-italic'
                              value={subTenant?.countryCode}
                              onChange={handleChnageSubTenant}
                              style={{width: '100px'}}
                            >
                              <option className='fst-italic' disabled selected>
                                Select
                              </option>
                              <option className='fst-italic' value={0}>
                                +971
                              </option>
                              <option className='fst-italic' value={1}>
                                +91
                              </option>
                            </select>
                            <input
                              type='number'
                              className='form-control form-control-solid mx-1'
                              placeholder=''
                              name='phoneNumber'
                              value={subTenant?.phoneNumber}
                              onChange={handleChnageSubTenant}
                              style={{width: '150px'}}
                            /> */}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            <div className='card-body pt-0 table-responsive mt-5'>
              {/* <Form name='dynamic_form_nest_item' onFinish={onFinish} autoComplete='off'>
                <Form.List name='users'>
                  {(fields, {add, remove}) => (
                    <>
                      {fields.map(({key, name, ...restField}) => (
                        <Space
                          key={key}
                          style={{display: 'flex', marginBottom: 8}}
                          align='baseline'
                        >
                          <Form.Item
                            {...restField}
                            name={[name, 'First']}
                            // rules={[{required: true, message: 'Missing first name'}]}
                          >
                            <input
                              type='text'
                              className='form-control'
                              placeholder=''
                              value={key + 1}
                              style={{width: '100px'}}
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'type']}
                            // rules={[{required: true, message: 'Missing last name'}]}
                          >
                            <select
                              name={`type`}
                              className='form-select fst-italic'
                              style={{width: '100px'}}
                            >
                              <option className='fst-italic' disabled selected>
                                Select
                              </option>
                              <option className='fst-italic' value={0}>
                                Rent
                              </option>
                              <option className='fst-italic' value={1}>
                                Security Deposit
                              </option>
                              <option className='fst-italic' value={2}>
                                Booking
                              </option>
                              <option className='fst-italic' value={3}>
                                Other
                              </option>
                            </select>
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'amount']}
                            // rules={[{required: true, message: 'Missing first name'}]}
                          >
                            <input
                              type='number'
                              className='form-control mx-2'
                              placeholder='AED'
                              value={paymentData?.amount}
                              onChange={handleChnagePayment}
                              style={{width: '100px'}}
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'status']}
                            // rules={[{required: true, message: 'Missing first name'}]}
                          >
                            <select
                              // name='status'
                              className='form-select fst-italic'
                              style={{width: '100px'}}
                            >
                              <option className='fst-italic' disabled selected>
                                Select
                              </option>
                              <option className='fst-italic' value={0}>
                                Paid
                              </option>
                              <option className='fst-italic' value={1}>
                                Upcoming
                              </option>
                              <option className='fst-italic' value={2}>
                                Overdue
                              </option>
                            </select>
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'schedule']}
                            // rules={[{required: true, message: 'Missing first name'}]}
                          >
                            <input
                              type='date'
                              className='form-control mx-2'
                              placeholder=''
                              min={new Date().toISOString().split('T')[0]}
                              // name='schedule'
                              // disabled={paymentData?.status === '0' ? true : false}
                              style={{width: '100px'}}
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'method']}
                            // rules={[{required: true, message: 'Missing first name'}]}
                          >
                            {paymentData?.status !== '0' ? (
                              <select
                                // name='method'
                                className='form-select fst-italic'
                                // disabled={paymentData?.status === '0' ? true : false}
                                onChange={(e) => {
                                  handleChnagePayment(e)
                                  if (e.target.value !== '4') {
                                    setShowCheange(true)
                                  }
                                }}
                                style={{width: '100px'}}
                              >
                                <option className='fst-italic' disabled selected>
                                  Select
                                </option>
                                <option className='fst-italic' value={0}>
                                  Card (Recurring Payments)
                                </option>
                                <option className='fst-italic' value={1}>
                                  Card (Individual Payments)
                                </option>
                                <option className='fst-italic' value={2}>
                                  Cheque
                                </option>
                                <option className='fst-italic' value={3}>
                                  Bank Transfer
                                </option>
                                <option className='fst-italic' value={4}>
                                  Cash
                                </option>
                              </select>
                            ) : (
                              <input
                                // name='method'
                                name={`method`}
                                className='form-control fst-italic'
                                value={paymentData?.method}
                                // disabled={paymentData?.status === '0' ? true : false}
                                onChange={(e) => {
                                  handleChnagePayment(e)
                                  // if (e.target.value !== '4') {
                                  //   setShowCheange(true)
                                  // }
                                }}
                                style={{width: '100px'}}
                              />
                            )}
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'reminder']}
                            // rules={[{required: true, message: 'Missing first name'}]}
                          >
                            <input
                              type={paymentData?.status === '0' ? 'file' : 'date'}
                              className='form-control mx-2'
                              placeholder=''
                              min={new Date().toISOString().split('T')[0]}
                              // name='reminder'
                              // disabled={paymentData?.status === '0' ? true : false}
                              style={{width: '100px'}}
                            />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        
                        <a
                          onClick={() => add()}
                          className='btn btn-sm fw-bold btn-primary btn-green'
                          data-bs-toggle='modal'
                          data-bs-target='#kt_modal_create_app'
                          // onClick={handleSubmit}
                        >
                          Add Payment
                        </a>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
                <Form.Item>
                  <Button type='primary' htmlType='submit'>
                    Submit
                  </Button>
                </Form.Item>
              </Form> */}
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
                    {propertiType === 'Tenancy' && (
                      <>
                        <th className=' min-w-100px'>Payment</th>
                        <th className=' min-w-100px'>Type</th>
                        <th className=' min-w-100px'>Amount</th>
                        <th className=' min-w-70px'>Status</th>
                        <th className=' min-w-100px'>
                          {paymentData?.status === '0' ? 'Payment Date' : 'PAYMENT SCHEDULE'}
                        </th>
                        <th className=' min-w-100px'>
                          {paymentData?.status === '0' ? ' Invoice Ref. No.' : 'PAYMENT METHOD'}
                        </th>
                        <th className=' min-w-100px'>
                          {paymentData?.status === '0' ? 'Upload Invoice' : 'Payment Reminder'}
                        </th>
                        <th className=' min-w-100px'></th>
                      </>
                    )}
                    {propertiType === 'Tenants' && (
                      <>
                        <th className='text-center min-w-100px'>Tenant Id</th>
                        <th className='text-center min-w-100px'>First Name</th>
                        <th className='text-center min-w-100px'>Last Name</th>
                        <th className='text-center min-w-100px'>Email</th>
                        <th className='text-center min-w-100px'>Mobile No.</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className='fw-semibold text-gray-600'>
                  {propertiType === 'Tenancy'
                    ? arry.map((v: any, i: any) => {
                        return (
                          <>
                            <tr key={i}>
                              {propertiType === 'Tenancy' && payment && (
                                <>
                                  <td data-kt-ecommerce-order-filter='order_id' className=''>
                                    <input
                                      type='text'
                                      className='form-control'
                                      placeholder=''
                                      name={`First`}
                                      value={i + 1}
                                      onChange={handleChnagePayment}
                                      style={{width: '100px'}}
                                    />
                                  </td>
                                  <td className='' data-order='2022-09-11'>
                                    <select
                                      name={`type`}
                                      className='form-select fst-italic'
                                      value={paymentData?.type}
                                      onChange={handleChnagePayment}
                                      style={{width: '100px'}}
                                    >
                                      <option className='fst-italic' disabled selected>
                                        Select
                                      </option>
                                      <option className='fst-italic' value={0}>
                                        Rent
                                      </option>
                                      <option className='fst-italic' value={1}>
                                        Security Deposit
                                      </option>
                                      <option className='fst-italic' value={2}>
                                        Booking
                                      </option>
                                      <option className='fst-italic' value={3}>
                                        Other
                                      </option>
                                    </select>
                                  </td>
                                  <td className='d-flex align-items-center'>
                                    AED{' '}
                                    <input
                                      type='number'
                                      className='form-control mx-2'
                                      placeholder=''
                                      // name='amount'
                                      name={`amount`}
                                      // name={`amount ${i}`}
                                      value={paymentData?.amount}
                                      onChange={handleChnagePayment}
                                      style={{width: '100px'}}
                                    />
                                    {/* <input
                                type='number'
                                className='form-control'
                                placeholder=''
                                name={`amount${i}`}
                                value={formData?.amount}
                                onChange={handleChnage}
                                style={{width: '100px'}}
                              /> */}
                                  </td>
                                  <td className='text-center pe-0' data-order='Denied'>
                                    <select
                                      // name='status'
                                      name={`status`}
                                      className='form-select fst-italic'
                                      value={paymentData?.status}
                                      onChange={handleChnagePayment}
                                      style={{width: '100px'}}
                                    >
                                      <option className='fst-italic' disabled selected>
                                        Select
                                      </option>
                                      <option className='fst-italic' value={0}>
                                        Paid
                                      </option>
                                      <option className='fst-italic' value={1}>
                                        Upcoming
                                      </option>
                                      <option className='fst-italic' value={2}>
                                        Overdue
                                      </option>
                                    </select>
                                  </td>
                                  <td className='text-center pe-0'>
                                    <input
                                      type='date'
                                      className='form-control mx-2'
                                      placeholder=''
                                      min={new Date().toISOString().split('T')[0]}
                                      // name='schedule'
                                      name={`schedule`}
                                      value={paymentData?.schedule}
                                      onChange={handleChnagePayment}
                                      // disabled={paymentData?.status === '0' ? true : false}
                                      style={{width: '100px'}}
                                    />
                                  </td>
                                  <td className='text-center' data-order='2022-09-09'>
                                    {paymentData?.status !== '0' ? (
                                      <select
                                        // name='method'
                                        name={`method`}
                                        className='form-select fst-italic'
                                        value={paymentData?.method}
                                        // disabled={paymentData?.status === '0' ? true : false}
                                        onChange={(e) => {
                                          handleChnagePayment(e)
                                          if (e.target.value !== '4') {
                                            setShowCheange(true)
                                          }
                                        }}
                                        style={{width: '100px'}}
                                      >
                                        <option className='fst-italic' disabled selected>
                                          Select
                                        </option>
                                        <option className='fst-italic' value={0}>
                                          Card (Recurring Payments)
                                        </option>
                                        <option className='fst-italic' value={1}>
                                          Card (Individual Payments)
                                        </option>
                                        <option className='fst-italic' value={2}>
                                          Cheque
                                        </option>
                                        <option className='fst-italic' value={3}>
                                          Bank Transfer
                                        </option>
                                        <option className='fst-italic' value={4}>
                                          Cash
                                        </option>
                                      </select>
                                    ) : (
                                      <input
                                        // name='method'
                                        name={`method`}
                                        className='form-control fst-italic'
                                        value={paymentData?.method}
                                        // disabled={paymentData?.status === '0' ? true : false}
                                        onChange={(e) => {
                                          handleChnagePayment(e)
                                          // if (e.target.value !== '4') {
                                          //   setShowCheange(true)
                                          // }
                                        }}
                                        style={{width: '100px'}}
                                      />
                                    )}
                                  </td>
                                  <td className='text-center' data-order='2022-09-11'>
                                    <input
                                      type={paymentData?.status === '0' ? 'file' : 'date'}
                                      className='form-control mx-2'
                                      placeholder=''
                                      min={new Date().toISOString().split('T')[0]}
                                      // name='reminder'
                                      name={`reminder`}
                                      value={paymentData?.reminder}
                                      // disabled={paymentData?.status === '0' ? true : false}
                                      onChange={handleChnagePayment}
                                      style={{width: '100px'}}
                                    />
                                  </td>
                                  <td>
                                    <AiFillDelete
                                      color='#007a59'
                                      fontSize={20}
                                      // onClick={() => deleteRow(i)}
                                      onClick={() => {
                                        swal
                                          .fire({
                                            text: 'Are you sure you want to permanently delete this ?',
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
                                              deleteRow(i)
                                            }
                                          })
                                      }}
                                      style={{cursor: 'pointer'}}
                                    />
                                  </td>
                                </>
                              )}
                            </tr>
                            <Modal
                              id='kt_modal_create_app'
                              tabIndex={-1}
                              aria-hidden='true'
                              dialogClassName='modal-dialog modal-dialog-centered mw-600px'
                              show={showCheange}
                              onHide={() => {
                                setShowCheange(false)
                                setType('')
                              }}
                              backdrop={true}
                              size='sm'
                            >
                              <div className='modal-header'>
                                <h2>
                                  {paymentData?.method === '0'
                                    ? ' Card (Recurring Payments)'
                                    : paymentData?.method === '1'
                                    ? 'Card (Individual Payments)'
                                    : paymentData?.method === '2'
                                    ? 'Cheque'
                                    : paymentData?.method === '3'
                                    ? 'Bank Transfer'
                                    : 'Cash'}
                                </h2>
                                <div
                                  className='btn btn-sm btn-icon btn-active-color-primary'
                                  onClick={() => {
                                    setShowCheange(false)
                                  }}
                                >
                                  <KTSVG
                                    className='svg-icon-1'
                                    path='/media/icons/duotune/arrows/arr061.svg'
                                  />
                                </div>
                              </div>
                              {paymentData?.method === '0' && (
                                <div className='modal-body py-lg-10 px-lg-10'>
                                  <div
                                    className='stepper stepper-pills stepper-column flex-column flex-xl-row flex-row-fluid'
                                    id='kt_modal_create_app_stepper'
                                  >
                                    <div
                                      className='card-header align-items-center gap-md-2'
                                      style={{justifyContent: 'flex-start'}}
                                    >
                                      <div className='mb-10 min-w-200px '>
                                        <label
                                          htmlFor='exampleFormControlInput1'
                                          className='required form-label'
                                        >
                                          Email
                                        </label>
                                        <input
                                          type='email'
                                          className='form-control form-control-solid'
                                          placeholder='e.g. - abc@gmail.com'
                                          name='email'
                                          value={card?.name}
                                          onChange={handleChnagePopCard}
                                        />
                                      </div>
                                    </div>

                                    {/*end::Content */}
                                  </div>
                                  {/* end::Stepper */}
                                </div>
                              )}
                              {paymentData?.method === '1' && (
                                <div className='modal-body py-lg-10 px-lg-10'>
                                  <div
                                    className='stepper stepper-pills stepper-column flex-column flex-xl-row flex-row-fluid'
                                    id='kt_modal_create_app_stepper'
                                  >
                                    <div
                                      className='card-header align-items-center gap-md-2'
                                      style={{justifyContent: 'flex-start'}}
                                    >
                                      <div className='mb-10 min-w-200px '>
                                        <label
                                          htmlFor='exampleFormControlInput1'
                                          className='required form-label'
                                        >
                                          Email
                                        </label>
                                        <input
                                          type='email'
                                          className='form-control form-control-solid'
                                          placeholder='e.g. - abc@gmail.com'
                                          name='email'
                                          value={card?.name}
                                          onChange={handleChnagePopCard}
                                        />
                                      </div>
                                    </div>

                                    {/*end::Content */}
                                  </div>
                                  {/* end::Stepper */}
                                </div>
                              )}
                              {paymentData?.method === '2' && (
                                <div className='modal-body py-lg-10 px-lg-10'>
                                  <div
                                    className='stepper stepper-pills stepper-column flex-column flex-xl-row flex-row-fluid'
                                    id='kt_modal_create_app_stepper'
                                  >
                                    <div
                                      className='card-header align-items-center gap-md-2'
                                      style={{justifyContent: 'flex-start'}}
                                    >
                                      <div className='mb-10 min-w-200px '>
                                        <label
                                          htmlFor='exampleFormControlInput1'
                                          className='required form-label'
                                        >
                                          Cheque No.
                                        </label>
                                        <input
                                          type='text'
                                          className='form-control form-control-solid'
                                          placeholder='e.g. - 0045236541'
                                          name='Cheque'
                                          // value={formData?.name}
                                          // onChange={handleChnage}
                                        />
                                      </div>
                                      <div className='mb-10 min-w-200px '>
                                        <label
                                          htmlFor='exampleFormControlInput1'
                                          className='required form-label'
                                        >
                                          Bank Name
                                        </label>
                                        <input
                                          type='text'
                                          className='form-control form-control-solid'
                                          placeholder='e.g. - Abc Bank'
                                          name='bank'
                                          // value={formData?.name}
                                          // onChange={handleChnage}
                                        />
                                      </div>
                                      <div className='mb-10 min-w-200px '>
                                        <label
                                          htmlFor='exampleFormControlInput1'
                                          className='required form-label'
                                        >
                                          Upload Cheque
                                        </label>
                                        <input
                                          type='file'
                                          className='form-control form-control-solid'
                                          placeholder='e.g. - Abc Bank'
                                          name='uploadcheque'
                                          // value={formData?.name}
                                          // onChange={handleChnage}
                                        />
                                      </div>
                                    </div>

                                    {/*end::Content */}
                                  </div>
                                  {/* end::Stepper */}
                                </div>
                              )}
                              {paymentData?.method === '3' && (
                                <div className='modal-body py-lg-10 px-lg-10'>
                                  <div
                                    className='stepper stepper-pills stepper-column flex-column flex-xl-row flex-row-fluid'
                                    id='kt_modal_create_app_stepper'
                                  >
                                    <div
                                      className='card-header align-items-center gap-md-2'
                                      style={{justifyContent: 'flex-start'}}
                                    >
                                      <div className='mb-10 min-w-200px '>
                                        <label
                                          htmlFor='exampleFormControlInput1'
                                          className='required form-label'
                                        >
                                          Ban
                                        </label>
                                        <input
                                          type='text'
                                          className='form-control form-control-solid'
                                          placeholder='e.g. - 0045236541'
                                          name='IBAN'
                                          value={bank?.IBAN}
                                          onChange={handleChnagePopBank}
                                        />
                                      </div>
                                      <div className='mb-10 min-w-200px '>
                                        <label
                                          htmlFor='exampleFormControlInput1'
                                          className='required form-label'
                                        >
                                          Account No.
                                        </label>
                                        <input
                                          type='text'
                                          className='form-control form-control-solid'
                                          placeholder='e.g. - 110025365412'
                                          name='accountNo'
                                          value={bank?.accountNo}
                                          onChange={handleChnagePopBank}
                                        />
                                      </div>
                                      <div className='mb-10 min-w-200px '>
                                        <label
                                          htmlFor='exampleFormControlInput1'
                                          className='required form-label'
                                        >
                                          Bank Name
                                        </label>
                                        <input
                                          type='text'
                                          className='form-control form-control-solid'
                                          placeholder='e.g. - Abc Bank'
                                          name='bankName'
                                          value={bank?.bankName}
                                          onChange={handleChnagePopBank}
                                        />
                                      </div>
                                    </div>

                                    {/*end::Content */}
                                  </div>
                                  {/* end::Stepper */}
                                </div>
                              )}
                              <div className='modal-footer'>
                                <div className='flex-row-fluid '>
                                  <div className='d-flex justify-content-end '>
                                    <div className='me-2'>
                                      <button
                                        type='button'
                                        className='btn btn-lg btn-light-primary me-3'
                                        data-kt-stepper-action='previous'
                                        onClick={() => {
                                          setShowCheange(false)
                                        }}
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
                                        // onClick={handleSubmit}
                                        onClick={() => {
                                          setShowCheange(false)
                                        }}
                                      >
                                        Submit{' '}
                                        <KTSVG
                                          path='/media/icons/duotune/arrows/arr064.svg'
                                          className='svg-icon-3 ms-2 me-0'
                                        />
                                      </button>
                                    </div>
                                  </div>
                                  {/*end::Form */}
                                </div>
                              </div>
                            </Modal>
                          </>
                        )
                      })
                    : subTenantData.map((v: any, i: any) => {
                        console.log('v', v)
                        return (
                          <>
                            <tr>
                              <td className='text-center' data-order='2022-09-11'>
                                {i + 1}
                              </td>
                              <td className='text-center pe-0'>{v?.firstName}</td>
                              <td className='text-center pe-0'>{v?.lastName}</td>
                              <td className='text-center pe-0'>{v?.email}</td>
                              <td className='text-center pe-0'>
                                +{countryCode} {phoneNumber}
                              </td>
                            </tr>
                          </>
                        )
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'Property Management '})}</PageTitle>
      <DashboardPage /> */}
      {/* <TenanciesFilter
        show={showCreateAppModal}
        handleClose={() => {
          setShowCreateAppModal(false)
        }}
        showModal={showModal}
        type={type}
        // building={building}
        // updateDataId={updateDataId}
        // isEdit={isEdit}
        // formData={formData}
        // propertiType={propertiType}
        // handleSubmit={handleSubmit}
        handleChnage={handleChnage}
        // imageChange={imageChange}
      /> */}
    </>
  )
}

export default CreateTenancy
