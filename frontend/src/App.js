import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatpage/Chatpage";
import ProtectedRoute from "./Miscellaneous/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} exact />

        <Route element={<ProtectedRoute />}>
          <Route path="/chats" element={<Chatpage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
