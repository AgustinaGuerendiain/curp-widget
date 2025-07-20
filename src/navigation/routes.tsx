import type { RouteObject } from 'react-router-dom';
import { PATHS } from './paths';
import Home from '../layout/Home';
import { CurpFormPage, PersonalFormPage, ResultPage } from '../pages';
import RedirectToCurp from './RedirectToCurp';

export const routes: RouteObject[] = [
  {
    path: PATHS.ROOT,
    element: <Home />,
    children: [
      {
        index: true,
        element: <RedirectToCurp />,
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
  {
    path: PATHS.RESULTS,
    element: <ResultPage />,
  },
];
