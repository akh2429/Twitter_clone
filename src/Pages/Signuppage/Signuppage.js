import React, { useEffect, useState } from 'react'
import s from "./Signuppage.module.css"
import { useNavigate } from 'react-router-dom'
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import Swal from 'sweetalert2';


function SignupPage() {
    const Navigate = useNavigate()
    const updatedUsers = JSON.parse(localStorage.getItem("User")) || []
    const [Signupuser, setSignupuser] = useState({ id: Math.random(), name: '', phone: '', email: '', password: '', repassword: '', username: '', isLogged: false });
    const [error, setError] = useState(true);
    const [errortxt, setErrorTxt] = useState("");
    const [signUperror, setsignUperror] = useState(false);
    const [signuperrorTxt, setsignuperrorTxt] = useState("");
    const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

    useEffect(() => {
        if (Signupuser.name === '' &&
            Signupuser.phone === '' &&
            Signupuser.email === '' &&
            Signupuser.password === '' &&
            Signupuser.repassword === '' &&
            Signupuser.username === '') { setError(false); }
    }, [Signupuser]);

    useEffect(() => {
        if (Signupuser.name !== '' ||
            Signupuser.phone !== '' ||
            Signupuser.email !== '' ||
            Signupuser.password !== '' ||
            Signupuser.repassword !== '' ||
            Signupuser.username !== '') { setsignUperror(false); }
    }, [Signupuser]);




    function SignupHandler(e) {
        const { name, value } = e.target;
        setSignupuser({ ...Signupuser, [name]: value });
        if (Signupuser.name.length < 2) {
            setError(true);
            setErrorTxt("Name should be more than two character long");
        } else if (Signupuser.phone.length < 9) {
            setError(true);
            setErrorTxt("Phone number should be more than 10 digits");
        } else if (!emailRegex.test(Signupuser.email)) {
            setError(true);
            setErrorTxt("Invalid email");
        } else if (Signupuser.password.length < 5) {
            setError(true);
            setErrorTxt("Length of the password shouldn't be less than 6");
        } else if (Signupuser.password !== Signupuser.repassword) {
            setError(true);
            setErrorTxt("Passwords do not match");
        } else {
            setError(false);
        }
    }




    function SignedUser() {
        if (
            Signupuser.name === '' &&
            Signupuser.phone === '' &&
            Signupuser.email === '' &&
            Signupuser.password === '' &&
            Signupuser.repassword === '' &&
            Signupuser.username === ''
        ) {
            setError(true);
            setErrorTxt("Please fill in at least one field.");
            return;
        }
        const accesstoLS = updatedUsers.find(val => val.email === Signupuser.email)
        if (accesstoLS === undefined) {
            if (error === false) {
                const data = [...updatedUsers, Signupuser];
                localStorage.setItem("User", JSON.stringify(data));
                setsignUperror(false);
                Navigate("/");
                Swal.fire({ title: 'Success!', text: 'Your account has been created.', icon: 'success', confirmButtonText: 'Ok' });
            }
        }
        else {
            setsignUperror(true);
            setsignuperrorTxt("User Already Exist");
            return;
        }
        setSignupuser({ id: Math.random(), name: '', phone: '', email: '', password: '', repassword: '', username: '' });
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
                <div className={s.err}>
                    <p>{error ? errortxt : ""}</p>
                    <p>{signUperror ? signuperrorTxt : ""}</p>
                </div>
                <Button className={s.btnLogin} variant="contained" disableElevation onClick={SignedUser} > Signup </Button>
                <Button className={s.btnSignup} variant="contained" disableElevation onClick={() => Navigate("/")} > Back to Login </Button >


            </form>
        </div>
    </div>)
}
export default SignupPage;