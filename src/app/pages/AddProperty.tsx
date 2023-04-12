import React, {useEffect, useState} from 'react'
import {Form, Modal} from 'react-bootstrap'
import {ids} from 'webpack'
import {ApiGet, ApiPost, ApiPut} from '../../apiCommon/helpers/API/ApiData'
import {ErrorToast, SuccessToast} from '../../apiCommon/helpers/Toast'

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
