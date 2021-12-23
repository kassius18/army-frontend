import "./request.scss";
import RequestHeader from "./RequestHeader";
import RequestFooter from "./RequestFooter";
import Entry from "./Entry";

function Request({ request }) {
  console.log("inside Request");
  console.log(request);
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
      </div>
    </>
  );
}

export default Request;
