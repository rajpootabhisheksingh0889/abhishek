import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute component

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
const MyProfile = Loadable(lazy(() => import('../views/Admin/MyProfile')));

const CustomerDashboard = Loadable(lazy(() => import('../views/Customer/CustomerDashboard')));
const AgentDashboard = Loadable(lazy(() => import('../views/Agent/AgentDashboard')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      {
        path: '/dashboard',
        exact: true,
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: '/sample-page',
        exact: true,
        element: (
          <PrivateRoute>
            <SamplePage />
          </PrivateRoute>
        ),
      },
      {
        path: '/icons',
        exact: true,
        element: (
          <PrivateRoute>
            <Icons />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui/typography',
        exact: true,
        element: (
          <PrivateRoute>
            <TypographyPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui/shadow',
        exact: true,
        element: (
          <PrivateRoute>
            <Shadow />
          </PrivateRoute>
        ),
      },
      //Main Admin Route
      {
        path: '/userlist',
        exact: true,
        element: (
          <PrivateRoute>
            <CustomerList />
          </PrivateRoute>
        ),
      },
      {
        path: '/agentlist',
        exact: true,
        element: (
          <PrivateRoute>
            <AgentList />
          </PrivateRoute>
        ),
      },
      {
        path: '/transactionrecords',
        exact: true,
        element: (
          <PrivateRoute>
            <TransactionList />
          </PrivateRoute>
        ),
      },
      {
        path: '/discountlist',
        exact: true,
        element: (
          <PrivateRoute>
            <CouponList />
          </PrivateRoute>
        ),
      },
      {
        path: '/productlist',
        exact: true,
        element: (
          <PrivateRoute>
            <ProductList />
          </PrivateRoute>
        ),
      },
      {
        path: '/recordinglist',
        exact: true,
        element: (
          <PrivateRoute>
            <RecordingList />
          </PrivateRoute>
        ),
      },
      {
        path: '/ordermangement',
        exact: true,
        element: (
          <PrivateRoute>
            <OrderList />
          </PrivateRoute>
        ),
      },
      {
        path: '/profile',
        exact: true,
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: '/customerdashboard',
        exact: true,
        element: (
          <PrivateRoute>
            <CustomerDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: '/agentdashbaord',
        exact: true,
        element: (
          <PrivateRoute>
            <AgentDashboard />
          </PrivateRoute>
        ),
      },
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
