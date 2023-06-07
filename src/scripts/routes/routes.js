import Detail from '../views/pages/detail';
import Login from '../views/pages/login';
import Register from '../views/pages/register';

const routes = {
  '/': Login, // default page
  '/register': Register,
  '/detail': Detail,
};

export default routes;
