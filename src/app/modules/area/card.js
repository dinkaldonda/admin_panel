import React, {useEffect, useState} from 'react'
import {forwardRef, useImperativeHandle, useRef} from 'react'
import {DragSource, DropTarget} from 'react-dnd'
import {useNavigate} from 'react-router-dom'
import {useHistory, Link} from 'react-router-dom'
import {TbChevronDown} from 'react-icons/tb'

import {
  Col,
  Container,
  Row,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Modal,
  Label,
  Input,
} from 'reactstrap'
import swal from 'sweetalert2'
import AddArea from './AddArea'

// import Button from "reactstrap/es/Button";
// import {
//     ApiGet,
//     ApiDelete,
//     ApiPost,
//     ApiGetInce,
// } from "../../helpers/API/ApiData";
import {toast, ToastContainer} from 'react-toastify'
import {ApiDelete, ApiPost, ApiPut} from '../../../apiCommon/helpers/API/ApiData'
import {ErrorToast, SuccessToast} from '../../../apiCommon/helpers/Toast'
import {Dropdown} from 'react-bootstrap'

// import { ItemTypes } from './ItemTypes';
const style = {
  border: '1px solid gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'Pointer',
}
const ItemTypes = {
  CARD: 'card',
}

const imagePosition = {
  width: '50%',
  height: '50%',
  marginLeft: '25%',
}

const Card = forwardRef(function Card(
  {index, text, text1, path, id, isDragging, connectDragSource, connectDropTarget, building},
  ref
) {
  const elementRef = useRef(null)
  const navigate = useNavigate()

  // const history = useHistory();
  const [modal, setModal] = useState(false)
  const [updateDataId, setUpdateDataId] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [showCreateAppModal, setShowCreateAppModal] = useState(false)
  const [formData, setFormData] = useState({
    // propertyId: window.location.pathname?.split('/')[2],
  })
  //   const [modaldata, setModalsdata] = useState(false);
  const [modalId, setModalId] = useState()
  connectDragSource(elementRef)
  connectDropTarget(elementRef)

  const opacity = isDragging ? 0 : 1
  useImperativeHandle(ref, () => ({
    getNode: () => elementRef.current,
  }))
  const handleChnage = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }
  const deleteProperty = (id) => {
    console.log('deleteProperty', id)
    ApiDelete(`cooperate/floor/${id}`)
      .then((res) => {
        SuccessToast(res?.data?.message)
        building()
      })
      .catch((err) => ErrorToast(err.message))
  }
  const handleSubmit = () => {
    if (isEdit) {
      delete formData._id
      delete formData.updatedBy
      delete formData.status
      // const body = {...formData, managerId: '6329ee43396e812bcc0964e5', id: updateDataId}
      const body = {
        id: updateDataId,
        name: formData?.name,
        totalProperties: formData?.totalProperties,
        managerId: '6329ee43396e812bcc0964e5',
        // propertyId: formData?.propertyId,
      }
      ApiPut('cooperate/floor', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building()
          setIsEdit(false)
          console.log('addProperty', res)
          setShowCreateAppModal(false)
          // setFormData({propertyId: window.location.pathname?.split('/')[2]})
        })
        .catch((err) => ErrorToast(err.message))
    } else {
      const body = {...formData, managerId: '6329ee43396e812bcc0964e5'}
      ApiPost('cooperate/properties_area', body)
        .then((res) => {
          SuccessToast(res?.data?.message)
          building()
          console.log('addProperty', res)
          setShowCreateAppModal(false)
          // setFormData({propertyId: window.location.pathname?.split('/')[2]})
        })
        .catch((err) => ErrorToast(err.message))
    }
  }
  const DeleteCategory = (row) => {
    console.log(row)
    setModal(!modal)
    setModalId(row)
  }
  const enableClick = async (row) => {
    setModal(!modal)
    setModalId(row.original)
  }
  const toggles = () => {
    setModal(!modal)
  }
  const routerClickDelete = async () => {
    // const body = {
    //   isActive: modalId.isActive === true ? false : true,
    //   categroyId: modalId,
    // };
    // console.log(body);
    const Id = modalId
    console.log(Id)
    // ApiDelete(`category/${Id}`)
    //     .then((res) => {
    //         toast.success("Status Changed successfully");
    //         setModal(!modal);
    //         window.location.reload(false);
    //     })
    //     .catch((err) => {
    //         setModal(!modal);
    //     });
  }
  return (
    <div ref={elementRef} style={{...style, opacity}}>
      {/* <tr >
                <td>{text}</td>
                <td><img style={{ height: '50px', width: '50px' }} src={path}></img></td>
                <td><button onClick={() => history.push("/addcategory?id=" + id)}>Edit</button></td>
                <td><button onClick={(e) => DeleteCategory(id)}>Delete</button></td>
            </tr> */}
      <Row md='12' sm='12'>
        <Col className='text-center'>{index + 1}</Col>
        <Col data-kt-ecommerce-order-filter='order_id' className='text-center'>
          {text}
        </Col>
        <Col className='text-center'>{text1}</Col>
        <Col className='text-center'>
          <a
            onClick={() => navigate(`/units/${window.location.pathname?.split('/')[2]}/${id}`)}
            className='btn btn-sm fw-bold btn-primary btn-green'
          >
            Units
          </a>
        </Col>

        <Col className='text-end d-flex ' style={{justifyContent: 'end'}}>
          <Dropdown className='' style={{width: 'fit-content'}}>
            <Dropdown.Toggle
              variant='success'
              id='dropdown-basic'
              className='btn btn-sm btn-light btn-active-light-primary text-hover-green'
            >
              Actions <TbChevronDown />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                href='#/action-1'
                onClick={() => {
                  console.log('clicked')

                  setUpdateDataId(id)
                  setIsEdit(true)
                  setShowCreateAppModal(true)
                }}
                className='menu-link px-3'
              >
                Edit
              </Dropdown.Item>
              <Dropdown.Item
                href='#/action-2'
                onClick={() => {
                  swal
                    .fire({
                      text: 'Are you sure you want to permanently delete this building? Deleting this building will delete all the data registered under the building.',
                      icon: 'warning',
                      showConfirmButton: true,
                      confirmButtonColor: '#D72852',
                      confirmButtonText: 'Yes',
                      showCancelButton: true,
                      // cancelButtonColor: "transparent",
                      cancelButtonText: 'Cancel',
                    })
                    .then((res) => {
                      if (res.isConfirmed) {
                        deleteProperty(id)
                      }
                    })
                }}
                className='menu-link px-3'
                data-kt-ecommerce-order-filter='delete_row'
              >
                Delete{' '}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      {/* <Row md='12' sm='12'>
                <Col>{text}</Col>
                <Col><img style={{ height: '100px', width: '120px' }} src={path} /></Col>
                <Col style={{ display: 'flex' }}>
                   
                </Col>
            </Row> */}
      <AddArea
        show={showCreateAppModal}
        handleClose={() => setShowCreateAppModal(false)}
        building={building}
        updateDataId={updateDataId}
        isEdit={isEdit}
        formData={formData}
        handleSubmit={handleSubmit}
        handleChnage={handleChnage}
      />
      <Modal isOpen={modal} toggle={enableClick}>
        <ModalHeader toggle={toggles}>Product</ModalHeader>
        <ModalBody>
          <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
            <p>Are you sure ?</p>
          </FormGroup>
          <FormGroup className='mb-2 mr-sm-2 mb-sm-0'></FormGroup>
        </ModalBody>
        <ModalFooter>
          {/* <Button color="secondary" onClick={() => routerClickDelete()}>
                        Confirm
          </Button>
                    <Button color="secondary" onClick={toggles}>
                        Cancel
          </Button> */}
        </ModalFooter>
      </Modal>
    </div>
  )
})
export default DropTarget(
  ItemTypes.CARD,
  {
    hover(props, monitor, component) {
      if (!component) {
        return null
      }
      // node = HTML Div element from imperative API
      const node = component.getNode()
      if (!node) {
        return null
      }
      const dragIndex = monitor.getItem().index
      console.log(dragIndex)
      console.log(monitor.getItem())
      const hoverIndex = props.index
      console.log(hoverIndex)
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = node.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      props.moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex
    },
  },
  (connect) => ({
    connectDropTarget: connect.dropTarget(),
  })
)(
  DragSource(
    ItemTypes.CARD,
    {
      beginDrag: (props) => ({
        id: props.id,
        index: props.index,
      }),
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  )(Card)
)
