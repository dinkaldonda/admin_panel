import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useFormik} from 'formik'
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import OtpInput from 'react-otp-input'
import {ApiPost} from '../../../../apiCommon/helpers/API/ApiData'
import {ErrorToast, SuccessToast} from '../../../../apiCommon/helpers/Toast'

const initialValues = {
  otp: '986958',
}

const forgotPasswordSchema = Yup.object().shape({
  otp: Yup.string()
    .min(6, 'Minimum 3 symbols')
    .max(6, 'Maximum 50 symbols')
    .required('OTP is required'),
})

const Verification = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [otp, setOtp] = useState('')
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const handleChange = (e: any) => {
    setOtp(e)
  }
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      const body = {
        email: localStorage.getItem('email'),
        otp: Number(otp),
      }
      // navigate('/auth/changePassword')
      try {
        ApiPost('cooperate/otp_verification', body)
          .then((res) => {
            console.log('res', res?.data?.data?._id)
            localStorage.setItem('id', res?.data?.data?._id)
            localStorage.setItem('otp', otp)
            SuccessToast(res?.data?.message)
            setLoading(false)
            navigate('/auth/changePassword')
          })
          .catch((e) => {
            console.log('e', e)
            ErrorToast(e.message)
            setLoading(false)
          })
      } catch (error) {
        setLoading(false)
      }
    },
  })
  const handleResend = () => {
    let body = {
      email: localStorage.getItem('email'),
    }
    ApiPost('cooperate/forgot_password', body)
      .then((res) => {
        console.log('res', res)
        SuccessToast(res?.data?.message)
        setLoading(false)
      })
      .catch((e) => {
        console.log('e', e)
        ErrorToast(e.message)
        setLoading(false)
      })
  }
  return (
    <form
      className='form w-100 mb-13'
      id='kt_sing_in_two_steps_form'
      onSubmit={formik.handleSubmit}
    >
      <div className='text-center mb-10'>
        <img alt='Logo' className='mh-125px' src={toAbsoluteUrl('/media/misc/smartphone-2.svg')} />
      </div>
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>Two Step Verification</h1>
        <div className='text-muted fw-semibold fs-5 mb-5'>
          Enter the verification code we sent to
        </div>
        <div className='fw-bold text-dark fs-3'>{localStorage.getItem('email')}</div>
      </div>
      <div className='mb-10'>
        <div
          className='fw-bold text-start text-dark fs-6 mb-1 ms-1 d-flex'
          style={{justifyContent: 'center'}}
        >
          <OtpInput
            value={otp}
            onChange={handleChange}
            numInputs={6}
            separator={<span>&nbsp;&nbsp;</span>}
            isInputNum
            className='otp-input'
          />
        </div>
        <div className='d-flex flex-wrap flex-stack'></div>
      </div>
      <div className='d-flex flex-center mb-5 '>
        <span className='cursor-pointer' onClick={handleResend}>
          Resend ?
        </span>
      </div>
      <div className='d-flex flex-center'>
        <button
          type='submit'
          id='kt_sing_in_two_steps_submit'
          className='btn btn-lg btn-primary fw-bold'
        >
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

export default Verification
