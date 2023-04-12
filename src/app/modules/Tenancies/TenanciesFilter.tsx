import React, {useState} from 'react'
import {Modal} from 'react-bootstrap'
import { ApiGet } from '../../../apiCommon/helpers/API/ApiData'
import { ErrorToast } from '../../../apiCommon/helpers/Toast'
import {KTSVG} from '../../../_metronic/helpers'

interface ButtonProps {
  show: any;
  handleClose: any
  showModal:any
  handleSubmitId:(message: string)=>void,
  // 👇️ turn off type checking
  // sethandleSubmitIdv:any;
}
const TenanciesFilter = ({
  show,
  handleClose,
  showModal,
  
  
  handleSubmitId,
  // sethandleSubmitIdv
}: ButtonProps) => {
  const [type, setType] = useState('')
  const [formData1, setFormData1] = useState<any>({
    // propertyId: window.location.pathname?.split('/')[2],
  })
  const [devlopment, setdevlopment] = useState([])
  const [formData, setformData] = useState<any>({})
  const [date, setdate] = useState()

  const [cluster, setcluster] = useState([])
  const [flour, setflour] = useState([])
  const [clusterflour, setclusterflour] = useState([])
  const [unit,setunit] = useState([]) 
  const [clusterunit,setclusterunit] = useState([])
  const [clusterunitgroup,setclusterunitgroup] = useState([]) 
  const [clustertype,setclustertype] = useState() 
  const [clusterbuilding,setclusterbuilding] = useState([]) 
  const [ChnageUGB,setChnageUGB] = useState() 

  

  const pathName = window.location.pathname
  console.log('type', typeof(ChnageUGB) )
  const handleChnage12 = (e: any) => {
    const {name, value} = e.target
    setFormData1({...formData1, [name]: value})
    setType(e.target.value)
    if(e.target.value=="Community"){
    callcommunity()
    }else if(e.target.value=="Building"){
    callBuilding()
    }
  }
  const handleChnageDevlopment = (e: any) => {
    const {name, value} = e.target
    setFormData1({...formData1, [name]: value})
    if(name=="devlopment" && type=="Community"){
      setclusterunit([])
    setclusterflour([])
    setclusterbuilding([])
    setclusterunitgroup([])
    callcluster(value)

    }else if(name=="devlopment" && type=="Building"){
    callflour(value)
    setunit([])
    setflour([])
    }
  }
  const handleChnageflour = (e:any) =>{
    const {name, value} = e.target

    if(name=="flour" && type=="Building"){
    setunit([])

      callunitbyflour(value)

    }
    setFormData1({...formData1, [name]: value})

  }
  const handleChnageunit = (e:any) =>{
    const {name, value} = e.target
    setFormData1({...formData1, [name]: value})

  }
  const handleChnageCluster = (e:any) =>{
    const {name, value} = e.target
    setFormData1({...formData1, [name]: value})
    let dte:any = cluster.filter((v: any, index: any) => v._id == value)
    console.log(dte)
    // setcluster([])
    setclustertype(dte[0].type)
    if(dte[0].type==0){
      callunitbyclusterid(value)
    }else if(dte[0].type==1){
      callclusterbuilding(value)
    }else if(dte[0].type==2){
      // callclusterunitgroup()
    }
    setclusterunit([])
    setclusterflour([])
    setclusterbuilding([])
    setclusterunitgroup([])
    
  }
  const handleChnageclusterbuilding = (e:any) =>{
    const {name, value} = e.target
    setclusterunit([])
    setclusterflour([])
    // setclusterbuilding([])
    callclusterflour(value)

  }
  const handleChnageclusterunit = (e:any) =>{
    const {name, value} = e.target
    setclusterunit([])
    callclusterunitbyclusterflour(value)
  }
  const handleChnageUGB = (e:any) => {
    const {name, value} = e.target
    setclusterunit([])
    setclusterflour([])
    setclusterbuilding([])
    setclusterunitgroup([])
    setChnageUGB(value)
    if(value=="0"){
     callunitgroup(formData1?.Cluster)
    }else{
      callclusterbuilding(formData1?.Cluster)
    }
  }

  const handleChnageclusterunitgroupid = (e:any) => {
    const {name, value} = e.target
    setclusterunit([])
    setclusterflour([])
     callunitbyunitgroupid(formData1?.Cluster)
    
  }
  const callunitbyunitgroupid = (value:any) =>{
    ApiGet(`cooperate/unit?unitGroupId=${value}`)
    .then((res) => {
      console.log('rescluster', res)
      setclusterunit(res?.data?.data)
      // setHeaderB(res)
    })
    .catch((err) => console.log('err', err))
  }
  const callunitgroup = (value:any) =>{
    ApiGet(`cooperate/unit_group?clusterId=${value}`)
    .then((res) => {
      console.log('rescluster', res)
      setclusterunitgroup(res?.data?.data)
      // setHeaderB(res)
    })
    .catch((err) => console.log('err', err))
  }
  const callclusterbuildingunitgroup = (value:any) =>{
    ApiGet(`cooperate/unit?clusterId=${value}`)
    .then((res) => {
      console.log('rescluster', res)
      setclusterunit(res?.data?.data)
      // setHeaderB(res)
    })
    .catch((err) => console.log('err', err))
  } 
  const callunitbyclusterid = (value:any) =>{
    ApiGet(`cooperate/unit?clusterId=${value}`)
    .then((res) => {
      console.log('rescluster', res)
      setclusterunit(res?.data?.data)
      // setHeaderB(res)
    })
    .catch((err) => console.log('err', err))
  }
  const callclusterunitbyclusterflour = (value:any) =>{
    ApiGet(`cooperate/unit?floorId=${value}`)
    .then((res) => {
      console.log('rescluster', res)
      setclusterunit(res?.data?.data)
      // setHeaderB(res)
    })
    .catch((err) => console.log('err', err))
  }
  const callclusterflour = (value:any) =>{
    ApiGet(`cooperate/floor?buildingId=${value}`)
    .then((res) => {
      console.log('rescluster', res)
      setclusterflour(res?.data?.data)
      // setHeaderB(res)
    })
    .catch((err) => console.log('err', err))
  }
  const callclusterbuilding = (value:any) =>{
    ApiGet(`cooperate/building?clusterId=${value}`)
    .then((res) => {
      console.log('rescluster', res)
      setclusterbuilding(res?.data?.data)
      // setHeaderB(res?.data?.data)
    })
    .catch((err) => console.log('err', err))
  }
  const callunitbyflour = (value:any) =>{
    ApiGet(`cooperate/unit?floorId=${value}`)
    .then((res) => {
      console.log('rescluster', res)
      setunit(res?.data?.data)
      // setHeaderB(res)
    })
    .catch((err) => console.log('err', err))
  }
  const callcluster = (value:any) =>{
    ApiGet(`cooperate/cluster?communityId=${value}`)
    .then((res) => {
      console.log('rescluster', res)
      setcluster(res?.data?.data)
      // setHeaderB(res)
    })
    .catch((err) => console.log('err', err))
  }
  const callflour = (value:any) =>{
    ApiGet(`cooperate/floor?buildingId=${value}`)
    .then((res) => {
      console.log('rescluster', res)
      setflour(res?.data?.data)
      // setHeaderB(res)
    })
    .catch((err) => console.log('err', err))
  }
  const callcommunity = () =>{
    ApiGet(`cooperate/communities`)
    .then((res) => {
      console.log('rescluster', res)
      setdevlopment(res?.data?.data)
      // setHeaderB(res)
    })
    .catch((err) => console.log('err', err))
  }
  const callBuilding = () =>{
    ApiGet(`cooperate/building`)
    .then((res) => {
      console.log('rescluster', res)
      setdevlopment(res?.data?.data)
      // setHeaderB(res?.data?.data)
    })
    .catch((err) => console.log('err', err))
  }
  const handleSubmit123 = () =>{
    if(type === 'Community'){
       if(formData1?.clusterunitNo){
        handleSubmitId(formData1?.clusterunitNo)
        handleClose()
        // sethandleSubmitIdv(formData1?.clusterunitNo)
       }else{
        ErrorToast("Select Unit!")

       }
    }else if(type === 'Building'){
       if(formData1?.unitNo){
        console.log(formData1?.unitNo)
        handleSubmitId(formData1?.unitNo)
        handleClose()
        // sethandleSubmitIdv(formData1?.unitNo)
       }else{
        ErrorToast("Select Unit!")
        
       }
    }
  }
  return (
    <>
      <Modal
        id='kt_modal_create_app'
        tabIndex={-1}
        aria-hidden='true'
        dialogClassName='modal-dialog modal-dialog-centered mw-600px'
        show={show}
        onHide={() => {
          handleClose()
          setType('')
        }}
        backdrop={true}
        size='sm'
      >
        <div className='modal-header'>
          {pathName === '/create-tenancy' ? (
            <h2>Select Another Property</h2>
          ) : (
            <h2>{!date ? 'Filter' : 'Select Date Range'}</h2>
          )}
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
            <KTSVG className='svg-icon-1' path='/media/icons/duotune/arrows/arr061.svg' />
          </div>
        </div>

        {showModal === 'Filter' && (
          <div className='modal-body py-lg-10 px-lg-10'>
            <div
              className='stepper stepper-pills stepper-column flex-column flex-xl-row flex-row-fluid'
              id='kt_modal_create_app_stepper'
            >
              <div
                className='card-header align-items-center gap-md-2'
                style={{justifyContent: 'flex-start'}}
              >
                <div className='mb-10 min-w-200px '>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    Development Type
                  </label>
                  <select
                    name='unitType'
                    className='form-select form-select-solid'
                    value={formData?.unitType}
                    onChange={handleChnage12}
                  >
                    <option disabled selected>
                      Select
                    </option>
                    <option value='Community'>Community </option>
                    <option value='Building'>Building</option>
                  </select>
                </div>
                {type === 'Community' && (
                  <>
                    <div className='mb-10 min-w-200px '>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Development
                      </label>
                      <select
                        name='devlopment'
                        className='form-select form-select-solid'
                        value={formData?.devlopment}
                        onChange={handleChnageDevlopment}
                      >
                        <option selected>
                          Select
                        </option>
                        {devlopment.length>0 && devlopment.map((data:any, i) => (
                    <option value={data._id}>{data.name}</option>
                  ))}
                      </select>
                    </div>
                    <div className='mb-10 min-w-200px '>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Cluster
                      </label>
                      <select
                        name='Cluster'
                        className='form-select form-select-solid'
                        value={formData1?.Cluster}
                        onChange={handleChnageCluster}
                      >
                        <option selected>
                          Select
                        </option>
                        {cluster.length>0 && cluster.map((data:any, i) => (
                    <option value={data._id}>{data.name}</option>
                  ))}
                      </select>
                    </div>
                    {clustertype==2?<div className='mb-10 min-w-200px '>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Select UG/B
                      </label>
                      <select
                        name='unitType'
                        className='form-select form-select-solid'
                        value={formData?.unitType}
                        onChange={handleChnageUGB}
                      >
                        <option selected>
                          Select
                        </option>
                        <option value='0'>Unit Group</option>
                        <option value='1'>Building</option>
                        
                      </select>
                    </div>:null}
                    {clustertype==2 && ChnageUGB=="0"?<div className='mb-10 min-w-200px '>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Unit Group
                      </label>
                      <select
                        name='unitType'
                        className='form-select form-select-solid'
                        value={formData?.unitType}
                        onChange={handleChnageclusterunitgroupid}
                      >
                        <option  selected>
                          Select
                        </option>
                        {clusterunitgroup.length>0 && clusterunitgroup.map((data:any, i) => (
                    <option value={data._id}>{data.name}</option>
                  ))}
                      </select>
                    </div>:null}
                    {clustertype==1 || (clustertype==2 &&ChnageUGB=="1")?<div className='mb-10 min-w-200px '>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Building
                      </label>
                      <select
                        name='unitType'
                        className='form-select form-select-solid'
                        value={formData?.unitType}
                        onChange={handleChnageclusterbuilding}
                      >
                        <option selected>
                          Select
                        </option>
                        {clusterbuilding.length>0 && clusterbuilding.map((data:any, i) => (
                    <option value={data._id}>{data.name}</option>
                  ))}
                      </select>
                    </div>:null}
                    {clustertype==1 || (clustertype==2 &&ChnageUGB=="1")?<div className='mb-10 min-w-200px '>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Floor
                      </label>
                      <select
                        name='unitType'
                        className='form-select form-select-solid'
                        value={formData?.unitType}
                        onChange={handleChnageclusterunit}
                      >
                        <option  selected>
                          Select
                        </option>
                        {clusterflour.length>0 && clusterflour.length>0 && clusterflour.map((data:any, i) => (
                    <option value={data._id}>{data.name}</option>
                  ))}
                      </select>
                    </div>:null}
                    <div className='row gy-2'>

                    {clusterunit.length>0 && clusterunit.map((data:any, i) => (<div className='d-flex col-md-4 '>
                      <div className='form-check form-check-custom form-check-solid form-check-sm'>
                        <input
                          className='form-check-input'
                          type='radio'
                          value={data._id}
                          id={data._id}
                          name='clusterunitNo'
                          checked={formData1?.clusterunitNo==data._id?true:false}
                          onChange={handleChnageunit}
                          // onClick={() => setCreate(false)}
                        />
                        <label className='form-check-label' htmlFor='vacant'>
                        {data.unitNo}
                        </label>
                    </div>
                    </div>))}
                    </div>
                    {/* {pathName === '/create-tenancy' && (
                      <div className='mb-10 min-w-200px '>
                        <label htmlFor='exampleFormControlInput1' className='required form-label'>
                          Unit No.
                        </label>
                        <select
                          name='unitType'
                          className='form-select form-select-solid'
                          value={formData?.unitType}
                          onChange={handleChnage}
                        >
                          <option disabled selected>
                            Select
                          </option>
                          <option value='apartment'>101 </option>
                          <option value='penthouse'>102</option>
                          <option value='common area'>103 </option>
                        </select>
                      </div>
                    )} */}
                  </>
                )}
                {type === 'Building' && (
                  <>
                    <div className='mb-10 min-w-200px '>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Development
                      </label>
                      <select
                        name='devlopment'
                        className='form-select form-select-solid'
                        value={formData?.devlopment}
                        onChange={handleChnageDevlopment}
                      >
                        <option selected>
                          Select
                        </option>
                        {devlopment.length>0 && devlopment.map((data:any, i) => (
                    <option value={data._id}>{data.name}</option>
                  ))}
                      </select>
                    </div>
                    <div className='mb-10 min-w-200px '>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Floor
                      </label>
                      <select
                        name='flour'
                        className='form-select form-select-solid'
                        value={formData?.flour}
                        onChange={handleChnageflour}
                      >
                        <option selected>
                          Select
                        </option>
                        {flour.length>0 && flour.map((data:any, i) => (
                    <option value={data._id}>{data.name}</option>
                  ))}
                      </select>
                    </div>
                    <div className='row gy-2'>
                      {unit.length>0 && unit.map((data:any, i) => (<div className='d-flex col-md-4 '>
                      <div className='form-check form-check-custom form-check-solid form-check-sm'>
                        <input
                          className='form-check-input'
                          type='radio'
                          value={data._id}
                          id={data._id}
                          name='unitNo'
                          checked={formData1?.unitNo==data._id?true:false}
                          onChange={handleChnageunit}
                          // onClick={() => setCreate(false)}
                        />
                        <label className='form-check-label' htmlFor='vacant'>
                        {data.unitNo}
                        </label>
                    </div>
                    </div>))}
                    </div>
                    {/* {pathName === '/create-tenancy' && (
                      <div className='mb-10 min-w-200px '>
                        <label htmlFor='exampleFormControlInput1' className='required form-label'>
                          Unit No.
                        </label>
                        <select
                          name='unitType'
                          className='form-select form-select-solid'
                          value={formData?.unitType}
                          onChange={handleChnage}
                        >
                          <option disabled selected>
                            Select
                          </option>
                          <option value='apartment'>101 </option>
                          <option value='penthouse'>102</option>
                          <option value='common area'>103 </option>
                        </select>
                      </div>
                    )} */}
                  </>
                )}
              </div>

              {/*end::Content */}
            </div>
            {/* end::Stepper */}
          </div>
        )}
        {date && (
          <div className='modal-body py-lg-10 px-lg-10'>
            <div
              className='stepper stepper-pills stepper-column flex-column flex-xl-row flex-row-fluid'
              id='kt_modal_create_app_stepper'
            >
              <div
                className='card-header align-items-center gap-md-2'
                style={{justifyContent: 'flex-start'}}
              >
                <div className='mb-10 min-w-200px '>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    From
                  </label>
                  <input
                    type='date'
                    className='form-control form-control-solid'
                    placeholder='e.g. - abc'
                    name='name'
                    // value={formData?.name}
                    // onChange={handleChnage}
                  />
                </div>
                <div className='mb-10 min-w-200px '>
                  <label htmlFor='exampleFormControlInput1' className='required form-label'>
                    To
                  </label>
                  <input
                    type='date'
                    className='form-control form-control-solid'
                    placeholder='e.g. - abc'
                    name='name'
                    // value={formData?.name}
                    // onChange={handleChnage}
                  />
                </div>
              </div>

              {/*end::Content */}
            </div>
            {/* end::Stepper */}
          </div>
        )}
        <div className='modal-footer'>
          <div className='flex-row-fluid '>
            <div className='d-flex justify-content-end '>
              <div className='me-2'>
                <button
                  type='button'
                  className='btn btn-lg btn-light-primary me-3'
                  data-kt-stepper-action='previous'
                  onClick={() => {
                    handleClose()
                    setType('')
                  }}
                >
                  <KTSVG
                    path='/media/icons/duotune/arrows/arr063.svg'
                    className='svg-icon-3 me-1 text-green'
                  />{' '}
                  Cancel
                </button>
              </div>
              <div>
                <button
                  type='button'
                  className='btn btn-lg btn-primary btn-green'
                  data-kt-stepper-action='submit'
                  onClick={()=>
                    // ()=>{
                    //  if(type === 'Community'){
                    // if(formData1?.clusterunitNo){
                      handleSubmit123()
                    //  sethandleSubmitIdv(formData1?.clusterunitNo)
                //     }else{
                //      ErrorToast("Select Unit!")
             
                //     }
                //  }else if(type === 'Building'){
                //     if(formData1?.unitNo){
                //      console.log(formData1?.unitNo)
                //      handleSubmitId()
                //      sethandleSubmitIdv(formData1?.unitNo)
                //     }else{
                //      ErrorToast("Select Unit!")
                     
                //     }
                //  }
              // }
            }
                >
                  Apply{' '}
                  <KTSVG
                    path='/media/icons/duotune/arrows/arr064.svg'
                    className='svg-icon-3 ms-2 me-0'
                  />
                </button>
              </div>
            </div>
            {/*end::Form */}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default TenanciesFilter
