import React,{Fragment, useState, useEffect} from 'react'
import Loader from '../layout/loader/Loader';
import {FiLock, FiUnlock} from 'react-icons/fi';
import {MdOutlineVpnKey} from 'react-icons/md'
import {VscEyeClosed, VscEye} from 'react-icons/vsc';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux';
import {clearErrors, updatePassword } from '../../actions/userAction'
import {UPDATE_PASSWORD_RESET } from '../../constants/userConstants';

import './UpdatePassword.css'


const UpdatePassword = ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {error, loading, isUpdated} = useSelector((state)=> state.profile)

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // show and hide pass
    const [type, setType] = useState(false);

    const toggle = () => {
        setType(prevState => !prevState);

    }
    

    // updateProfile function
    const updatePasswordSubmit = (e) =>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm))
    }

    useEffect(() =>{


        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isUpdated){
            alert.success("Password updated Successfully")

            history.push("/account");

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

    }, [dispatch, error, alert, history, isUpdated])


  return (
    <Fragment>
        
        {loading ? <Loader/> : (
                <Fragment>
                <MetaData  title="Change Password"/>
                    <div className='updatePassword-container'>
                        <div className='updatePassword-box'>
                            
                          <h2>Update Password</h2>
    
                            <form className='updatePasswordForm' 
                                    onSubmit={updatePasswordSubmit}
                                >

                                <div className="updatePassword-oldPassword">
                                    <MdOutlineVpnKey size={25}/>
                                    <input 
                                        type={type ? "text" : "password"}
                                        placeholder='Old Password '
                                        required
                                        name="password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                    <span className='showhide' onClick={toggle}>
                                        {type ? <VscEye size={22}/> : <VscEyeClosed size={22}/>}
                                    </span>
                                </div>

                                <div className="updatePassword-newPassword">
                                    <FiUnlock size={25}/>
                                    <input 
                                        type={type ? "text" : "password"}
                                        placeholder='New Password'
                                        required
                                        name="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <span className='showhide' onClick={toggle}>
                                        {type ? <VscEye size={22}/> : <VscEyeClosed size={22}/>}
                                    </span>
                                </div>

                                <div className="updatePassword-confirmPassword">
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
                                        className='updatePassword-Btn'
                                    />
    
                                </form>
        
                        </div>
                    </div>
            </Fragment>
            )}

    </Fragment>
  )
}

export default UpdatePassword