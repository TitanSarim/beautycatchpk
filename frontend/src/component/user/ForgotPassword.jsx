import React,{Fragment, useState, useEffect} from 'react'
import Loader from '../layout/loader/Loader';
import {HiOutlineMail} from 'react-icons/hi'
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux';
import {clearErrors, forgotPassword } from '../../actions/userAction'


import './ForgotPassword.css'

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {error, loading, message} = useSelector((state)=> state.forgotPassword)

    const [email, setEmail] = useState("")


    // Forgot password submit form
    const forgotPasswordSubmit = (e) =>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("email", email);
            
        dispatch(forgotPassword(myForm))
    }

    useEffect(() =>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(message){
            alert.success("message")
        }

    }, [dispatch, error, alert, message])

  return (
    <Fragment>

        {loading ? <Loader/> : (
            <Fragment>
            <MetaData  title="Forgot Password"/>
                <div className='forgotPassword-container'>
                    <div className='Forgot-Password'>
    
                    <h2>Forgot Password</h2>
    
                        <form className='forgotPasswordForm' 
                                onSubmit={forgotPasswordSubmit}
                            >
    
                            <div className="forgotPasswordEmail">
                                <HiOutlineMail size={28}/>
                                <input 
                                    type="email" 
                                    placeholder='Your Email'
                                    required
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
    
    
                            <input 
                                type="submit" 
                                value='Send' 
                                className='forgotPasswordBtn'
                            />
    
                        </form>
    
                </div>
            </div>
        </Fragment>
        )}

    </Fragment>
  )
}

export default ForgotPassword