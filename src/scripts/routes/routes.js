import Detail from '../views/pages/detail';
import Login from '../views/pages/login';
import Register from '../views/pages/register';
import Dashboard from '../views/pages/dashboard';

const routes = {
  '/': Login, // default page
  '/register': Register,
  '/detail': Detail,
  '/dashboard': Dashboard,
};

export default routes;
