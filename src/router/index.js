import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../components/auth/Login";
import Home from "../components/Home/Home";
import Movie from "../components/Movie/Movie";
import MovieModify from "../components/Movie/MovieModify";
import User from "../components/User/User";
import { HOME, LOGIN, MOVIE, MOVIE_MODIFY, USER } from "../config/path";
import Cookies from "cookies-js";


const AppRouter = () => {
  if (Cookies.get("token")) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer' + Cookies.get("token")
}
  return (
    <Router>
      <Switch>
        <Route path={HOME} exact>
          <Home />
        </Route>
        <Route path={USER} exact>
          <User />
        </Route>
        <Route path={MOVIE} exact>
          <Movie />
        </Route>
        <Route path={MOVIE_MODIFY} exact>
          <MovieModify />
        </Route>
        <Route path={LOGIN}>
          <Login/>

        </Route>
      </Switch>
    </Router>
  );
};
export default AppRouter;
