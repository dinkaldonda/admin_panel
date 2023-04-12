import {useFormik} from 'formik'
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import {ApiPost} from '../../../../apiCommon/helpers/API/ApiData'
import {ErrorToast, SuccessToast} from '../../../../apiCommon/helpers/Toast'
import {BsFillEyeSlashFill} from 'react-icons/bs'
import {BsFillEyeFill} from 'react-icons/bs'

const initialValues = {
  password: '',
  repeatPassword: '',
}

const forgotPasswordSchema = Yup.object().shape({
  otp: Yup.string()
    .min(6, 'Minimum 3 symbols')
    .max(6, 'Maximum 50 symbols')
    .required('OTP is required'),
})

const ChangePassword = () => {
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [showCon, setShowCon] = useState(false)
  const navigate = useNavigate()
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const handleChange = (e: any) => {
    console.log('e.target.value', e.target.value)
    setPassword(e.target.value)
  }
  const handleChangeCon = (e: any) => {
    console.log('e.target.value', e.target.value)
    setConfirmPassword(e.target.value)
  }

  const formik = useFormik({
    initialValues,
    // validationSchema: forgotPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      let body = {
        id: localStorage.getItem('id'),
        password: password,
        otp: localStorage.getItem('otp'),
      }
      console.log('values', body)
      setLoading(true)
      if (password === confirmPassword) {
        try {
          ApiPost('cooperate/reset_password', body)
            .then((res) => {
              SuccessToast(res?.data?.message)
              setLoading(false)
              navigate('/auth/login')
            })
            .catch((e) => {
              console.log('e', e)
              ErrorToast(e.message)
              setLoading(false)
            })
        } catch (error) {
          setLoading(false)
        }
      } else {
        ErrorToast('Password and ConfirmPassword are not match')
      }

      // navigate('/auth/changePassword')
    },
  })
  return (
    <form className='form w-100' id='kt_new_password_form' onSubmit={formik.handleSubmit}>
      <div className='text-center mb-10'>
        <h1 className='text-dark fw-bolder mb-3'>Setup New Password</h1>
        <div className='text-gray-500 fw-semibold fs-6'>
          Have you already reset the password ?
          <a onClick={() => navigate('/auth')} className='link-primary fw-bold'>
            Sign in
          </a>
        </div>
      </div>
      <div className='fv-row mb-8' data-kt-password-meter='true'>
        <div className='mb-1'>
          <div className='position-relative mb-3'>
            <input
              className='form-control bg-transparent'
              pattern='^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$'
              type={show ? 'text ' : 'password'}
              placeholder='Password'
              name='password'
              onChange={handleChange}
              autoComplete='off'
            />
            <span
              className='btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2'
              data-kt-password-meter-control='visibility'
            >
              {show === false && (
                // <i className='bi bi-eye-slash fs-2' onClick={() => setShow(true)}></i>
                <BsFillEyeSlashFill onClick={() => setShow(true)} />
              )}
              {show === true && (
                <BsFillEyeFill onClick={() => setShow(false)} />
                // <i className='bi bi-eye fs-2 d-none' onClick={() => setShow(false)}></i>
              )}
              {/* <i className='bi bi-eye-slash fs-2'></i>
              <i className='bi bi-eye fs-2 d-none'></i> */}
            </span>
          </div>
          <div
            className='d-flex align-items-center mb-3'
            data-kt-password-meter-control='highlight'
          >
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
          </div>
        </div>
        <div className='text-muted'>
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </div>
      </div>
      <div className='fv-row mb-8'>
        {/* <input
          type='password'
          placeholder='Repeat Password'
          name='confirm-password'
          autoComplete='off'
          className='form-control bg-transparent'
          onChange={handleChangeCon}
        /> */}
        <div className='mb-1'>
          <div className='position-relative mb-3'>
            <input
              type={showCon ? 'text ' : 'password'}
              placeholder='Repeat Password'
              name='confirm-password'
              autoComplete='off'
              className='form-control bg-transparent'
              onChange={handleChangeCon}
            />
            <span
              className='btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2'
              data-kt-password-meter-control='visibility'
            >
              {showCon === false && (
                // <i className='bi bi-eye-slash fs-2' onClick={() => setShow(true)}></i>
                <BsFillEyeSlashFill onClick={() => setShowCon(true)} />
              )}
              {showCon === true && (
                <BsFillEyeFill onClick={() => setShowCon(false)} />
                // <i className='bi bi-eye fs-2 d-none' onClick={() => setShow(false)}></i>
              )}
              {/* <i className='bi bi-eye-slash fs-2'></i>
              <i className='bi bi-eye fs-2 d-none'></i> */}
            </span>
          </div>
        </div>
      </div>
      <div className='fv-row mb-8'>
        <label className='form-check form-check-inline'>
          <input className='form-check-input' type='checkbox' name='toc' value='1' />
          <span className='form-check-label fw-semibold text-gray-700 fs-6 ms-1'>
            I Agree &
            <a href='#' className='ms-1 link-primary'>
              Terms and conditions
            </a>
            .
          </span>
        </label>
      </div>
      <div className='d-grid mb-10'>
        <button type='submit' id='kt_new_password_submit' className='btn btn-primary'>
          <span className='indicator-label'>Submit</span>
          <span className='indicator-progress'>
            Please wait...
            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
          </span>
        </button>
      </div>
    </form>
  )
}

export default ChangePassword
