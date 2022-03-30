import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../components/auth/Login";
import Home from "../components/Home/Home";
import Movie from "../components/Movie/Movie";
import User from "../components/User/User";
import {
  ADVERTISEMENT,
  ADVERTISEMENT_CREATE,
  HOME,
  LOGIN,
  MOVIE,
  MOVIE_CREATE,
  MOVIE_UPDATE,
  ROOM,
  ROOM_CREATE,
  SEAT,
  SEAT_CREATE,
  SHOWTIME,
  SHOWTIME_CREATE,
  USER,
} from "../config/path";
import Cookies from "cookies-js";
import { isLogin } from "../config/function";
import { Redirect } from "react-router-dom";
import Advertisement from "../components/Advertisement/Advertisement";
import MovieCreate from "../components/Movie/MovieCreate";
import MovieUpdate from "../components/Movie/MovieUpdate";
import AdvertisementCreate from "../components/Advertisement/AdvertisementCreate";
import Room from "../components/Room/Room";
import RoomCreate from "../components/Room/RoomCreate";
import Seat from "../components/Seat/Seat";
import SeatCreate from "../components/Seat/SeatCreate";
import ShowTime from "../components/Showtime/Showtime";
import ShowTimeCreate from "../components/Showtime/ShowtimeCreate";

const AppRouter = () => {
  if (Cookies.get("token")) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer" + Cookies.get("token");
  }
  return (
    <Router>
      <Switch>
        <Route
          path={HOME}
          exact
          component={() => (!isLogin() ? <Redirect to={LOGIN} /> : <Home />)}
        />
        <Route
          path={USER}
          exact
          component={() => (!isLogin() ? <Redirect to={LOGIN} /> : <User />)}
        />
        <Route
          path={LOGIN}
          component={() => (isLogin() ? <Redirect to={HOME} /> : <Login />)}
        />
        {/*Route movie :*/}
        <Route
          path={MOVIE}
          exact
          component={() => (!isLogin() ? <Redirect to={LOGIN} /> : <Movie />)}
        />
        <Route
          path={MOVIE_CREATE}
          exact
          component={() =>
            !isLogin() ? <Redirect to={LOGIN} /> : <MovieCreate />
          }
        />
        <Route
          path={MOVIE_UPDATE}
          exact
          component={() =>
            !isLogin() ? <Redirect to={LOGIN} /> : <MovieUpdate />
          }
        />
        {/*Route advertisement :*/}
        <Route
          path={ADVERTISEMENT}
          component={() =>
            !isLogin() ? <Redirect to={LOGIN} /> : <Advertisement />
          }
        />
        <Route
          path={ADVERTISEMENT_CREATE}
          exact
          component={() =>
            !isLogin() ? <Redirect to={LOGIN} /> : <AdvertisementCreate />
          }
        />
        {/*Route room :*/}
        <Route
          path={ROOM}
          component={() => (!isLogin() ? <Redirect to={LOGIN} /> : <Room />)}
        />
        <Route
          path={ROOM_CREATE}
          exact
          component={() =>
            !isLogin() ? <Redirect to={LOGIN} /> : <RoomCreate />
          }
        />
        <Route
          path={SEAT}
          exact
          component={() =>
            !isLogin() ? <Redirect to={LOGIN} /> : <Seat />
          }
        />
        <Route
          path={SEAT_CREATE}
          exact
          component={() =>
            !isLogin() ? <Redirect to={LOGIN} /> : <SeatCreate />
          }
        />
        <Route
          path={SHOWTIME}
          exact
          component={() =>
            !isLogin() ? <Redirect to={LOGIN} /> : <ShowTime />
          }
        />
        <Route
          path={SHOWTIME_CREATE}
          exact
          component={() =>
            !isLogin() ? <Redirect to={LOGIN} /> : <ShowTimeCreate />
          }
        />
      </Switch>
    </Router>
  );
};
export default AppRouter;
