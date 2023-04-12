import {useIntl} from 'react-intl'
import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {MegaMenu} from './MegaMenu'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      {/* <MenuInnerWithSub title={intl.formatMessage({id: 'Overview'})} to='/dashboard2' />
      <MenuItem title='Properties' to='/dashboard' />
      <MenuItem title='Tenancies' to='/tenancies' />
      <MenuItem title='Tenants' to='/tenants' /> */}


      {/* <MenuInnerWithSub title='Tenants' to='/crafted'></MenuInnerWithSub> */}

      {/* <MenuInnerWithSub title='Announcements' to='/dashboard1'></MenuInnerWithSub>

      <MenuInnerWithSub title='Payments & Rent' to='/mega-menu'>
        <MegaMenu />
      </MenuInnerWithSub> */}
    </>
  )
}
