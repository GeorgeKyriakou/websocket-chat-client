import "./App.css";
import { Chat } from "./components/Chat/Chat.component";
import { Main } from "./components/Main/main.component";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/chat" component={Chat}></Route>
        <Route path="/" component={Main}></Route>
      </Switch>
    </Router>
  );
}

export default App;
