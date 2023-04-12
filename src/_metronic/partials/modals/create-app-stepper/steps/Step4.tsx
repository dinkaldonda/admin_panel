/* eslint-disable jsx-a11y/anchor-is-valid */
import {StepProps} from '../IAppModels'

const Step4 = ({data, updateData}: any) => {
  return (
    <>
      {/*begin::Step 4 */}
      <div className='pb-5' data-kt-stepper-element='content'>
        <div className='w-100'>
          {/*begin::Form Group */}
          <div className='fv-row mb-10'>
            <label className='required fs-5 fw-semibold mb-2'>Total Floors</label>

            <input
              type='number'
              className='form-control form-control-lg form-control-solid'
              name='totalFloors'
              value={data.totalFloors}
              onChange={(e) => updateData(e)}
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

          <div className='fv-row mb-10'>
            <label className='required fs-5 fw-semibold mb-2'>Total Units</label>

            <input
              type='number'
              className='form-control form-control-lg form-control-solid'
              name='totalProperties'
              value={data.totalProperties}
              onChange={(e) => updateData(e)}
            />
            {/* {!data.appDatabase.databaseName && (
              <div className='fv-plugins-message-container'>
                <div data-field='appname' data-validator='notEmpty' className='fv-help-block'>
                  Database name is required
                </div>
              </div>
            )} */}
          </div>

          {/* <div className='fv-row mb-10'>
            <label className='required fs-5 fw-semibold mb-2'>Total Zones</label>

            <input
              type='number'
              className='form-control form-control-lg form-control-solid'
              name='totalZones'
              value={data.totalZones}
              onChange={(e) => updateData(e)}
            />
            {!data.appDatabase.databaseName && (
              <div className='fv-plugins-message-container'>
                <div data-field='appname' data-validator='notEmpty' className='fv-help-block'>
                  Database name is required
                </div>
              </div>
            )}
          </div> */}
          <div className='fv-row mb-10'>
            <label className='required fs-5 fw-semibold mb-2'>Total Buildings</label>

            <input
              type='number'
              className='form-control form-control-lg form-control-solid'
              name='totalBuildings'
              value={data.totalBuildings}
              onChange={(e) => updateData(e)}
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

export {Step4}
