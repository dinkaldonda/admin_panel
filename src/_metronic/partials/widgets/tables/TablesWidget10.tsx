/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {Dropdown, Form, Modal} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import AddProperty from '../../../../app/pages/Property/AddProperty'
import {useNavigate} from 'react-router-dom'

type Props = {
  className: string
}

const TablesWidget10: React.FC<Props> = ({className}) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [data, setData] = useState([
    {
      propertyId: '1',
      building: 'atlanta',
      area: 'varachha',
      unitNo: '404',
      unitType: 'Apartment',
      bedrooms: '3',
      size: '1700',
      occupancy: 'Occupied',
      rentStatus: 'Paid',
      managerName: 'Dhulo',
      propertyManager: 'Pratik',
      propertyRating: '4.5',
    },
  ])

  const columns = [
    {
      dataField: 'propertyId',
      text: 'Property Id',
      sort: true,
    },
    {
      dataField: 'building',
      text: 'Building',
      sort: true,
    },
    {
      dataField: 'area',
      text: 'Area',
      sort: true,
    },
    {
      dataField: 'unitNo',
      text: 'Unit No',
      sort: true,
    },
    {
      dataField: 'unitType',
      text: 'Unit Type',
      sort: true,
    },
    {
      dataField: 'bedrooms',
      text: 'Bedrooms',
      sort: true,
    },
    {
      dataField: 'size',
      text: 'Size',
      sort: true,
    },
    {
      dataField: 'occupancy',
      text: 'Occupancy',
      sort: true,
    },
    {
      dataField: 'rentStatus',
      text: 'RentStatus',
      sort: true,
    },
    {
      dataField: 'managerName',
      text: 'Manager Name',
      sort: true,
    },
    {
      dataField: 'propertyManager',
      text: 'Property Manager',
      sort: true,
    },
    {
      dataField: 'propertyRating',
      text: 'Property Rating',
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
              className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'
              // onClick={() => {
              //   setIsEdit(true)
              //   setOpen(true)
              // }}
            >
              <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
            </a>
            <a className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm'>
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
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-center flex-row'>
          <span className='card-label fw-bold fs-3 '> Manage Properties</span>
          <span className='text-muted  fw-semibold fs-7 ms-4 mt-1'>Buildings : 10</span>
          <span className='text-muted  fw-semibold fs-7 ms-3 mt-1'>Communities : 10</span>
          <span className='text-muted  fw-semibold fs-7 ms-3 mt-1'>Properties : 10</span>
        </h3>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a user'
          onClick={() => {
            navigate('/building')
          }}
        >
          <a className='btn btn-sm bg-green text-white'>
            <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3 text-white' />
            Add Property
          </a>
        </div>
      </div>
      <div className='card-body row py-3'>
        <div className='row mb-4'>
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
        </div>
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
          {open && <AddProperty open={open} setOpen={setOpen} isEdit={isEdit} />}
        </div>
      </div>
    </div>
  )
}

export {TablesWidget10}
