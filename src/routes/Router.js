import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';



/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')))
const Icons = Loadable(lazy(() => import('../views/icons/Icons')))
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')))
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const CustomerList = Loadable(lazy(() => import('../views/Admin/CustomerList')));
const AgentList = Loadable(lazy(() => import('../views/Admin/AgentList')));
const TransactionList = Loadable(lazy(() => import('../views/Admin/TransactionList')));
const CouponList = Loadable(lazy(() => import('../views/Admin/CouponList')));
const ProductList = Loadable(lazy(() => import('../views/Admin/ProductList')));
const RecordingList = Loadable(lazy(() => import('../views/Admin/RecordingList')));
const OrderList = Loadable(lazy(() => import('../views/Admin/OrderList')));


const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '/icons', exact: true, element: <Icons /> },
      { path: '/ui/typography', exact: true, element: <TypographyPage /> },
      { path: '/ui/shadow', exact: true, element: <Shadow /> },
      //Main Admin Route
      { path: '/userlist', exact: true, element: <CustomerList /> },
      { path: '/agentlist', exact: true, element: <AgentList /> },
      { path: '/transactionrecords', exact: true, element: <TransactionList /> },
      { path: '/discountlist', exact: true, element: <CouponList /> },
      { path: '/productlist', exact: true, element: <ProductList /> },
      { path: '/recordinglist', exact: true, element: <RecordingList /> },
      { path: '/ordermangement', exact: true, element: <OrderList /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
