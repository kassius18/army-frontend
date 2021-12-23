function RequestFooter({ request }) {
  return (
    <div className="request--footer">
      <div className="request--phi">
        <h3>Φ</h3>
        <h5>{request.firstPartOfPhi}</h5>
        <h5>{request.secondPartOfPhi}</h5>
      </div>
      <div className="request--date">
        <h3>Date</h3>
        <h5>{request.year}</h5>
        <h5>{request.month}</h5>
        <h5>{request.day}</h5>
      </div>
    </div>
  );
}
export default RequestFooter;
