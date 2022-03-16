import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Alert } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginComponent() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const [errorOccur, seterrorOccur] = React.useState(false);

  /* Username Password Validation */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (email === "" || password === "") {
        // toast.error("Please Enter valid Details");
        seterrorOccur(true);
      } else {
        var response = await axios.post("https://backend-musicplayer.herokuapp.com/signin", {
          email: email,
          password: password,
        });
        if (response) {
          toast.success("sucessfully logged in");
        }

        if (response.data) {
          await localStorage.setItem("token", response.data);
          await localStorage.setItem("userEmail", email);

          navigate("/home");
        }
      }
    } catch (err) {
      toast.error("Invalid Credentials");
      console.log(err);
    }
  };

  // console.log(email, password);

  /*Login return Starts Here */
  return (
    <div style={{}} className="login">
      <Typography variant="h4" component="div" paddingTop="30px">
        {" "}
        LoginPage{" "}
      </Typography>{" "}
      <br /> <br />
      {errorOccur && (
        <Alert severity="error" style={{ width: "30%" }}>
          Please enter email/password!
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            type="text"
            name="email"
            label="Email"
            color="success"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>{" "}
        <br />
        <div>
          <TextField
            label="Password"
            type="password"
            name="password"
            color="success"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>{" "}
        <br />
        <Button variant="contained" type="submit">
          {" "}
          Login{" "}
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Button>
        <br />
        <Button
          onClick={() => {
            navigate("/register");
          }}
        >
          {" "}
          New user? Register
        </Button>
      </form>
    </div>
  );
}

export default LoginComponent;
