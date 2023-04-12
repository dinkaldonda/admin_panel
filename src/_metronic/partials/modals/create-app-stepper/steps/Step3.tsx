/* eslint-disable jsx-a11y/anchor-is-valid */
import {StepProps} from '../IAppModels'

const Step3 = ({data, updateData, hasError}: any) => {
  return (
    <>
      {/*begin::Step 3 */}
      <div className='pb-5' data-kt-stepper-element='content'>
        <div className='w-100'>
          {/*begin::Form Group */}

          <div className='fv-row mb-10'>
            <label className='required fs-5 fw-semibold mb-2'>Building Name</label>

            <input
              type='text'
              className='form-control form-control-lg form-control-solid'
              name='name'
              value={data?.name}
              onChange={(e) => updateData(e)}
            />
            {/* {!data.appDatabase.databaseName && hasError && (
              <div className='fv-plugins-message-container'>
                <div data-field='appname' data-validator='notEmpty' className='fv-help-block'>
                  Database name is required
                </div>
              </div>
            )} */}
          </div>
          {/*end::Form Group */}

          <div className='fv-row mb-10'>
            <label className='required fs-5 fw-semibold mb-2'>Manager Name</label>

            <input
              type='text'
              className='form-control form-control-lg form-control-solid'
              name='managerId'
              value={data.managerId}
              onChange={(e) => updateData(e)}
            />
            {/* {!data.appDatabase.databaseName && hasError && (
              <div className='fv-plugins-message-container'>
                <div data-field='appname' data-validator='notEmpty' className='fv-help-block'>
                  Database name is required
                </div>
              </div>
            )} */}
          </div>

          {/* <div className='fv-row mb-10'>
            <label className='required fs-5 fw-semibold mb-2'>Area</label>

            <input
              type='number'
              className='form-control form-control-lg form-control-solid'
              name='area'
              value={data.area}
              onChange={(e) =>
                updateData(e)
              }
            />
            {!data.appDatabase.databaseName && hasError && (
              <div className='fv-plugins-message-container'>
                <div data-field='appname' data-validator='notEmpty' className='fv-help-block'>
                  Database name is required
                </div>
              </div>
            )}
          </div> */}
        </div>
      </div>
      {/*end::Step 3 */}
    </>
  )
}

export {Step3}
