import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/linkpage");
  };

  return (
    <div>
      <h1>Home</h1>
      <br />
      <p>Welcome, {auth?.user}</p>
      <br />
      <Link to="/lounge">Go to the Lounge</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <br />
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default Home;
