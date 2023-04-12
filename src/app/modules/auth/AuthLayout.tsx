/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet, Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById('root')
    if (root) {
      root.style.height = '100%'
    }
    return () => {
      if (root) {
        root.style.height = 'auto'
      }
    }
  }, [])

  return (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100'>
      {/* begin::Body */}
      <div className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1 fix-design'>
        {/* begin::Form */}
        <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
          {/* begin::Wrapper */}
          <div className='w-lg-500px p-10'>
            <Outlet />
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Form */}

        {/* begin::Footer */}
        <div className='d-flex flex-center flex-wrap px-5'>
          {/* begin::Links */}
          {/* <div className='d-flex fw-semibold text-primary fs-base'>
            <a href='#' className='px-5' target='_blank'>
              Terms
            </a>

            <a href='#' className='px-5' target='_blank'>
              Plans
            </a>

            <a href='#' className='px-5' target='_blank'>
              Contact Us
            </a>
          </div> */}
          {/* end::Links */}
        </div>
        {/* end::Footer */}
      </div>
      {/* end::Body */}

      {/* begin::Aside */}
      <div
        className='d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2'
        style={{backgroundImage: `url(${toAbsoluteUrl('/media/bg/bg.jpg')})`}}
      >
        {/* begin::Content */}
        <div className='d-flex flex-column flex-center py-15 px-5 px-md-15 w-100'>
          {/* begin::Logo */}
          <Link to='/' className='mb-12'>
            <img alt='Logo' src={toAbsoluteUrl('/media/bg/logo.png')} className='h-75px' />
          </Link>
          {/* end::Logo */}

          {/* begin::Image */}
          <img
            className='mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20'
            // src={toAbsoluteUrl('/media/misc/auth-screens.png')}
            // src='https://www.pngmart.com/files/7/Real-Estate-PNG-Photos.png'
            src='https://media.istockphoto.com/id/1405185244/photo/worker-assembling-a-chair-at-a-bench-in-a-furniture-workshop.jpg?b=1&s=170667a&w=0&k=20&c=1O-vYXnDpln7iI87afLk7KO5CWJoax1mcr-5BVaqvfs='
            alt=''
          />
          {/* end::Image */}

          {/* begin::Title */}
          <h1 className='text-white fs-2qx fw-bolder text-center mb-7'>Discover Items</h1>
          {/* end::Title */}

          {/* begin::Text */}
          {/* <div className='text-white fs-base text-center'>
            Let’s find a home that’s perfect for you, Discover a place you'll love to live.
          </div> */}
          {/* <div className='text-white fs-base text-center'>
            Before, Now and Always we are here for you.
          </div> */}
          {/* end::Text */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::Aside */}
    </div>
  )
}

export {AuthLayout}
