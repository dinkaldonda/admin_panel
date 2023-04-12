/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
      {/* <SidebarMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title='Property'
        fontIcon='bi-app-indicator'
      /> */}
      <SidebarMenuItemWithSub
        to='/dashboard'
        title='Wood Management'
        fontIcon='bi-app-indicator'
        icon='/media/icons/duotune/art/art002.svg'
      >
        <SidebarMenuItem to='/user' title='User' hasBullet={true} />
        <SidebarMenuItem to='/category' title='Furniture Item' hasBullet={true} />
        <SidebarMenuItem to='/subcategory' title='Furniture Item Type' hasBullet={true} />
        <SidebarMenuItem to='/material' title='Material' hasBullet={true} />
        <SidebarMenuItem to='/product' title='Product' hasBullet={true} />
        <SidebarMenuItem to='/contact' title='Contact' hasBullet={true} />
        <SidebarMenuItem to='/blog' title='Blog' hasBullet={true} />
        <SidebarMenuItem to='/custom' title='Customization' hasBullet={true} />
        <SidebarMenuItem to='/review' title='Review' hasBullet={true} />
        <SidebarMenuItem to='/order' title='Order' hasBullet={true} />
        {/* <SidebarMenuItemWithSub
          to='/dashboard'
          title='Properties'
          icon='/media/icons/duotune/finance/fin001.svg'
        >
          <SidebarMenuItem to='/dashboard' title='Overview' hasBullet={true} />
          <SidebarMenuItem to='/building-dashboard' title='Buildings' hasBullet={true} />
          <SidebarMenuItem to='/community-dashboard' title='Communities' hasBullet={true} />
        </SidebarMenuItemWithSub>
        <SidebarMenuItemWithSub
          to='/tenancies'
          title='Tenancies'
          icon='/media/icons/duotune/finance/fin001.svg'
        >
          <SidebarMenuItem to='/tenancies' title='Tenancies' hasBullet={true} />
        </SidebarMenuItemWithSub> */}
        {/* <SidebarMenuItemWithSub
          to='/tenants'
          title='Tenants'
          icon='/media/icons/duotune/finance/fin001.svg'
        > */}
        {/* <SidebarMenuItem to='/building' title='Overview' hasBullet={true} />
          <SidebarMenuItem to='/building' title='Communities' hasBullet={true} /> */}
        {/* </SidebarMenuItemWithSub> */}
        {/* <SidebarMenuItem to='/area' title='Area' hasBullet={true} />
        <SidebarMenuItem to='/units' title='Units' hasBullet={true} /> */}
        {/* <SidebarMenuItem to='/crafted/pages/profile/documents' title='Documents' hasBullet={true} /> */}
      </SidebarMenuItemWithSub>
      {/* <SidebarMenuItem
        to='/builder'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Layout Builder'
        fontIcon='bi-layers'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to='/crafted/pages'
        title='Pages'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <SidebarMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
          <SidebarMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
          <SidebarMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
          <SidebarMenuItem
            to='/crafted/pages/profile/campaigns'
            title='Campaigns'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/profile/documents'
            title='Documents'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/profile/connections'
            title='Connections'
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>

        <SidebarMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <SidebarMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
          />
          <SidebarMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
        </SidebarMenuItemWithSub>
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        <SidebarMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <SidebarMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/error'
        title='Errors'
        fontIcon='bi-sticky'
        icon='/media/icons/duotune/general/gen040.svg'
      >
        <SidebarMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <SidebarMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-layers'
      >
        <SidebarMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com012.svg'
      >
        <SidebarMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItem
        to='/apps/user-management/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='User management'
        fontIcon='bi-layers'
      />
      <div className='menu-item'>
        <a
          target='_blank'
          className='menu-link'
          href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}
        >
          <span className='menu-icon'>
            <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-2' />
          </span>
          <span className='menu-title'>Changelog {process.env.REACT_APP_VERSION}</span>
        </a>
      </div> */}
    </>
  )
}

export {SidebarMenuMain}
