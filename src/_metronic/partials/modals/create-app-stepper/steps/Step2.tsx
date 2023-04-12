/* eslint-disable jsx-a11y/anchor-is-valid */
import {StepProps} from '../IAppModels'

const Step2 = ({data, updateData}: any) => {
  return (
    <div className='pb-5' data-kt-stepper-element='content'>
      <div className='w-100'>
        {/*begin::Form Group */}
        <div className='fv-row'>
          {/* begin::Label */}
          <label className='d-flex align-items-center fs-5 fw-semibold mb-4'>
            <span className='required'>Select Portfolio</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Specify your apps framework'
            ></i>
          </label>
          {/* end::Label */}
          {/*begin:Option */}
          <label className='d-flex align-items-center justify-content-between cursor-pointer mb-6'>
            <span className='d-flex align-items-center me-2'>
              <span className='symbol symbol-50px me-6'>
                <span className='symbol-label bg-light-warning'>
                  <i className='fab fa-html5 text-warning fs-2x'></i>
                </span>
              </span>

              <span className='d-flex flex-column'>
                <span className='fw-bolder fs-6'>Buildings</span>
                {/* <span className='fs-7 text-muted'>Base Web Projec</span> */}
              </span>
            </span>

            <span className='form-check form-check-custom form-check-solid'>
              <input
                className='form-check-input'
                type='radio'
                name='portfolio'
                value='buildings'
                checked={data.portfolio === 'buildings'}
                onChange={(e) => updateData(e)}
              />
            </span>
          </label>
          {/*end::Option */}

          {/*begin:Option */}
          <label className='d-flex align-items-center justify-content-between cursor-pointer mb-6'>
            <span className='d-flex align-items-center me-2'>
              <span className='symbol symbol-50px me-6'>
                <span className='symbol-label bg-light-success'>
                  <i className='fab fa-react text-success fs-2x'></i>
                </span>
              </span>

              <span className='d-flex flex-column'>
                <span className='fw-bolder fs-6'>Communities</span>
                {/* <span className='fs-7 text-muted'>Robust and flexible app framework</span> */}
              </span>
            </span>

            <span className='form-check form-check-custom form-check-solid'>
              <input
                className='form-check-input'
                type='radio'
                name='portfolio'
                value='communities'
                checked={data.portfolio === 'communities'}
                onChange={(e) => updateData(e)}
              />
            </span>
          </label>
          {/*end::Option */}
        </div>
        {/*end::Form Group */}
      </div>
    </div>
  )
}

export {Step2}
