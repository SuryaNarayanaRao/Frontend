import { Button, TextField } from "@mui/material";
import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Registration() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setconfirmPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [err, setErr] = React.useState("");


  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*Validation part for the Password and posting datas in Mongo DB */

    if (password === confirmPassword) {
      
      try {
        var response = await axios.post(
          "https://backend-musicplayer.herokuapp.com/signup",
          {
            email: email,
            password: password,
            name: name,
          }
        );
        
        if (response.data && email !== "" && password !== "") {
          
          setErr("Please Enter the Details");
          toast.error("Please Fill the correct Details")

          
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }

      
    } else {
      toast.error("Incorrect password")
      setErr("Incorrect Password");
      console.log(err);
    }
  };

  /* Registration return Starts here  */
  return (
    <div className="login" style={{ paddingTop: "30px" }}>
      <h1>Registration Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            type="text"
            name="name"
            label="Name"
            color="success"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>{" "}
        <br />
        <div>
          <TextField
            type="email"
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
          <br />
          <br />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            color="success"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
          <br />
          {err}
        </div>{" "}
        <br />
        <Button variant="contained" type="submit">
          {" "}
          Submit{" "}
        </Button>
        <br /> <br />
      
        <Link to="/">Already Registed? Click to Login</Link>
      </form>
    </div>
  );
}

export default Registration;
