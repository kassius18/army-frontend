import "./App.scss";

import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

function App() {
  let routing = useRoutes(routes);

  // const PrintContent = () => {
  //   const componentRef = useRef();
  //   const handlePrint = useReactToPrint({
  //     content: () => componentRef.current,
  //   });

  //   return (
  //     <div>
  //       <ProtocolTableStructure
  //         ref={componentRef}
  //         headerData={headerData}
  //         rows={rows}
  //         footerData={footerData}
  //       />
  //       <button onClick={handlePrint}>Print this out!</button>
  //     </div>
  //   );
  // };
  //
  //
  // return (
  //   <div>
  //     <ProtocolTableStructure
  //       headerData={headerData}
  //       rows={rows}
  //       footerData={footerData}
  //     />
  //   </div>
  // );

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
