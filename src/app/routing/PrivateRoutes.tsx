import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
// import Building from '../modules/building/Building'
import Area from '../modules/area/Area'
import Units from '../modules/units/Units'
import AreaCom from '../modules/area/AreaCom'
import BuildingCom from '../modules/building/BuildingCom'
import UnitsCom from '../modules/units/UnitsCom'
import UnitForm from '../modules/units/UnitForm'
import UnitComForm from '../modules/units/UnitComForm'
import UnitsBCom from '../modules/units/UnitsBCom'
import UnitBForm from '../modules/units/UnitsBForm'
import UnitMCOM from '../modules/units/UnitsMCom'
import BuildingCluster from '../modules/building/BuildingCluster'
import UnitComUpForm from '../modules/units/UnitComUpForm'
import UnitsCom1 from '../modules/units/UnitCom1'
import UnitComUpForm1 from '../modules/units/UnitComUpForm1'
import UnitComForm1 from '../modules/units/UnitComForm1'
import UnitUpForm from '../modules/units/UnitUpForm'
import Tenancies from '../modules/Tenancies/Tenancies'
import Tenants from '../modules/Tenants/Tenats'
import CreateTenancy from '../modules/Tenancies/CreateTenancy'
import {BuildingDashboard} from '../pages/dashboard/BuildingDashboard'
import {CommunityDashboard} from '../pages/dashboard/CommunityDashboard'
import Community from '../modules/building/Community'
import CreateTenant from '../modules/Tenancies/CreateTenant'
import TenancyDetails from '../modules/Tenancies/TenancyDetails'
import EditTenancy from '../modules/Tenancies/EditTenancy'
import ViewTenant from '../modules/Tenants/ViewTenant'
import EditTenant from '../modules/Tenants/EditTenant'
import Category from '../modules/building/Category'
import SubCategory from '../modules/building/SubCategory'
import User from '../modules/User/User'
import Material from '../modules/building/Material'
import Product from '../modules/product/Product'
import Contact from '../modules/contact/Contact'
import Blog from '../modules/Blog/Blog'
import Custom from '../modules/Custom/Custom'
import Review from '../modules/Review/Review'
import Order from '../modules/Order/Order'

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/user' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='building-dashboard' element={<BuildingDashboard />} />
        <Route path='community-dashboard' element={<CommunityDashboard />} />
        <Route path='building1' element={<BuilderPageWrapper />} />
        <Route path='area1' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        {/* <Route
          path='/building'
          element={
            <SuspensedView>
              <Building />
            </SuspensedView>
          }
        /> */}
        <Route
          path='/category'
          element={
            <SuspensedView>
              <Category />
            </SuspensedView>
          }
        />
        <Route
          path='/order'
          element={
            <SuspensedView>
              <Order />
            </SuspensedView>
          }
        />
        <Route
          path='/subcategory'
          element={
            <SuspensedView>
              <SubCategory />
            </SuspensedView>
          }
        />
        <Route
          path='/user'
          element={
            <SuspensedView>
              <User />
            </SuspensedView>
          }
        />
        <Route
          path='/material'
          element={
            <SuspensedView>
              <Material />
            </SuspensedView>
          }
        />
        <Route
          path='/product'
          element={
            <SuspensedView>
              <Product />
            </SuspensedView>
          }
        />
        <Route
          path='/contact'
          element={
            <SuspensedView>
              <Contact />
            </SuspensedView>
          }
        />
        <Route
          path='/blog'
          element={
            <SuspensedView>
              <Blog />
            </SuspensedView>
          }
        />
        <Route
          path='/custom'
          element={
            <SuspensedView>
              <Custom />
            </SuspensedView>
          }
        />
        <Route
          path='/review'
          element={
            <SuspensedView>
              <Review />
            </SuspensedView>
          }
        />
        <Route
          path='/community'
          element={
            <SuspensedView>
              <Community />
            </SuspensedView>
          }
        />
        <Route
          path='/tenancies'
          element={
            <SuspensedView>
              <Tenancies />
            </SuspensedView>
          }
        />
        <Route
          path='/tenant/:id'
          element={
            <SuspensedView>
              <ViewTenant />
            </SuspensedView>
          }
        />
        <Route
          path='/edit-tenant/:id'
          element={
            <SuspensedView>
              <EditTenant />
            </SuspensedView>
          }
        />
        <Route
          path='/tenants'
          element={
            <SuspensedView>
              <Tenants />
            </SuspensedView>
          }
        />
        <Route
          path='/buildingcluster/:id/:id'
          element={
            <SuspensedView>
              <BuildingCluster />
            </SuspensedView>
          }
        />
        <Route
          path='/buildingCom'
          element={
            <SuspensedView>
              <BuildingCom />
            </SuspensedView>
          }
        />
        <Route
          path='/create-tenancy'
          element={
            <SuspensedView>
              <CreateTenant />
            </SuspensedView>
          }
        />
        <Route
          path='/create-tenant'
          element={
            <SuspensedView>
              <CreateTenant />
            </SuspensedView>
          }
        />
        <Route
          path='/tenancy-details/:tenancyId'
          element={
            <SuspensedView>
              <TenancyDetails />
            </SuspensedView>
          }
        />
        <Route
          path='/tenancy-details/:tenancyId/payment-rent'
          element={
            <SuspensedView>
              <TenancyDetails />
            </SuspensedView>
          }
        />
        <Route
          path='/edit-tenancy/:tenancyId'
          element={
            <SuspensedView>
              <EditTenancy />
            </SuspensedView>
          }
        />
        <Route
          path='/unitform/:propertyId/:floorId'
          element={
            <SuspensedView>
              <UnitForm />
            </SuspensedView>
          }
        />
        <Route
          path='/unitbform/:propertyId/:floorId'
          element={
            <SuspensedView>
              <UnitBForm />
            </SuspensedView>
          }
        />
        <Route
          path='/unitComform/:propertyId/:floorId'
          element={
            <SuspensedView>
              <UnitComForm />
            </SuspensedView>
          }
        />
        <Route
          path='/unitComform1/:propertyId/:floorId'
          element={
            <SuspensedView>
              <UnitComForm1 />
            </SuspensedView>
          }
        />

        <Route
          path='/unitComUpform/:propertyId/:floorId/:id'
          element={
            <SuspensedView>
              <UnitComUpForm />
            </SuspensedView>
          }
        />
        <Route
          path='/unitUpform/:propertyId/:floorId/:id'
          element={
            <SuspensedView>
              <UnitUpForm />
            </SuspensedView>
          }
        />
        <Route
          path='/unitComUpform1/:propertyId/:floorId/:id'
          element={
            <SuspensedView>
              <UnitComUpForm1 />
            </SuspensedView>
          }
        />
        <Route
          path='/area/:id'
          element={
            <SuspensedView>
              <Area />
            </SuspensedView>
          }
        />
        <Route
          path='/areaCom/:id'
          element={
            <SuspensedView>
              <AreaCom />
            </SuspensedView>
          }
        />
        <Route
          path='units/:propertyId/:floorId'
          element={
            <SuspensedView>
              <Units />
            </SuspensedView>
          }
        />
        <Route
          path='unitsmcom/:propertyId/:floorId'
          element={
            <SuspensedView>
              <UnitMCOM />
            </SuspensedView>
          }
        />
        <Route
          path='unitbcoms/:propertyId/:floorId'
          element={
            <SuspensedView>
              <UnitsBCom />
            </SuspensedView>
          }
        />
        <Route
          path='unitscom/:propertyId/:floorId'
          element={
            <SuspensedView>
              <UnitsCom />
            </SuspensedView>
          }
        />
        <Route
          path='unitscom1/:propertyId/:floorId'
          element={
            <SuspensedView>
              <UnitsCom1 />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
