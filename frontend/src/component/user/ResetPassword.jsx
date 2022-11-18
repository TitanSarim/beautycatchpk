import React,{Fragment, useState, useEffect} from 'react'
import Loader from '../layout/loader/Loader';
import {FiLock, FiUnlock} from 'react-icons/fi';
import {MdOutlineVpnKey} from 'react-icons/md'
import {VscEyeClosed, VscEye} from 'react-icons/vsc';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux';
import {clearErrors, resetPassword } from '../../actions/userAction'

import './ResetPassword.css'











const ResetPassword = ({history, match}) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {error, loading, success} = useSelector((state)=> state.forgotPassword)

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // show and hide pass
    const [type, setType] = useState(false);

    const toggle = () => {
        setType(prevState => !prevState);

    }
    

    // updateProfile function
    const resetPasswordSubmit = (e) =>{
        e.preventDefault();

        const myForm = new FormData();


        myForm.set("Password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(match.params.token, myForm))
    }

    useEffect(() =>{


        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success){
            alert.success("Password updated Successfully")

            history.push("/login");
        }

    }, [dispatch, error, alert, history, success])



  return (

    <Fragment>
        
        {loading ? <Loader/> : (
                <Fragment>
                <MetaData  title="Reset Password"/>
                    <div className='resetPassword-container'>
                        <div className='resetPassword-box'>
                            
                          <h2>Reset Password</h2>
    
                            <form className='resetPasswordForm' 
                                    onSubmit={resetPasswordSubmit}
                                >

                                <div className="resetPassword-newPassword">
                                    <FiUnlock size={25}/>
                                    <input 
                                        type={type ? "text" : "password"}
                                        placeholder='New Password'
                                        required
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span className='showhide' onClick={toggle}>
                                        {type ? <VscEye size={22}/> : <VscEyeClosed size={22}/>}
                                    </span>
                                </div>

                                <div className="resetPassword-confirmPassword">
                                    <FiLock size={25}/>
                                    <input 
                                        type={type ? "text" : "password"} 
                                        placeholder='Confirm Password'
                                        required
                                        name="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <span className='showhide' onClick={toggle}>
                                        {type ? <VscEye size={22}/> : <VscEyeClosed size={22}/>}
                                    </span>
                                </div>
    
                                    <input 
                                        type="submit" 
                                        value='Change' 
                                        className='resetPassword-Btn'
                                    />
    
                                </form>
        
                        </div>
                    </div>
            </Fragment>
            )}

    </Fragment>
  )

}

export default ResetPassword