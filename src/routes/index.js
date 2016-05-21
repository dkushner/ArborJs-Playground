import RootLayout from '../layouts/RootLayout';
import WorkspaceRoute from './Workspace';
import HomeRoute from './Home';

export const createRoutes = (store) => ({
  path: '/',
  component: RootLayout,
  indexRoute: HomeRoute,
  childRoutes: [
    WorkspaceRoute(store)
  ]
});

export default createRoutes;
