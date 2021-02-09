import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home";
//import Footer from './components/footer/footer'
import SearchResult from "./components/search-result/search-result";
import Error from "./components/ErrorScreen/error";
import LoginScreen from "./screens/login-screen";
import ReservationScreen from "./screens/reservation-screen";
import HostingScreen from "./screens/hosting-screen";
import PrivateRoute from "./components/private-route";
import { AuthProvider } from "./context/auth-context";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LoginScreen} />
            <Route exact path="/reservations" component={SearchResult} />
            <PrivateRoute
              path="/reservations/:id"
              component={ReservationScreen}
            />
            <Route path="/hosting" component={HostingScreen} />
            <Route path="*" component={Error} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
};
export default App;
