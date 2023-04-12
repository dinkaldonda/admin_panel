import React from 'react'
import {Modal} from 'react-bootstrap'
import {KTSVG} from '../../../_metronic/helpers'

const AddArea = ({
  show,
  handleClose,
  building,
  updateDataId,
  isEdit,
  formData,
  handleChnage,
  handleSubmit,
}: any) => {
  return (
    <>
      <Modal
        id='kt_modal_create_app'
        tabIndex={-1}
        aria-hidden='true'
        dialogClassName='modal-dialog modal-dialog-centered mw-600px'
        show={show}
        onHide={handleClose}
        backdrop={true}
        size='sm'
      >
        <div className='modal-header'>
          <h2>{isEdit ? 'Update' : 'Add New'} Floor</h2>
          {/* begin::Close */}
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
            <KTSVG className='svg-icon-1' path='/media/icons/duotune/arrows/arr061.svg' />
          </div>
          {/* end::Close */}
        </div>

        <div className='modal-body py-lg-10 px-lg-10'>
          {/*begin::Stepper */}
          <div
            // ref={stepperRef}
            className='stepper stepper-pills stepper-column flex-column flex-xl-row flex-row-fluid'
            id='kt_modal_create_app_stepper'
          >
            {/*begin::Content */}
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Floor Name
              </label>
              <input
                type='text'
                className='form-control form-control-solid'
                placeholder='e.g.-Floor1'
                name='name'
                value={formData?.name}
                onChange={handleChnage}
              />
            </div>
            {/* {isEdit && (
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Total Properties
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Total Properties'
                  name='totalProperties'
                  value={formData?.totalProperties}
                  onChange={handleChnage}
                />
              </div>
            )} */}

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
                  onClick={handleClose}
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
                  onClick={handleSubmit}
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
}

export default AddArea
