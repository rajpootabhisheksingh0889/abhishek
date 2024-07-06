import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
 
  {
    id: uniqueId(),
    title: 'User List',
    icon: IconLayoutDashboard,
    href: '/userlist',
  },
  {
    id: uniqueId(),
    title: 'Agent List',
    icon: IconLayoutDashboard,
    href: '/agentlist',
  },

  {
    id: uniqueId(),
    title: 'Recording',
    icon: IconLayoutDashboard,
    href: '/recordinglist',
  },

  {
    id: uniqueId(),
    title: 'Product List',
    icon: IconLayoutDashboard,
    href: '/productlist',
  },

  {
    id: uniqueId(),
    title: 'Discount Coupon',
    icon: IconLayoutDashboard,
    href: '/discountlist',
  },
  {
    id: uniqueId(),
    title: 'Order Mangement',
    icon: IconLayoutDashboard,
    href: '/ordermangement',
  },
  {
    id: uniqueId(),
    title: 'Transaction Records',
    icon: IconLayoutDashboard,
    href: '/transactionrecords',
  },
  // {
  //   navlabel: true,
  //   subheader: 'Utilities',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Typography',
  //   icon: IconTypography,
  //   href: '/ui/typography',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Shadow',
  //   icon: IconCopy,
  //   href: '/ui/shadow',
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Auth',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Login',
  //   icon: IconLogin,
  //   href: '/auth/login',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Register',
  //   icon: IconUserPlus,
  //   href: '/auth/register',
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Extra',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Icons',
  //   icon: IconMoodHappy,
  //   href: '/icons',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Sample Page',
  //   icon: IconAperture,
  //   href: '/sample-page',
  // },
];

export default Menuitems;
