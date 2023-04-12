/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import {useIntl} from 'react-intl'
import {useNavigate} from 'react-router-dom'
import {ApiGet, ApiPost} from '../../../apiCommon/helpers/API/ApiData'
import noData from '../../../img/NoData1.svg'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import {
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget6,
  TablesWidget5,
  TablesWidget10,
  MixedWidget8,
  CardsWidget7,
  CardsWidget17,
  CardsWidget20,
  ListsWidget26,
  EngageWidget10,
} from '../../../_metronic/partials/widgets'

// const tabsname = ['Overview', 'Properties', 'Tenants', 'Announcements', 'Payments & Rent']

const DashboardPage: FC = () => (
  <>
    <div className='row gy-5 gx-xl-8'>
      <div className='col-xl-12'>
        <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' />
      </div>
    </div>
  </>
)

const DashboardWrapper: FC = () => {
  const [count, setCount] = useState<any>([])
  const [tableData, setTableData] = useState<any>([])

  const [page, setPage] = useState<any>(1)
  const [pageLimit, setPageLimit] = useState<any>(1)

  const intl = useIntl()
  const navigate = useNavigate()
  const getCount = () => {
    ApiGet('cooperate/dashboard')
      .then((res) => {
        console.log('res', res?.data?.data)
        setCount(res?.data?.data)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
  const getData = () => {
    let body = {
      page: page,
      limit: 100,
      watchType: '',
    }
    ApiPost('cooperate/unit/home/get', body)
      .then((res) => {
        console.log('res', res?.data?.data?.unit_data)
        setTableData(res?.data?.data?.unit_data)
        setPageLimit(res?.data?.data?.state?.page_limit)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
  useEffect(() => {
    getCount()
    getData()
  }, [page])
  return (
    <>
      
      {/* </div> */}
      
      {/* </div> */}
      {/* </div> */}
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'Property Management '})}</PageTitle>
      <DashboardPage /> */}
    </>
  )
}

export {DashboardWrapper}
