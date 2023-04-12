import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ApiDelete, ApiGet, ApiPost, ApiPut, BaseURL} from '../../../apiCommon/helpers/API/ApiData'
import {ErrorToast, SuccessToast} from '../../../apiCommon/helpers/Toast'
import {CreateAppModal} from '../../../_metronic/partials'
import swal from 'sweetalert2'
import {TbChevronDown} from 'react-icons/tb'
import {KTSVG} from '../../../_metronic/helpers'
import noData from '../../../img/NoData1.svg'
import {Dropdown} from 'react-bootstrap'
import {AiFillStar} from "react-icons/ai"
// import AddBlog from './AddBlog'
import axios from 'axios'

const Order = () => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [tableData, setTableData] = useState([])
  const [updateDataId, setUpdateDataId] = useState('')
  const [propertiType, setPropertiType] = useState('Buildings')
  const [show, setShow] = useState(false)
  const [showCom, setShowCom] = useState(false)
  const [pageLimit, setPageLimit] = useState<any>(1)
  const [page, setPage] = useState(1)
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

  const building = async () => {
    await ApiGet('product/getOrder')
      .then((res) => {
        console.log('res?.data', res?.data)
        setTableData(res?.data?.getOrder)
      })
      .catch((err) => ErrorToast(err?.message))
  }

  const deleteProperty = (id: any) => {
    ApiDelete(`review/deleteReview?id=${id}`)
      .then((res: any) => {
        SuccessToast(res?.data?.message)
        building()
        // building(formData?.portfolioType, formData?.portfolio)
      })

      .catch((err) => ErrorToast(err.message))
  }

  const editBtn = (id: any) => {
    setUpdateDataId(id?._id)
    setIsEdit(true)
    setShowCreateAppModal(true)
    setFormData(id)
  }

  const handleSubmit = () => {
    if (isEdit) {
      const body = {
        title: formData?.title,
        desc:formData?.desc,
        image:image ?? formData?.image
        // id:updateDataId
      }
      ApiPut(`blog/update-blog?id=${formData?._id}`, body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          setFormData({})
          setShowCreateAppModal(false)
          building()
          setIsEdit(false)
        })
        .catch((err) => ErrorToast(err.message))
    } else {
      // const body = {...formData, managerId: formData?.managerId}
      const body = {
        title: formData?.title,
        desc:formData?.desc,
        image
      }
      ApiPost('blog/add-blog', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          setFormData({})
          setShowCreateAppModal(false)
          building()
        })
        .catch((err) => ErrorToast(err.message))
    }
  }

  useEffect(() => {
    building()
  }, [])

  useEffect(() => {
    building()

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
  let config = {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
}
const [image,setImage] = useState("")
  const handleIamgeChange = async(e:any) =>{
    console.log('e.target', e.target)
    const formdata = new FormData()
    formdata.append("image",e.target.files[0])
    await axios.post(BaseURL + "image/upload-image",formdata,config).then((res)=>{
      console.log('res', res)
      setImage(res?.data?.url)
    }).catch((err)=>{
      console.log('err', err)
    })
  }


  const navigate = useNavigate()
  return (
    <>
      <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
        {/* <div className='d-flex flex-column flex-column-fluid'> */}
        {/* <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'> */}
        <div id='' className='app-container container-xxl d-flex flex-stack pt-0 mt-0'>
          <div className='page-title d-flex flex-column justify-content-center flex-wrap me-3'>
            {/* <ul className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2'>
              <li className='nav-item'>
                <h1
                  className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0 me-15'
                  style={{padding: '0.5rem 0'}}
                >
                  Category
                </h1>
              </li>
            </ul> */}
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
        </div>
        {/* </div> */}
        {/* <div className='app-container container-xxl d-flex flex-stack pt-3 mt-5'>
          <a
            className='btn btn-sm fw-bold btn-primary btn-green'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_create_app'
            onClick={() => {
              setShowCreateAppModal(true)
            }}
          >
            Add Blog
          </a>
        </div> */}
        <div id='kt_app_content' className='app-content flex-column-fluid pt-0'>
          <div id='kt_app_content_container' className='app-container container-xxl'>
            <div className='card card-flush mb-10'></div>
            <div className='card card-flush'>
              <div className='card-body pt-0 table-responsive'>
                <table
                  className='table align-middle table-row-dashed fs-6 gy-5'
                  id='kt_ecommerce_sales_table'
                >
                  <thead>
                  <tr>
                <th scope="col" className="px-6 py-3">
                     Sr_Num
                </th>
                <th scope="col" className="px-6 py-3">
                     Name
                </th>
                <th scope="col" className="px-6 py-3">
                     Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Image
                </th>
                <th scope="col" className="px-6 py-3">
                    Product_Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Sub_Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Material
                </th>
                <th scope="col" className="px-6 py-3">
                    Size
                </th>
                <th scope="col" className="px-6 py-3">
                    Ship_by
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Discount_Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Quantity
                </th>
            </tr>
                  </thead>
                  <tbody className='fw-semibold text-gray-800'>
                    {tableData?.length ? (
                      tableData?.map((val: any, i: any) => {
                        return (
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {i+1}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {val?.userId?.name}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {val?.userId?.email}
                </td>
                <td className="w-40 p-2 ">
                    <img src={val?.productId?.image} alt="Apple Watch" width={100} height={100} className='rounded'/>
                </td>
                
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {val?.productId?.name}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {val?.productId?.desc} 
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {val?.category?.name}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {val?.subCategory?.name}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {val?.productId?.material}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {val?.productId?.size} INCH
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {val?.productId?.shippingDays} day
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    ₹{val?.productId?.price}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                ₹{val?.productId?.discPrice}
                </td>

                <td className="px-6 py-4">
                    {val?.productQuantity}
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
                    <option vue='10'>10</option>
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
                      {pageLimit >= 2 && (
                        <li className={`paginate_button page-item + ${page === 2 ? 'active' : ''}`}>
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
                        </li>
                      )}
                      {pageLimit >= 3 && (
                        <li className={`paginate_button page-item + ${page === 3 ? 'active' : ''}`}>
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
                        </li>
                      )}
                      {pageLimit >= 4 && (
                        <li className={`paginate_button page-item + ${page === 4 ? 'active' : ''}`}>
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
                        </li>
                      )}
                      {pageLimit >= 5 && (
                        <li className={`paginate_button page-item + ${page === 5 ? 'active' : ''}`}>
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
                        </li>
                      )}
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
      {/* {showCreateAppModal && (
        <AddBlog
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
          handleIamgeChange={handleIamgeChange}
          handleSubmit={handleSubmit}
        />
      )} */}
    </>
  )
}

export default Order
