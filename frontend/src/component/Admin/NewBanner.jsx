

import React,{Fragment, useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {clearErrors, createBanner } from '../../actions/bannerAction';
import {NEW_BANNER_REST } from '../../constants/bannerConstants';
import {useAlert} from 'react-alert';
import Loader from '../layout/loader/Loader'
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar'

import {MdDriveFileRenameOutline} from 'react-icons/md';



import './NewBanner.css'






const NewBanner = ({history}) => {



    const dispatch = useDispatch();
    const alert = useAlert();
    

    const {loading, error, success} = useSelector((state)=> state.newBanner);

    const [name, setName] = useState("")
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([]);



    useEffect(() =>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(success){
            alert.success("Banner updated Successfully");
            history.push("/admin/dashboard");
            dispatch({type: NEW_BANNER_REST});
        }
        
    }, [dispatch, error, alert, history, success, loading])


    const createBannerSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        images.forEach((image) => {
            myForm.append("images", image);
        })

        dispatch(createBanner(myForm))
    }


    const createBannerImageChnage = (e) =>{
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);

        files.forEach((file) =>{
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2){
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            }
            
            reader.readAsDataURL(file);
        })

    }


  return (

    <Fragment>

    <div className='admin-dashboard'>
        <Sidebar/>
    
        {loading ? <Loader/> :

        <div className='admin-dashboard-newbanner'>
                

            <form 
                encType='multipart/form-data'
                onSubmit={createBannerSubmitHandler}
                className='admin-dashboard-newproduct-form'
            >

            <div className='admin-dashboard-newproduct-heading'>
                <h2>Banners</h2>
            </div>

                <div className='admin-dashboard-newbanner-name'>
                
                        <MdDriveFileRenameOutline size={30} color='tomato'/>
                        <input 
                            type="text" 
                            placeholder='Name *'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}    
                        />
                
                </div>

                <div id="createProductFormFile">
                    <input 
                        type="file" 
                        name="products"
                        accept='images'
                        onChange={createBannerImageChnage}
                    />
                </div>

                <div id="createProductFormImage">
                    {imagesPreview.map((image, index) => (
                        <img key={index} alt="Product Preview" src={image} />
                    ))}
                </div>

                <button 
                    id="createProductBtn"
                    className='admin-dashboard-newproduct-btn'
                    disabled={loading ? true : false}
                >
                    Create
                </button>
            

        </form>

    </div>

    } 
       
    </div>

    </Fragment>

  )
}

export default NewBanner