import moment from 'moment'
import React from 'react'
import PhoneInput from 'react-phone-input-2'
import { useNavigate } from 'react-router-dom'
import { ApiGet, ApiPut } from '../../../apiCommon/helpers/API/ApiData'
import { SuccessToast } from '../../../apiCommon/helpers/Toast'

const EditTenant = () => {
    const navigate = useNavigate()
    const [tenantData, setTenantData] = React.useState<any>([])

    const getTenantData = async () => {
        await ApiGet(`cooperate/tenant/${window.location.pathname.split('/')[2]}`)
            .then((res) => {
                // setTableData(res?.data?.data)
                setTenantData(res?.data?.data[0])

            })
            .catch((e) => {
                console.log(e)
            })
    }
    React.useEffect(() => {
        getTenantData()
    }, [window.location.pathname.split('/')[2]])

    const editTenanntData = async () => {
        const body = {
            id: tenantData?._id,
            firstName: tenantData?.firstName,
            lastName: tenantData?.lastName,
            phoneNumber: tenantData?.phoneNumber,
            countryCode: tenantData?.countryCode,
            email: tenantData?.email,
            nationality: tenantData?.nationality,
            tenantSource: tenantData?.tenantSource,
            unitId: "",
            communityId: "",
            buildingId: "",
            DOB: tenantData?.DOB,
            status: 0,
            document: {
                passport: tenantData?.document?.passport,
                residency: tenantData?.document?.residency,
                id: tenantData?.document?.id,
                other: tenantData?.document?.other
            }
        }
        await ApiPut(`cooperate/tenant`,body)
            .then((response) => {
                SuccessToast(response?.data?.message)
            })
            .catch((error) => {
                console.log(error)
            })
            navigate(`/tenant/${[window.location.pathname.split('/')[2]]}`)
}
return (
    <div>
        <div id='kt_app_content_container' className='app-container container-xxl mt-10'>
            <div className='card card-flush mb-10'>
                <div className="d-flex align-items-center" style={{ justifyContent: 'space-between', marginLeft: '5px' }}>
                    <h3 className='mx-10 mb-5 mt-10'>Main Tenant Details </h3>

                    <a
                        // onClick={() => setShowCreateAppModal(true)}
                        className='btn btn-sm fw-bold btn-primary btn-green mx-3'
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_create_app'
                        onClick={editTenanntData}
                    >
                        Edit
                    </a>

                </div>
                <div
                    className='card-header align-items-center gap-md-2'
                    style={{ justifyContent: 'flex-start' }}
                >
                    {/* <div className='mb-10 min-w-200px mx-10'>
                      <label htmlFor='exampleFormControlInput1' className='required form-label'>
                        Tenant ID
                      </label>
                      <input
                        type='text'
                        className='form-control form-control-solid'
                        placeholder=''
                        name='tenantid'
                        value={formData?.tenantid}
                        onChange={handleChnage}
                      />
                    </div> */}
                    <div className='mb-10 min-w-200px mx-10'>
                        <label htmlFor='exampleFormControlInput1' className='required form-label'>
                            Tenant Source
                        </label>
                        {/* <input
                        type='text'
                        className='form-control form-control-solid'
                        placeholder=''
                        name='unitNo'
                        value={formData?.unitNo}
                        onChange={handleChnage}
                      /> */}
                        <select
                            name='tenantSource'
                            className='form-select form-select-solid'
                            value={tenantData?.tenantSource === 1 ? 'Direct' : tenantData?.tenantSource === 0 ? 'Agent' : ''}
                            onChange={(e) => setTenantData({ ...tenantData, 'tenantSource': e.target.value })}
                        >
                            <option disabled selected>
                                Select
                            </option>
                            <option value={0}>Agent</option>
                            <option value={1}>Direct</option>
                            {/* <option value={2}>Renewed</option> */}
                        </select>
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                        <label htmlFor='exampleFormControlInput1' className='required form-label'>
                            First Name
                        </label>
                        <input
                            type='text'
                            className='form-control form-control-solid'
                            placeholder=''
                            name='firstName'
                            value={tenantData?.firstName}
                            onChange={(e) => setTenantData({ ...tenantData, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                        <label htmlFor='exampleFormControlInput1' className='required form-label'>
                            Last Name
                        </label>
                        <input
                            type='text'
                            className='form-control form-control-solid'
                            placeholder=''
                            name='lastName'
                            value={tenantData?.lastName}
                            onChange={(e) => setTenantData({ ...tenantData, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                        <label htmlFor='exampleFormControlInput1' className='required form-label'>
                            Date of Birth
                        </label>
                        <input
                            type='date'
                            className='form-control form-control-solid'
                            placeholder=''
                            max={new Date().toISOString().split('T')[0]}
                            name='DOB'
                            value={moment(tenantData?.DOB).format('DD/MM/YYYY')}
                            onChange={(e) => setTenantData({ ...tenantData, [e.target.name]: e.target.value })}
                        />
                    </div>

                    <div className='mb-10 min-w-200px mx-10'>
                        <label htmlFor='exampleFormControlInput1' className='required form-label'>
                            Nationality
                        </label>
                        {/* <input
                        type='number'
                        className='form-control form-control-solid'
                        placeholder='Enter Bedrooms'
                        name='bedrooms'
                        value={formData?.bedrooms}
                        onChange={handleChnage}
                      /> */}
                        <select
                            name='nationality'
                            className='form-select form-select-solid'
                            value={tenantData?.nationality
                            }
                            style={{ width: '150px' }}
                            onChange={(e) => setTenantData({ ...tenantData, [e.target.name]: e.target.value })}
                        >
                            <option disabled selected>
                                Select
                            </option>
                            <option value='Dubai'>Dubai</option>
                            <option value='India'>India</option>
                        </select>
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                        <label htmlFor='exampleFormControlInput1' className='required form-label'>
                            Email
                        </label>
                        <input
                            type='email'
                            className='form-control form-control-solid'
                            placeholder=''
                            name='email'
                            value={tenantData?.email}
                            onChange={(e) => setTenantData({ ...tenantData, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <div className='mb-10 min-w-200px mx-10'>
                        <label htmlFor='exampleFormControlInput1' className='required form-label'>
                            Mobile No.
                        </label>
                        <div className='d-flex'>
                            <PhoneInput
                                placeholder='Enter phone number'
                                value={tenantData[0]?.phoneNumber
                                }
                            // className='block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                            />
                            {/* <select
                          name='Mobile'
                          className='form-select form-select-solid fst-italic'
                          value={formData?.Mobile}
                          onChange={handleChnage}
                          style={{width: '100px'}}
                        >
                          <option className='fst-italic' disabled selected>
                            Select
                          </option>
                          <option className='fst-italic' value={971}>
                            +971
                          </option>
                          <option className='fst-italic' value={91}>
                            +91
                          </option>
                          <option className='fst-italic' value={1}>
                            +1
                          </option>
                          <option className='fst-italic' value={74}>
                            +74
                          </option>
                          <option className='fst-italic' value={48}>
                            +48
                          </option>
                        </select>
                        <input
                          type='number'
                          className='form-control form-control-solid mx-1'
                          placeholder=''
                          name='number'
                          value={formData?.number}
                          onChange={handleChnage}
                          style={{width: '150px'}}
                        /> */}
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className=''>
                            <div className='mb-10 min-w-200px mx-10'>
                                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                                    Upload Passport
                                </label>
                                <input
                                    type='file'
                                    className='form-control form-control-solid'
                                    placeholder=''
                                    name='Passport'
                                />
                            </div>
                            <div className='mb-10 min-w-200px mx-10'>
                                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                                    Upload Residency
                                </label>
                                <input
                                    type='file'
                                    className='form-control form-control-solid'
                                    placeholder=''
                                    name='Residency'
                                />
                            </div>
                        </div>
                        <div className='mb-10 min-w-200px mx-10'>
                            <label htmlFor='exampleFormControlInput1' className='required form-label'>
                                Upload ID
                            </label>
                            <input
                                type='file'
                                className='form-control form-control-solid'
                                placeholder=''
                                name='ID'

                            />
                        </div>
                        <div className='mb-10 min-w-200px mx-10'>
                            <label htmlFor='exampleFormControlInput1' className='required form-label'>
                                Upload Other
                            </label>
                            <input
                                type='file'
                                className='form-control form-control-solid'
                                placeholder=''
                                name='Other'

                            />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
)
}

export default EditTenant
