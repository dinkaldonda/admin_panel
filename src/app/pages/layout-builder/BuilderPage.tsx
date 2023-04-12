/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
// import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {Dropdown, Form, Modal} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import {useNavigate} from 'react-router-dom'
import {ApiDelete, ApiGet} from '../../../apiCommon/helpers/API/ApiData'
import {ErrorToast, SuccessToast} from '../../../apiCommon/helpers/Toast'
import {KTSVG} from '../../../_metronic/helpers'
import AddProperty from '../Property/AddProperty'
// import AddProperty from '../../../../app/pages/Property/AddProperty'

type Props = {
  className: string
}

const BuilderPage: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [data, setData] = useState([])
  const [updateDataId, setUpdateDataId] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    building()
  }, [])

  const building = async () => {
    await ApiGet('cooperate/properties')
      .then((res) => {
        setData(res?.data?.data)
        console.log('res', res)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const deleteProperty = (id: any) => {
    console.log('deleteProperty', id)
    ApiDelete(`cooperate/properties/${id}`)
      .then((res) => {
        SuccessToast(res?.data?.message)
        building()
      })
      .catch((err) => ErrorToast(err.message))
  }

  const columns = [
    {
      dataField: 'name',
      text: ' Building Name   ',
      sort: true,
    },
    {
      dataField: 'totalFloors',
      text: 'Total Floors  ',
      sort: true,
    },
    {
      dataField: 'totalUnits',
      text: 'Total Properties ',
      sort: true,
    },
    {
      dataField: 'managerId',
      text: 'Building Manager',
      sort: true,
    },
    {
      dataField: 'area',
      text: 'Area',
      sort: true,
    },

    {
      dataField: 'action',
      text: 'Actions',
      headerStyle: {
        display: 'flex',
        justifyContent: 'center',
        // flexDirection: "column-reverse",
      },
      formatter: (cell: any, row: any) => {
        return (
          <div className='d-flex justify-content-center flex-shrink-0'>
            <a
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
              onClick={() => navigate('/area')}
            >
              <span className='svg-icon svg-icon-5 svg-icon-gray-700'>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M14.4 11H3C2.4 11 2 11.4 2 12C2 12.6 2.4 13 3 13H14.4V11Z'
                    fill='currentColor'
                  />
                  <path
                    opacity='0.3'
                    d='M14.4 20V4L21.7 11.3C22.1 11.7 22.1 12.3 21.7 12.7L14.4 20Z'
                    fill='currentColor'
                  />
                </svg>
              </span>
            </a>
            <a
              className='btn btn-icon btn-bg-light btn-active-color-success btn-sm mx-1'
              onClick={() => {
                setUpdateDataId(row?._id)
                setIsEdit(true)
                setOpen(true)
              }}
            >
              <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
            </a>
            <a
              className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm'
              onClick={() => deleteProperty(row?._id)}
            >
              <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
            </a>
          </div>
        )
      },

      classes: 'text-center pr-0',
      headerClasses: 'text-center pr-3',
      style: {
        minWidth: '100px',
      },
    },
  ]
  return (
    <>
      <div className='row gy-5 gx-xl-8'>
        <div className='col-xl-12'>
          <div className={`card `}>
            <div className='card-header border-0 pt-5'>
              <h3 className='card-title align-items-center flex-row'>
                <span className='card-label fw-bold fs-3 '> Property Registration </span>
              </h3>
              <div
                className='card-toolbar'
                data-bs-toggle='tooltip'
                data-bs-placement='top'
                data-bs-trigger='hover'
                title='Click to add a user'
                onClick={() => {
                  setIsEdit(false)
                  setOpen(true)
                }}
              >
                <a className='btn btn-sm bg-green text-white'>
                  <KTSVG
                    path='media/icons/duotune/arrows/arr075.svg'
                    className='svg-icon-3 text-white'
                  />
                  Add Building
                </a>
              </div>
            </div>
            <div className='card-body row py-3'>
              {/* <div className='row mb-4'>
                <div className='col-md-3 my-2'>
                  <Dropdown onSelect={() => {}}>
                    <Dropdown.Toggle id='dropdown-basic' className='text-capitalize'>
                      Building Name
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey='approve'>Apporve</Dropdown.Item>
                      <Dropdown.Item eventKey='request'>Request</Dropdown.Item>
                      <Dropdown.Item eventKey='reject'>Reject</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className='col-md-3 my-2'>
                  <Dropdown onSelect={() => {}}>
                    <Dropdown.Toggle id='dropdown-basic' className='text-capitalize'>
                      Area | Zone / Floor
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey='approve'>Apporve</Dropdown.Item>
                      <Dropdown.Item eventKey='request'>Request</Dropdown.Item>
                      <Dropdown.Item eventKey='reject'>Reject</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className='col-md-3 my-2'>
                  <Dropdown onSelect={() => {}}>
                    <Dropdown.Toggle id='dropdown-basic' className='text-capitalize'>
                      Unit No.
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey='approve'>Apporve</Dropdown.Item>
                      <Dropdown.Item eventKey='request'>Request</Dropdown.Item>
                      <Dropdown.Item eventKey='reject'>Reject</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className='col-md-3 my-2'>
                  <Dropdown onSelect={() => {}}>
                    <Dropdown.Toggle id='dropdown-basic' className='text-capitalize'>
                      Property Type
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey='approve'>Apporve</Dropdown.Item>
                      <Dropdown.Item eventKey='request'>Request</Dropdown.Item>
                      <Dropdown.Item eventKey='reject'>Reject</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className='col-md-3 my-2'>
                  <Dropdown onSelect={() => {}}>
                    <Dropdown.Toggle id='dropdown-basic' className='text-capitalize'>
                      Bedrooms
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey='approve'>Apporve</Dropdown.Item>
                      <Dropdown.Item eventKey='request'>Request</Dropdown.Item>
                      <Dropdown.Item eventKey='reject'>Reject</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className='col-md-3 my-2'>
                  <Dropdown onSelect={() => {}}>
                    <Dropdown.Toggle id='dropdown-basic' className='text-capitalize'>
                      Occupancy Status
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey='approve'>Apporve</Dropdown.Item>
                      <Dropdown.Item eventKey='request'>Request</Dropdown.Item>
                      <Dropdown.Item eventKey='reject'>Reject</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className='col-md-3 my-2'>
                  <Dropdown onSelect={() => {}}>
                    <Dropdown.Toggle id='dropdown-basic' className='text-capitalize'>
                      Rent Status
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey='approve'>Apporve</Dropdown.Item>
                      <Dropdown.Item eventKey='request'>Request</Dropdown.Item>
                      <Dropdown.Item eventKey='reject'>Reject</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className='col-md-3 my-2'>
                  <Dropdown onSelect={() => {}}>
                    <Dropdown.Toggle id='dropdown-basic' className='text-capitalize'>
                      Bldg. /Comm Manager
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey='approve'>Apporve</Dropdown.Item>
                      <Dropdown.Item eventKey='request'>Request</Dropdown.Item>
                      <Dropdown.Item eventKey='reject'>Reject</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className='col-md-3 my-2'>
                  <Dropdown onSelect={() => {}}>
                    <Dropdown.Toggle id='dropdown-basic' className='text-capitalize'>
                      Property Manager
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey='approve'>Apporve</Dropdown.Item>
                      <Dropdown.Item eventKey='request'>Request</Dropdown.Item>
                      <Dropdown.Item eventKey='reject'>Reject</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className='col-md-3 my-2'>
                  <Dropdown onSelect={() => {}}>
                    <Dropdown.Toggle id='dropdown-basic' className='text-capitalize'>
                      Property Rating
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey='approve'>Apporve</Dropdown.Item>
                      <Dropdown.Item eventKey='request'>Request</Dropdown.Item>
                      <Dropdown.Item eventKey='reject'>Reject</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div> */}
              <div className='table-responsive'>
                <BootstrapTable
                  wrapperClasses='table-responsive'
                  bordered={false}
                  classes='table table-head-custom table-vertical-center overflow-hidden'
                  bootstrap4
                  keyField='id'
                  data={data}
                  columns={columns}
                  // noDataIndication={() => <h1>No DataFound</h1>}
                />
                {open && (
                  <AddProperty
                    open={open}
                    setOpen={setOpen}
                    isEdit={isEdit}
                    building={building}
                    updateDataId={updateDataId}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export {BuilderPage}
