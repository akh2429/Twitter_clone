import React, { useState } from 'react'
import s from "./Signuppage.module.css"
import { useNavigate } from 'react-router-dom'
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
// import * as yup from 'yup'
import swal from 'sweetalert';

// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function SignupPage() {
    const[error, setError]=useState("")
    const Navigate = useNavigate()
    const updatedUsers = JSON.parse(localStorage.getItem("User")) || []
    const [Signupuser, setSignupuser] = useState({ id: Math.random(), name: '', phone: '', email: '', password: '', repassword: '', username: '' });
    function SignupHandler(e) {
        if (Signupuser.name.length<3){
            setError("Name must be at least 3 characters")
        }
        else if (Signupuser.phone.length<10){
            setError("Phone must be at least 10 characters")
        }
        else if (Signupuser.email.length<5){
            setError("Email must be at least 5 characters")
        }
        else if (Signupuser.password.length<6){
            setError("Password must be at least 6 characters")
        }
        else if(Signupuser.password!== Signupuser.repassword){
            setError("Passwords do not match")
        }
        else{
            const { name, value } = e.target;
            setSignupuser({ ...Signupuser, [name]: value });
            Navigate("/login")
        }
        
    }
    async function SignedUser() {
        if(Signupuser.name===""||Signupuser.username===""||Signupuser.email===""||Signupuser.password===""||Signupuser.repassword===""){
            swal("Signup Failed!!", "Please enter all the fields first!!", "error");
        }
        else{
            const data = [...updatedUsers, Signupuser]
            localStorage.setItem("User", JSON.stringify(data));
            setSignupuser({ id: Math.random(), name: '', phone: '', email: '', password: '', repassword: '', username: '' });
            Navigate("/")
        }
    }
    return (<div className={s.main}>
        <div className={s.box}>

            <form className={s.form} onSubmit={(e) => e.preventDefault()} >
                <h2>Create Your Account</h2>
                <TextField className={s.input} id="outlined-basic" label="Name" variant="outlined" type='text' onChange={SignupHandler} value={Signupuser.name} name='name' />
                <TextField className={s.input} id="outlined-basic" label="@UserName" variant="outlined" type='text' onChange={SignupHandler} value={Signupuser.username} name='username' />
                <TextField className={s.input} id="outlined-basic" label="Phone" variant="outlined" type='number' onChange={SignupHandler} value={Signupuser.phone} name='phone' />
                <TextField className={s.input} id="outlined-basic" label="Email" variant="outlined" type='email' onChange={SignupHandler} value={Signupuser.email} name='email' />
                <TextField className={s.input} id="outlined-basic" label="Password" variant="outlined" type='password' onChange={SignupHandler} value={Signupuser.password} name='password' />
                <TextField className={s.input} id="outlined-basic" label="Confirm password" variant="outlined" type='password' onChange={SignupHandler} value={Signupuser.repassword} name='repassword' />
                {error && <p className={s.error}>{error}</p>}
                <Button className={s.btnLogin} variant="contained" disableElevation onClick={SignedUser} > Signup </Button>
                <Button className={s.btnSignup} variant="contained" disableElevation onClick={() => Navigate("/")} > Back to Login </Button >
            </form>
        </div>
    </div>)
}
export default SignupPage;