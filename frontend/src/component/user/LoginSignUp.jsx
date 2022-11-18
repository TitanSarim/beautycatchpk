import React,{Fragment, useRef, useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Loader from '../layout/loader/Loader';
import {HiOutlineMail} from 'react-icons/hi'
import {FiLock} from 'react-icons/fi';
import {BiUser} from 'react-icons/bi';
import {VscEyeClosed, VscEye} from 'react-icons/vsc';
import { useAlert } from 'react-alert';

import { useDispatch, useSelector } from 'react-redux';
import {clearErrors, login, userRegistration} from '../../actions/userAction'

import './LoginSignUp.css'

const LoginSignUp = ({history,location}) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {error, loading, isAuthenticated} = useSelector((state)=>state.user)

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const  switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser]  = useState({
        name: "",
        email: "",
        password: "",
    });

    const {name, email, password} = user;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/profile.png");

    // login function
    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword))
    }

    // register function
    const registerSubmit = (e) =>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email.toLowerCase());
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        
        dispatch(userRegistration(myForm))
    }

    const registerDataChange = (e) => {
        if(e.target.name === "avatar"){
            
            // image uplaod fucntion
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        }else{
            setUser({...user, [e.target.name]: e.target.value})
        }
    }

    // for checkout from cart
    const redirect = location.search ? location.search.split("=")[1] :  "/account"

    useEffect(() =>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isAuthenticated){
            history.push(redirect);
        }

    }, [dispatch, error, alert, history, isAuthenticated, redirect])


    // toggle function
    const  switchTabs = (e, tab) =>{
        if(tab === "login"){
            switcherTab.current.classList.add("shiftToNutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }

        if(tab === "register"){
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNutral");

            registerTab.current.classList.add("shiftToNutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    } 

// show and hide pass
    const [type, setType] = useState(false);

    const toggle = () => {
        setType(prevState => !prevState);

    }

  return (
    <Fragment>

        {loading ? <Loader/> : 

            <Fragment>
                <div className='loginsign-container'>
                    <div className='loginsign-box'>

                        <div>
                            <div className="login-signUp-toggle">
                                <p onClick={(e) => switchTabs(e, "login")}>Login</p>
                                <p onClick={(e) => switchTabs(e, "register")}>Register</p>
                            </div>
                            <button ref={switcherTab}></button>
                        </div>


                        {/* Login form */}
                        <form className='loginform' ref={loginTab} onSubmit={loginSubmit}>
                            <div className='loginEmail'>
                                <HiOutlineMail size={28}/>
                                <input 
                                    type="email" 
                                    placeholder='Email' 
                                    required 
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value.toLowerCase())}
                                />
                            </div>

                            <div className='loginPassword'>
                                <FiLock size={25}/>
                                <input 
                                    type={type ? "text" : "password"}
                                    placeholder='Password'
                                    required
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />

                                <span className='showhide' onClick={toggle}>
                                        {type ? <VscEye size={22}/> : <VscEyeClosed size={22}/>}
                                </span>

                            </div>

                            <Link to="/password/forgot" className='forgot-password'>Forgot Password</Link>
                            <input type="submit" value="Login" className='login-Btn' />

                        </form>

                        {/* register form */}

                        <form className='signupForm' 
                            ref={registerTab}
                            encType="multipart/form-data"
                            onSubmit={registerSubmit}
                        >

                            <div className="signUpName">
                                <BiUser size={28}/>
                                <input 
                                    type="text" 
                                    placeholder='Your Name'
                                    required
                                    name="name"
                                    value={name}
                                    onChange={registerDataChange}
                                />
                            </div>

                            <div className="signUpEmail">
                                <HiOutlineMail size={28}/>
                                <input 
                                    type="email" 
                                    placeholder='Your Email'
                                    required
                                    name="email"
                                    value={email}
                                    onChange={registerDataChange}
                                />
                            </div>

                            <div className="signUpPassword">
                                <FiLock size={25}/>
                                <input 
                                    type={type ? "text" : "password"} 
                                    placeholder='Password ... '
                                    required
                                    name="password"
                                    value={password}
                                    onChange={registerDataChange}
                                />
                                <span className='showhide' onClick={toggle}>
                                        {type ? <VscEye size={22}/> : <VscEyeClosed size={22}/>}
                                </span>
                            </div>

                            <div id="registerImage">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input 
                                    type="file"
                                    name="avatar"
                                    accept="image"
                                    onChange={registerDataChange} 
                                />
                            </div>

                            <input 
                                type="submit" 
                                value='Register' 
                                className='signUpBtn'
                                // disabled={loading ? true : false}
                            />

                        </form>


                    </div>
                </div>
            </Fragment>

        }

    </Fragment>
  )
}

export default LoginSignUp