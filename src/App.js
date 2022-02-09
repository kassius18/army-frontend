import "./App.scss";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import Context from "context/AppContext";

function App() {
  let routing = useRoutes(routes);

  return (
    <Context>
      <div className="App">
        <header className="App-header"></header>
        {routing}
      </div>
    </Context>
  );
}

export default App;
