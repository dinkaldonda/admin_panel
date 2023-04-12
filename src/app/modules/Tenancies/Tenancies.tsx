import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import noData from '../../../img/NoData1.svg'
import {useIntl} from 'react-intl'
import {useNavigate} from 'react-router-dom'
import {ApiGet, ApiPost} from '../../../apiCommon/helpers/API/ApiData'
import TenanciesFilter from './TenanciesFilter'

function Tenancies() {
  const [count, setCount] = useState<any>([])
  const [tableData, setTableData] = useState([])
  const [propertiType, setPropertiType] = useState<any>('Overview')
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [date, setDate] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<any>('')
  const [type, setType] = useState('')
  const [page, setPage] = useState<any>(1)
  const [pageLimit, setPageLimit] = useState<any>(1)
  const intl = useIntl()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<any>({
    // propertyId: window.location.pathname?.split('/')[2],
  })
  // console.log('formData', formData)

  const handleChnage = (e: any) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
    setType(formData?.unitType)
  }
  const getCount = () => {
    ApiGet('cooperate/tenancy/count')
      .then((res) => {
        // console.log('res', res?.data?.data)
        setCount(res?.data?.data)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
  const tenancyData = () => {
    let body = {
      page: page,
      limit: 100,
      // unitId: localStorage.getItem('UnitId'),
    }
    ApiPost('cooperate/tenancy/overview', body)
      .then((res) => {
        // console.log('res', res?.data?.data?.tenancy_data)
        setTableData(res?.data?.data?.tenancy_data)
        setPageLimit(res?.data?.data?.state?.page_limit)
      })
      .catch((err) => console.log('err', err))
  }
  useEffect(() => {
    getCount()
    tenancyData()
  }, [page])

  return (
    <>
      <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
        {/* <div className='d-flex flex-column flex-column-fluid'> */}
        {/* <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'> */}
        <div id='' className='app-container container-xxl d-flex flex-stack pt-0 mt-0'>
          <div className='page-title d-flex flex-column justify-content-center flex-wrap me-3'>
            <h1 className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0'>
              Tenancies
            </h1>
          </div>
          <div className='d-flex align-items-center gap-2 gap-lg-3'>
            {/* <ul className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2'>
              <li
                className='nav-item'
                onClick={() => {
                  // setFormData({...formData, portfolio: 'overview'})
                  // building(formData?.portfolioType, 'overview')
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
                  //   setFormData({...formData, portfolio: 'building'})
                  //   building(formData?.portfolioType, 'building')
                  setPropertiType('Buildings')
                }}
              >
                <a className='nav-link text-active-primary pb-4 ' data-bs-toggle='tab'>
                  Buildings
                </a>
              </li>
              <li
                className='nav-item'
                onClick={() => {
                  //   setFormData({...formData, portfolio: 'communities'})
                  //   building(formData?.portfolioType, 'communities')
                  setPropertiType('Communities')
                }}
              >
                <a className='nav-link text-active-primary pb-4' data-bs-toggle='tab'>
                  Communities
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
          <div className='d-flex'>
            <div className='d-flex align-items-center gap-2 gap-lg-3'>
              <div className='m-0'>
                <a
                  href='#'
                  className='btn btn-sm btn-flex bg-body btn-color-gray-700 btn-active-color-primary fw-bold me-3'
                  data-kt-menu-trigger='click'
                  data-kt-menu-placement='bottom-end'
                >
                  <span className='svg-icon svg-icon-6 svg-icon-muted me-1'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z'
                        fill='currentColor'
                      />
                    </svg>
                    Filter
                  </span>
                </a>
                <div
                  className='menu menu-sub menu-sub-dropdown  w-md-300px'
                  data-kt-menu='true'
                  id='kt_menu_631f08e971923'
                  style={{width: '300px'}}
                >
                  <div className='px-7 py-5'>
                    <div className='fs-5 text-dark fw-bold'>Filter Options</div>
                  </div>
                  <div className='separator border-gray-200'></div>

                  <div className='mb-5 px-5 mt-5'>
                    <div>
                      <input
                        type='text'
                        className='form-control form-control-solid '
                        placeholder='Unit No'
                        name='unitNo'
                        // onChange={imageChange}
                        // value={formData?.unitNo}
                        // onChange={handleChnage}
                      />
                    </div>
                  </div>

                  <div className='mb-5 px-5'>
                    {/* <label className='form-label fw-semibold'>Rent Status:</label> */}
                    <div>
                      <select
                        className='form-select form-select-solid'
                        data-kt-select2='true'
                        data-placeholder='Select option'
                        data-dropdown-parent='#kt_menu_631f08e971923'
                        data-allow-clear='true'
                      >
                        <option disabled selected>
                          Bedrooms
                        </option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'> 3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                        <option value='9'>9</option>
                        <option value='10'>10</option>
                      </select>
                    </div>
                  </div>
                  {/* <div className='mb-5 px-5'>
                    <label className='form-label fw-semibold'>Bldg. /Comm Manager:</label>
                    <div>
                      <select
                        className='form-select form-select-solid'
                        data-kt-select2='true'
                        data-placeholder='Select option'
                        data-dropdown-parent='#kt_menu_631f08e971923'
                        data-allow-clear='true'
                      >
                        <option></option>
                        <option value='1'>Approved</option>
                        <option value='2'>Pending</option>
                        <option value='2'>In Process</option>
                        <option value='2'>Rejected</option>
                      </select>
                    </div>
                  </div>

                  <div className='mb-5 px-5 '>
                    <label className='form-label fw-semibold'>Property Manager:</label>
                    <div>
                      <select
                        className='form-select form-select-solid'
                        data-kt-select2='true'
                        data-placeholder='Select option'
                        data-dropdown-parent='#kt_menu_631f08e971923'
                        data-allow-clear='true'
                      >
                        <option></option>
                        <option value='1'>Approved</option>
                        <option value='2'>Pending</option>
                        <option value='2'>In Process</option>
                        <option value='2'>Rejected</option>
                      </select>
                    </div>
                  </div>
                  <div className='mb-5 px-5'>
                    <label className='form-label fw-semibold'>Property Rating:</label>
                    <div>
                      <select
                        className='form-select form-select-solid'
                        data-kt-select2='true'
                        data-placeholder='Select option'
                        data-dropdown-parent='#kt_menu_631f08e971923'
                        data-allow-clear='true'
                      >
                        <option></option>
                        <option value='1'>Approved</option>
                        <option value='2'>Pending</option>
                        <option value='2'>In Process</option>
                        <option value='2'>Rejected</option>
                      </select>
                    </div>
                  </div> */}

                  <div className='d-flex justify-content-end px-5 mb-5'>
                    <button
                      type='reset'
                      className='btn btn-sm btn-light btn-active-light-primary me-2'
                      data-kt-menu-dismiss='true'
                    >
                      Reset
                    </button>
                    <button
                      type='submit'
                      className='btn btn-sm btn-primary'
                      data-kt-menu-dismiss='true'
                      style={{backgroundColor: '#007a59'}}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <a
              onClick={() => {
                localStorage.removeItem('UnitId')
                localStorage.removeItem('ClusterId')
                localStorage.removeItem('CommunityId')
                localStorage.removeItem('BuildingId')
                navigate('/create-tenancy')
              }}
              className='btn btn-sm fw-bold btn-primary btn-green'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_create_app'
            >
              Create Tenancy
            </a>
          </div>
        </div>
      </div>
      {/* </div> */}
      <div id='kt_app_content' className='app-content flex-column-fluid'>
        <div id='kt_app_content_container' className='app-container container-xxl'>
          <Row>
            <Col lg={6}>
              <div className='card-header align-items-center py-5  gap-md-2 d-flex'>
                <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                  <h5 className='gray-500 mx-10'>
                    Active :{' '}
                    <span className='' style={{color: 'black'}}>
                      {count?.activeTenancyCount}
                    </span>
                  </h5>
                </div>
                <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                  <h5 className='gray-500 mx-10'>
                    Booked :{' '}
                    <span className='' style={{color: 'black'}}>
                      {count?.bookTenancyCount}
                    </span>
                  </h5>
                </div>
                <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                  <h5 className='gray-500 mx-10'>
                    Available :{' '}
                    <span className='' style={{color: 'black'}}>
                      {count?.availableTenancyCount}
                    </span>
                  </h5>
                </div>
              </div>
            </Col>
            <Col lg={6}></Col>
          </Row>

          <div
            className='card-header align-items-center py-5 gy-3 row'
            style={{justifyContent: 'flex-start'}}
          >
            <div className='mb-2 min-w-200px col-md-3 px-10'>
              {/* <label className='form-label fw-semibold'>Contract No.</label> */}
              <div>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Contract No'
                  name='unitNo'
                  // onChange={imageChange}
                  // value={formData?.unitNo}
                  // onChange={handleChnage}
                />
              </div>
            </div>
            <div className='mb-2 min-w-200px col-md-3 px-10'>
              {/* <label className='form-label fw-semibold'>Occupancy</label> */}
              <div>
                {/* <input
                    type='text'
                    className='form-control form-control-solid w-auto'
                    placeholder=''
                    name='unitNo'
                    // onChange={imageChange}
                    // value={formData?.unitNo}
                    // onChange={handleChnage}
                  /> */}
                <select
                  className='form-select'
                  data-kt-select2='true'
                  data-placeholder='Select option'
                  data-dropdown-parent='#kt_menu_631f08e971923'
                  data-allow-clear='true'
                >
                  <option disabled selected>
                    Occupancy
                  </option>
                  <option value='1'>Occupied</option>
                  <option value='2'>Vaccant</option>
                </select>
              </div>
            </div>
            <div className='mb-2 min-w-200px col-md-3 px-10'>
              {/* <label className='form-label fw-semibold'> Tenancy Status</label> */}
              <div>
                <select
                  className='form-select'
                  data-kt-select2='true'
                  data-placeholder='Select option'
                  data-dropdown-parent='#kt_menu_631f08e971923'
                  data-allow-clear='true'
                >
                  <option disabled selected>
                    Tenancy Status
                  </option>
                  <option value='1'>Booked</option>
                  <option value='2'>Active</option>
                  <option value='2'>Expiring</option>
                  <option value='2'>Ended</option>
                  <option value='2'>Renewed</option>
                  <option value='2'>Terminated</option>
                </select>
              </div>
            </div>
            <div className='mb-2 min-w-200px col-md-3 px-10'>
              {/* <label className='form-label fw-semibold'>Unit Type </label> */}
              <div>
                {/* <input
                    type='text'
                    className='form-control form-control-solid w-auto'
                    placeholder=''
                    name='unitNo'
                    // onChange={imageChange}
                    // value={formData?.unitNo}
                    // onChange={handleChnage}
                  /> */}
                <select
                  className='form-select'
                  data-kt-select2='true'
                  data-placeholder='Select option'
                  data-dropdown-parent='#kt_menu_631f08e971923'
                  data-allow-clear='true'
                >
                  <option disabled selected>
                    Unit Type
                  </option>
                  <option value='1'>Apartment</option>
                  <option value='2'>Penthouse</option>
                  <option value='3'>Townhouse</option>
                  <option value='4'>Villa</option>
                  <option value='5'>Common Area</option>
                  <option value='6'>Other</option>
                </select>
              </div>
            </div>
            {/* <div className='mb-2 min-w-200px col-md-3 px-10'>
                <div>
                  <input
                    type='text'
                    className='form-control form-control-solid w-auto'
                    placeholder='Unit No'
                    name='unitNo'
                    // onChange={imageChange}
                    // value={formData?.unitNo}
                    // onChange={handleChnage}
                  />
                </div>
              </div>
              <div className='mb-2 min-w-200px col-md-3 px-10'>
                <div>
                  <select
                    className='form-select form-select-solid'
                    data-kt-select2='true'
                    data-placeholder='Select option'
                    data-dropdown-parent='#kt_menu_631f08e971923'
                    data-allow-clear='true'
                  >
                    <option disabled selected>
                      Bedrooms
                    </option>
                    <option value='1'>Approved</option>
                    <option value='2'>Pending</option>
                    <option value='2'>In Process</option>
                    <option value='2'>Rejected</option>
                  </select>
                </div>
              </div> */}
          </div>
          <div className='menu-item px-3 text-end mb-3'>
            <div
              className='btn btn-sm fw-bold btn-primary btn-green hover-none mx-10'
              onClick={() => {
                setShowCreateAppModal(true)
                setShowModal('Filter')
              }}
            >
              Filters
            </div>
            <div
              className='btn btn-sm fw-bold btn-primary btn-green hover-none'
              onClick={() => {
                setShowCreateAppModal(true)
                setDate(true)
              }}
            >
              Date
            </div>
          </div>
          <div className='card card-flush'>
            <div className='card-body pt-0 table-responsive mt-5'>
              <table
                className='table align-middle table-row-dashed fs-6 gy-5'
                id='kt_ecommerce_sales_table'
              >
                <thead>
                  {propertiType === 'Overview' && (
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
                      <th className='text-center min-w-100px'> Development</th>
                      <th className='text-center min-w-100px'>Unit No.</th>
                      <th className='text-center min-w-70px'>Unit Type</th>
                      <th className='text-center min-w-100px'> Bedrooms</th>
                      <th className='text-center min-w-100px'> Contract No. </th>
                      <th className='text-center min-w-100px'>Occupancy</th>
                      <th className='text-center min-w-100px'>Tenancy </th>
                      <th className='text-center min-w-100px'>Tenant Status</th>
                      <th className='text-center min-w-100px'>Tenant Source</th>
                      <th className='text-center min-w-100px'>Duration</th>
                      <th className='text-center min-w-100px'>Remaining</th>
                      <th className='text-center min-w-100px'>Start - End </th>
                      <th className='text-center min-w-100px'>Form</th>

                      <th className='text-end min-w-100px'></th>
                    </tr>
                  )}
                  {propertiType === 'Buildings' && (
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
                      <th className='text-center min-w-100px'> Development</th>
                      <th className='text-center min-w-100px'>102</th>
                      <th className='text-center min-w-70px'>Property ID </th>
                      <th className='text-center min-w-100px'> Unit Type </th>
                      <th className='text-center min-w-100px'> Unit No. </th>
                      <th className='text-center min-w-100px'>Bedrooms</th>
                      <th className='text-center min-w-100px'>Occupancy</th>
                      <th className='text-center min-w-100px'>Building Manager</th>
                      <th className='text-center min-w-100px'>Property Manager</th>
                      <th className='text-center min-w-100px'>Rating</th>
                      <th className='text-end min-w-100px'></th>
                    </tr>
                  )}
                  {propertiType === 'Communities' && (
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
                      <th className='text-center min-w-100px'> Development Name </th>
                      <th className='text-center min-w-100px'>Cluster</th>
                      <th className='text-center min-w-70px'>Unit Group </th>
                      <th className='text-center min-w-100px'> Building Name </th>
                      <th className='text-center min-w-100px'> Floor </th>
                      <th className='text-center min-w-100px'>Property ID </th>
                      <th className='text-center min-w-100px'>Unit Type </th>
                      <th className='text-center min-w-100px'> Unit No. </th>
                      <th className='text-center min-w-100px'> Bedrooms </th>
                      <th className='text-center min-w-100px'> Occupancy </th>
                      <th className='text-center min-w-100px'> Community Manager </th>
                      <th className='text-center min-w-100px'>Property Manager</th>
                      <th className='text-center min-w-100px'>Rating</th>
                      <th className='text-end min-w-100px'></th>
                    </tr>
                  )}
                </thead>
                <tbody className='fw-semibold text-gray-600'>
                  {tableData?.length ? (
                    tableData?.map((v: any, i: any) => {
                      return (
                        <tr>
                          <td className='text-center'>{i + 1}</td>
                          <td data-kt-ecommerce-order-filter='order_id' className='text-center'>
                            {v?.community[0]?.name}
                          </td>
                          <td className='text-center'>{v?.unit[0]?.unitNo}</td>
                          <td className='text-center' data-order='Denied'>
                            {v?.unit[0]?.unitType === 'town_house'
                              ? 'TownHouse'
                              : v?.unit[0]?.unitType === 'other'
                              ? 'Other'
                              : v?.unit[0]?.unitType === 'common_area'
                              ? 'Common Area'
                              : v?.unit[0]?.unitType === 'villa'
                              ? 'Villa'
                              : v?.unit[0]?.unitType === 'apartment'
                              ? 'Apartment'
                              : v?.unit[0]?.unitType === 'penthouse'
                              ? 'Penthouse'
                              : ''}
                          </td>
                          <td className='text-center'>{v?.unit[0]?.bedrooms}</td>
                          <td className='text-center' data-order='2022-09-09'>
                            {v?.contractNo}
                          </td>
                          <td className='text-center' data-order='2022-09-11'>
                            {v?.unit[0]?.occupy === 0 ? 'Vacant ' : 'Occupied'}
                          </td>
                          <td className='text-center' data-order='2022-09-11'>
                            {v?.tenancyStatus === 0
                              ? 'Booked '
                              : v?.tenancyStatus === 1
                              ? 'Active'
                              : 'Renewed'}
                          </td>
                          <td className='text-center' data-order='2022-09-11'>
                            {v?.tenant[0]?.tenantSource === 0 ? 'Agent' : 'Direct'}
                          </td>
                          <td className='text-center' data-order='2022-09-11'>
                            Main Tenant
                          </td>
                          <td className='text-center' data-order='2022-09-11'>
                            {v?.duration?.days <= 0 ? 0 :v?.duration?.days} Days
                          </td>
                          <td className='text-center' data-order='2022-09-11'>
                            {v?.remainingDays <= 0 ? 0 : v?.remainingDays} Days
                          </td>
                          <td className='text-center' data-order='2022-09-11'>
                            {moment(v?.duration?.start_date).format('DD/MM/YYYY')} -{' '}
                            {moment(v?.duration?.end_date).format('DD/MM/YYYY')}
                          </td>
                          <td className='text-center' data-order='2022-09-11'>
                            {v?.isDraft ? 'Draft' : 'Created'}
                          </td>
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
                                // onClick={() => {
                                //   propertiType === 'Communities'
                                //     ? navigate(`/areaCom/${v?._id}`)
                                //     : navigate(`/area/${v?._id}`)
                                // }}
                                onClick={() => navigate(`/tenancy-details/${v?._id}`)}
                                className='btn btn-sm fw-bold btn-primary btn-green hover-none'
                              >
                                View
                              </div>
                            </div>
                          </td>
                          {/* <td className='text-end'>
                      <a
                        href='#'
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
                          <a href='#' className='menu-link px-3'>
                            Edit
                          </a>
                        </div>
                        <div className='menu-item px-3'>
                          <a
                            href='#'
                            className='menu-link px-3'
                            data-kt-ecommerce-order-filter='delete_row'
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </td> */}
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
                  {propertiType === 'Buildings' && (
                    <tr>
                      <td data-kt-ecommerce-order-filter='order_id'>ABC</td>
                      <td>Floor 1</td>
                      <td className='text-center pe-0' data-order='Denied'>
                        123123
                      </td>
                      <td className='text-center pe-0'>Villa</td>
                      <td className='text-center' data-order='2022-09-09'>
                        103
                      </td>
                      <td className='text-center' data-order='2022-09-11'>
                        3
                      </td>
                      <td className='text-center' data-order='2022-09-11'>
                        Occupied
                      </td>
                      <td className='text-center' data-order='2022-09-11'>
                        Max
                      </td>
                      <td className='text-center' data-order='2022-09-11'>
                        Max
                      </td>
                      <td className='text-center' data-order='2022-09-11'>
                        ⭐ 4.5
                      </td>
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
                          <div
                            // onClick={() => {
                            //   propertiType === 'Communities'
                            //     ? navigate(`/areaCom/${v?._id}`)
                            //     : navigate(`/area/${v?._id}`)
                            // }}
                            className='btn btn-sm fw-bold btn-primary btn-green hover-none'
                          >
                            View
                          </div>
                        </div>
                      </td>
                      {/* <td className='text-end'>
                      <a
                        href='#'
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
                          <a href='#' className='menu-link px-3'>
                            Edit
                          </a>
                        </div>
                        <div className='menu-item px-3'>
                          <a
                            href='#'
                            className='menu-link px-3'
                            data-kt-ecommerce-order-filter='delete_row'
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </td> */}
                    </tr>
                  )}
                  {propertiType === 'Communities' && (
                    <tr>
                      <td data-kt-ecommerce-order-filter='order_id'>ABC</td>
                      <td>Building Cluster</td>
                      <td className='text-center pe-0' data-order='Denied'></td>
                      <td className='text-center' data-order='2022-09-09'>
                        ABC
                      </td>
                      <td className='text-center' data-order='2022-09-11'>
                        Floor 1
                      </td>
                      <td className='text-center' data-order='2022-09-11'>
                        123123
                      </td>
                      <td className='text-center' data-order='2022-09-11'>
                        Apartment
                      </td>
                      <td className='text-center' data-order='2022-09-11'>
                        103
                      </td>
                      <td className='text-center' data-order='2022-09-11'>
                        5
                      </td>
                      <td className='text-center' data-order='2022-09-11'>
                        Occupied
                      </td>
                      <td className='text-center' data-order='2022-09-11'>
                        Max
                      </td>
                      <td className='text-center' data-order='2022-09-11'>
                        Max
                      </td>
                      <td className='text-center' data-order='2022-09-11'>
                        ⭐ 4.5
                      </td>
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
                          <div
                            // onClick={() => {
                            //   propertiType === 'Communities'
                            //     ? navigate(`/areaCom/${v?._id}`)
                            //     : navigate(`/area/${v?._id}`)
                            // }}
                            className='btn btn-sm fw-bold btn-primary btn-green hover-none'
                          >
                            View
                          </div>
                        </div>
                      </td>
                      {/* <td className='text-end'>
                      <a
                        href='#'
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
                            href='../../demo1/dist/apps/ecommerce/sales/details.html'
                            className='menu-link px-3'
                          >
                            View
                          </a>
                        </div>
                        <div className='menu-item px-3'>
                          <a href='#' className='menu-link px-3'>
                            Edit
                          </a>
                        </div>
                        <div className='menu-item px-3'>
                          <a
                            href='#'
                            className='menu-link px-3'
                            data-kt-ecommerce-order-filter='delete_row'
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </td> */}
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
                    {pageLimit >= 2 &&<li className={`paginate_button page-item + ${page === 2 ? 'active' : ''}`}>
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
                    {pageLimit >= 3 &&<li className={`paginate_button page-item + ${page === 3 ? 'active' : ''}`}>
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
                    {pageLimit >= 4 &&<li className={`paginate_button page-item + ${page === 4 ? 'active' : ''}`}>
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
                    {pageLimit >= 5 &&<li className={`paginate_button page-item + ${page === 5 ? 'active' : ''}`}>
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
      {/* </div> */}
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'Property Management '})}</PageTitle>
    <DashboardPage /> */}
      {/* <TenanciesFilter
        show={showCreateAppModal}
        handleClose={() => {
          setShowCreateAppModal(false)
          setShowModal('')
          setDate(false)
        }}
        showModal={showModal}
        type={type}
        date={date}
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

export default Tenancies
