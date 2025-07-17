
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { PATHS } from './paths';
import Home from '../layout/Home';
import { CurpFormPage, PersonalFormPage } from '../pages';


export const routes: RouteObject[] = [
  {
    path: PATHS.ROOT,
    element: <Home />,
    children: [
      {
        index: true,
        element: <Navigate to={PATHS.CURP} />,
      },
      {
        path: PATHS.CURP,
        element: <CurpFormPage />,
      },
      {
        path: PATHS.PERSONAL,
        element: <PersonalFormPage />,
      },
    ],
  },
];
