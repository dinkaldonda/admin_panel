import React, {useState} from 'react'
import {Modal} from 'react-bootstrap'
import {KTSVG} from '../../../_metronic/helpers'

const TenatsFilter = ({
  show,
  handleClose,
  showModal,
  // type,
  date,
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
  const [type, setType] = useState('')
  const [formData1, setFormData1] = useState<any>({
    // propertyId: window.location.pathname?.split('/')[2],
  })
  console.log('type', type)
  const handleChnage12 = (e: any) => {
    const {name, value} = e.target
    setFormData1({...formData1, [name]: value})
    setType(e.target.value)
  }
  return (
    <>
      <Modal
        id='kt_modal_create_app'
        tabIndex={-1}
        aria-hidden='true'
        dialogClassName='modal-dialog modal-dialog-centered mw-600px'
        show={show}
        onHide={() => {
          handleClose()
          setType('')
        }}
        backdrop={true}
        size='sm'
      >
        <div className='modal-header'>
          <h2>{!date ? 'Filter' : 'Select Date Range'}</h2>
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
            <KTSVG className='svg-icon-1' path='/media/icons/duotune/arrows/arr061.svg' />
          </div>
        </div>

        {showModal === 'Filter' && (
          <div className='modal-body py-lg-10 px-lg-10'>
            <div
              className='stepper stepper-pills stepper-column flex-column flex-xl-row flex-row-fluid'
              id='kt_modal_create_app_stepper'
            >
              <div
                className='card-header align-items-center gap-md-2'
                style={{justifyContent: 'flex-start'}}
              >
                <div className='mb-10 min-w-200px '>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    Development Type
                  </label>
                  <select
                    name='unitType'
                    className='form-select form-select-solid'
                    value={formData?.unitType}
                    onChange={handleChnage12}
                  >
                    <option disabled selected>
                      Select
                    </option>
                    <option value='Community'>Community </option>
                    <option value='Building'>Building</option>
                  </select>
                </div>
                {type === 'Community' && (
                  <>
                    <div className='mb-10 min-w-200px '>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Development
                      </label>
                      <select
                        name='unitType'
                        className='form-select form-select-solid'
                        value={formData?.unitType}
                        onChange={handleChnage}
                      >
                        <option disabled selected>
                          Select
                        </option>
                        <option value='apartment'>Community 01 </option>
                        <option value='penthouse'>Community 02</option>
                        <option value='common area'> Community 03 </option>
                      </select>
                    </div>
                    <div className='mb-10 min-w-200px '>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Cluster
                      </label>
                      <select
                        name='unitType'
                        className='form-select form-select-solid'
                        value={formData?.unitType}
                        onChange={handleChnage}
                      >
                        <option disabled selected>
                          Select
                        </option>
                        <option value='apartment'>Cluster 01 </option>
                        <option value='penthouse'>Cluster 02</option>
                        <option value='common area'> Cluster 03 </option>
                      </select>
                    </div>
                    <div className='mb-10 min-w-200px '>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Unit Group
                      </label>
                      <select
                        name='unitType'
                        className='form-select form-select-solid'
                        value={formData?.unitType}
                        onChange={handleChnage}
                      >
                        <option disabled selected>
                          Select
                        </option>
                        <option value='apartment'>Unit 01 </option>
                        <option value='penthouse'>Unit 02</option>
                        <option value='common area'> Unit 03 </option>
                      </select>
                    </div>
                    <div className='mb-10 min-w-200px '>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Building
                      </label>
                      <select
                        name='unitType'
                        className='form-select form-select-solid'
                        value={formData?.unitType}
                        onChange={handleChnage}
                      >
                        <option disabled selected>
                          Select
                        </option>
                        <option value='apartment'>Building 01 </option>
                        <option value='penthouse'>Building 02</option>
                        <option value='common area'> Building 03 </option>
                      </select>
                    </div>
                    <div className='mb-10 min-w-200px '>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Floor
                      </label>
                      <select
                        name='unitType'
                        className='form-select form-select-solid'
                        value={formData?.unitType}
                        onChange={handleChnage}
                      >
                        <option disabled selected>
                          Select
                        </option>
                        <option value='apartment'>Floor 01 </option>
                        <option value='penthouse'>Floor 02</option>
                        <option value='common area'> Floor 03 </option>
                      </select>
                    </div>
                  </>
                )}
                {type === 'Building' && (
                  <>
                    <div className='mb-10 min-w-200px '>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Development
                      </label>
                      <select
                        name='unitType'
                        className='form-select form-select-solid'
                        value={formData?.unitType}
                        onChange={handleChnage}
                      >
                        <option disabled selected>
                          Select
                        </option>
                        <option value='apartment'>Building 01 </option>
                        <option value='penthouse'>Building 02</option>
                        <option value='common area'> Building 03 </option>
                      </select>
                    </div>
                    <div className='mb-10 min-w-200px '>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Floor
                      </label>
                      <select
                        name='unitType'
                        className='form-select form-select-solid'
                        value={formData?.unitType}
                        onChange={handleChnage}
                      >
                        <option disabled selected>
                          Select
                        </option>
                        <option value='apartment'>Floor 01 </option>
                        <option value='penthouse'>Floor 02</option>
                        <option value='common area'> Floor 03 </option>
                      </select>
                    </div>
                  </>
                )}
              </div>

              {/*end::Content */}
            </div>
            {/* end::Stepper */}
          </div>
        )}
        {date && (
          <div className='modal-body py-lg-10 px-lg-10'>
            <div
              className='stepper stepper-pills stepper-column flex-column flex-xl-row flex-row-fluid'
              id='kt_modal_create_app_stepper'
            >
              <div
                className='card-header align-items-center gap-md-2'
                style={{justifyContent: 'flex-start'}}
              >
                <div className='mb-10 min-w-200px '>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    From
                  </label>
                  <input
                    type='date'
                    className='form-control form-control-solid'
                    placeholder='e.g. - abc'
                    name='name'
                    // value={formData?.name}
                    // onChange={handleChnage}
                  />
                </div>
                <div className='mb-10 min-w-200px '>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    To
                  </label>
                  <input
                    type='date'
                    className='form-control form-control-solid'
                    placeholder='e.g. - abc'
                    name='name'
                    // value={formData?.name}
                    // onChange={handleChnage}
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
                  onClick={() => {
                    handleClose()
                    setType('')
                  }}
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
                  Apply{' '}
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

export default TenatsFilter
