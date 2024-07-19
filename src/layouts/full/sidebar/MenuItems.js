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
];

const Menuitems1 = [
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
    title: 'Chat',
    icon: IconLayoutDashboard,
    href: '/chat',
  },
  {
    id: uniqueId(),
    title: 'Product',
    icon: IconLayoutDashboard,
    href: '/agentlist',
  },

  {
    id: uniqueId(),
    title: 'Order History',
    icon: IconLayoutDashboard,
    href: '/orderhistory',
  },

  {
    id: uniqueId(),
    title: 'Subscription',
    icon: IconLayoutDashboard,
    href: '/productlist',
  },

 
];

const Menuitems2 = [
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
    title: 'Call History',
    icon: IconLayoutDashboard,
    href: '/Abhi Agent',
  },
  {
    id: uniqueId(),
    title: 'Chat',
    icon: IconLayoutDashboard,
    href: '/agentlist',
  },

  {
    id: uniqueId(),
    title: 'Reports',
    icon: IconLayoutDashboard,
    href: '/recordinglist',
  },

  
];

const getMenuItems = () => {
  const userType = localStorage.getItem('user_type');
  console.log(`User type: ${userType}`); // Debugging line
  switch (userType) {
    case 'AD':
      return Menuitems;
    case 'CU':
      return Menuitems1;
    case 'AG':
      return Menuitems2;
    default:
      return []; // Always return an array
  }
};

export default getMenuItems;
