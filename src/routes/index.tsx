import { checkAdminUser } from 'src/helpers/webstorage';
import App from 'src/App';

export enum Paths {
  home = '/',
  login = "/login",
}

const adminRoutes = [
  {
    path: Paths.home,
    element: App,
  },
  {
    path: Paths.login,
    element: App,
  },
];

export const routes = checkAdminUser() ? adminRoutes : adminRoutes;
