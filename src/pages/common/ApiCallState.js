import ClipLoader from "react-spinners/ClipLoader";
import { BsCheckLg } from "react-icons/bs";
import { VscError } from "react-icons/vsc";

function ApiCallState({ postRequestState }) {
  switch (postRequestState) {
    case "loading":
      return <ClipLoader />;
    case "sucess":
      return <BsCheckLg />;
    case "failure":
      return <VscError />;
    default:
      return null;
  }
}
export default ApiCallState;
