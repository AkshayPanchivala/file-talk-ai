import { useEffect, useState } from 'react';

interface Route {
  path: string;
  component: React.ComponentType<any>;
}

interface RouterProps {
  routes: Route[];
}

export const Router = ({ routes }: RouterProps) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const route = routes.find(r => r.path === currentPath) || routes[0];
  const Component = route.component;

  return <Component />;
};

export const navigate = (path: string) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};
