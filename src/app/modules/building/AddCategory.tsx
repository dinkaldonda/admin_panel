import React from 'react'
import {Modal} from 'react-bootstrap'
import {KTSVG} from '../../../_metronic/helpers'

const AddCategory = ({
  show,
  handleClose,
  building,
  updateDataId,
  propertiType,
  isEdit,
  formData,
  handleChnage,
  handleSubmit,
  category,
}: any) => {
  console.log('formData', formData)
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
            {isEdit ? 'Update' : 'Add New'} {'Furniture Item Type'}
          </h2>
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
            <div className='mb-10  min-w-200px'>
              <label className='form-label fw-semibold'>Furniture Item Name:</label>
              <div>
                <select
                  className='form-control form-control-solid'
                  placeholder='Enter Furniture Item Name'
                  // data-kt-select2='true'
                  // data-placeholder='Select option'
                  // data-dropdown-parent='#kt_menu_631f08e971923'
                  // data-allow-clear='true'
                  name='categoryName'
                  value={formData?.categoryName}
                  disabled={isEdit}
                  onChange={handleChnage}
                >
                  {category?.map((v: any, i: any) => {
                    return (
                      <>
                        <option value={v?._id}>{v?.name}</option>
                      </>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className='mb-10  min-w-200px'>
              <label className='form-label fw-semibold'> Furniture Item Type Name:</label>
              <div>
                <input
                  className='form-control form-control-solid'
                  type='text'
                  placeholder='Enter Furniture Item Type Name'
                  // data-kt-select2='true'
                  // data-placeholder='Select option'
                  // data-dropdown-parent='#kt_menu_631f08e971923'
                  // data-allow-clear='true'
                  name='name'
                  value={formData?.name}
                  onChange={handleChnage}
                />
              </div>
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

export default AddCategory
