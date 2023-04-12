import React, {useState} from 'react'
import {Modal} from 'react-bootstrap'
import {KTSVG} from '../../../_metronic/helpers'

const AddAreaCom = ({
  show,
  handleClose,
  building,
  updateDataId,
  isEdit,
  unit,
  setUnit,
  setType,
  formData,
  handleChnage,
  handleSubmit,
}: any) => {
  console.log('formData', unit)

  const close = () => {
    handleClose()
    setUnit('0')
  }
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
          <h2>{isEdit ? 'Update' : 'Add New'} Cluster</h2>
          {/* begin::Close */}
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={close}>
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
            <div className='d-flex align-items-center justify-content-center gap-2 gap-lg-3'>
              <ul className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2'>
                {/* <li
                className='nav-item'
                onClick={() => {
                  setFormData({...formData, portfolio: 'overview'})
                  building(formData?.portfolioType, 'overview')
                  setPropertiType('Overview')
                }}
              >
                <a className='nav-link text-active-primary pb-4 active' data-bs-toggle='tab'>
                  Overview
                </a>
              </li> */}
                <li
                  className='nav-item'
                  onClick={() => {
                    // setFormData({...formData, portfolio: 'building'})
                    // building(formData?.portfolioType, 'building')
                    // setPropertiType('Buildings')
                    setUnit('0')
                    setType(0)
                  }}
                >
                  <a
                    className={`nav-link text-active-primary pb-4 ${
                      unit === '0' ? 'active' : 'aaa'
                    }`}
                    data-bs-toggle='tab'
                  >
                    Units Cluster
                  </a>
                </li>
                <li
                  className='nav-item'
                  onClick={() => {
                    // setFormData({...formData, portfolio: 'building'})
                    // building(formData?.portfolioType, 'building')
                    // setPropertiType('Buildings')
                    setUnit('1')
                    setType(1)
                  }}
                >
                  <a
                    className={`nav-link text-active-primary pb-4 ${
                      unit === '1' ? 'active' : 'aaa'
                    }`}
                    data-bs-toggle='tab'
                  >
                    Buildings Cluster
                  </a>
                </li>
                <li
                  className='nav-item'
                  onClick={() => {
                    // setFormData({...formData, portfolio: 'communities'})
                    // building(formData?.portfolioType, 'communities')
                    // setPropertiType('Communities')
                    setUnit('2')
                    setType(2)
                  }}
                >
                  <a
                    className={`nav-link text-active-primary pb-4 ${
                      unit === '2' ? 'active' : 'aaa'
                    }`}
                    data-bs-toggle='tab'
                  >
                    Mixed Cluster
                  </a>
                </li>
              </ul>
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
            {/*begin::Content */}
            {unit === '0' && (
              <>
                <div className='mt-10 fst-italic' style={{fontSize: '11px'}}>
                  * A group of units located in close proximity within the community (Villas /
                  Townhouses / Other.)
                </div>
                <div className='mb-10 mt-10'>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    Cluster Name
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='e.g. - abc'
                    name='name'
                    value={formData?.name}
                    onChange={handleChnage}
                  />
                  {/* <select
                name='areaType'
                className='form-select form-select-solid'
                value={formData?.areaType}
                onChange={handleChnage}
              >
                <option disabled selected>
                  Select Area Type
                </option>
                <option value='zone'>Zone</option>
                <option value='building'>Building</option>
                
              </select> */}
                </div>

                <div className='mb-10'>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    Total Unit
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='e.g.-3'
                    name='totalUnits'
                    value={formData?.totalUnits}
                    onChange={handleChnage}
                    disabled={isEdit ? true : false}
                  />
                </div>
              </>
            )}
            {unit === '1' && (
              <>
                <div className='mt-10 fst-italic' style={{fontSize: '11px'}}>
                  * Multiple buildings located in close proximity within the community.
                </div>
                <div className='mb-10 mt-10'>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    Cluster Name
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='e.g. - abc'
                    name='name'
                    value={formData?.name}
                    onChange={handleChnage}
                  />
                  {/* <select
                name='areaType'
                className='form-select form-select-solid'
                value={formData?.areaType}
                onChange={handleChnage}
              >
                <option disabled selected>
                  Select Area Type
                </option>
                <option value='zone'>Zone</option>
                <option value='building'>Building</option>
                
              </select> */}
                </div>

                <div className='mb-10'>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    Total Building
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='e.g.-3'
                    name='totalBuildings'
                    value={formData?.totalBuildings}
                    onChange={handleChnage}
                    disabled={isEdit ? true : false}
                  />
                </div>
              </>
            )}
            {unit === '2' && (
              <>
                <div className='mt-10 fst-italic' style={{fontSize: '11px'}}>
                  * A group of standalone units and Multiple buildings located in close proximity
                  within the community.
                </div>
                <div className='mb-10 mt-10'>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    Cluster Name
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='e.g. - abc'
                    name='name'
                    value={formData?.name}
                    onChange={handleChnage}
                  />
                  {/* <select
                name='areaType'
                className='form-select form-select-solid'
                value={formData?.areaType}
                onChange={handleChnage}
              >
                <option disabled selected>
                  Select Area Type
                </option>
                <option value='zone'>Zone</option>
                <option value='building'>Building</option>
                
              </select> */}
                </div>

                <div className='mb-10'>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    Total Unit Groups
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='e.g.-3'
                    name='totalUnitGroups'
                    value={formData?.totalUnitGroups}
                    onChange={handleChnage}
                    disabled={isEdit ? true : false}
                  />
                </div>
                <div className='mb-10'>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    Total Building
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='Ee.g.x-3'
                    name='totalBuildings'
                    value={formData?.totalBuildings}
                    onChange={handleChnage}
                    disabled={isEdit ? true : false}
                  />
                </div>
              </>
            )}

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

export default AddAreaCom
