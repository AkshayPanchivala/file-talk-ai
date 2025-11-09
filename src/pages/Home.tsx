import LandingPage from '../components/LandingPage';
import { navigate } from '../components/Router';

const Home = () => {
  const handleGetStarted = () => {
    navigate('/chat');
  };

  return <LandingPage onGetStarted={handleGetStarted} />;
};

export default Home;
