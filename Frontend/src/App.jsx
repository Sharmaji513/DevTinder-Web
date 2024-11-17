import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Provider} from "react-redux";
import appStore from "./utils/appStore";
import Profile from "./components/Profile/Profile";
import Body from "./components/Body/Body";
import Feed from "./components/Feed/Feed";
import Login from "./components/Login/Login";
import Connections from "./components/Connections/Connections";
import Requests from "./components/Requests/Requests";

function App() {
  return (
    <>
    <Provider store={appStore}>
  
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
            </Route>
        </Routes>
      </BrowserRouter>

    </Provider>
    </>
  );
}

export default App;
