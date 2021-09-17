//    === ROUTER ===
import { BrowserRouter, Switch, Route } from "react-router-dom";

//    === COMPONENTS ===
import Navigation from "./components/navigation/Navigation";

//    === PAGES ===
import Home from "./page/home/Home";
import Register from "./page/register/Register";
import Login from "./page/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
