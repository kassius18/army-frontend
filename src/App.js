import ProtocolTable from "./protocol_table/TableStructure";
import "./App.css";

//
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
//

function App() {
  let headerData = {
    militaryUnitMakingRequest: "96 TMXEΘ/ΔΡΙΑ",
    militaryUnitProviding: "96 TMXEΘ/ΔΡΙΑ",
  };
  let rows = [
    {
      nameNumber: "4J6064",
      name: "ΦΙΛΤΡΟ ΣΑΣΜΑΝ",
      mainMaterial: "Π/Θ CAT",
      amountOfOrder: "1",
      unitOfOrder: "τεμ.",
      reasonOfOrder: "04",
      priorityOfOrder: "50",
      observations: "as",
    },
    {
      nameNumber: "4J6064",
      name: "ΦΙΛΤΡΟ ΣΑΣΜΑΝ",
      mainMaterial: "Π/Θ CAT",
      amountOfOrder: "1",
      unitOfOrder: "τεμ.",
      reasonOfOrder: "04",
      priorityOfOrder: "50",
      observations: "",
    },
    {
      nameNumber: "4J6064",
      name: "ΦΙΛΤΡΟ ΣΑΣΜΑΝ",
      mainMaterial: "Π/Θ CAT",
      amountOfOrder: "1",
      unitOfOrder: "τεμ.",
      reasonOfOrder: "04",
      priorityOfOrder: "50",
      observations: "1",
    },
  ];
  let footerData = {};

  const PrintContent = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    return (
      <div>
        <ProtocolTable
          ref={componentRef}
          headerData={headerData}
          rows={rows}
          footerData={footerData}
        />
        <button onClick={handlePrint}>Print this out!</button>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <PrintContent />
    </div>
  );
}

export default App;
