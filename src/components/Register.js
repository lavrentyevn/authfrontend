import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import axios from "../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

export default function Register() {
  const navigate = useNavigate();

  const userRef = useRef();
  const passwordRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      console.log(response.accessToken);
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username taken");
      } else {
        setErrMsg("Registration failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        navigate("/login")
      ) : (
        <div
          className="card col-md-6 offset-md-3 offset-md-3"
          style={{ marginTop: "10px" }}
        >
          <h3 className="text-center">Register</h3>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <p
                ref={errRef}
                className={errMsg ? "alert alert-danger" : "offcanvas"}
              >
                {errMsg}
              </p>
              <label htmlFor="username">
                Username:
                <span className={validName ? "text-success" : "offcanvas"}>
                  <i class="bi bi-check"></i>
                </span>
                <span
                  className={validName || !user ? "offcanvas" : "text-danger"}
                >
                  <i class="bi bi-x"></i>
                </span>
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                className="form-control"
                placeholder="username"
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                style={{ marginBottom: "10px" }}
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName
                    ? "alert alert-secondary"
                    : "offcanvas"
                }
              >
                <i class="bi bi-info-circle"></i>
                4 to 24 characters. <br />
                Must begin with a letter. <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>

              <label htmlFor="password">
                Password:
                <span className={validPwd ? "text-success" : "offcanvas"}>
                  <i class="bi bi-check"></i>
                </span>
                <span
                  className={validPwd || !pwd ? "offcanvas" : "text-danger"}
                >
                  <i class="bi bi-x"></i>
                </span>
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="password"
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                style={{ marginBottom: "10px" }}
              />
              <p
                id="pwdnote"
                className={
                  pwdFocus && !validPwd ? "alert alert-secondary" : "offcanvas"
                }
              >
                <i class="bi bi-info-circle"></i>
                8 to 24 characters. <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
              </p>

              <label htmlFor="confirm_pwd">
                Confirm Password:
                <span
                  className={
                    validMatch && matchPwd ? "text-success" : "offcanvas"
                  }
                >
                  <i class="bi bi-check"></i>
                </span>
                <span
                  className={
                    validMatch || !matchPwd ? "offcanvas" : "text-danger"
                  }
                >
                  <i class="bi bi-x"></i>
                </span>
              </label>
              <input
                type="password"
                id="confirm_pwd"
                className="form-control"
                placeholder="password"
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                style={{ marginBottom: "10px" }}
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch
                    ? "alert alert-secondary"
                    : "offcanvas"
                }
              >
                <i class="bi bi-info-circle"></i>
                Must match the first password input field
              </p>

              <button
                disabled={!validName || !validPwd || !validMatch ? true : false}
                className="btn btn-success"
                style={{ marginTop: "10px", width: "100%" }}
              >
                Sign Up
              </button>
            </form>
            <br />
            <span>Already registered?</span>
            <button
              className="btn btn-info"
              onClick={() => navigate("/login")}
              style={{ marginLeft: "10px" }}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
}
