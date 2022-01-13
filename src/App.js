import "./App.scss";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import Context from "./context/RequestContext";

function App() {
  let routing = useRoutes(routes);

  return (
    <div className="App">
      <Context>
        <header className="App-header"></header>
        {
          // <PrintContent />
        }
        {routing}
      </Context>
    </div>
  );
}

export default App;
