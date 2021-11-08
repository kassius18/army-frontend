import ProtocolTable from "./protocol_table/TableStructure";
import "./App.css";

function App() {
  let headerData = {};
  let rows = [
    {
      nameNumber: "4J6064",
      name: "ΦΙΛΤΡΟ ΣΑΣΜΑΝ",
      mainMaterial: "Π/Θ CAT",
      amountOfOrder: "1",
      unitOfOrder: "τεμ.",
      reasonOfOrder: "04",
      priorityOfOrder: "50",
    },
    {
      nameNumber: "4J6064",
      name: "ΦΙΛΤΡΟ ΣΑΣΜΑΝ",
      mainMaterial: "Π/Θ CAT",
      amountOfOrder: "1",
      unitOfOrder: "τεμ.",
      reasonOfOrder: "04",
      priorityOfOrder: "50",
    },
  ];
  let footerData = {};

  return (
    <div className="App">
      <header className="App-header"></header>
      <body>
        <ProtocolTable
          headerData={headerData}
          rows={rows}
          footerData={footerData}
        />
      </body>
    </div>
  );
}

export default App;
