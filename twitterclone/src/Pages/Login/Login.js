import React, {useState} from 'react'
import l from './Login.module.css'
import { useNavigate } from 'react-router-dom'
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { BsTwitter } from 'react-icons/bs';
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { add_user, add_tweet } from '../../Component/Redux/actions';
import swal from 'sweetalert';

export default function Login() {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [Loginuser, setLoginuser] = useState({ email: '', password: '' });
  const updatedUsers = JSON.parse(localStorage.getItem("User")) || [];
  const [error,setError] =useState("")

  // const schema = yup.object().shape({
  //   name: yup.string().min(4).required(),
  //   username: yup.string().min(3).required().matches(/^[a-zA-Z0-9]{3,15}$/),
  //   phone: yup.string().min(10).max(10),
  //   email: yup.string().email().required(),
  //   password: yup.string().min(6).required(),
  //   repassword :yup.string().min(6).required()
  // });


  async function LoginHandler(e) {
    const { name, value } = e.target;
    if (Loginuser.email.length<5){
      setError("Email must be at least 5 characters")
  }
  else if (Loginuser.password.length<6){
      setError("Password must be at least 6 characters")
  }
    setLoginuser({ ...Loginuser, [name]: value });

  };

  function loggedUser() {
    if(Loginuser.email==="" || Loginuser.password==="") {
      alert("Please fill all fields first")
    }
    else{
    const access = updatedUsers.find(val => val.email === Loginuser.email && val.password === Loginuser.password);
    if (access) {
      dispatch(add_user(access))
      swal("Login Success!!", "You are seccessfully logged in!!", "success");
      Navigate("/Home")
    } else {
      swal("Login Failed!!", "You are not logged in!!", "error");
    }
  }
  };


  return (
    <div className={l.main}>
      <div className={l.box}>
        <form className={l.form} onSubmit={(e) => e.preventDefault()} >
          <div className={l.logo}><BsTwitter /></div>
          <h2>Sign in to Twitter</h2>
          <div>
            <button className={l.connect}><FcGoogle /> Sign in with Google</button>
            <button className={l.connect}><BsApple /> Sign in with Apple</button>
          </div>
          <div className={l.or}>
            <hr />

            <span>or</span>
            <hr />
          </div>
          <div className={l.inputDiv}>
            <TextField className={l.input} type='email' placeholder='Email' onChange={LoginHandler} value={Loginuser.email} name='email' id="outlined-basic" label="Email" variant="outlined" />
          </div>
          <div className={l.inputDiv}>
            <TextField className={l.input} type='password' placeholder='Password' onChange={LoginHandler} value={Loginuser.password} name='password' id="outlined-basic" label="Password" variant="outlined" />
          </div>
          {error && <p className={l.error}>{error}</p>}
          <Button className={l.btnLogin} variant="contained" disableElevation onClick={loggedUser}>
            Log in
          </Button>
          <div>
            <Button className={l.btnSignup} variant="contained" disableElevation onClick={() => Navigate('/Signup')} >Not a User? SignUp!</Button>
          </div>

        </form>

      </div>
    </div >
  )
}
