import React,{Fragment, useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {clearErrors, getUserDetails, updateUser} from '../../actions/userAction';
import {useAlert} from 'react-alert';
import Sidebar from './Sidebar';
import MetaData from '../layout/MetaData';
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import Loader from '../layout/loader/Loader';

import {MdDriveFileRenameOutline, MdMailOutline} from 'react-icons/md';
import {RiUser6Line} from 'react-icons/ri';


import './UpdateUser.css';









const UpdateUser = ({history, match}) => {





    const dispatch = useDispatch();
    const alert = useAlert();
    

    const {loading, error, user} = useSelector((state)=> state.userDetails);

    const {loading: updateLoading, error: updateError, isUpdated} = useSelector((state)=> state.adminControl);

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")


    const userId  = match.params.id


    useEffect(() =>{

        if(user && user._id !== userId){
            dispatch(getUserDetails(userId))
        }else{
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }


        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(updateError){
            alert.error(updateError)
            dispatch(clearErrors())
        }

        if(isUpdated){
            alert.success("User Updated Successfully");
            history.push("/admin/users");
            dispatch({type: UPDATE_USER_RESET});
        }
        
    }, [dispatch, error, alert, history, loading, updateError, updateLoading, isUpdated])


    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

        dispatch(updateUser(userId, myForm))
    }





  return (

    <Fragment>
        
        <MetaData title="Update User"/>

        <div className='admin-dashboard'>
            <Sidebar/>

            <div className='admin-dashboard-newproduct'>

                {loading ? <Loader/> : (
                    
                        <form 
                            encType='multipart/form-data'
                            onSubmit={updateUserSubmitHandler}
                            className='admin-dashboard-updateuser-form'
                        >
    
                            <div className='admin-dashboard-updateUser-heading'>
                                <h2>Update User</h2>
                            </div>
        
                            <div className='admin-dashboard-newproduct-name'>
                                <MdDriveFileRenameOutline size={30} color='tomato'/>
                                <input 
                                    type="text" 
                                    placeholder='User Name'
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}    
                                />
                            </div>
        
                            <div className='admin-dashboard-newproduct-price'>
                                <MdMailOutline size={30} color='tomato'/>
                                <input 
                                    type="text" 
                                    placeholder='User Email'
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}    
                                />
                            </div>
        
                            <div className='admin-dashboard-update-user-role'>
                                <RiUser6Line size={30} color='tomato'/>
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Choose Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
        
        
                            <button 
                                id="createProductBtn"
                                className='admin-dashboard-newproduct-btn'
                                disabled={updateLoading ? true : false || role === "" ? true : false} 
                            >
                                Update User
                            </button>
                        
    
                    </form>
  
                )}
              
            </div>

            
        </div>

    </Fragment>
  )
}

export default UpdateUser