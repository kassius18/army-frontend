import "./App.scss";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

function App() {
  let routing = useRoutes(routes);

  return (
    <div className="App">
      <header className="App-header"></header>
      {
        // <PrintContent />
      }
      {routing}
    </div>
  );
}

export default App;
