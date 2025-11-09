import { Router } from "./components/Router";
import Home from "./pages/Home";
import ChatApp from "./pages/ChatApp";

function App() {
  const routes = [
    { path: "/", component: Home },
    { path: "/chat", component: ChatApp },
  ];

  return <Router routes={routes} />;
}

export default App;