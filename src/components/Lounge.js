import { Link } from "react-router-dom";
import Users from "./Users";

const Lounge = () => {
  return (
    <div>
      <h1>The Lounge</h1>
      <br />
      <Users />
      <br />
      <Link to="/">Home</Link>
    </div>
  );
};

export default Lounge;
