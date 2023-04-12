/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import {useIntl} from 'react-intl'
import {useNavigate} from 'react-router-dom'
import {ApiGet, ApiPost} from '../../../apiCommon/helpers/API/ApiData'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import noData from '../../../img/NoData1.svg'
import {
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget6,
  TablesWidget5,
  TablesWidget10,
  MixedWidget8,
  CardsWidget7,
  CardsWidget17,
  CardsWidget20,
  ListsWidget26,
  EngageWidget10,
} from '../../../_metronic/partials/widgets'

const tabsname = ['Overview', 'Properties', 'Tenants', 'Announcements', 'Payments & Rent']

const DashboardPage: FC = () => (
  <>
    <div className='row gy-5 gx-xl-8'>
      <div className='col-xl-12'>
        <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' />
      </div>
    </div>
  </>
)

const BuildingDashboard: FC = () => {
  const [count, setCount] = useState<any>([])
  const [tableData, setTableData] = useState<any>([])
  const [pageLimit, setPageLimit] = useState<any>(1)

  const [page, setPage] = useState<any>(1)
  const intl = useIntl()
  const navigate = useNavigate()
  const getCount = () => {
    ApiGet('cooperate/dashboard')
      .then((res) => {
        console.log('res', res?.data?.data)
        setCount(res?.data?.data)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
  const getData = () => {
    let body = {
      page: page,
      limit: 100,
      watchType: 'building',
    }
    ApiPost('cooperate/unit/home/get', body)
      .then((res) => {
        console.log('res', res?.data?.data?.unit_data)
        setTableData(res?.data?.data?.unit_data)
        setPageLimit(res?.data?.data?.state?.page_limit)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
  useEffect(() => {
    getCount()
    getData()
  }, [page])
  return (
    <>
      <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
        {/* <div className='d-flex flex-column flex-column-fluid'> */}
        {/* <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'> */}
        <div id='' className='app-container container-xxl d-flex flex-stack pt-0 mt-0'>
          {/* <div className='page-title d-flex flex-column justify-content-center flex-wrap me-3'>
            <h1 className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0'>
              Property Management
            </h1>
          </div> */}
          <div className='d-flex align-items-center gap-2 gap-lg-3'>
            <ul className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2'>
              <li
                className='nav-item'
                onClick={() => {
                  // setFormData({...formData, portfolio: 'overview'})
                  // building(formData?.portfolioType, 'overview')

                  setPage(1)
                  navigate('/dashboard')
                }}
              >
                <a className='nav-link cursor-pointer text-active-primary pb-4 '>Overview</a>
              </li>
              <li
                className='nav-item'
                onClick={() => {
                  //   setFormData({...formData, portfolio: 'building'})
                  //   building(formData?.portfolioType, 'building')
                  navigate('/building-dashboard')
                  setPage(1)
                }}
              >
                <a className='nav-link cursor-pointer text-active-primary pb-4 active'>Buildings</a>
              </li>
              <li
                className='nav-item'
                onClick={() => {
                  //   setFormData({...formData, portfolio: 'communities'})
                  //   building(formData?.portfolioType, 'communities')
                  setPage(1)
                  navigate('/community-dashboard')
                }}
              >
                <a
                  className='nav-link cursor-pointer text-active-primary pb-4'
                  data-bs-toggle='tab'
                >
                  Communities
                </a>
              </li>
            </ul>
          </div>
          <div className='d-flex'>
            <div className='d-flex align-items-center gap-2 gap-lg-3'>
              <div className='m-0 me-5'>
                <a
                  href='#'
                  className='btn btn-sm btn-flex bg-body btn-color-gray-700 btn-active-color-primary fw-bold'
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
                      ></path>
                    </svg>{' '}
                    Filter
                  </span>
                </a>
                <div
                  className='menu menu-sub menu-sub-dropdown w-250px w-md-300px'
                  data-kt-menu='true'
                  id='kt_menu_63479aee8def1'
                >
                  <div className='px-7 py-5'>
                    <div className='fs-5 text-dark fw-bold'>Filter Options</div>
                  </div>
                  <div className='separator border-gray-200'></div>
                  {/* <div className='mb-5 px-5 mt-5'>
                    <div>
                      <input
                        type='text'
                        className='form-control form-control-solid'
                        placeholder='Unit No.'
                        name='unitNo'
                        // onChange={imageChange}
                        // value={formData?.unitNo}
                        // onChange={handleChnage}
                      />
                    </div>
                  </div> */}
                  <div className='mb-5 px-5 mt-5'>
                    {/* <label className='form-label fw-semibold'>Property Rating:</label> */}
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
                  <div className='mb-5 px-5'>
                    {/* <label className='form-label fw-semibold'>Property Rating:</label> */}
                    <div>
                      <select
                        className='form-select form-select-solid'
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
                  <div className='mb-5 px-5'>
                    {/* <label className='form-label fw-semibold'>Property Rating:</label> */}
                    <div>
                      <select
                        className='form-select form-select-solid'
                        data-kt-select2='true'
                        data-placeholder='Select option'
                        data-dropdown-parent='#kt_menu_631f08e971923'
                        data-allow-clear='true'
                      >
                        <option disabled selected>
                          Rating
                        </option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                      </select>
                    </div>
                  </div>
                  <div className='mb-5 px-5'>
                    {/* <label className='form-label fw-semibold'>Property Rating:</label> */}
                    <div>
                      <select
                        className='form-select form-select-solid'
                        data-kt-select2='true'
                        data-placeholder='Select option'
                        data-dropdown-parent='#kt_menu_631f08e971923'
                        data-allow-clear='true'
                      >
                        <option disabled selected>
                          Building Manager
                        </option>
                        <option value='1'>John</option>
                        <option value='2'>Max</option>
                        <option value='2'>Root</option>
                      </select>
                    </div>
                  </div>
                  <div className='mb-5 px-5'>
                    {/* <label className='form-label fw-semibold'>Property Rating:</label> */}
                    <div>
                      <select
                        className='form-select form-select-solid'
                        data-kt-select2='true'
                        data-placeholder='Select option'
                        data-dropdown-parent='#kt_menu_631f08e971923'
                        data-allow-clear='true'
                      >
                        <option disabled selected>
                          Property Manager
                        </option>
                        <option value='1'>John</option>
                        <option value='2'>Max</option>
                        <option value='2'>Root</option>
                      </select>
                    </div>
                  </div>

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
              onClick={() => navigate('/building')}
              className='btn btn-sm fw-bold btn-primary btn-green'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_create_app'
            >
              Manage Properties
            </a>
          </div>
        </div>
      </div>
      {/* </div> */}
      <div id='kt_app_content' className='app-content flex-column-fluid'>
        <div id='kt_app_content_container' className='app-container container-xxl'>
          <Row>
            <Col lg={6}>
              <div
                className='card-header align-items-center py-5  gap-md-2 d-flex'
                style={{justifyContent: 'flex-start'}}
              >
                <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                  <h6 className='gray-500 mx-10'>
                    Buildings{' '}
                    <span className='mx-2' style={{color: 'black'}}>
                      {count?.building_count}
                    </span>
                  </h6>
                </div>
                {/* <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                      <h6 className='gray-500 mx-10'>
                        Communities : <span className='fw-semibold'>{count[0]?.totalZones}</span>
                      </h6>
                    </div> */}
                <div className='mb-10  min-w-200px' style={{display: 'contents'}}>
                  <h6 className='gray-500 mx-10'>
                    Units{' '}
                    <span className='mx-2' style={{color: 'black'}}>
                      {count?.unit_count}
                    </span>
                  </h6>
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
              <div>
                <select
                  className='form-select '
                  data-kt-select2='true'
                  data-placeholder='Select option'
                  data-dropdown-parent='#kt_menu_631f08e971923'
                  data-allow-clear='true'
                >
                  <option disabled selected>
                    Development
                  </option>
                  <option value='1'>Building</option>
                  <option value='2'>Community</option>
                </select>
              </div>
            </div>
            <div className='mb-2 min-w-200px col-md-3 px-10'>
              <div>
                <input
                  type='text'
                  className='form-control '
                  placeholder='Property ID'
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
                  className='form-select '
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
                  <option value='5'>Common Area</option>
                  <option value='6'>Other</option>
                </select>
              </div>
            </div>
            <div className='mb-2 min-w-200px col-md-3 px-10'>
              <div>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Unit No.'
                  name='unitNo'
                  // onChange={imageChange}
                  // value={formData?.unitNo}
                  // onChange={handleChnage}
                />
              </div>
            </div>
          </div>
          {/* <div
              className='card-header align-items-center py-5 gap-2 gap-md-5'
              data-select2-id='select2-data-124-mv9r'
            >
              <div className='card-title'>
                <div className='d-flex align-items-center position-relative my-1'>
                  <select
                    className='form-select form-select-solid'
                    data-kt-select2='true'
                    data-placeholder='Select option'
                    data-dropdown-parent='#kt_menu_631f08e971923'
                    data-allow-clear='true'
                  >
                    <option disabled selected>
                      Development
                    </option>
                    <option value='1'>Building</option>
                    <option value='2'>Community</option>
                  </select>
                </div>
              </div>
              <div
                className='card-toolbar flex-row-fluid justify-content-end gap-5'
                data-select2-id='select2-data-123-qo5w'
              >
                <div className='w-100 mw-150px' data-select2-id='select2-data-122-pq3a'>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='Property ID'
                    name='unitNo'
                    // onChange={imageChange}
                    // value={formData?.unitNo}
                    // onChange={handleChnage}
                  />
                </div>
                <div className='w-100 mw-150px' data-select2-id='select2-data-122-pq3a'>
                  <select
                    className='form-select form-select-solid'
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
                    <option value='5'>Common Area</option>
                    <option value='6'>Other</option>
                  </select>
                </div>

              </div>
            </div> */}
          <div className='card card-flush'>
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
                    <th className='text-center min-w-100px'> Development Name </th>
                    <th className='text-center min-w-100px'>Floor</th>
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
                </thead>
                <tbody className='fw-semibold text-gray-600'>
                  {tableData?.length ? (
                    tableData.map((v: any, i: any) => {
                      return (
                        <>
                          <tr>
                            <td className='text-center'>{i + 1}</td>
                            <td data-kt-ecommerce-order-filter='order_id' className='text-center'>
                              {v?.building[0]?.name}
                            </td>
                            <td className='text-center'>{v?.floor[0]?.name}</td>
                            <td className='text-center' data-order='Denied'>
                              {v?.id}
                            </td>
                            <td className='text-center'>
                              {v?.unitType === 'town_house'
                                ? 'TownHouse'
                                : v?.unitType === 'other'
                                ? 'Other'
                                : v?.unitType === 'common_area'
                                ? 'Common Area'
                                : v?.unitType === 'villa'
                                ? 'Villa'
                                : v?.unitType === 'apartment'
                                ? 'Apartment'
                                : v?.unitType === 'penthouse'
                                ? 'Penthouse'
                                : ''}
                            </td>
                            <td className='text-center' data-order='2022-09-09'>
                              {v?.unitNo}
                            </td>
                            <td className='text-center' data-order='2022-09-11'>
                              {v?.bedrooms}
                            </td>
                            <td className='text-center' data-order='2022-09-11'>
                              {v?.occupy === 0 ? 'Vacant ' : 'Occupied'}
                            </td>
                            <td className='text-center' data-order='2022-09-11'>
                              {v?.building[0]?.managerId}
                            </td>
                            <td className='text-center' data-order='2022-09-11'>
                              {v?.managerId}
                            </td>
                            <td className='text-center' data-order='2022-09-11'>
                              <span className='svg-icon svg-icon-2' style={{color: '#ffad0f'}}>
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
                        </>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan={12} className='text-center'>
                        <img src={noData} alt='' width={350} />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className='row my-5'>
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
      {/* </div> */}
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'Property Management '})}</PageTitle>
      <DashboardPage /> */}
    </>
  )
}

export {BuildingDashboard}
