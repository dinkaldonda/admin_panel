/* eslint-disable jsx-a11y/anchor-is-valid */
import {toAbsoluteUrl} from '../../../../helpers'
import { StepProps } from '../IAppModels'

const Step5 = ({data, updateData}: any) => {
  return (
    <>
      {/*begin::Step 4 */}
      <div className='pb-5' data-kt-stepper-element='content'>
        <div className='w-100'>
          {/*begin::Form Group */}
          <div className='fv-row mb-10'>
            <label className='required fs-5 fw-semibold mb-2'>City</label>

            <select
              className='form-select form-select-solid'
              data-control='select2'
              data-hide-search='true'
              data-placeholder='Status'
              data-kt-ecommerce-order-filter='status'
              name="city"
              onChange={(e)=> updateData(e)}
              value={data?.city}
            >
              <option disabled ></option>
                    <option value='Abu Dhabi'>Abu Dhabi</option>
                    <option value='Al Ain'>Al Ain</option>
                    <option value='Ajman'>Ajman</option>
                    <option value='Dubai'>Dubai</option>
                    <option value='Sharjah'>Sharjah</option>
                    <option value='Fujairah'>Fujairah</option>
                    <option value='Ras Al Khaimah'>Ras Al Khaimah</option>
                    <option value='Umm Al Quwain'>Umm Al Quwain</option>
            </select>
            {/* {!data.appDatabase.databaseName && (
              <div className='fv-plugins-message-container'>
                <div data-field='appname' data-validator='notEmpty' className='fv-help-block'>
                  Database name is required
                </div>
              </div>
            )} */}
          </div>
          {/*end::Form Group */}

          <div className='fv-row mb-10'>
            <label className='required fs-5 fw-semibold mb-2'>Address</label>

            <input
              type='text'
              className='form-control form-control-lg form-control-solid'
              name='location'
              value={data.location}
              onChange={(e) =>
                updateData(e)
              }
            />
            {/* {!data.appDatabase.databaseName && (
              <div className='fv-plugins-message-container'>
                <div data-field='appname' data-validator='notEmpty' className='fv-help-block'>
                  Database name is required
                </div>
              </div>
            )} */}
          </div>

          {/*end::Form Group */}
        </div>
      </div>
      {/*end::Step 4 */}
    </>
  )
}

export {Step5}
