/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useRef, useEffect} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {defaultCreateAppData, ICreateAppData} from './IAppModels'
import {StepperComponent} from '../../../assets/ts/components'
import {KTSVG} from '../../../helpers'
import {Step1} from './steps/Step1'
import {Step2} from './steps/Step2'
import {Step3} from './steps/Step3'
import {Step4} from './steps/Step4'
import {Step5} from './steps/Step5'
import {ApiGet, ApiPost, ApiPut} from '../../../../apiCommon/helpers/API/ApiData'
import {ErrorToast, SuccessToast} from '../../../../apiCommon/helpers/Toast'

type Props = {
  show: boolean
  isEdit?: boolean
  handleClose: () => void
  building?: () => void
  updateDataId?: string
}

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateAppModal = ({show, handleClose, building, updateDataId, isEdit}: any) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [data, setData] = useState<ICreateAppData>(defaultCreateAppData)
  const [hasError, setHasError] = useState(false)
  const [buildingData, setBuildingData] = useState<any>({})
  // const [tableData, setTableData] = useState([])

  const handleChnage = (e: any) => {
    const {name, value} = e.target
    setBuildingData({...buildingData, [name]: value})
  }

  console.log('buildingData', buildingData)
  const getMyLocation = () => {
    const location = window.navigator && window.navigator.geolocation

    if (location) {
      location.getCurrentPosition(
        (position: any) => {
          setBuildingData({
            ...buildingData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {}
      )
    }
  }

  const handleSubmit = () => {
    if (isEdit) {
      delete buildingData._id
      delete buildingData.updatedBy
      const body = {...buildingData, managerId: '6329ee43396e812bcc0964e5', id: updateDataId}
      ApiPut('cooperate/properties', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building()
          console.log('addProperty', res)
          handleClose()
        })
        .catch((err) => ErrorToast(err.message))
    } else {
      const body = {...buildingData, managerId: '6329ee43396e812bcc0964e5'}
      ApiPost('cooperate/properties', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building()
          console.log('addProperty', res)
          handleClose()
        })
        .catch((err) => ErrorToast(err.message))
    }
  }

  useEffect(() => {
    getMyLocation()

    console.log('useEffect')
    console.log('isEfit', isEdit)

    if (isEdit) {
      ApiGet(`cooperate/properties/${updateDataId}`)
        .then((response) => {
          console.log('response', response)
          setBuildingData(response?.data?.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    // return () => {
    //   setBuildingData({})
    // }
  }, [])

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    stepper.current.goPrev()
  }

  const nextStep = () => {
    setHasError(false)
    if (!stepper.current) {
      return
    }

    stepper.current.goNext()
  }

  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={show}
      onHide={handleClose}
      onEntered={loadStepper}
      backdrop={true}
    >
      <div className='modal-header'>
        <h2>{isEdit ? 'Update' : 'Add'} Building</h2>
        {/* begin::Close */}
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <KTSVG className='svg-icon-1' path='/media/icons/duotune/arrows/arr061.svg' />
        </div>
        {/* end::Close */}
      </div>

      <div className='modal-body py-lg-10 px-lg-10'>
        {/*begin::Stepper */}
        <div
          ref={stepperRef}
          className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
          id='kt_modal_create_app_stepper'
        >
          {/* begin::Aside*/}
          <div className='d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px'>
            {/* begin::Nav*/}
            <div className='stepper-nav ps-lg-10'>
              {/* begin::Step 1*/}
              <div className='stepper-item current' data-kt-stepper-element='nav'>
                {/* begin::Wrapper*/}
                <div className='stepper-wrapper'>
                  {/* begin::Icon*/}
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>1</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Details</h3>

                    {/* <div className='stepper-desc'>Name your App</div> */}
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className='stepper-line h-40px'></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 1*/}

              {/* begin::Step 2*/}
              <div className='stepper-item' data-kt-stepper-element='nav'>
                {/* begin::Wrapper*/}
                <div className='stepper-wrapper'>
                  {/* begin::Icon*/}
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>2</span>
                  </div>
                  {/* begin::Icon*/}

                  {/* begin::Label*/}
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Portfolio</h3>

                    {/* <div className='stepper-desc'>Define your app framework</div> */}
                  </div>
                  {/* begin::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className='stepper-line h-40px'></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 2*/}

              {/* begin::Step 3*/}
              <div className='stepper-item' data-kt-stepper-element='nav'>
                {/* begin::Wrapper*/}
                <div className='stepper-wrapper'>
                  {/* begin::Icon*/}
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>3</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className='stepper-label'>
                    <h3 className='stepper-title'> Name</h3>

                    {/* <div className='stepper-desc'>Select the app database type</div> */}
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className='stepper-line h-40px'></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 3*/}

              {/* begin::Step 4*/}
              <div className='stepper-item' data-kt-stepper-element='nav'>
                {/* begin::Wrapper*/}
                <div className='stepper-wrapper'>
                  {/* begin::Icon*/}
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>4</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Building Details</h3>

                    {/* <div className='stepper-desc'>Provide storage details</div> */}
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className='stepper-line h-40px'></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 4*/}

              {/* begin::Step 5*/}
              <div className='stepper-item' data-kt-stepper-element='nav'>
                {/* begin::Wrapper*/}
                <div className='stepper-wrapper'>
                  {/* begin::Icon*/}
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>5</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Location</h3>

                    {/* <div className='stepper-desc'>Review and Submit</div> */}
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}
              </div>
              {/* end::Step 5*/}
            </div>
            {/* end::Nav*/}
          </div>
          {/* begin::Aside*/}

          {/*begin::Content */}
          <div className='flex-row-fluid py-lg-5 px-lg-15'>
            {/*begin::Form */}
            <form noValidate id='kt_modal_create_app_form'>
              <Step1 data={buildingData} updateData={handleChnage} hasError={hasError} />
              <Step2 data={buildingData} updateData={handleChnage} hasError={hasError} />
              <Step3 data={buildingData} updateData={handleChnage} hasError={hasError} />
              <Step4 data={buildingData} updateData={handleChnage} hasError={hasError} />
              <Step5
                data={buildingData}
                updateData={handleChnage}
                hasError={hasError}
                handleSubmit={handleSubmit}
              />

              {/*begin::Actions */}
              <div className='d-flex flex-stack pt-10'>
                <div className='me-2'>
                  <button
                    type='button'
                    className='btn btn-lg btn-light-primary me-3'
                    data-kt-stepper-action='previous'
                    onClick={prevStep}
                  >
                    <KTSVG
                      path='/media/icons/duotune/arrows/arr063.svg'
                      className='svg-icon-3 me-1 text-green'
                    />{' '}
                    Previous
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

                  <button
                    type='button'
                    className='btn btn-lg btn-primary btn-green'
                    data-kt-stepper-action='next'
                    onClick={nextStep}
                  >
                    Next Step{' '}
                    <KTSVG
                      path='/media/icons/duotune/arrows/arr064.svg'
                      className='svg-icon-3 ms-1 me-0'
                    />
                  </button>
                </div>
              </div>
              {/*end::Actions */}
            </form>
            {/*end::Form */}
          </div>
          {/*end::Content */}
        </div>
        {/* end::Stepper */}
      </div>
    </Modal>,
    modalsRoot
  )
}

export {CreateAppModal}
