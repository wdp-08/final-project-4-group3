import Detail from '../views/pages/detail';
import Login from '../views/pages/login';
import Register from '../views/pages/register';
import Dashboard from '../views/pages/dashboard';
import QuizSoal from '../views/pages/quizSoal';

const routes = {
  '/': Login, // default page
  '/register': Register,
  '/detail': Detail,
  '/dashboard': Dashboard,
  '/quiz': QuizSoal,
};

export default routes;
