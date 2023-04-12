/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {PageTitle} from '../../_metronic/layout/core'
import {BuilderPage} from './BuilderPage'

const MenuTestPage: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Property Registration </PageTitle>
      <BuilderPage />
    </>
  )
}

export {MenuTestPage}
