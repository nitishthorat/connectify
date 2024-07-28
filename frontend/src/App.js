import { Route } from "react-router-dom";
import "./App.scss";
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatpage/Chatpage";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} />
    </div>
  );
}

export default App;
