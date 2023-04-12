/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {getUserByToken, register} from '../core/_requests'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {PasswordMeterComponent} from '../../../../_metronic/assets/ts/components'
import {useAuth} from '../core/Auth'
import {ApiGet, ApiGetNoAuth, ApiPost} from '../../../../apiCommon/helpers/API/ApiData'
import {ErrorToast, SuccessToast} from '../../../../apiCommon/helpers/Toast'

const initialValues = {
  fullName: '',
  country: '',
  state: '',
  city: '',
  address: '',
  email: '',
  password: '',
  tradeLicense: '',
  TRN: '',
  accountOwnerName: '',
  accountOwnerEmail: '',
  accountOwnerMobile: '',
}

const registrationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Full name is required'),
  city: Yup.string().required('City is required'),
  // country: Yup.string().required('Country is required'),
  // state: Yup.string().required('State is required'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  address: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Address is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  tradeLicense: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Trade Licence is required'),
  TRN: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('TRN is required'),
  accountOwnerName: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Account Owner Name is required'),
  accountOwnerEmail: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Account Owner Email is required'),
  accountOwnerMobile: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Account Owner Mobile is required'),
})

export function Registration() {
  const [loading, setLoading] = useState(false)
  const [city, setCity] = useState([])
  const [country, setCountry] = useState([])
  const [state, setState] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      console.log('values', values)

      setLoading(true)
      try {
        ApiPost('cooperate', {...values, country: selectedCountry, state: selectedState})
          .then((res) => {
            console.log('res', res)
            SuccessToast(res?.data?.message)
            setLoading(false)
            window.location.pathname = '/auth'
          })
          .catch((e) => {
            console.log('e', e)
            ErrorToast(e.message)
            setLoading(false)
          })
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    },
  })

  const getCity = async (id: any) => {
    await ApiGetNoAuth(`country/?stateId=${id}`)
      .then((res) => {
        console.log('res', res)
        setCity(res?.data?.data)
      })
      .catch((e) => {
        console.log('e', e)
      })
  }
  const getState = async (id: any) => {
    await ApiGetNoAuth(`country?countryId=${id}`)
      .then((res) => {
        console.log('res', res)
        setState(res?.data?.data)
      })
      .catch((e) => {
        console.log('e', e)
      })
  }

  const getCountry = async () => {
    await ApiGetNoAuth('country')
      .then((res) => {
        console.log('res', res)
        setCountry(res?.data?.data)
      })
      .catch((e) => {
        console.log('e', e)
      })
  }
  useEffect(() => {
    getCountry()
    PasswordMeterComponent.bootstrap()
  }, [])

  useEffect(() => {
    console.log('selectedCountry', selectedCountry)

    let cId: any = country?.find((v: any) => v.country === selectedCountry)

    getState(cId?._id)
  }, [selectedCountry])
  useEffect(() => {
    let cId: any = state?.find((v: any) => v.state === selectedState)

    getCity(cId?._id)
  }, [selectedState])

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        {/* begin::Title */}
        <h1 className='text-dark fw-bolder mb-3'>Sign Up</h1>
      </div>

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group Firstname */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>Full name</label>
        <input
          placeholder='Full name'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('fullName')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.fullName && formik.errors.fullName,
            },
            {
              'is-valid': formik.touched.fullName && !formik.errors.fullName,
            }
          )}
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.fullName}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'> Email</label>
        <input
          type='email'
          placeholder='Email '
          autoComplete='off'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.email && formik.errors.email,
            },
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>

      {/* begin::Form group Confirm password */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'> Password</label>
        <input
          type='password'
          placeholder='Password '
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      <div className='fv-row mb-8'>
        {/* begin::Form group country */}
        <label className='form-label fw-bolder text-dark fs-6'>Country</label>
        <select
          {...formik.getFieldProps('country')}
          onChange={(e) => setSelectedCountry(e.target.value)}
          value={selectedCountry}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.country && formik.errors.country,
            },
            {
              'is-valid': formik.touched.country && !formik.errors.country,
            }
          )}
        >
          <option value='' disabled selected>
            Select country
          </option>
          {country?.map((v: any) => (
            <option value={v.country}>{v.country}</option>
          ))}
        </select>

        {formik.touched.country && formik.errors.country && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.country}</span>
            </div>
          </div>
        )}
        {/* end::Form group */}
      </div>

      <div className='fv-row mb-8'>
        {/* begin::Form group country */}
        <label className='form-label fw-bolder text-dark fs-6'>State</label>
        <select
          {...formik.getFieldProps('state')}
          onChange={(e) => setSelectedState(e.target.value)}
          value={selectedState}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.state && formik.errors.state,
            },
            {
              'is-valid': formik.touched.state && !formik.errors.state,
            }
          )}
        >
          <option value='' disabled selected>
            Select state
          </option>
          {state?.map((v: any) => (
            <option value={v.state}>{v.state}</option>
          ))}
        </select>

        {formik.touched.state && formik.errors.state && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.state}</span>
            </div>
          </div>
        )}
        {/* end::Form group */}
      </div>

      {/* begin::Form group city */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>City</label>
        <select
          {...formik.getFieldProps('city')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.city && formik.errors.city},
            {
              'is-valid': formik.touched.city && !formik.errors.city,
            }
          )}
        >
          <option value='' disabled selected>
            Select city
          </option>
          {city?.map((v: any) => (
            <option value={v.city}>{v.city}</option>
          ))}
        </select>

        {formik.touched.city && formik.errors.city && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.city}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Password */}
      <div className='fv-row mb-8' data-kt-password-meter='true'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-dark fs-6'>Address</label>
          <div className='position-relative mb-3'>
            <input
              type='text'
              placeholder='Address'
              autoComplete='off'
              {...formik.getFieldProps('address')}
              className={clsx(
                'form-control bg-transparent',
                {
                  'is-invalid': formik.touched.address && formik.errors.address,
                },
                {
                  'is-valid': formik.touched.address && !formik.errors.address,
                }
              )}
            />
            {formik.touched.address && formik.errors.address && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.address}</span>
                </div>
              </div>
            )}
          </div>
          {/* begin::Meter */}
          {/* <div
            className='d-flex align-items-center mb-3'
            data-kt-password-meter-control='highlight'
          >
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
          </div> */}
          {/* end::Meter */}
        </div>
        {/* <div className='text-muted'>
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </div> */}
      </div>
      {/* end::Form group */}

      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>Trade License</label>
        <input
          placeholder='Trade License'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('tradeLicense')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.tradeLicense && formik.errors.tradeLicense,
            },
            {
              'is-valid': formik.touched.tradeLicense && !formik.errors.tradeLicense,
            }
          )}
        />
        {formik.touched.tradeLicense && formik.errors.tradeLicense && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.tradeLicense}</span>
            </div>
          </div>
        )}
      </div>

      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>TRN</label>
        <input
          placeholder='TRN'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('TRN')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.TRN && formik.errors.TRN,
            },
            {
              'is-valid': formik.touched.TRN && !formik.errors.TRN,
            }
          )}
        />
        {formik.touched.TRN && formik.errors.TRN && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.TRN}</span>
            </div>
          </div>
        )}
      </div>

      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>Account Owner Name</label>
        <input
          placeholder='Account Owner Name'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('accountOwnerName')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.accountOwnerName && formik.errors.accountOwnerName,
            },
            {
              'is-valid': formik.touched.accountOwnerName && !formik.errors.accountOwnerName,
            }
          )}
        />
        {formik.touched.accountOwnerName && formik.errors.accountOwnerName && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.accountOwnerName}</span>
            </div>
          </div>
        )}
      </div>

      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>Account Owner Email</label>
        <input
          placeholder='Account Owner Email'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('accountOwnerEmail')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.accountOwnerEmail && formik.errors.accountOwnerEmail,
            },
            {
              'is-valid': formik.touched.accountOwnerEmail && !formik.errors.accountOwnerEmail,
            }
          )}
        />
        {formik.touched.accountOwnerEmail && formik.errors.accountOwnerEmail && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.accountOwnerEmail}</span>
            </div>
          </div>
        )}
      </div>

      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>Account Owner Mobile</label>
        <input
          placeholder='Account Owner Mobile'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('accountOwnerMobile')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.accountOwnerMobile && formik.errors.accountOwnerMobile,
            },
            {
              'is-valid': formik.touched.accountOwnerMobile && !formik.errors.accountOwnerMobile,
            }
          )}
        />
        {formik.touched.accountOwnerMobile && formik.errors.accountOwnerMobile && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.accountOwnerMobile}</span>
            </div>
          </div>
        )}
      </div>

      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            Cancel
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  )
}
