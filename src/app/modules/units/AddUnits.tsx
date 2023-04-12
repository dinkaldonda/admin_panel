import React from 'react'
import {Modal} from 'react-bootstrap'
import {KTSVG} from '../../../_metronic/helpers'

const AddUnits = ({
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
            {isEdit ? 'Update' : propertiType === 'tenancy' ? 'Create Tenancy' : 'Add New'}{' '}
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
              : propertiType === 'tenancy'
              ? ''
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
                    placeholder='Ex-ABC'
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
                    placeholder='Ex-3'
                    name='totalUnits'
                    value={formData?.totalUnits}
                    onChange={handleChnage}
                  />
                </div>
              </div>

              {/*end::Content */}
            </div>
            {/* end::Stepper */}
          </div>
        )}
        {propertiType === 'tenancy' && (
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
                  Total Tenants
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-solid'
                    placeholder='e.g.-5'
                    name='name'
                    value={formData?.name}
                    onChange={handleChnage}
                  />
                </div>
                <div className='mb-10 min-w-200px '>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Main Tenant Name
                  </label>
                  <input
                    type='number'
                    className='form-control form-control-solid'
                    placeholder='e.g.-ABC'
                    name='totalFloors'
                    value={formData?.totalFloors}
                    onChange={handleChnage}
                  />
                </div>
                <div className='mb-10 min-w-200px '>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Duration
                  </label>
                  <input
                    type='number'
                    className='form-control form-control-solid'
                    placeholder='e.g.-5 Days'
                    name='totalFloors'
                    value={formData?.totalFloors}
                    onChange={handleChnage}
                  />
                </div>
                <div className='mb-10 min-w-200px '>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Start Date
                  </label>
                  <input
                    type='date'
                    className='form-control form-control-solid'
                    placeholder='e.g.-3'
                    name='totalFloors'
                    value={formData?.totalFloors}
                    onChange={handleChnage}
                  />
                </div>
                <div className='mb-10 min-w-200px '>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  End Date
                  </label>
                  <input
                    type='date'
                    className='form-control form-control-solid'
                    placeholder='e.g.-3'
                    name='totalFloors'
                    value={formData?.totalFloors}
                    onChange={handleChnage}
                  />
                </div>
                <div className='mb-10 min-w-200px '>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Total Amount
                  </label>
                  <input
                    type='number'
                    className='form-control form-control-solid'
                    placeholder='e.g. AED 25'
                    name='totalFloors'
                    value={formData?.totalFloors}
                    onChange={handleChnage}
                  />
                </div>
                <div className='mb-10 min-w-200px '>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Total No. of Payments :
                  </label>
                  {/* <input
                    type='number'
                    className='form-control form-control-solid'
                    placeholder='Ex-3'
                    name='totalFloors'
                    value={formData?.totalFloors}
                    onChange={handleChnage}
                  /> */}
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
                    placeholder='Ex-ABC'
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
                    placeholder='Ex-3'
                    name='totalFloors'
                    value={formData?.totalFloors}
                    onChange={handleChnage}
                  />
                </div>
              </div>

              {/*end::Content */}
            </div>
            {/* end::Stepper */}
          </div>
        )}
        {propertiType === 'Penthouse' && (
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
                  Unit No
                </label>
                <input
                  type='text'
                  className='form-control form-control-solid'
                  placeholder='Enter Unit No'
                  name='unitNo'
                  value={formData?.unitNo}
                  onChange={handleChnage}
                />
              </div>
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Bedrooms
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Bedrooms'
                  name='bedrooms'
                  value={formData?.bedrooms}
                  onChange={handleChnage}
                />
              </div>
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Size
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Size'
                  name='size'
                  value={formData?.size}
                  onChange={handleChnage}
                />
              </div>
              <div className='mb-10'>
                <label className='required form-label'>
                  <span className=''>Size Type</span>
                </label>

                <select
                  name='sizeType'
                  className='form-select form-select-solid'
                  value={formData?.sizeType}
                  onChange={handleChnage}
                >
                  <option disabled selected>
                    Select Size Type
                  </option>
                  <option value={0}>Meter</option>
                  <option value={1}>Sequre Meter</option>
                </select>
              </div>
              {/* <div className='mb-10'>
              <label className='required form-label'>
                <span className=''>Occupancy</span>
              </label>

              <select
                name='occupy'
                className='form-select form-select-solid'
                value={formData?.occupy}
                onChange={handleChnage}
              >
                <option disabled selected>
                  Select Occupancy
                </option>
                <option value={0}>Vacant </option>
                <option value={1}>Occupied</option>
              </select>
            </div> */}
              {/* <div className='mb-10'>
              <label className='required form-label'>
                <span className=''>Unit Type</span>
              </label>

              <select
                name='unitType'
                className='form-select form-select-solid'
                value={formData?.unitType}
                onChange={handleChnage}
              >
                <option disabled selected>
                  Select Unit Type
                </option>
                <option value='apartment'>Apartment </option>
                <option value='penthouse'>Penthouse</option>
                <option value='common area'> Common Area </option>
              </select>
            </div> */}
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Premise No
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Premise No'
                  name='premiseNo'
                  value={formData?.premiseNo}
                  onChange={handleChnage}
                />
              </div>
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Property Id
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Manager Id'
                  name='managerId'
                  value={formData?.managerId}
                  onChange={handleChnage}
                />
              </div>

              {/*end::Content */}
            </div>
            {/* end::Stepper */}
          </div>
        )}
        {isEdit && (
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
                  Unit No
                </label>
                <input
                  type='text'
                  className='form-control form-control-solid'
                  placeholder='Enter Unit No'
                  name='unitNo'
                  value={formData?.unitNo}
                  onChange={handleChnage}
                />
              </div>
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Bedrooms
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Bedrooms'
                  name='bedrooms'
                  value={formData?.bedrooms}
                  onChange={handleChnage}
                />
              </div>
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Size
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Size'
                  name='size'
                  value={formData?.size}
                  onChange={handleChnage}
                />
              </div>
              <div className='mb-10'>
                <label className='required form-label'>
                  <span className=''>Size Type</span>
                </label>

                <select
                  name='sizeType'
                  className='form-select form-select-solid'
                  value={formData?.sizeType}
                  onChange={handleChnage}
                >
                  <option disabled selected>
                    Select Size Type
                  </option>
                  <option value={0}>Meter</option>
                  <option value={1}>Sequre Meter</option>
                </select>
              </div>
              {/* <div className='mb-10'>
              <label className='required form-label'>
                <span className=''>Occupancy</span>
              </label>

              <select
                name='occupy'
                className='form-select form-select-solid'
                value={formData?.occupy}
                onChange={handleChnage}
              >
                <option disabled selected>
                  Select Occupancy
                </option>
                <option value={0}>Vacant </option>
                <option value={1}>Occupied</option>
              </select>
            </div> */}
              {/* <div className='mb-10'>
              <label className='required form-label'>
                <span className=''>Unit Type</span>
              </label>

              <select
                name='unitType'
                className='form-select form-select-solid'
                value={formData?.unitType}
                onChange={handleChnage}
              >
                <option disabled selected>
                  Select Unit Type
                </option>
                <option value='apartment'>Apartment </option>
                <option value='penthouse'>Penthouse</option>
                <option value='common area'> Common Area </option>
              </select>
            </div> */}
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Premise No
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Premise No'
                  name='premiseNo'
                  value={formData?.premiseNo}
                  onChange={handleChnage}
                />
              </div>
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Property Id
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Manager Id'
                  name='managerId'
                  value={formData?.managerId}
                  onChange={handleChnage}
                />
              </div>

              {/*end::Content */}
            </div>
            {/* end::Stepper */}
          </div>
        )}
        {propertiType === 'Villa' && (
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
                  Unit No
                </label>
                <input
                  type='text'
                  className='form-control form-control-solid'
                  placeholder='Enter Unit No'
                  name='unitNo'
                  value={formData?.unitNo}
                  onChange={handleChnage}
                />
              </div>
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Bedrooms
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Bedrooms'
                  name='bedrooms'
                  value={formData?.bedrooms}
                  onChange={handleChnage}
                />
              </div>
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Size
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Size'
                  name='size'
                  value={formData?.size}
                  onChange={handleChnage}
                />
              </div>
              <div className='mb-10'>
                <label className='required form-label'>
                  <span className=''>Size Type</span>
                </label>

                <select
                  name='sizeType'
                  className='form-select form-select-solid'
                  value={formData?.sizeType}
                  onChange={handleChnage}
                >
                  <option disabled selected>
                    Select Size Type
                  </option>
                  <option value={0}>Meter</option>
                  <option value={1}>Sequre Meter</option>
                </select>
              </div>
              {/* <div className='mb-10'>
              <label className='required form-label'>
                <span className=''>Occupancy</span>
              </label>

              <select
                name='occupy'
                className='form-select form-select-solid'
                value={formData?.occupy}
                onChange={handleChnage}
              >
                <option disabled selected>
                  Select Occupancy
                </option>
                <option value={0}>Vacant </option>
                <option value={1}>Occupied</option>
              </select>
            </div> */}
              {/* <div className='mb-10'>
              <label className='required form-label'>
                <span className=''>Unit Type</span>
              </label>

              <select
                name='unitType'
                className='form-select form-select-solid'
                value={formData?.unitType}
                onChange={handleChnage}
              >
                <option disabled selected>
                  Select Unit Type
                </option>
                <option value='apartment'>Apartment </option>
                <option value='penthouse'>Penthouse</option>
                <option value='common area'> Common Area </option>
              </select>
            </div> */}
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Premise No
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Premise No'
                  name='premiseNo'
                  value={formData?.premiseNo}
                  onChange={handleChnage}
                />
              </div>
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Property Id
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Manager Id'
                  name='managerId'
                  value={formData?.managerId}
                  onChange={handleChnage}
                />
              </div>

              {/*end::Content */}
            </div>
            {/* end::Stepper */}
          </div>
        )}
        {propertiType === 'CommonArea' && (
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
                  Common Area Name
                </label>
                <input
                  type='text'
                  className='form-control form-control-solid'
                  placeholder='Enter Unit No'
                  name='unitNo'
                  value={formData?.unitNo}
                  onChange={handleChnage}
                />
              </div>
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Property Id
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Bedrooms'
                  name='bedrooms'
                  value={formData?.bedrooms}
                  onChange={handleChnage}
                />
              </div>
              {/* <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Size
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Size'
                  name='size'
                  value={formData?.size}
                  onChange={handleChnage}
                />
              </div>
              <div className='mb-10'>
                <label className='required form-label'>
                  <span className=''>Size Type</span>
                </label>

                <select
                  name='sizeType'
                  className='form-select form-select-solid'
                  value={formData?.sizeType}
                  onChange={handleChnage}
                >
                  <option disabled selected>
                    Select Size Type
                  </option>
                  <option value={0}>Meter</option>
                  <option value={1}>Sequre Meter</option>
                </select>
              </div> */}
              {/* <div className='mb-10'>
              <label className='required form-label'>
                <span className=''>Occupancy</span>
              </label>

              <select
                name='occupy'
                className='form-select form-select-solid'
                value={formData?.occupy}
                onChange={handleChnage}
              >
                <option disabled selected>
                  Select Occupancy
                </option>
                <option value={0}>Vacant </option>
                <option value={1}>Occupied</option>
              </select>
            </div> */}
              {/* <div className='mb-10'>
              <label className='required form-label'>
                <span className=''>Unit Type</span>
              </label>

              <select
                name='unitType'
                className='form-select form-select-solid'
                value={formData?.unitType}
                onChange={handleChnage}
              >
                <option disabled selected>
                  Select Unit Type
                </option>
                <option value='apartment'>Apartment </option>
                <option value='penthouse'>Penthouse</option>
                <option value='common area'> Common Area </option>
              </select>
            </div> */}
              {/* <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Premise No
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Premise No'
                  name='premiseNo'
                  value={formData?.premiseNo}
                  onChange={handleChnage}
                />
              </div>
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Property Id
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Manager Id'
                  name='managerId'
                  value={formData?.managerId}
                  onChange={handleChnage}
                />
              </div> */}

              {/*end::Content */}
            </div>
            {/* end::Stepper */}
          </div>
        )}
        {propertiType === 'Other' && (
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
                  Unit No
                </label>
                <input
                  type='text'
                  className='form-control form-control-solid'
                  placeholder='Enter Unit No'
                  name='unitNo'
                  value={formData?.unitNo}
                  onChange={handleChnage}
                />
              </div>
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Bedrooms
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Bedrooms'
                  name='bedrooms'
                  value={formData?.bedrooms}
                  onChange={handleChnage}
                />
              </div>
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Unit Type
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Bedrooms'
                  name='bedrooms'
                  value={formData?.bedrooms}
                  onChange={handleChnage}
                />
              </div>
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Size
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Size'
                  name='size'
                  value={formData?.size}
                  onChange={handleChnage}
                />
              </div>
              <div className='mb-10'>
                <label className='required form-label'>
                  <span className=''>Size Type</span>
                </label>

                <select
                  name='sizeType'
                  className='form-select form-select-solid'
                  value={formData?.sizeType}
                  onChange={handleChnage}
                >
                  <option disabled selected>
                    Select Size Type
                  </option>
                  <option value={0}>Meter</option>
                  <option value={1}>Sequre Meter</option>
                </select>
              </div>
              {/* <div className='mb-10'>
              <label className='required form-label'>
                <span className=''>Occupancy</span>
              </label>

              <select
                name='occupy'
                className='form-select form-select-solid'
                value={formData?.occupy}
                onChange={handleChnage}
              >
                <option disabled selected>
                  Select Occupancy
                </option>
                <option value={0}>Vacant </option>
                <option value={1}>Occupied</option>
              </select>
            </div> */}
              {/* <div className='mb-10'>
              <label className='required form-label'>
                <span className=''>Unit Type</span>
              </label>

              <select
                name='unitType'
                className='form-select form-select-solid'
                value={formData?.unitType}
                onChange={handleChnage}
              >
                <option disabled selected>
                  Select Unit Type
                </option>
                <option value='apartment'>Apartment </option>
                <option value='penthouse'>Penthouse</option>
                <option value='common area'> Common Area </option>
              </select>
            </div> */}
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Premise No
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Premise No'
                  name='premiseNo'
                  value={formData?.premiseNo}
                  onChange={handleChnage}
                />
              </div>
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Property Id
                </label>
                <input
                  type='number'
                  className='form-control form-control-solid'
                  placeholder='Enter Manager Id'
                  name='managerId'
                  value={formData?.managerId}
                  onChange={handleChnage}
                />
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

export default AddUnits
