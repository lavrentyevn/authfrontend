import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function LinkPage() {
  const { setAuth } = useAuth();

  return (
    <div>
      <h1>Links</h1>
      <br />
      <h2>Public</h2>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>
      <br />
      <h2>Private</h2>
      <Link to="/">Home</Link>
      <br />
      <Link to="/lounge">Lounge</Link>
    </div>
  );
}
