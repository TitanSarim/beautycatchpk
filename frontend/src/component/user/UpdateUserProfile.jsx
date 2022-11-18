import React,{Fragment, useState, useEffect} from 'react'
import Loader from '../layout/loader/Loader';
import {HiOutlineMail} from 'react-icons/hi'
import {BiUser} from 'react-icons/bi';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux';
import {clearErrors, loadUser, updateProfile } from '../../actions/userAction'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';

import './UpdateProfile.css'


const UpdateUserProfile= ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {user} = useSelector((state)=>state.user)
    const {error, loading, isUpdated} = useSelector((state)=> state.profile)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/profile.png");

    // updateProfile function
    const updateProfileSubmit = (e) =>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        
        dispatch(updateProfile(myForm))
    }

    const updateProfileDataChange = (e) => {
            
            // image uplaod fucntion
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        }

    useEffect(() =>{

        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isUpdated){

            alert.success("Profile updated Successfully")
            dispatch(loadUser())

            history.push("/account");

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }

    }, [dispatch, error, alert, history, user, isUpdated])

  return (
    
        <Fragment>

            {loading ? <Loader/> : (
                <Fragment>
                <MetaData  title="Update Profile"/>
                    <div className='updateProfile-container'>
                        <div className='updateProfile-box'>
                            
                        <h2>Update Profile</h2>
    
                            <form className='updateProfileForm' 
                                    encType="multipart/form-data"
                                    onSubmit={updateProfileSubmit}
                                >
    
                                    <div className="updateProfileName">
                                        <BiUser size={28}/>
                                        <input 
                                            type="text" 
                                            placeholder='Your Name'
                                            required
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
    
                                    <div className="updateProfileEmail">
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
    
                                    
    
                                    <div id="updateProfileImage">
                                        <img src={avatarPreview} alt="Avatar Preview" />
                                        <input 
                                            type="file"
                                            name="avatar"
                                            accept="image"
                                            onChange={updateProfileDataChange} 
                                        />
                                    </div>
    
                                    <input 
                                        type="submit" 
                                        value='Update' 
                                        className='updateProfileBtn'
                                    />
    
                                </form>
        
                        </div>
                    </div>
            </Fragment>
            )}

        </Fragment>
  )
}

export default UpdateUserProfile