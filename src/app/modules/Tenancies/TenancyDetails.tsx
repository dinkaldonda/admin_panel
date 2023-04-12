import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ApiDelete,
  ApiGet,
  ApiPost,
  ApiUpload,
  Bucket,
} from '../../../apiCommon/helpers/API/ApiData'
import { ErrorToast, SuccessToast } from '../../../apiCommon/helpers/Toast'
import { Col, Row } from 'react-bootstrap'
import TenanciesFilter from './TenanciesFilter'
import { Modal } from 'react-bootstrap'
import { KTSVG } from '../../../_metronic/helpers'
import { AiFillDelete } from 'react-icons/ai'
import swal from 'sweetalert2'
import { DatePicker } from 'antd'
import 'antd/dist/antd.css'
import moment from 'moment'
import noData from '../../../img/NoData1.svg'
import AddSubTenant from './AddSubTenant'
import Chart from './Chart'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import Swal from 'sweetalert2'
import GeneratePayment from '../Payments/GeneratePayment'
import SendReminder from '../Payments/SendReminder'
import ViewReminder from '../Payments/ViewReminder'
import appartment from '../../../img/Apartment.svg'
import penthouse from '../../../img/PentHouse.svg'
import common_area from '../../../img/common_area.svg'
import other from '../../../img/other.svg'
import townhouse from '../../../img/TownHouse.svg'
import villa from '../../../img/Villa.svg'

let arry: any = []

const TenancyDetails = () => {
  const [showGenRecModal, setShowGenRecModal] = useState<boolean>(false)
  const [showSubTenantModal, setShowSubTenantModal] = useState<boolean>(false)
  const [showSendRemModal, setShowSendRemModal] = useState<boolean>(false)
  const [showviewRemModal, setShowviewRemModal] = useState<boolean>(false)
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [showCheange, setShowCheange] = useState<boolean>(false)
  const [tableData, setTableData] = useState([])
  const [tenancyPayement, setTenancyPayement] = useState([])
  const [previousTenancy, setPreviousTenancy] = useState([])
  const [paymentMethod, setPaymentMethod] = useState('')
  const [modelindex, setmodelindex] = useState<any>()
  const [popUpData, setpopUpData] = useState<any>({})
  const [popUpReceiptData, setpopUpReceiptData] = useState<any>()
  const [showPaid, setShowPaid] = useState<boolean>(false)
  const [cardA, setCardA] = useState<any>([])
  const [count, setcount] = useState<any>(0)
  const [payment, setPayment] = useState<number>(0)
  const [totalpayment, settotalpayment] = useState<any>(0)
  const [card, setCard] = useState('')
  const [paymentData, setPaymentData] = useState<any>({})
  const [tenancyReminder, setTenancyReminder] = useState([])
  const [updateDataId, setUpdateDataId] = useState('')
  const [showModal, setShowModal] = useState<any>('Filter')
  const [type, setType] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [totalDays, setTotalDays] = useState('0 Days')
  const [propertiType, setPropertiType] = useState(window.location.pathname?.split('/')[3] === 'payment-rent' ? 'Payments' : 'Overview')
  const [modeldata, setmodeldata] = useState<any>()
  const [modelData, setmodelData] = useState<any>({})
  const [modelchequeData, setmodelchequeData] = useState<any>()
  const [totalamount, settotalamount] = useState<any>(0)
  const [propertiTypeT, setPropertiTypeT] = useState('Tenancy')
  // const [Arry, setArry] = useState([])

  const [imgContract, setImgContract] = useState("")
  const [imgOtherT, setImgOtherT] = useState("")
  const [tenancy, setTenancy] = useState<any>([])
  const [isEdit, setIsEdit] = useState(false)
  const [formData, setFormData] = useState<any>({
    propertyId: window.location.pathname?.split('/')[2],
    propertyAreaId: window.location.pathname?.split('/')[3],
  })
  const [tenancyData, setTenancyData] = useState<any>({})
  const [subTenantData, setSubTenantData] = useState<any>([])
  const [reminderId, setReminderId] = useState<any>('')
  const [unitDataApi, setUnitDataApi] = useState<any>([])
  const [selectpaymentData, setSelectPaymentData] = useState<any>({})
  const [bank, setBank] = useState<any>({})
  const [selectedPayments, setSelectedPayments] = useState<any>([])
  const [generateReceipt, setGenerateReceipt] = useState<any>([])
  const [recieptList, setRecieptList] = useState<any>()

  const [Data, setData] = useState([
    {
      date: 'Page A',
      uv: 4000,
      USD: 2400,
      amt: 2400,
    },
    {
      date: 'Page B',
      USD: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      date: 'Page C',
      USD: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      date: 'Page D',
      USD: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      date: 'Page E',
      USD: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      date: 'Page F',
      USD: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      day: 'Page G',
      USD: 3490,
      pv: 4300,
      amt: 2100,
    },
  ])
  //const [data, setData] = useState([]);
  const [Title, setTitle] = useState('Occupancy Graph')
  function add() {
    setData([
      {
        date: 'Page A',
        uv: 4000,
        USD: 2400,
        amt: 2400,
      },
      {
        date: 'Page B',
        USD: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        date: 'Page C',
        USD: 10000,
        pv: 9800,
        amt: 2290,
      },
      {
        date: 'Page D',
        USD: 3000,
        pv: 3908,
        amt: 2000,
      },
      {
        date: 'Page E',
        USD: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        date: 'Page F',
        USD: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        day: 'Page G',
        USD: 3490,
        pv: 4300,
        amt: 2100,
      },
    ])
  }
  const { RangePicker } = DatePicker
  const dateFormat = 'YYYY-MM-DD'
  const handleChnage = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  let ClusterId = localStorage?.getItem('ClusterId')
  let CommunityId = localStorage?.getItem('CommunityId')
  let UnitId = localStorage?.getItem('UnitId')
  const building = async () => {
    let tenancyunitId: any;
    await ApiGet(`cooperate/tenancy/${window.location.pathname.split('/')[2]}`)
      .then((res) => {
        // setTableData(res?.data?.data)
        setTenancy(res?.data?.data)
        tenancyunitId = res?.data?.data[0]?.unitId
      })
      .catch((e) => {
        console.log(e)
      })
    if (tenancyunitId?.length > 0) {
      await ApiGet(`cooperate/unit/${tenancyunitId}`)
        .then((res) => {
          // setTableData(res?.data?.data)
          setUnitDataApi(res?.data?.data)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
  // building()

  const getTenancyPayment = () => {
    let body = {
      page: 1,
      limit: 10,
      tenancyId: window.location.pathname.split('/')[2],
    }
    ApiPost('cooperate/tenancy_payment/get', body)
      .then((res) => {
        setTenancyPayement(res?.data?.data?.tenancy_payment_data)
      })
      .catch((err) => console.log('err', err))
  }

  const handleChangeCheckbox = (id:string) => {
    setSelectedPayments((prev:string[]) => {
      if(prev.find((item:string) => item === id)){
        return prev.filter((item: string) => item !== id)
      }else{
        return [...prev, id]
      }
    })
  }

  
  useEffect(() => {
    const selectedPaymentData = selectedPayments.map((item:any) => {
      if(tenancyPayement.find((it:any) => it._id === item)){
        return tenancyPayement.find((it:any) => it._id === item)
    }
    }) 
    setGenerateReceipt(selectedPaymentData)
  }, [selectedPayments])
  
  const getPreviousTenancy = () => {
    let body = {
      page: 1,
      limit: 10,
      unitId: window.location.pathname.split('/')[2],
    }
    ApiPost('cooperate/tenancy/previous/get', body)
      .then((res) => {
        setPreviousTenancy(res?.data?.data)
      })
      .catch((err) => console.log('err', err))
  }

  const getTenancyReminder = () => {
    let body = {
      page: 1,
      limit: 10,
      tenancyId: window.location.pathname.split('/')[2],
    }
    ApiPost('cooperate/reminder/get', body)
      .then((res) => {
        setTenancyReminder(res?.data?.data?.remainder_data)
      })
      .catch((err) => console.log('err', err))
  }

  const deleteTenancy = () => {
    ApiDelete(`cooperate/tenancy/${window.location.pathname.split('/')[2]}`)
      .then((res) => {
        SuccessToast(res?.data?.message)
        navigate(-1)
      })
      .catch((err) => console.log('err', err))
  }

  const handleSubmit = (type: any) => {
    if (type == 'renew_tenancy') {
      const body = {
        unitId: tenancy[0]?.unitId,
        communityId: tenancy[0]?.communityId,
        buildingId: tenancy[0]?.buildingId,
        isDraft: true,
        tenantId: tenancy[0]?.tenant[0]?._id,
        // tenant: {
        //   firstName: formData?.First,
        //   lastName: formData?.Last,
        //   phoneNumber: formData?.number,
        //   countryCode: formData?.Mobile,
        //   email: formData?.email,
        //   nationality: formData?.nationality,
        //   tenantSource: formData?.Tenant,

        //   DOB: formData?.dob,
        //   document: {
        //     passport: imgPassport ? imgPassport : null,
        //     residency: imgResidency ? imgResidency : "",
        //     id: imgId,
        //     other: imgOther,
        //   },
        // },
        subTenant: subTenantData,
        tenancy: {
          contractNo: tenancyData?.contractNo,
          duration: {
            start_date: tenancy[0]?.duration?.start_date,
            end_date: tenancy[0]?.duration?.end_date,
            days: totalDays.split(' ')[0],
          },
          // duration: totalDays,
          // end: end,
          benefits: {
            none: true,
            chillerFree: true,
            maintenanceFree: true,
            other: tenancyData?.other ? tenancyData?.other : [],
          },
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

          // {
          //   payement: paymentData?.name,
          //   amount: paymentData?.amount,
          //   method: paymentData?.method,
          //   reminder: paymentData?.reminder,
          //   schedule: paymentData?.schedule,
          //   status: paymentData?.status,
          //   type: paymentData?.type,
          // }
        ],
      }
      // const body: any = tenancy[0];
      ApiPost('cooperate/tenancy/renew', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building()
        })
        .catch((err) => ErrorToast(err.message))
    } else {
      ApiGet(`cooperate/tenancy/terminate/${window.location.pathname.split('/')[2]}`)
        .then((res) => {
          SuccessToast(res?.data?.message)
          navigate(-1)
        })
        .catch((err) => console.log('err', err))
    }
  }

  const getPaymentRecieptData = async () => {
    await ApiGet(`cooperate/payment_receipt`)
    .then((res) => {
      setRecieptList(res?.data?.data)
    })
    .catch((err) => console.log('err', err))
  }

  useEffect(() => {
    getPaymentRecieptData()
  }, [])

  useEffect(() => {
    building()
    getTenancyPayment()
    getPreviousTenancy()
    getTenancyReminder()
    // getUnitById()
    // getCommunityById()
    // getClusterById()

    if (isEdit) {
      ApiGet(`cooperate/unit/${updateDataId}`)
        .then((response) => {
          setFormData(response?.data?.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [isEdit])

  const navigate = useNavigate()

  const callmodel = (data: any, index: any) => {
    setmodeldata(data)
    setmodelindex(index)
    setcount(count + 1)
    setShowCheange(true)
  }

  const callpopUp = (data: any, index: any) => {
    // setmodeldata(data)
    setmodelindex(index)
    setcount(count + 1)
    setShowPaid(true)
  }

  const popUpSubmit = (index: any) => {
    let data: any
    setmodelindex(index)
    if (paymentMethod === '0') {
      data = {
        ...popUpData,
      }
      data.image = popUpReceiptData
    } else if (paymentMethod === '1') {
      data = {
        ...popUpData,
      }
      data.image = popUpReceiptData
    } else if (paymentMethod === '2') {
      data = {
        ...popUpData,
      }
      data.receiptImage = popUpReceiptData
      data.chequeImage = modelchequeData
    } else if (paymentMethod === '3') {
      data = {
        ...popUpData,
      }
      data.image = popUpReceiptData
    } else if (paymentMethod === '4') {
      data = {
        ...popUpData,
      }
      data.image = popUpReceiptData
    }

    arry = arry.map((q: any, i: any) => {
      if (i === modelindex) {
        // 👇️ change value of name property
        return { ...q, ['receipt']: data, paymentMethod }
      }
      return q
    })

    setcount(count + 1)
    setShowPaid(false)
  }
  const modelchange = (e: any) => {
    let { name, value } = e.target

    setmodelData({ ...modelData, [name]: value })
  }

  const modelSubmit = () => {
    let data: any
    if (modeldata == '2') {
      data = {
        cheque: modelData,
      }
      data.cheque.image = modelchequeData
    } else if (modeldata == '3') {
      data = {
        bank: modelData,
      }
    } else if (modeldata == '0') {
      data = {
        card: {},
      }
    } else if (modeldata == '1') {
      data = {
        card: {},
      }
    }
    arry = arry.map((q: any, i: any) => {
      if (i === modelindex) {
        // 👇️ change value of name property
        return { ...q, ['paymentValue']: data }
      }
      return q
    })

    setcount(count + 1)
    setShowCheange(false)
  }

  const popUpchange = (e: any) => {
    let { name, value } = e.target

    setpopUpData({ ...popUpData, [name]: value })
  }

  const handleChnage12 = (e: any) => {
    const { name, value } = e.target
    setPaymentMethod(e.target.value)
  }

  const imagerecipt = async (e: any) => {
    let file = e.target.files[0]
    let fileURL = URL.createObjectURL(file)
    file.fileURL = fileURL
    let formData = new FormData()
    formData.append('image', file)
    await ApiUpload('upload/image/cheque', formData)
      .then(async (res) => setpopUpReceiptData(res?.data?.data?.image))
      .catch((err) => {
        ErrorToast(err?.message)
      })
  }

  const imageCheque = async (e: any) => {
    let file = e.target.files[0]
    let fileURL = URL.createObjectURL(file)
    file.fileURL = fileURL
    let formData = new FormData()
    formData.append('image', file)
    await ApiUpload('upload/image/cheque', formData)
      .then(async (res) => setmodelchequeData(res?.data?.data?.image))
      .catch((err) => {
        ErrorToast(err?.message)
      })
  }
  const handleChnagePayment = (e: any, i: any) => {
    let { name, value } = e.target
    if (name == 'amount' || name == 'paymentMethod' || name == 'rentType' || name == 'status') {
      value = parseInt(value)
    }
    if (name == 'amount') {
      let dat = arry[i].amount
      if (!value) {
        value = 0
      }
      if (dat) {
        settotalamount(totalamount - dat + value)
      } else {
        settotalamount(totalamount + value)
      }
    }
    if (name == 'paymentSchedule') {
      var d = new Date(value)
      arry = arry.map((q: any, j: any) => {
        if (j === i) {
          // 👇️ change value of name property
          return { ...q, ['paymentRemainder']: moment(d).format('YYYY-MM-DD') }
        }
        return q
      })
    }
    arry = arry.map((q: any, k: any) => {
      if (k === i) {
        // 👇️ change value of name property
        return { ...q, [name]: value }
      }
      return q
    })
    setcount(count + 1)
  }
  const handleRemoveSubTenant = () => {
    ApiDelete(`cooperate/tenant/${tenancy[0]?.subTenantIds[0]}`)
      .then((response) => {
        SuccessToast(response?.data?.message)
        // navigate(-1)
        building()
      })
      .catch((error) => {
        console.log(error)
      })

  }

  const handleTenancy = () => {
    if (tenancy[0]?.tenancyStatus === 0) {
      SuccessToast('Unit is currently Booked. To create a new tenancy must be completed or terminated')
    } else if (tenancy[0]?.tenancyStatus === 1 || tenancy[0]?.tenancyStatus === 2) {
      SuccessToast('Tenancy is currently Active. To create a new tenancy must be completed or terminated')
    } else if (tenancy[0]?.tenancyStatus === 3) {
      navigate('/create-tenant')
    }
  }

  const viewReminder = (id: any) => {
    setReminderId(id)
    setShowviewRemModal(true)
  }
  const unitData = (tanancy: any, unitDataApi: any) => {
    if (tanancy && unitDataApi) {
      if (tanancy?.communityId) {
        if (unitDataApi?.cluster._id && unitDataApi?.cluster.type === 0) {
          return unitDataApi.cluster.name;
        } else if (unitDataApi?.cluster._id && unitDataApi?.cluster.type === 1) {
          return unitDataApi?.cluster.name;
        } else if (unitDataApi?.cluster._id && unitDataApi?.cluster.type === 2) {
          if (unitDataApi?.unitGroupId) {
            return unitDataApi?.unitGroupId;
          } else {
            return unitDataApi?.cluster.name;
          }
        }
      } else {
        return unitDataApi?.buildingId
      }
    } else {
      return '-';
    }
  }
  const unitHeaderData = (tanancy: any, unitDataApi: any) => {

    if (tanancy && unitDataApi) {
      if (tanancy?.communityId) {
        if (unitDataApi?.cluster?._id && unitDataApi?.cluster?.type === 0) {
          return 'Cluster Name'
        } else if (unitDataApi?.cluster?._id && unitDataApi?.cluster?.type === 1) {
          return 'Buildin Cluster';
        } else if (unitDataApi?.cluster?._id && unitDataApi?.cluster?.type === 2) {
          if (unitDataApi?.unitGroupId) {
            return 'Mixed Cluster';
          } else {
            return 'Unit Cluster';
          }
        }
      } else {
        return "Floor"
      }
    } else {
      return
    }
  }
  const viewTenantProfile = (id: any) => {
    navigate(`/tenant/${id}`)
  }

  const deleteRow = (id: any) => {
    ApiDelete(`cooperate/tenancy_payment/${id}`)
      .then((response) => {
        SuccessToast(response?.data?.message)
      })
      .catch((error) => {
        console.log(error)
      })
      getTenancyPayment()
  }

  const addFileds = () => {
    setPayment(payment + 1)
    settotalpayment(totalpayment + 1)
    arry.push({ paymentNo: (payment + 1).toString(), currency: 'AED' })
    // setArry(arry)
  }

  const deleteRowTable = (i: any, amount: any) => {
    arry = arry.filter((v: any, index: any) => index !== i)
    if (amount == undefined) {
      amount = 0
    }
    settotalamount(totalamount - amount)
    settotalpayment(totalpayment - 1)
    setcount(count + 1)
    if (arry.length === 0) {
      setCard('')
    }
    let a: any = []
    arry.map((v: any) => {
      if (v?.paymentMethod === 0) {
        a.push(v?.paymentMethod)
      }
      if (v?.paymentMethod === 1) {
        a.push(v?.paymentMethod)
      }
    })
    const ages = a
    const uniqueAges = ages.filter(
      (x: any, i: any, a: any) => a.indexOf(x) == i
    )
    if (uniqueAges.length === 2) {
      setCard('2')
    }
    if (uniqueAges.length === 1) {

      if (uniqueAges[0] === 0) {
        setCard('0')
      } else {
        setCard('1')
      }
    }
    if (uniqueAges.length === 0) {
      if (a.length === 0) {
        setCard('')
      }
    }
    // setArry(arry)
  }

  const handleAddPayment = () => {
    const cheque = arry[0]?.paymentValue?.cheque
    const bank = arry[0]?.paymentValue?.bank
    const body = {
      paymentNo: arry[0]?.paymentNo,
      tenancyId: window.location.pathname.split('/')[2],
      comment: "Test",
      paymentSchedule: arry[0]?.paymentSchedule,
      paymentRemainder: arry[0]?.paymentRemainder,
      currency: "AED",
      paymentMethod: arry[0]?.paymentMethod,
      amount: arry[0]?.amount,
      status: arry[0]?.status,
      paymentValue: {
        cheque,
        bank,
      },
      receipt: {

      }
    }
    ApiPost('cooperate/tenancy_payment', body)
      .then((res) => {
        SuccessToast(res.data.message)
        getTenancyPayment()
        arry = [];
      })
      .catch((err) => ErrorToast(err?.message))

    // getTenancyPayment()
  }

  return (
    <>
      <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
        {/* <div className='d-flex flex-column flex-column-fluid'> */}
        {/* <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'> */}
        <div id='' className='app-container container-xxl pt-0 mt-0'>
          <div className='d-flex align-items-center flex-wrap mr-1 '>
            <div className='d-flex align-items-baseline flex-wrap mr-5'>
              <ul className='breadcrumb breadcrumb-transparent breadcrumb-line font-weight-bold p-0 my-2 font-size-sm'>
                <li className='breadcrumb-item '>
                  <a
                    className='text-muted px-2 cursor-pointer'
                    onClick={() => navigate('/tenancies')}
                  >
                    Tanancy
                  </a>
                </li>
                <li className='breadcrumb-item active'>
                  <a className='px-2'>Property details</a>
                </li>
              </ul>
            </div>
          </div>
          <div className='card card-flush mt-8'>
            <Row>
              <Col md={3} className='m-5'>
                <h2>Property Details</h2>
              </Col>
              <Col md={8} className='m-5'>

              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <div className='m-5'>
                  {tenancy[0]?.unit[0]?.images[0].length > 0 ? 
                  <img src={`${Bucket}${tenancy[0]?.unit[0]?.images[0]}`} alt='' width={170} height={150} /> : 
                    tenancy[0]?.unit[0]?.unitType === 'town_house'
                      ? <img src={townhouse} alt='' width={170} height={150} /> 
                      : tenancy[0]?.unit[0]?.unitType === 'other'
                        ? <img src={other} alt='' width={170} height={150} />
                        : tenancy[0]?.unit[0]?.unitType === 'common_area'
                          ? <img src={common_area} alt='' width={170} height={150} /> 
                          : tenancy[0]?.unit[0]?.unitType === 'villa'
                            ? <img src={villa} alt='' width={170} height={150} /> 
                            : tenancy[0]?.unit[0]?.unitType === 'apartment'
                              ? <img src={appartment} alt='' width={170} height={150} />  
                              : tenancy[0]?.unit[0]?.unitType === 'penthouse'
                                ? <img src={penthouse} alt='' width={170} height={150} /> 
                                : '' }
                </div>
              </Col>
              <Col md={10} className='m-auto'>
                <div className='card-header align-items-center py-5  gap-md-2 d-flex border-0 p-0'>
                  <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                    <h6 className='mx-10 text-muted'>
                      Unit No
                      <span className='mx-1' style={{ color: 'black' }}>
                        {tenancy[0]?.unit[0]?.unitNo}
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                    <h6 className='mx-10 text-muted'>
                      {unitDataApi.length > 0 && unitHeaderData(tenancy[0], unitDataApi)}
                      <span className='mx-1' style={{ color: 'black' }}>
                        {unitDataApi.length > 0 && unitData(tenancy[0], unitDataApi)}
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                    <h6 className='mx-10 text-muted'>
                      Bedrooms{' '}
                      <span className='mx-1' style={{ color: 'black' }}>
                        {tenancy[0]?.unit[0]?.bedrooms}
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                    <h6 className='mx-10 text-muted'>
                      Tenant Name{' '}
                      <span className='mx-1' style={{ color: 'black' }}>
                        {tenancy[0]?.tenant[0]?.firstName} {tenancy[0]?.tenant[0]?.lastName}
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                    <h6 className='mx-10 text-muted'>
                      Rent Status
                      <span className='mx-1' style={{ color: 'black' }}>
                        {tenancy[0]?.tenancy_payment[0]?.status === 0
                          ? 'Pedning'
                          : tenancy[0]?.tenancy_payment[0]?.status === 1
                            ? 'Paid'
                            : 'Overdue'}
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                    <h6 className='mx-10 text-muted'>
                      Building Name{' '}
                      <span className='mx-1' style={{ color: 'black' }}>
                        {tenancy[0]?.unit[0]?.cluster[0]?.name}
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                    <h6 className='mx-10 text-muted'>
                      Size{' '}
                      <span className='mx-1' style={{ color: 'black' }}>
                        {tenancy[0]?.unit[0]?.size}{' '}
                        {tenancy[0]?.unit[0]?.sizeType == '0' ? 'Sq ft' : 'sq m'}
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                    <h6 className='mx-10 text-muted'>
                      Tenancy Start Date - End Date{' '}
                      <span className='mx-1' style={{ color: 'black' }}>
                        {moment(tenancy[0]?.duration?.start_date).format('DD/MM/YYYY')} -{' '}
                        {moment(tenancy[0]?.duration?.end_date).format('DD/MM/YYYY')}
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                    <h6 className='mx-10 text-muted'>
                      Rent Amount{' '}
                      <span className='mx-1' style={{ color: 'black' }}>
                        {tenancy[0]?.tenancy_payment[0]?.amount} AED
                      </span>
                    </h6>
                  </div>
                  {tenancy[0]?.unit[0]?.cluster?.area && <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                    <h6 className='mx-10 text-muted'>
                      Area{' '}
                      <span className='mx-1' style={{ color: 'black' }}>
                        {tenancy[0]?.unit[0]?.cluster?.area}
                      </span>
                    </h6>
                  </div>}
                  <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                    <h6 className='mx-10 text-muted'>
                      Occupancy{' '}
                      <span className='mx-1' style={{ color: 'black' }}>
                        {tenancy[0]?.unit[0]?.occupy === 1 ? 'Vacant' : 'Occupied'}
                      </span>
                    </h6>
                  </div>
                  {/* <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                    <h6 className='mx-10 text-muted'>
                      No. of Payments <span className='mx-1' style={{ color: 'black' }}></span>
                    </h6>
                  </div> */}
                  <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                    <h6 className='mx-10 text-muted'>
                      Last Rent Received{' '}
                      <span className='mx-1' style={{ color: 'black' }}>
                        {moment(tenancy[0]?.tenancy_payment?.[0]?.paymentSchedule).format(
                          'DD/MM/YYYY'
                        )}
                      </span>
                    </h6>
                  </div>
                  {tenancy[0]?.unit[0]?.unitType && <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                    <h6 className='mx-10 text-muted'>
                      Property Type{' '}
                      <span className='mx-1' style={{ color: 'black' }}>
                        {tenancy[0]?.unit[0]?.unitType === 'town_house'
                          ? 'TownHouse'
                          : tenancy[0]?.unit[0]?.unitType === 'other'
                            ? 'Other'
                            : tenancy[0]?.unit[0]?.unitType === 'common_area'
                              ? 'Common Area'
                              : tenancy[0]?.unit[0]?.unitType === 'villa'
                                ? 'Villa'
                                : tenancy[0]?.unit[0]?.unitType === 'apartment'
                                  ? 'Apartment'
                                  : tenancy[0]?.unit[0]?.unitType === 'penthouse'
                                    ? 'Penthouse'
                                    : ''}
                      </span>
                    </h6>
                  </div>}
                  <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                    <h6 className='mx-10 text-muted'>
                      Property Manager{' '}
                      <span className='mx-1' style={{ color: 'black' }}>
                        {tenancy[0]?.unit[0]?.managerId}
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                    <h6 className='mx-10 text-muted'>
                      Property ID{' '}
                      <span className='mx-1' style={{ color: 'black' }}>
                        {tenancy[0]?.unit[0]?._id}
                      </span>
                    </h6>
                  </div>
                  <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                    <h6 className='mx-10 text-muted'>
                      Rating{' '}
                      <span className='mx-1' style={{ color: 'black' }}>
                        <span className='svg-icon svg-icon-2' style={{ color: '#ffad0f' }}>
                          <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M11.1359 4.48359C11.5216 3.82132 12.4784 3.82132 12.8641 4.48359L15.011 8.16962C15.1523 8.41222 15.3891 8.58425 15.6635 8.64367L19.8326 9.54646C20.5816 9.70867 20.8773 10.6186 20.3666 11.1901L17.5244 14.371C17.3374 14.5803 17.2469 14.8587 17.2752 15.138L17.7049 19.382C17.7821 20.1445 17.0081 20.7069 16.3067 20.3978L12.4032 18.6777C12.1463 18.5645 11.8537 18.5645 11.5968 18.6777L7.69326 20.3978C6.99192 20.7069 6.21789 20.1445 6.2951 19.382L6.7248 15.138C6.75308 14.8587 6.66264 14.5803 6.47558 14.371L3.63339 11.1901C3.12273 10.6186 3.41838 9.70867 4.16744 9.54646L8.3365 8.64367C8.61089 8.58425 8.84767 8.41222 8.98897 8.16962L11.1359 4.48359Z'
                              fill='currentColor'
                            ></path>
                          </svg>
                        </span>
                        {tenancy[0]?.unit[0]?.rating}
                      </span>
                    </h6>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div
            className='d-flex align-items-center gap-2 gap-lg-3 mt-8 justfy-content-center'
            style={{ justifyContent: 'center' }}
          >
            <ul className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2'>
              <li
                className={`nav-item cursor-pointer ` + (propertiType === 'Overview' ? 'active' : '')}
                onClick={() => {
                  setPropertiType('Overview')
                }}
              >
                <a
                  className={`nav-link text-active-primary pb-4 text-center mx-10 ` + (propertiType === 'Overview' ? 'active' : '')}
                  data-bs-toggle='tab'
                >
                  Overview
                </a>
              </li>
              <li
                className={`nav-item cursor-pointer` + (propertiType === 'Tenancy' ? 'active' : '')}
                onClick={() => {
                  setPropertiType('Tenancy')
                }}
              >
                <a
                  className={`nav-link text-active-primary pb-4 text-center mx-10 ` + (propertiType === 'Tenancy' ? 'active' : '')}
                  data-bs-toggle='tab'
                >
                  {/* <div className='svg-icon svg-icon-md svg-icon-primary mb-2'>
                    <img src={penthouse} alt='' width='30px' />{' '}
                  </div> */}
                  Tenancy
                </a>
              </li>
              <li
                className={`nav-item cursor-pointer ` + (propertiType === 'Payments' ? 'active' : '')}
                onClick={() => {
                  setPropertiType('Payments')
                }}
              >
                <a
                  className={`nav-link text-active-primary pb-4 text-center mx-10 ` + (propertiType === 'Payments' ? 'active' : '')}
                  data-bs-toggle='tab'
                >
                  {/* <div className='svg-icon svg-icon-md svg-icon-primary mb-2'>
                    <img src={penthouse} alt='' width='30px' />{' '}
                  </div> */}
                  Payments & Rent
                </a>
              </li>
              <li
                className={`nav-item cursor-pointer ${propertiType}` + (propertiType === 'Announcements' ? 'active' : '')}
                onClick={() => {
                  setPropertiType('Announcements')
                }}
              >
                <a
                  className={`nav-link text-active-primary pb-4 text-center mx-10 ` + (propertiType === 'Announcements' ? 'active' : '')}
                  data-bs-toggle='tab'
                >
                  {/* <div className='svg-icon svg-icon-md svg-icon-primary mb-2'>
                    <img src={penthouse} alt='' width='30px' />{' '}
                  </div> */}
                  Announcements
                </a>
              </li>

              <li
                className={`nav-item cursor-pointer ${propertiType}` + (propertiType === 'Requests' ? 'active' : '')}
                onClick={() => {
                  setPropertiType('Requests')
                }}
              >
                <a
                  className={`nav-link text-active-primary pb-4 text-center mx-10 ` + (propertiType === 'Requests' ? 'active' : '')}
                  data-bs-toggle='tab'
                >
                  {/* <div className='svg-icon svg-icon-md svg-icon-primary mb-2'>
                    <img src={penthouse} alt='' width='30px' />{' '}
                  </div> */}
                  Requests
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* </div> */}

        <div
          id='kt_app_content'
          className='app-content flex-column-fluid pt-0'
          style={{ paddingTop: '0px' }}
        >
          <div id='kt_app_content_container' className='app-container container-xxl mt-10'>
            <div className='card card-flush mb-10'>
              {propertiType === 'Overview' && (
                <>
                  <Row>
                    <Col md={6} className='my-10'>
                      <div id='pie' className='mx-5'>
                        {/* <button onClick={() => add()}> Click </button> */}
                        <Chart />
                        <h1>{Title}</h1>
                        <LineChart
                          width={500}
                          height={300}
                          data={Data}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray='3 3' />
                          <XAxis dataKey='date' />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type='monotone' dataKey='USD' stroke='#007a59' />
                        </LineChart>
                        <Chart />
                      </div>
                    </Col>
                    <Col md={6} className='mt-10 m-auto'>
                      <div className='mb-10  min-w-200px'>
                        <h6 className='mx-10 text-muted'>
                          Average Occupancy Rate{' '}
                          <span className='mx-1' style={{ color: 'black' }}>
                            57%
                          </span>
                        </h6>
                      </div>
                      <div className='mb-10  min-w-200px'>
                        <h6 className='mx-10 text-muted'>
                          Total Service Requests{' '}
                          <span className='mx-1' style={{ color: 'black' }}>
                            15
                          </span>
                        </h6>
                      </div>
                    </Col>
                  </Row>
                </>
              )}
              {propertiType === 'Tenancy' && (
                <>
                  <div
                    className='d-flex align-items-center gap-2 gap-lg-3 mt-8 justfy-content-center'
                    style={{ justifyContent: 'center' }}
                  >
                    <ul className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2'>
                      <li
                        className={`nav-item cursor-pointer ` + (propertiTypeT === 'Tenancy' ? 'active' : '')}
                        onClick={() => {
                          setPropertiTypeT('Tenancy')
                        }}
                      >
                        <a
                          className={`nav-link text-active-primary pb-4 text-center mx-10 ` + (propertiTypeT === 'Tenancy' ? 'active' : '')}
                          data-bs-toggle='tab'
                        >
                          Tenancy
                        </a>
                      </li>
                      <li
                        className={`nav-item cursor-pointer ` + (propertiTypeT === 'Tenants' ? 'active' : '')}
                        onClick={() => {
                          setPropertiTypeT('Tenants')
                        }}
                      >
                        <a
                          className={`nav-link text-active-primary pb-4 text-center mx-10 ` + (propertiTypeT === 'Tenants' ? 'active' : '')}
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
                  {propertiTypeT === 'Tenancy' && (
                    <>
                      <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
                        <div className='pt-3 mt-0'>
                          <div className=''>
                            <a
                              className='btn btn-sm fw-bold btn-primary btn-green'
                              data-bs-toggle='modal'
                              data-bs-target='#kt_modal_create_app'
                              onClick={() => handleTenancy()}
                            >
                              Create Tenancy
                            </a>
                          </div>
                        </div>
                        <div className=''>
                          <a
                            className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                            onClick={() => navigate(`/edit-tenancy/${tenancy[0]?._id}`)}
                          >
                            Edit Tenancy
                          </a>
                          <a
                            className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                            onClick={() => handleSubmit('renew_tenancy')}
                          >
                            Renew Tenancy
                          </a>
                          <a
                            className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                            onClick={() => handleSubmit('terminate_tenancy')}
                          >
                            Terminate Tenancy
                          </a>
                        </div>
                      </div>
                      <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
                        <div>
                          <h5>Contract Details</h5>
                        </div>
                      </div>
                      <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
                        <div className='card-header align-items-center py-5  gap-md-2 d-flex border-0 p-0 contact-details-wrapper'>
                          <div className='min-w-200px'>
                            <h6 className='mx-10 text-muted'>
                              Contract ID
                              <span className='mx-1' style={{ color: 'black' }}>
                                {tenancy[0]?._id}
                              </span>
                            </h6>
                          </div>
                          <div className='min-w-200px'>
                            <h6 className='mx-10 text-muted'>
                              Contract No.{' '}
                              <span className='mx-1' style={{ color: 'black' }}>
                                {tenancy[0]?.contractNo}
                              </span>
                            </h6>
                          </div>
                          <div className='min-w-200px'>
                            <h6 className='mx-10 text-muted'>
                              Tenancy Status{' '}
                              <span className='mx-1' style={{ color: 'black' }}>
                                {tenancy[0]?.tenancyStatus === 0 ? 'Booked' : tenancy[0]?.tenancyStatus === 1 ? 'Active' : tenancy[0]?.tenancyStatus === 2 ? 'Expiring' : tenancy[0]?.tenancyStatus === 3 ? 'Ended' : tenancy[0]?.tenancyStatus === 4 ? 'Renewed' : tenancy[0]?.tenancyStatus === 5 ? 'Terminated' : ''}
                              </span>
                            </h6>
                          </div>
                          <div className='min-w-200px'>
                            <h6 className='mx-10 text-muted'>
                              Remaining{' '}
                              <span className='mx-1' style={{ color: 'black' }}>
                                {tenancy[0]?.remainingDays === 1 ? tenancy[0]?.remainingDays + ' Day' : tenancy[0]?.remainingDays >= 2 ? tenancy[0]?.remainingDays + ' Days' : tenancy[0]?.remainingDays <= 0 ? 0 + ' Days' : ''}
                              </span>
                            </h6>
                          </div>
                          <div className='min-w-200px'>
                            <h6 className='mx-10 text-muted'>
                              Start{' '}
                              <span className='mx-1' style={{ color: 'black' }}>
                                {tenancy[0]?.duration?.start_date ? moment(tenancy[0]?.duration?.start_date).format('DD/MM/YYYY') : 'No Date'}
                              </span>
                            </h6>
                          </div>
                          <div className='min-w-200px'>
                            <h6 className='mx-10 text-muted'>
                              End{' '}
                              <span className='mx-1' style={{ color: 'black' }}>
                                {tenancy[0]?.duration?.end_date ? moment(tenancy[0]?.duration?.end_date).format('DD/MM/YYYY') : 'No Date'}
                              </span>
                            </h6>
                          </div>
                          <div className='min-w-200px'>
                            <h6 className='mx-10 text-muted'>
                              Duration{' '}
                              <span className='mx-1' style={{ color: 'black' }}>
                                {tenancy[0]?.duration?.days === 1 ? tenancy[0]?.duration?.days + ' Day' : tenancy[0]?.duration?.days >= 2 ? tenancy[0]?.duration?.days + ' Days' : tenancy[0]?.duration?.days <= 0 ? 0 + ' Days' : ''}
                              </span>
                            </h6>
                          </div>
                          {(tenancy[0]?.benefits?.chillerFree || tenancy[0]?.benefits?.maintenanceFree || tenancy[0]?.benefits?.other) && <div className='min-w-200px'>
                            <h6 className='mx-10 text-muted'>
                              Benefits{' '}
                              <span className='mx-1' style={{ color: 'black' }}>
                              {tenancy[0]?.benefits?.chillerFree === true ? <><span className="dot"></span> - Chiller Free </> : ''}
                              {tenancy[0]?.benefits?.maintenanceFree ? <><span className="dot"></span> - Maintenance Free </>  : ''}
                              {tenancy[0]?.benefits?.other ? ' - '+ tenancy[0]?.benefits?.other.join('- ')  : ''}
                              {/* {tenancy[0]?.benefits.values().join(', ')} */}

                              </span>
                            </h6>
                          </div>}
                          {tenancy[0]?.document?.contract ? <a
                            className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                            href={`${Bucket}${tenancy[0]?.document?.contract}`} target="_blank">
                            View Contract
                          </a>
                            :
                            <a
                              className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                            >
                              View Contract
                            </a>
                          }
                          {tenancy[0]?.document?.other ? <a
                            className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                            href={`${Bucket}${tenancy[0]?.document?.other}`} target="_blank"
                          >
                            View Other
                          </a>
                            :
                            <a
                              className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                            >
                              View Other
                            </a>
                          }
                        </div>
                      </div>
                      <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
                        <div className=''>
                          <h5>Financials</h5>
                        </div>
                      </div>
                      {tenancy[0]?.totalPayments && tenancy[0]?.totalPayments !== 0 ? <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
                        <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                          <h6 className='text-muted'>
                            Total No. of Payments
                            <span className='mx-1' style={{ color: 'black' }}>
                              {tenancy[0]?.totalPayments}
                            </span>
                          </h6>
                        </div>
                      </div> : ''}
                      {tenancy[0]?.rentAmounts !== 0 && <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
                        <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                          <h6 className='text-muted'>
                            Rent Amount
                            <span className='mx-1' style={{ color: 'black' }}>
                              {tenancy[0]?.rentAmounts} AED
                            </span>
                          </h6>
                        </div>
                      </div>}
                      {tenancy[0]?.securityAmounts !== 0 && <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
                        <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                          <h6 className='text-muted'>
                            Security Deposit
                            <span className='mx-1' style={{ color: 'black' }}>
                              {tenancy[0]?.securityAmounts} AED
                            </span>
                          </h6>
                        </div>
                      </div>}
                      {tenancy[0]?.otherAmounts !== 0 && <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
                        <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                          <h6 className='text-muted'>
                            Other - Parking
                            <span className='mx-1' style={{ color: 'black' }}>
                              {tenancy[0]?.otherAmounts} AED
                            </span>
                          </h6>
                        </div>
                      </div>}
                      {tenancy[0]?.bookingAmounts !== 0 && <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
                        <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                          <h6 className='text-muted'>
                            Booking Amout
                            <span className='mx-1' style={{ color: 'black' }}>
                              {tenancy[0]?.bookingAmounts} AED
                            </span>
                          </h6>
                        </div>
                      </div>}
                      {tenancy[0]?.totalAmounts !== 0 && <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
                        <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                          <h6 className='text-muted'>
                            Total Amout
                            <span className='mx-1' style={{ color: 'black' }}>
                              {tenancy[0]?.totalAmounts} AED
                            </span>
                          </h6>
                        </div>
                      </div>}
                    </>
                  )}
                  {propertiTypeT === 'Tenants' && (
                    <>
                      {/* <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
                        <div className=''>
                          <h5>Main Tenant </h5>
                        </div>
                      </div> */}
                      <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
                        <div className='card-header align-items-center py-5  gap-md-2 d-flex border-0 p-0'>
                          <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                            <h6 className='mx-10 text-muted'>
                              Tenant ID
                              <span className='mx-1' style={{ color: 'black' }}>
                                {tenancy[0]?.tenant[0]?._id}
                              </span>
                            </h6>
                          </div>

                          <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                            <h6 className='mx-10 text-muted'>
                              Tenant Name{' '}
                              <span className='mx-1' style={{ color: 'black' }}>
                                {tenancy[0]?.tenant[0]?.firstName} {tenancy[0]?.tenant[0]?.lastName}
                              </span>
                            </h6>
                          </div>
                          {tenancy[0]?.tenant[0]?.type ? <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                            <h6 className='mx-10 text-muted'>
                              Type{' '}
                              <span className='mx-1' style={{ color: 'black' }}>
                                {tenancy[0]?.tenant[0]?.type}
                              </span>
                            </h6>
                          </div> : ''}
                          {tenancy[0]?.tenant[0]?.DOB && <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                            <h6 className='mx-10 text-muted'>
                              Date of Birth{' '}
                              <span className='mx-1' style={{ color: 'black' }}>
                                {tenancy[0]?.tenant[0]?.DOB}
                              </span>
                            </h6>
                          </div>}
                          {tenancy[0]?.tenant[0]?.nationality && <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                            <h6 className='mx-10 text-muted'>
                              Nationality{' '}
                              <span className='mx-1' style={{ color: 'black' }}>
                                {tenancy[0]?.tenant[0]?.nationality}
                              </span>
                            </h6>
                          </div>}
                          {tenancy[0]?.tenant[0]?.email && <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                            <h6 className='mx-10 text-muted'>
                              Email{' '}
                              <span className='mx-1' style={{ color: 'black' }}>
                                {tenancy[0]?.tenant[0]?.email}
                              </span>
                            </h6>
                          </div>}
                          {tenancy[0]?.tenant[0]?.phoneNumber && <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                            <h6 className='mx-10 text-muted'>
                              Mobile No{' '}
                              <span className='mx-1' style={{ color: 'black' }}>
                                {tenancy[0]?.tenant[0]?.phoneNumber}
                              </span>
                            </h6>
                          </div>}
                          <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                            <h6 className='mx-10 text-muted'>
                              Source{' '}
                              <span className='mx-1' style={{ color: 'black' }}>
                                {tenancy[0]?.tenant[0]?.tenantSource === 0 ? 'Agent' : 'Direct'}
                              </span>
                            </h6>
                          </div>
                          <a
                            // onClick={() => setShowCreateAppModal(true)}
                            className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_create_app'
                            onClick={() => viewTenantProfile(tenancy[0]?.tenant[0]?._id)}
                          >
                            View Profile
                          </a>
                          <a
                            // onClick={() => setShowCreateAppModal(true)}
                            className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_create_app'
                          // onClick={handleSubmit}
                          >
                            Message
                          </a>
                        </div>
                      </div>
                      <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
                        <div className=''>
                          <h5>Sub Tenants</h5>
                        </div>
                        <div className=''>
                          <a
                            // onClick={() => setShowCreateAppModal(true)}
                            className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_create_app'
                            onClick={() => setShowSubTenantModal(true)}
                          >
                            Add Sub Tenant
                          </a>
                        </div>
                      </div>
                      <div className='card-body pt-0 table-responsive mt-5'>
                        <table
                          className='table align-middle table-row-dashed fs-6 gy-5'
                          id='kt_ecommerce_sales_table'
                        >
                          <thead>
                            <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                              <th className=' min-w-100px'>Tenant ID </th>
                              <th className=' min-w-100px'>Name</th>
                              <th className=' min-w-100px'> Registration Status</th>
                              <th className=' min-w-100px'></th>
                              <th className=' min-w-100px'></th>
                            </tr>
                          </thead>
                          <tbody className='fw-semibold text-gray-600'>
                            {tenancy[0]?.sub_tenant.map((item: any, key: any) => {
                              return (<tr key={key}>
                                <td>{item._id}</td>
                                <td>{item.firstName} {item.lastName}</td>
                                <td>{item.registrationStatus === 0 ? 'Not Invited' : item.registrationStatus === 1 ? 'Invited' : item.registrationStatus === 2 ? 'Registered' : ''}</td>
                                <td>
                                  <a
                                    // onClick={() => setShowCreateAppModal(true)}
                                    className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                                    data-bs-toggle='modal'
                                    data-bs-target='#kt_modal_create_app'
                                  // onClick={handleSubmit}
                                  // onClick={() => {
                                  //   navigate(-1)
                                  // }}
                                  >
                                    Message
                                  </a>
                                </td>
                                <td>
                                  <a
                                    // onClick={() => setShowCreateAppModal(true)}
                                    className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                                    // data-bs-toggle='modal'
                                    // data-bs-target='#kt_modal_create_app'
                                    onClick={handleRemoveSubTenant}
                                  // onClick={() => {
                                  //   navigate(-1)
                                  // }}
                                  >
                                    Remove
                                  </a>
                                </td>
                              </tr>)
                            })}

                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                  <h3 className='mx-10 my-5'>Previous Tenancies</h3>
                  <div className='card-body pt-0 table-responsive mt-5'>
                    <table
                      className='table align-middle table-row-dashed fs-6 gy-5'
                      id='kt_ecommerce_sales_table'
                    >
                      <thead>
                        <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                          <th className=' min-w-100px'>Contract No. </th>
                          <th className=' min-w-100px'>Tenancy Status</th>
                          <th className=' min-w-100px'>Tenant Source</th>
                          <th className=' min-w-100px'>Tenant</th>
                          <th className=' min-w-100px'>Duration</th>
                          <th className=' min-w-100px'>Start - End</th>
                          <th className=' min-w-100px'>Rating</th>
                          <th className=' min-w-100px'></th>
                        </tr>
                      </thead>
                      <tbody className='fw-semibold text-gray-600'>
                        {tableData?.length ? (
                          previousTenancy?.map((v: any, i: any) => {
                            return (
                              <tr>
                                <td>{v?.contractNo}</td>
                                <td>
                                  {v?.tenancyStatus === 0
                                    ? 'Booked '
                                    : v?.tenancyStatus === 1
                                      ? 'Active'
                                      : 'Renewed'}
                                </td>
                                <td>Agent</td>
                                <td>Main Tenant</td>
                                <td>{v?.duration?.days} Days</td>
                                <td>
                                  {moment(v?.duration?.start_date).format('DD/MM/YYYY')} -{' '}
                                  {moment(v?.duration?.end_date).format('DD/MM/YYYY')}
                                </td>
                                <td>
                                  <span className='svg-icon svg-icon-2' style={{ color: '#ffad0f' }}>
                                    <svg
                                      width='24'
                                      height='24'
                                      viewBox='0 0 24 24'
                                      fill='none'
                                      xmlns='http://www.w3.org/2000/svg'
                                    >
                                      <path
                                        d='M11.1359 4.48359C11.5216 3.82132 12.4784 3.82132 12.8641 4.48359L15.011 8.16962C15.1523 8.41222 15.3891 8.58425 15.6635 8.64367L19.8326 9.54646C20.5816 9.70867 20.8773 10.6186 20.3666 11.1901L17.5244 14.371C17.3374 14.5803 17.2469 14.8587 17.2752 15.138L17.7049 19.382C17.7821 20.1445 17.0081 20.7069 16.3067 20.3978L12.4032 18.6777C12.1463 18.5645 11.8537 18.5645 11.5968 18.6777L7.69326 20.3978C6.99192 20.7069 6.21789 20.1445 6.2951 19.382L6.7248 15.138C6.75308 14.8587 6.66264 14.5803 6.47558 14.371L3.63339 11.1901C3.12273 10.6186 3.41838 9.70867 4.16744 9.54646L8.3365 8.64367C8.61089 8.58425 8.84767 8.41222 8.98897 8.16962L11.1359 4.48359Z'
                                        fill='currentColor'
                                      ></path>
                                    </svg>
                                  </span>{' '}
                                  {v?.rating}
                                </td>
                                <td>
                                  <a
                                    // onClick={() => setShowCreateAppModal(true)}
                                    className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                                    data-bs-toggle='modal'
                                    data-bs-target='#kt_modal_create_app'
                                  // onClick={handleSubmit}
                                  // onClick={() => {
                                  //   navigate(-1)
                                  // }}
                                  >
                                    View
                                  </a>
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
                </>
              )}
              {propertiType === 'Payments' && (
                <>
                  <div className='card-header align-items-center py-5  gap-md-2 d-flex border-0 p-0'>
                    <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                      <h6 className='mx-10 text-muted'>
                        Total Payments
                        <span className='mx-1' style={{ color: 'black' }}>
                          {/* {console.log('tenancyPayement', tenancyPayement)} */}
                          {tenancy[0]?.totalPayments}
                        </span>
                      </h6>
                    </div>
                    <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                      <h6 className='mx-10 text-muted'>
                        Contract No.{' '}
                        <span className='mx-1' style={{ color: 'black' }}>
                          {tenancy[0]?.contractNo}
                        </span>
                      </h6>
                    </div>
                    <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                      <h6 className='mx-10 text-muted'>
                        Tenancy Status{' '}
                        <span className='mx-1' style={{ color: 'black' }}>
                          {tenancy[0]?.tenancyStatus === 0 ? 'Booked' : tenancy[0]?.tenancyStatus === 1 ? 'Active' : tenancy[0]?.tenancyStatus === 2 ? 'Expiring' : tenancy[0]?.tenancyStatus === 3 ? 'Ended' : tenancy[0]?.tenancyStatus === 4 ? 'Renewed' : tenancy[0]?.tenancyStatus === 5 ? 'Terminated' : ''}
                        </span>
                      </h6>
                    </div>
                    <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                      <h6 className='mx-10 text-muted'>
                        Start
                        <span className='mx-1' style={{ color: 'black' }}>
                          {moment(tenancy[0]?.duration?.start_date).format('DD/MM/YYYY')}
                        </span>
                      </h6>
                    </div>
                    <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                      <h6 className='mx-10 text-muted'>
                        End{' '}
                        <span className='mx-1' style={{ color: 'black' }}>
                          {moment(tenancy[0]?.duration?.end_date).format('DD/MM/YYYY')}
                        </span>
                      </h6>
                    </div>
                    <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                      <h6 className='mx-10 text-muted'>
                        Duration
                        <span className='mx-1' style={{ color: 'black' }}>
                          {tenancy[0]?.duration?.days === 1 ? tenancy[0]?.duration?.days + ' Day' : tenancy[0]?.duration?.days >= 2 ? tenancy[0]?.duration?.days + ' Days' : tenancy[0]?.duration?.days <= 0 ? 0 + ' Days' : ''}
                        </span>
                      </h6>
                    </div>
                    <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                      <h6 className='mx-10 text-muted'>
                        Tenant{' '}
                        <span className='mx-1' style={{ color: 'black' }}>
                          {tenancy[0]?.tenant[0]?.firstName} {tenancy[0]?.tenant[0]?.lastName}
                        </span>
                      </h6>
                    </div>
                  </div>
                  <h3 className='mx-10 my-5'>Payments</h3>
                  <div className='app-container container-xxl d-flex flex-stack pt-3 mt-0'>
                    <div className='d-flex align-items-center'>
                      <div className=''>
                        <a
                          onClick={addFileds}
                          className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                        // onClick={handleSubmit}
                        >
                          Add Payment
                        </a>
                      </div>
                      {arry.length !== 0 &&
                        <a
                          // onClick={() => setShowCreateAppModal(true)}
                          className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                          data-bs-toggle='modal'
                          data-bs-target='#kt_modal_create_app'
                          onClick={handleAddPayment}
                        >
                          Apply
                        </a>}
                    </div>
                    <div className=''>
                      <a
                        onClick={() => setShowGenRecModal(true)}
                        className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_create_app'
                      >
                        Generate Receipt
                      </a>
                      <a
                        // onClick={() => setShowCreateAppModal(true)}
                        className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_create_app'
                        onClick={() => setShowSendRemModal(true)}
                      >
                        Send Reminder
                      </a>
                    </div>
                  </div>
                 {arry.length !==0&& <div className='card-body pt-0 table-responsive mt-5' style={{ background: '#f5f8fa' }}>
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

                        </tr>
                      </thead>
                      <tbody className='fw-semibold text-gray-600'>

                        {arry.map((v: any, i: any) => {
                          return (
                            <>
                              <tr key={i}>
                                {payment && (
                                  <>
                                    <td data-kt-ecommerce-order-filter='order_id' className=''>
                                      <input
                                        type='text'
                                        className='form-control'
                                        placeholder=''
                                        name={`First`}
                                        value={i + 1}
                                        // onChange={(e)=>handleChnagePayment(e,i)}
                                        disabled={true}
                                        style={{ width: '100px' }}
                                      />
                                    </td>
                                    <td className='' data-order='2022-09-11'>
                                      <select
                                        name={`rentType`}
                                        className='form-select fst-italic'
                                        value={v?.rentType}
                                        onChange={(e) => handleChnagePayment(e, i)}
                                        style={{ width: '100px' }}
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
                                      {v?.rentType === 3 ? (
                                        <input
                                          type='text'
                                          className='form-control'
                                          placeholder=''
                                          // name='amount'
                                          name={`rentOtherName`}
                                          // name={`amount ${i}`}
                                          value={v?.rentOtherName}
                                          onChange={(e) => handleChnagePayment(e, i)}
                                          style={{ width: '100px' }}
                                        />
                                      ) : null}
                                    </td>
                                    <td
                                      className={
                                        v?.rentType === 3
                                          ? 'd-flex align-items-center mt-7'
                                          : 'd-flex align-items-center'
                                      }
                                    >
                                      <span>AED </span>
                                      <input
                                        type='number'
                                        className='form-control mx-2'
                                        placeholder=''
                                        // name='amount'
                                        name={`amount`}
                                        // name={`amount ${i}`}
                                        value={v?.amount}
                                        onChange={(e) => handleChnagePayment(e, i)}
                                        style={{ width: '100px' }}
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
                                        value={v?.status}
                                        onChange={(e) => {
                                          handleChnagePayment(e, i)
                                          if (e.target.value === '1') {
                                            callpopUp(e.target.value, i)
                                          }
                                        }}
                                        style={{ width: '100px' }}
                                      >
                                        <option className='fst-italic' disabled selected>
                                          Select
                                        </option>
                                        <option className='fst-italic' value={0}>
                                          Upcoming
                                        </option>
                                        <option className='fst-italic' value={1}>
                                          Paid
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
                                        name={`paymentSchedule`}
                                        value={v?.paymentSchedule}
                                        onChange={(e) => handleChnagePayment(e, i)}
                                        disabled={v?.status === 1 ? true : false}
                                        style={{ width: '100px' }}
                                      />
                                    </td>
                                    <td className='text-center' data-order='2022-09-09'>
                                      {/*  {v?.status !== 0 ? ( */}
                                      <select
                                        // name='method'
                                        name={`paymentMethod`}
                                        className='form-select fst-italic'
                                        value={v?.paymentMethod}
                                        disabled={v?.status === 1 ? true : false}
                                        onChange={(e) => {
                                          handleChnagePayment(e, i)
                                          if (e.target.value === '2') {
                                            // setCard('')
                                            callmodel(e.target.value, i)
                                          }
                                          if (e.target.value === '3') {
                                            // setCard('')
                                            callmodel(e.target.value, i)
                                          }
                                          if (arry.length === 1) {
                                            if (e.target.value === '0') {
                                              setCard('0')
                                              // setCardA([...cardA,e.target.value])
                                            }
                                            if (e.target.value === '1') {
                                              setCard('1')
                                              // setCardA([...cardA,e.target.value])
                                            }
                                            if (e.target.value === '2') {
                                              setCard('')
                                            }
                                            if (e.target.value === '3') {
                                              setCard('')
                                            }
                                            if (e.target.value === '4') {
                                              setCard('')
                                            }
                                          }

                                          let a: any = []
                                          if (arry.length >= 2) {
                                            // a.push(String(arry[0].paymentMethod))
                                            arry.map((v: any) => {
                                              if (v?.paymentMethod === 0) {
                                                a.push(v?.paymentMethod)
                                              }
                                              if (v?.paymentMethod === 1) {
                                                a.push(v?.paymentMethod)
                                              }
                                            })
                                            // if (e.target.value === '0') {
                                            //   a.push('0')
                                            // }
                                            // if (e.target.value === '1') {
                                            //   a.push('1')
                                            // }
                                            arry.map((v: any) => {
                                              if (e.target.value === '0' || e.target.value === '1') {
                                                setCardA([...cardA, e.target.value])
                                              }
                                            })
                                          }
                                          const ages = a
                                          const uniqueAges = ages.filter(
                                            (x: any, i: any, a: any) => a.indexOf(x) == i
                                          )
                                          if (uniqueAges.length === 2) {
                                            setCard('2')
                                          }
                                          if (uniqueAges.length === 1) {

                                            if (uniqueAges[0] === 0) {
                                              setCard('0')
                                            } else {
                                              setCard('1')
                                            }
                                          }
                                          if (arry.length !== 1 && uniqueAges.length === 0) {
                                            if (a.length === 0) {
                                              setCard('')
                                            }
                                          }
                                        }}
                                        style={{ width: '100px' }}
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
                                      {/* ) : ( */}
                                      {/* <input
                                        // name='method'
                                        name={`paymentMethod`}
                                        className='form-control fst-italic'
                                        value={v?.paymentMethod}
                                        disabled={paymentData?.status === '0' ? true : false}
                                        onChange={(e) => {
                                          handleChnagePayment(e,i)
                                          if (e.target.value !== '4') {
                                            setShowCheange(true)
                                          }
                                        }}
                                        style={{width: '100px'}}
                                      />
                                    )} */}
                                    </td>
                                    <td className='text-center' data-order='2022-09-11'>
                                      <input
                                        type={paymentData?.status === '0' ? 'file' : 'date'}
                                        className='form-control mx-2'
                                        placeholder=''
                                        min={new Date().toISOString().split('T')[0]}
                                        // name='reminder'
                                        name={`paymentRemainder`}
                                        value={v?.paymentRemainder}
                                        disabled={v?.status === 1 ? true : false}
                                        onChange={(e) => handleChnagePayment(e, i)}
                                        style={{ width: '100px' }}
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
                                                deleteRowTable(i, v.amount)
                                              }
                                            })
                                        }}
                                        style={{ cursor: 'pointer' }}
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
                                  setCard('')
                                }}
                                backdrop={true}
                                size='sm'
                              >
                                <div className='modal-header'>
                                  <h2>
                                    {modeldata === '0'
                                      ? ' Card (Recurring Payments)'
                                      : modeldata === '1'
                                        ? 'Card (Individual Payments)'
                                        : modeldata === '2'
                                          ? 'Cheque'
                                          : modeldata === '3'
                                            ? 'Bank Transfer'
                                            : 'Cash'}
                                  </h2>
                                  <div
                                    className='btn btn-sm btn-icon btn-active-color-primary'
                                    onClick={() => {
                                      setShowCheange(false)
                                      setCard('')
                                    }}
                                  >
                                    <KTSVG
                                      className='svg-icon-1'
                                      path='/media/icons/duotune/arrows/arr061.svg'
                                    />
                                  </div>
                                </div>
                                {modeldata === '0' && (
                                  <div className='modal-body py-lg-10 px-lg-10'>
                                    <div
                                      className='stepper stepper-pills stepper-column flex-column flex-xl-row flex-row-fluid'
                                      id='kt_modal_create_app_stepper'
                                    >
                                      <div
                                        className='card-header align-items-center gap-md-2'
                                        style={{ justifyContent: 'flex-start' }}
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
                                            name='name'
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
                                {modeldata === '1' && (
                                  <div className='modal-body py-lg-10 px-lg-10'>
                                    <div
                                      className='stepper stepper-pills stepper-column flex-column flex-xl-row flex-row-fluid'
                                      id='kt_modal_create_app_stepper'
                                    >
                                      <div
                                        className='card-header align-items-center gap-md-2'
                                        style={{ justifyContent: 'flex-start' }}
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
                                            name='name'
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
                                {modeldata === '2' && (
                                  <div className='modal-body py-lg-10 px-lg-10'>
                                    <div
                                      className='stepper stepper-pills stepper-column flex-column flex-xl-row flex-row-fluid'
                                      id='kt_modal_create_app_stepper'
                                    >
                                      <div
                                        className='card-header align-items-center gap-md-2'
                                        style={{ justifyContent: 'flex-start' }}
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
                                            name='chequeNo'
                                            value={modelData?.chequeNo}
                                            onChange={modelchange}
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
                                            value={modelData?.bankName}
                                            onChange={modelchange}
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
                                            name='image'
                                            // value={modelData?.image}
                                            onChange={imageCheque}
                                          />
                                        </div>
                                      </div>

                                      {/*end::Content */}
                                    </div>
                                    {/* end::Stepper */}
                                  </div>
                                )}
                                {modeldata === '3' && (
                                  <div className='modal-body py-lg-10 px-lg-10'>
                                    <div
                                      className='stepper stepper-pills stepper-column flex-column flex-xl-row flex-row-fluid'
                                      id='kt_modal_create_app_stepper'
                                    >
                                      <div
                                        className='card-header align-items-center gap-md-2'
                                        style={{ justifyContent: 'flex-start' }}
                                      >
                                        <div className='mb-10 min-w-200px '>
                                          <label
                                            htmlFor='exampleFormControlInput1'
                                            className='required form-label'
                                          >
                                            IBAN
                                          </label>
                                          <input
                                            type='text'
                                            className='form-control form-control-solid'
                                            placeholder='e.g. - 0045236541'
                                            name='IBAN'
                                            value={modelData?.IBAN}
                                            onChange={modelchange}
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
                                            value={modelData?.accountNo}
                                            onChange={modelchange}
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
                                            value={modelData?.bankName}
                                            onChange={modelchange}
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
                                            // setCard('')
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
                                          onClick={() => {
                                            modelSubmit()
                                            // setCard('')
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
                              <Modal
                                id='kt_modal_create_app'
                                tabIndex={-1}
                                aria-hidden='true'
                                dialogClassName='modal-dialog modal-dialog-centered mw-600px'
                                show={showPaid}
                                onHide={() => {
                                  setShowPaid(false)
                                  setPaymentMethod('')
                                  // setCard('')
                                }}
                                backdrop={true}
                                size='sm'
                              >
                                <div className='modal-header'>
                                  <h2></h2>
                                  <div
                                    className='btn btn-sm btn-icon btn-active-color-primary'
                                    onClick={() => {
                                      setShowCheange(false)
                                      setPaymentMethod('')
                                    }}
                                  >
                                    <KTSVG
                                      className='svg-icon-1'
                                      path='/media/icons/duotune/arrows/arr061.svg'
                                    />
                                  </div>
                                </div>

                                <div className='modal-body py-lg-10 px-lg-10'>
                                  <div
                                    className='stepper stepper-pills stepper-column flex-column flex-xl-row flex-row-fluid'
                                    id='kt_modal_create_app_stepper'
                                  >
                                    <div
                                      className='card-header align-items-center gap-md-2'
                                      style={{ justifyContent: 'flex-start' }}
                                    >
                                      <div className='mb-10 min-w-200px '>
                                        <label
                                          htmlFor='exampleFormControlInput1'
                                          className='required form-label'
                                        >
                                          Payment Method
                                        </label>
                                        <select
                                          name='paymentmethod'
                                          className='form-select form-select-solid'
                                          // value={formData?.unitType}
                                          onChange={handleChnage12}
                                        >
                                          <option disabled selected>
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
                                      </div>
                                      {paymentMethod === '0' && (
                                        <>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Amount Paid
                                            </label>
                                            <input
                                              type='number'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='amountPaid'
                                              value={popUpData?.amountPaid}
                                              onChange={popUpchange}
                                            />
                                          </div>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Payment Date
                                            </label>
                                            <input
                                              type='date'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='paymentDate'
                                              max={new Date().toISOString().split('T')[0]}
                                              value={popUpData?.paymentDate}
                                              onChange={popUpchange}
                                            />
                                          </div>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Receipt Ref. No.
                                            </label>
                                            <input
                                              type='number'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='referenceNo'
                                              value={popUpData?.referenceNo}
                                              onChange={popUpchange}
                                            />
                                          </div>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Receipt Date
                                            </label>
                                            <input
                                              type='date'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='receiptDate'
                                              max={new Date().toISOString().split('T')[0]}
                                              value={popUpData?.receiptDate}
                                              onChange={popUpchange}
                                            />
                                          </div>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Upload Receipt
                                            </label>
                                            <input
                                              type='file'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='image'
                                              // value={popUpReceiptData}
                                              onChange={imagerecipt}
                                            />
                                          </div>
                                        </>
                                      )}
                                      {paymentMethod === '1' && (
                                        <>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Amount Paid
                                            </label>
                                            <input
                                              type='number'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='amountPaid'
                                              value={popUpData?.amountPaid}
                                              onChange={popUpchange}
                                            />
                                          </div>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Payment Date
                                            </label>
                                            <input
                                              type='date'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='paymentDate'
                                              max={new Date().toISOString().split('T')[0]}
                                              value={popUpData?.paymentDate}
                                              onChange={popUpchange}
                                            />
                                          </div>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Receipt Ref. No.
                                            </label>
                                            <input
                                              type='number'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='referenceNo'
                                              value={popUpData?.referenceNo}
                                              onChange={popUpchange}
                                            />
                                          </div>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Receipt Date
                                            </label>
                                            <input
                                              type='date'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='receiptDate'
                                              max={new Date().toISOString().split('T')[0]}
                                              value={popUpData?.receiptDate}
                                              onChange={popUpchange}
                                            />
                                          </div>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Upload Receipt
                                            </label>
                                            <input
                                              type='file'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='image'
                                              // value={popUpReceiptData}
                                              onChange={imagerecipt}
                                            />
                                          </div>
                                        </>
                                      )}
                                      {paymentMethod === '2' && (
                                        <>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Amount Paid
                                            </label>
                                            <input
                                              type='number'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='amountpaid'
                                              value={popUpData?.amountPaid}
                                              onChange={popUpchange}
                                            />
                                          </div>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Cheque No.
                                            </label>
                                            <input
                                              type='number'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='chequeNo'
                                              value={popUpData?.chequeNo}
                                              onChange={popUpchange}
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
                                              placeholder=''
                                              name='bankName'
                                              value={modelData?.bankName}
                                              onChange={popUpchange}
                                            />
                                          </div>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Payment Date
                                            </label>
                                            <input
                                              type='date'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='paymentDate'
                                              max={new Date().toISOString().split('T')[0]}
                                              value={popUpData?.paymentDate}
                                              onChange={popUpchange}
                                            />
                                          </div>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Receipt Ref. No.
                                            </label>
                                            <input
                                              type='number'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='referenceNo'
                                              value={popUpData?.referenceNo}
                                              onChange={popUpchange}
                                            />
                                          </div>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Receipt Date
                                            </label>
                                            <input
                                              type='date'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='receiptDate'
                                              max={new Date().toISOString().split('T')[0]}
                                              value={popUpData?.receiptDate}
                                              onChange={popUpchange}
                                            />
                                          </div>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Upload Receipt
                                            </label>
                                            <input
                                              type='file'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='image'
                                              // value={popUpReceiptData}
                                              onChange={imagerecipt}
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
                                              placeholder=''
                                              name='image'
                                              // value={popUpReceiptData}
                                              onChange={imageCheque}
                                            />
                                          </div>
                                        </>
                                      )}
                                      {paymentMethod === '3' && (
                                        <>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Amount Paid
                                            </label>
                                            <input
                                              type='number'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='amountPaid'
                                              value={popUpData?.amountPaid}
                                              onChange={popUpchange}
                                            />
                                          </div>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Payment Date
                                            </label>
                                            <input
                                              type='date'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='paymentDate'
                                              max={new Date().toISOString().split('T')[0]}
                                              value={popUpData?.paymentDate}
                                              onChange={popUpchange}
                                            />
                                          </div>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Receipt Ref. No.
                                            </label>
                                            <input
                                              type='number'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='referenceNo'
                                              value={popUpData?.referenceNo}
                                              onChange={popUpchange}
                                            />
                                          </div>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Receipt Date
                                            </label>
                                            <input
                                              type='date'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='receiptDate'
                                              max={new Date().toISOString().split('T')[0]}
                                              value={popUpData?.receiptDate}
                                              onChange={popUpchange}
                                            />
                                          </div>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Upload Receipt
                                            </label>
                                            <input
                                              type='file'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='image'
                                              // value={popUpReceiptData}
                                              onChange={imagerecipt}
                                            />
                                          </div>
                                        </>
                                      )}
                                      {paymentMethod === '4' && (
                                        <>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Amount Paid
                                            </label>
                                            <input
                                              type='number'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='amountPaid'
                                              value={popUpData?.amountPaid}
                                              onChange={popUpchange}
                                            />
                                          </div>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Payment Date
                                            </label>
                                            <input
                                              type='date'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='paymentDate'
                                              max={new Date().toISOString().split('T')[0]}
                                              value={popUpData?.paymentDate}
                                              onChange={popUpchange}
                                            />
                                          </div>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Receipt Ref. No.
                                            </label>
                                            <input
                                              type='number'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='referenceNo'
                                              value={popUpData?.referenceNo}
                                              onChange={popUpchange}
                                            />
                                          </div>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Receipt Date
                                            </label>
                                            <input
                                              type='date'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='receiptDate'
                                              max={new Date().toISOString().split('T')[0]}
                                              value={popUpData?.receiptDate}
                                              onChange={popUpchange}
                                            />
                                          </div>
                                          <div className='mb-10 min-w-200px '>
                                            <label
                                              htmlFor='exampleFormControlInput1'
                                              className='required form-label'
                                            >
                                              Upload Receipt
                                            </label>
                                            <input
                                              type='file'
                                              className='form-control form-control-solid'
                                              placeholder=''
                                              name='image'
                                              // value={popUpReceiptData}
                                              onChange={imagerecipt}
                                            />
                                          </div>
                                        </>
                                      )}
                                    </div>

                                    {/*end::Content */}
                                  </div>
                                  {/* end::Stepper */}
                                </div>

                                <div className='modal-footer'>
                                  <div className='flex-row-fluid '>
                                    <div className='d-flex justify-content-end '>
                                      <div className='me-2'>
                                        <button
                                          type='button'
                                          className='btn btn-lg btn-light-primary me-3'
                                          data-kt-stepper-action='previous'
                                          onClick={() => {
                                            setShowPaid(false)
                                            setCard('')
                                            setPaymentMethod('')
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
                                          onClick={() => {
                                            popUpSubmit(i)
                                            setCard('')
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
                        }
                      </tbody>
                    </table>
                    {card === '0' && arry.length !== 0 && (
                      <div className='card card-flush mb-10' style={{ backgroundColor: '#befc9f' }}>
                        <h3 className='mx-10 mb-10 mt-10'>Card (Recurring Payments) - DISCLAIMER</h3>
                        <ul className='mx-10 mb-10'>
                          <li>
                            {' '}
                            You've selected 'Card (Recurring Payments)' in one or more payments, please read
                            the below before continuing:
                          </li>
                          <li>
                            Recurring payments will be scheduled on the date entered in the 'Payment
                            Schedule'.
                          </li>
                          <li>Recurring payments will only work on verified cards.</li>
                          <li>
                            Propertise will deduct a service fee for each payment using this service. By
                            using this service, tenants will also be rewarded a cashback amount. Please
                            refer to the below table to review the service fees:{' '}
                          </li>
                        </ul>
                        <div className='card-body pt-0 table-responsive' style={{ padding: '0rem 2.5rem' }}>
                          <table
                            className='table align-middle table-row-dashed fs-6 gy-5'
                            id='kt_ecommerce_sales_table'
                          >
                            <thead style={{ color: 'black' }}>
                              <tr
                                className='text-start fw-bold fs-7 text-uppercase gs-0'
                                style={{ borderBottomColor: 'black' }}
                              >
                                <th className='text-center min-w-100px'>Payment</th>
                                <th className='text-center min-w-100px'>Total Amount Charged</th>
                                <th className='text-center min-w-100px'> Amount Received</th>
                                <th className='text-center min-w-100px'>Online Payment Service Fee</th>
                              </tr>
                            </thead>
                            <tbody className='fw-semibold'>
                              <tr>
                                <td className='text-center'>1</td>
                                <td className='text-center'>1000 AED</td>
                                <td className='text-center'>900 AED</td>
                                <td className='text-center'>100 AED</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    {card === '1' && arry.length !== 0 && (
                      <div className='card card-flush mb-10' style={{ backgroundColor: '#befc9f' }}>
                        <h3 className='mx-10 mb-10 mt-10'>Card (Individual Payments) - DISCLAIMER</h3>
                        <ul className='mx-10 mb-10'>
                          <li>
                            You've selected 'Card (Individual Payments)' in one or more payments, please
                            read the below before continuing:{' '}
                          </li>
                          <li>
                            Main tenant will be able to make the payment directly from their accounts.{' '}
                          </li>
                          <li>
                            Propertise will deduct a service fee for each payment using this service. By
                            using this service, tenants will also be rewarded a cashback amount. Please
                            refer to the below table to review the service fees:{' '}
                          </li>
                        </ul>
                        <div className='card-body pt-0 table-responsive' style={{ padding: '0rem 2.5rem' }}>
                          <table
                            className='table align-middle table-row-dashed fs-6 gy-5'
                            id='kt_ecommerce_sales_table'
                          >
                            <thead style={{ color: 'black' }}>
                              <tr
                                className='text-start fw-bold fs-7 text-uppercase gs-0'
                                style={{ borderBottomColor: 'black' }}
                              >
                                <th className='text-center min-w-100px'>Payment</th>
                                <th className='text-center min-w-100px'>Total Amount Charged</th>
                                <th className='text-center min-w-100px'> Amount Received</th>
                                <th className='text-center min-w-100px'>Online Payment Service Fee</th>
                              </tr>
                            </thead>
                            <tbody className='fw-semibold'>
                              <tr>
                                <td className='text-center'>1</td>
                                <td className='text-center'>1000 AED</td>
                                <td className='text-center'>900 AED</td>
                                <td className='text-center'>100 AED</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    {card === '2' && arry.length !== 0 && (
                      <div className='card card-flush mb-10' style={{ backgroundColor: '#befc9f' }}>
                        <h3 className='mx-10 mb-10 mt-10'>Card (Recurring Payments) - DISCLAIMER</h3>
                        <ul className='mx-10 mb-10'>
                          <li>
                            {' '}
                            You've selected 'Card (Recurring Payments)' in one or more payments, please read
                            the below before continuing:
                          </li>
                          <li>
                            Recurring payments will be scheduled on the date entered in the 'Payment
                            Schedule'.
                          </li>
                          <li>Recurring payments will only work on verified cards.</li>
                          <li>
                            Propertise will deduct a service fee for each payment using this service. By
                            using this service, tenants will also be rewarded a cashback amount. Please
                            refer to the below table to review the service fees:{' '}
                          </li>
                        </ul>
                        <h3 className='mx-10 mb-10 mt-10'>Card (Individual Payments) - DISCLAIMER</h3>
                        <ul className='mx-10 mb-10'>
                          <li>
                            You've selected 'Card (Individual Payments)' in one or more payments, please
                            read the below before continuing:{' '}
                          </li>
                          <li>
                            Main tenant will be able to make the payment directly from their accounts.{' '}
                          </li>
                          <li>
                            Propertise will deduct a service fee for each payment using this service. By
                            using this service, tenants will also be rewarded a cashback amount. Please
                            refer to the below table to review the service fees:{' '}
                          </li>
                        </ul>
                        <div className='card-body pt-0 table-responsive' style={{ padding: '0rem 2.5rem' }}>
                          <table
                            className='table align-middle table-row-dashed fs-6 gy-5'
                            id='kt_ecommerce_sales_table'
                          >
                            <thead style={{ color: 'black' }}>
                              <tr
                                className='text-start fw-bold fs-7 text-uppercase gs-0'
                                style={{ borderBottomColor: 'black' }}
                              >
                                <th className='text-center min-w-100px'>Payment</th>
                                <th className='text-center min-w-100px'>Total Amount Charged</th>
                                <th className='text-center min-w-100px'> Amount Received</th>
                                <th className='text-center min-w-100px'>Online Payment Service Fee</th>
                              </tr>
                            </thead>
                            <tbody className='fw-semibold'>
                              <tr>
                                <td className='text-center'>1</td>
                                <td className='text-center'>1000 AED</td>
                                <td className='text-center'>900 AED</td>
                                <td className='text-center'>100 AED</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>}
                  <div className='card-body pt-0 table-responsive mt-5'>
                    <table
                      className='table align-middle table-row-dashed fs-6 gy-5'
                      id='kt_ecommerce_sales_table'
                    >
                      <thead>
                        <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                          <th className=' min-w-100px'></th>
                          <th className=' min-w-100px'>#</th>
                          <th className=' min-w-100px'>Type</th>
                          <th className=' min-w-100px'>Amount</th>
                          <th className=' min-w-100px'>Status </th>
                          <th className=' min-w-100px'>Payment Schedule</th>
                          <th className=' min-w-100px'>Payment Method</th>
                          <th className=' min-w-100px'>Payment Reminder</th>
                          <th className=' min-w-100px'>Payment Date</th>
                          <th className=' min-w-100px'>Amount Paid</th>
                          <th className=' min-w-100px'>Amount Received</th>
                          <th className=' min-w-100px'>Service Fee</th>
                          <th className=' min-w-100px'>Outstanding Balance</th>
                        </tr>
                      </thead>
                      <tbody className='fw-semibold text-gray-600'>
                        {tenancyPayement?.map((v: any, i: any) => {                          
                          return (
                            <tr>
                              <td>
                                <div className='w-10px pe-2'>
                                  <div className='form-check form-check-sm form-check-custom form-check-solid me-3'>
                                    <input
                                      className='form-check-input'
                                      type='checkbox'
                                      data-kt-check='true'
                                      data-kt-check-target='#kt_ecommerce_sales_table .form-check-input'
                                      value='1'
                                      onChange={handleChangeCheckbox.bind(null,v._id)}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td>{i + 1}</td>
                              <td>{v?.rentType === 0 ? 'Rent' : v?.rentType === 1 ? 'Security Deposite' : v?.rentType === 2 ? 'Booking' : v?.rentType === 3 ? 'Others' : ''}</td>
                              <td>{v?.amount}</td>
                              <td>
                                {v?.status === 0
                                  ? 'Paid'
                                  : v?.status === 1
                                    ? 'Upcoming'
                                    : 'Overdue'}
                              </td>
                              <td>{moment(v?.paymentSchedule).format('DD/MM/YYYY')}</td>
                              <td>
                                {v?.paymentMethod === 0
                                  ? 'Card (Recurring Payments)'
                                  : v?.paymentMethod === 1
                                    ? 'Card (Individual Payments)'
                                    : v?.paymentMethod === 2
                                      ? 'Cheque'
                                      : v?.paymentMethod === 3
                                        ? 'Bank'
                                        : 'Cash'}
                              </td>
                              <td>{moment(v?.paymentRemainder).format('DD/MM/YYYY')}</td>
                              <td>{moment(v?.createdAt).format('DD/MM/YYYY')}</td>
                              <td>{v?.amountPaid} AED</td>
                              <td>{v?.amountReceived} AED</td>
                              <td>{v?.amountPaid - v?.amountReceived} AED{/*  {v?.serviceFee} */}</td>
                              <td>{v?.amountPaid - v?.amountReceived - v?.serviceFee} AED</td>
                              <td>
                                <AiFillDelete
                                  color='#007a59'
                                  fontSize={20}
                                  // onClick={() => deleteRow(i)}
                                  onClick={() => {
                                    swal
                                      .fire({
                                        text: 'Are you sure you want delete this payment?',
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
                                          deleteRow(v?._id)
                                        }
                                      })
                                  }}
                                  style={{ cursor: 'pointer' }}
                                />
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <h3 className='mx-10 my-5'>Reminders</h3>
                  <div className='card-body pt-0 table-responsive mt-5'>
                    <table
                      className='table align-middle table-row-dashed fs-6 gy-5'
                      id='kt_ecommerce_sales_table'
                    >
                      <thead>
                        <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                          <th className=' min-w-100px'>#</th>
                          <th className=' min-w-100px'>Reminder Date</th>
                          <th className=' min-w-100px'>Status</th>
                          <th className=' min-w-100px'>Payment </th>
                          <th className=' min-w-100px'>Type</th>
                          <th className=' min-w-100px'>Scheduled Date </th>
                          <th className=' min-w-100px'></th>
                        </tr>
                      </thead>
                      <tbody className='fw-semibold text-gray-600'>
                        {tenancyReminder.map((item: any, key: any) => {
                          return (<tr key={key}>
                            <td>{key + 1}</td>
                            <td>{moment(item?.reminderDate).format('DD/MM/YYYY')}</td>
                            <td>{item?.reminderStatus === 1 ? 'paid' : item?.reminderStatus === 2 ? 'Overdue' : item?.reminderStatus === 0 ? 'Upcoming' : ''}</td>
                            <td>{item?.paymentIds.length}</td>
                            <td>{item?.reminderType === 0 ? 'Rent' : item?.reminderType === 1 ? 'Security Deposit' : item?.reminderType === 2 ? 'Booking' : item?.reminderType === 3 ? 'Other' : ''}</td>
                            <td>{moment(item?.scheduledDate).format('DD/MM/YYYY')}</td>
                            <td>
                              <a
                                // onClick={() => setShowCreateAppModal(true)}
                                className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                                // data-bs-toggle='modal'
                                data-bs-target='#kt_modal_create_app'
                                onClick={() => viewReminder(item?._id)}

                              // onClick={() => {
                              //   navigate(-1)
                              // }}
                              >
                                View Reminder
                              </a>
                            </td>
                          </tr>)
                        })}

                      </tbody>
                    </table>
                  </div>
                  <h3 className='mx-10 my-5'>Receipts</h3>
                  <div className='card-body pt-0 table-responsive mt-5'>
                    <table
                      className='table align-middle table-row-dashed fs-6 gy-5'
                      id='kt_ecommerce_sales_table'
                    >
                      <thead>
                        <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                          <th className=' min-w-100px'>Reference No.</th>
                          <th className=' min-w-100px'>Created Date</th>
                          <th className=' min-w-100px'>Amount Received</th>
                          <th className=' min-w-100px'>Total Payments</th>
                          <th className=' min-w-100px'>Status</th>
                          <th className=' min-w-100px'> Date Submitted</th>
                          <th className=' min-w-100px'></th>
                        </tr>
                      </thead>
                      <tbody className='fw-semibold text-gray-600'>
                        {recieptList?.map((data:any,i:number) => {
                          return (
                            <tr>
                          <td>{i+1}</td>
                          <td>{data?.createdAt.split("T")[0]}</td>
                          <td>100 AED</td>
                          <td>200 AED</td>
                          <td>Cash</td>
                          <td>{data?.receiptDate.split("T")[0]}</td>
                          <td>
                            <a
                              onClick={() => setShowCreateAppModal(true)}
                              className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                              data-bs-toggle='modal'
                              data-bs-target='#kt_modal_create_app'
                            // onClick={handleSubmit}
                            // onClick={() => {
                            //   navigate(-1)
                            // }}
                            >
                              View Receipt
                            </a>
                          </td>
                        </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
              {propertiType === 'Announcements' && (
                <>
                  <div className='card-header align-items-center py-5  gap-md-2 d-flex border-0 p-0'>
                    <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                      <h6 className='mx-10 text-muted'>
                        Announcements Sent
                        <span className='mx-1' style={{ color: 'black' }}>
                          2
                        </span>
                      </h6>
                    </div>
                    <div className='mb-10  min-w-200px' style={{ display: 'contents' }}>
                      <h6 className='mx-10 text-muted'>
                        Announcements Draft{' '}
                        <span className='mx-1' style={{ color: 'black' }}>
                          1
                        </span>
                      </h6>
                    </div>
                  </div>
                  <div className='card-body pt-0 table-responsive mt-5'>
                    <table
                      className='table align-middle table-row-dashed fs-6 gy-5'
                      id='kt_ecommerce_sales_table'
                    >
                      <thead>
                        <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                          <th className=' min-w-100px'>ID </th>
                          <th className=' min-w-100px'>Title</th>
                          <th className=' min-w-100px'>Status</th>
                          <th className=' min-w-100px'>Time Sent </th>
                          <th className=' min-w-100px'></th>
                        </tr>
                      </thead>
                      <tbody className='fw-semibold text-gray-600'>
                        <tr>
                          <td>12345</td>
                          <td>Title</td>
                          <td>Paid</td>
                          <td>10/02/2022 10:00PM</td>
                          <td>
                            <a
                              // onClick={() => setShowCreateAppModal(true)}
                              className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                              data-bs-toggle='modal'
                              data-bs-target='#kt_modal_create_app'
                            // onClick={handleSubmit}
                            // onClick={() => {
                            //   navigate(-1)
                            // }}
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
            <div className='card-body pt-0 table-responsive mt-5'>

            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
      <AddSubTenant
        show={showSubTenantModal}
        handleClose={() => {
          setShowSubTenantModal(false)
        }}
        tenancy={tenancy}
        selectedPayments={generateReceipt} />

      <GeneratePayment
        show={showGenRecModal}
        handleClose={() => {
          setShowGenRecModal(false)
        }}
        showModal={showModal}
        tenancy={tenancy}
        selectedPayments={generateReceipt}
        selectedIds={selectedPayments}
      // type={type}
      // building={building}
      // updateDataId={updateDataId}
      // isEdit={isEdit}
      // formData={formData}
      // propertiType={propertiType}
      // sethandleSubmitIdv={sethandleSubmitIdv}
      // handleChnage={handleChnage}
      // imageChange={imageChange}
      />

      <SendReminder
        show={showSendRemModal}
        handleClose={() => {
          setShowSendRemModal(false)
        }}
        showModal={showModal}
        tenancyPayement={tenancyPayement}
        tenancy={tenancy}
        getTenancyReminder={getTenancyReminder}
        totalPayments={tenancy[0]?.totalPayments}
        selectedPayments={generateReceipt}
      // type={type}
      // building={building}
      // updateDataId={updateDataId}
      // isEdit={isEdit}
      // formData={formData}
      // propertiType={propertiType}
      // sethandleSubmitIdv={sethandleSubmitIdv}
      // handleChnage={handleChnage}
      // imageChange={imageChange}
      />
      <ViewReminder show={showviewRemModal}
        handleClose={() => {
          setShowviewRemModal(false)
        }}
        showModal={showModal}
        reminderId={reminderId}
      />
    </>

  )
}

export default TenancyDetails
