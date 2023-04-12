import React from 'react'
import {Modal} from 'react-bootstrap'
import {KTSVG} from '../../../_metronic/helpers'

const AddUnitsCluster = ({
  show,
  handleClose,
  building,
  updateDataId,
  propertiType,
  isEdit,
  setAdd,
  formData,
  imageChange,
  handleChnage,
  handleSubmit,
}: any) => {
  console.log('propertiType', propertiType)
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
          <h2>
            {isEdit ? 'Update' : 'Add New'}{' '}
            {propertiType === 'Unit'
              ? 'Unit Group'
              : propertiType === 'Building'
              ? 'Building'
              : propertiType === 'CommonArea'
              ? 'Common Area'
              : propertiType === 'Townhouse'
              ? 'Townhouse'
              : propertiType === 'Villa'
              ? 'Villa'
              : 'Other Area'}
          </h2>
          {/* begin::Close */}
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
            <KTSVG className='svg-icon-1' path='/media/icons/duotune/arrows/arr061.svg' />
          </div>
          {/* end::Close */}
        </div>

        {propertiType === 'Unit' && (
          <div className='modal-body py-lg-10 px-lg-10'>
            {/*begin::Stepper */}
            <div
              // ref={stepperRef}
              className='stepper stepper-pills stepper-column flex-column flex-xl-row flex-row-fluid'
              id='kt_modal_create_app_stepper'
            >
              {/*begin::Content */}
              <div
                className='card-header align-items-center gap-md-2'
                style={{justifyContent: 'flex-start'}}
              >
                <div className='mb-10 min-w-200px '>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    Unit Group Name
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='e.g.-ABC'
                    name='name'
                    value={formData?.name}
                    onChange={handleChnage}
                  />
                </div>
                <div className='mb-10 min-w-200px '>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    Total Units
                  </label>
                  <input
                    type='number'
                    className='form-control form-control-solid'
                    placeholder='e.g.-3'
                    name='totalUnits'
                    value={formData?.totalUnits}
                    onChange={handleChnage}
                    disabled={isEdit ? true : false}
                  />
                </div>
              </div>

              {/*end::Content */}
            </div>
            {/* end::Stepper */}
          </div>
        )}
        {propertiType === 'Building' && (
          <div className='modal-body py-lg-10 px-lg-10'>
            {/*begin::Stepper */}
            <div
              // ref={stepperRef}
              className='stepper stepper-pills stepper-column flex-column flex-xl-row flex-row-fluid'
              id='kt_modal_create_app_stepper'
            >
              {/*begin::Content */}
              <div
                className='card-header align-items-center gap-md-2'
                style={{justifyContent: 'flex-start'}}
              >
                <div className='mb-10 min-w-200px '>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    Building Name
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='e.g. -ABC'
                    name='name'
                    value={formData?.name}
                    onChange={handleChnage}
                  />
                </div>
                <div className='mb-10 min-w-200px '>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    Total Floor
                  </label>
                  <input
                    type='number'
                    className='form-control form-control-solid'
                    placeholder='e.g.-3'
                    name='totalFloors'
                    value={formData?.totalFloors}
                    onChange={handleChnage}
                    disabled={isEdit ? true : false}
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

export default AddUnitsCluster
