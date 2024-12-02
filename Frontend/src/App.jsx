import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Profile from "./pages/Edit Profile/Profile";
import Body from "./components/Body/Body";
import Feed from "./pages/Explore/Feed";
import Login from "./components/Login/Login";
import Connections from "./pages/Connections/Connections";
import Requests from "./pages/Notifications/Requests";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home";
import Views from "./pages/Views/View";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/view" element={<Views/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
