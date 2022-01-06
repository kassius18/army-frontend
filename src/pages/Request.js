import "./request.scss";
import RequestHeader from "./RequestHeader";
import RequestFooter from "./RequestFooter";
import Entry from "./Entry";

function Request({ request }) {
  const print = () => {
    return null;
  };

  return (
    <>
      <div className="request">
        <table className="table table-striped">
          <RequestHeader />
          <tbody>
            {request.entries.map((entry) => {
              return <Entry entry={entry} key={entry.id} />;
            })}
          </tbody>
        </table>
        <RequestFooter request={request} />
        <button onClick={print}>Print</button>
        <button onClick={print}>Edit</button>
      </div>
    </>
  );
}

export default Request;
