import React, {useEffect, useState} from 'react'
import {Form, Modal} from 'react-bootstrap'
import {ids} from 'webpack'
import {ApiGet, ApiPost, ApiPut} from '../../../apiCommon/helpers/API/ApiData'
import {ErrorToast, SuccessToast} from '../../../apiCommon/helpers/Toast'

const AddProperty = ({open, setOpen, isEdit, building, updateDataId}: any) => {
  const [data, setData] = React.useState<any>({})

  const handleChange = (e: any) => {
    const {value, name} = e.target

    setData({
      ...data,
      [name]: value,
    })
  }

  console.log('data', data)
  const getMyLocation = () => {
    const location = window.navigator && window.navigator.geolocation

    if (location) {
      location.getCurrentPosition(
        (position) => {
          setData({
            ...data,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {}
      )
    }
  }

  const addProperty = () => {
    if (isEdit) {
      delete data._id
      delete data.updatedBy
      const body = {...data, managerId: '6329ee43396e812bcc0964e5', id: updateDataId}
      ApiPut('cooperate/properties', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building()
          console.log('addProperty', res)
          setOpen(false)
        })
        .catch((err) => ErrorToast(err.message))
    } else {
      const body = {...data, managerId: '6329ee43396e812bcc0964e5'}
      ApiPost('cooperate/properties', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building()
          console.log('addProperty', res)
          setOpen(false)
        })
        .catch((err) => ErrorToast(err.message))
    }
  }

  useEffect(() => {
    getMyLocation()

    if (isEdit) {
      ApiGet(`cooperate/properties/${updateDataId}`)
        .then((response) => setData(response?.data?.data))
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  return (
    <>
      <Modal
        show={open}
        centered
        size='lg'
        onHide={() => setOpen(!open)}
        aria-labelledby='example-modal-sizes-title-lg'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-modal-sizes-title-lg'>
            {/* {isEdit ? 'Update' : 'Add'} Property */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='overlay overlay-block cursor-default'>
          <div className='row'>
            <div className='d-flex flex-column mb-8 fv-row'>
              <label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
                <span className=''>Portfolio Type</span>
              </label>

              <select
                name='portfolioType'
                className='form-select form-select-solid'
                value={data?.portfolioType}
                onChange={handleChange}
              >
                <option disabled selected></option>
                <option value='residential'>Residential</option>
                <option value='commercial'>Commercial</option>
              </select>
            </div>

            {data?.portfolioType && (
              <div className='d-flex flex-column mb-8 fv-row'>
                <label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
                  <span className=''>Portfolio</span>
                </label>

                <select
                  name='portfolio'
                  className='form-select form-select-solid'
                  value={data?.portfolio}
                  onChange={handleChange}
                >
                  <option disabled selected></option>
                  <option value='buildings'>Buildings</option>
                  <option value='communities'>Communities</option>
                </select>
              </div>
            )}
            {data?.portfolioType && data?.portfolio && (
              <>
                <div className='d-flex flex-column mb-8 fv-row'>
                  <label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
                    <span className=''>Name</span>
                  </label>

                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder=''
                    name='name'
                    value={data?.name}
                    onChange={handleChange}
                  />
                </div>
                <div className='d-flex flex-column mb-8 fv-row'>
                  <label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
                    <span className=''>Total Floors</span>
                  </label>

                  <input
                    type='number'
                    className='form-control form-control-solid'
                    placeholder=''
                    name='totalFloors'
                    value={data?.totalFloors}
                    onChange={handleChange}
                  />
                </div>
                <div className='d-flex flex-column mb-8 fv-row'>
                  <label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
                    <span className=''>Total Units</span>
                  </label>

                  <input
                    type='number'
                    className='form-control form-control-solid'
                    placeholder=''
                    name='totalUnits'
                    value={data?.totalUnits}
                    onChange={handleChange}
                  />
                </div>
                <div className='d-flex flex-column mb-8 fv-row'>
                  <label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
                    <span className=''>Area</span>
                  </label>

                  <input
                    type='number'
                    className='form-control form-control-solid'
                    placeholder=''
                    name='area'
                    value={data?.area}
                    onChange={handleChange}
                  />
                </div>
                <div className='d-flex flex-column mb-8 fv-row'>
                  <label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
                    <span className=''>Manager Name</span>
                  </label>

                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder=''
                    name='managerId'
                    value={data?.managerId}
                    onChange={handleChange}
                  />
                </div>
                <div className='d-flex flex-column mb-8 fv-row'>
                  <label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
                    <span className=''>Total Zones</span>
                  </label>

                  <input
                    type='number'
                    className='form-control form-control-solid'
                    placeholder=''
                    name='totalZones'
                    value={data?.totalZones}
                    onChange={handleChange}
                  />
                </div>
                <div className='d-flex flex-column mb-8 fv-row'>
                  <label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
                    <span className=''>Total Buildings</span>
                  </label>

                  <input
                    type='number'
                    className='form-control form-control-solid'
                    placeholder=''
                    name='totalBuildings'
                    value={data?.totalBuildings}
                    onChange={handleChange}
                  />
                </div>
                <div className='d-flex flex-column mb-8 fv-row'>
                  <label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
                    <span className=''>City</span>
                  </label>

                  <select
                    name='city'
                    className='form-select form-select-solid '
                    value={data?.city}
                    onChange={handleChange}
                  >
                    <option disabled selected></option>
                    <option value='Abu Dhabi'>Abu Dhabi</option>
                    <option value='Al Ain'>Al Ain</option>
                    <option value='Ajman'>Ajman</option>
                    <option value='Dubai'>Dubai</option>
                    <option value='Sharjah'>Sharjah</option>
                    <option value='Fujairah'>Fujairah</option>
                    <option value='Ras Al Khaimah'>Ras Al Khaimah</option>
                    <option value='Umm Al Quwain'>Umm Al Quwain</option>
                  </select>
                </div>
                <div className='d-flex flex-column mb-8 fv-row'>
                  <label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
                    <span className=''>Location</span>
                  </label>

                  <input
                    type='type'
                    className='form-control form-control-solid'
                    placeholder=''
                    name='location'
                    value={data?.location}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='text-center'>
            <button type='reset' id='kt_modal_new_target_cancel' className='btn btn-light me-3'>
              Cancel
            </button>
            <button
              type='button'
              id='kt_modal_new_target_sbmit'
              className='btn btn-primary'
              onClick={addProperty}
            >
              Submit
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddProperty
