import Detail from '../views/pages/detail';
import Login from '../views/pages/login';
import Register from '../views/pages/register';
import Dashboard from '../views/pages/dashboard';
import Score from '../views/pages/score';

const routes = {
  '/': Login, // default page
  '/register': Register,
  '/detail': Detail,
  '/dashboard': Dashboard,
  '/score': Score,
};

export default routes;
