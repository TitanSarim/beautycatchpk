import React,{Fragment, useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {clearErrors, createProduct } from '../../actions/productAction';
import { NEW_PRODUCT_REST } from '../../constants/productConstants';
import {useAlert} from 'react-alert';
import Sidebar from './Sidebar';
import MetaData from '../layout/MetaData';

import {MdDriveFileRenameOutline, MdPriceCheck} from 'react-icons/md';
import {TbFileDescription} from 'react-icons/tb';
import {BiCategory} from 'react-icons/bi';
import {AiOutlineStock} from 'react-icons/ai';
import categories from '../../categories'

import './NewProduct.css'









const NewProduct = ({history}) => {

    

    const dispatch = useDispatch();
    const alert = useAlert();
    

    const {loading, error, success} = useSelector((state)=> state.newProduct);

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [descriptiona, setDescriptionA] = useState("")
    const [descriptionb, setDescriptionB] = useState("")
    const [descriptionc, setDescriptionC] = useState("")
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState("")
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([]);


  

    useEffect(() =>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(success){
            alert.success("Product updated Successfully");
            history.push("/admin/dashboard");
            dispatch({type: NEW_PRODUCT_REST});
        }
        
    }, [dispatch, error, alert, history, success, loading])


    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("descriptionA", descriptiona);
        myForm.set("descriptionB", descriptionb);
        myForm.set("descriptionC", descriptionc);
        myForm.set("category", category);
        myForm.set("stock", stock);

        images.forEach((image) => {
            myForm.append("images", image);
        })

        dispatch(createProduct(myForm))
    }


    const createProductImageChnage = (e) =>{
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


  return(
    <Fragment>
        
        <MetaData title="Create Product"/>

        <div className='admin-dashboard'>
            <Sidebar/>

            <div className='admin-dashboard-newproduct'>

                <form 
                    encType='multipart/form-data'
                    onSubmit={createProductSubmitHandler}
                    className='admin-dashboard-newproduct-form'
                >

                    <div className='admin-dashboard-newproduct-heading'>
                        <h2>Create Product</h2>
                    </div>

                    <div className='admin-dashboard-newproduct-name'>
                        <MdDriveFileRenameOutline size={30} color='tomato'/>
                        <input 
                            type="text" 
                            placeholder='Product Name'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}    
                        />
                    </div>

                    <div className='admin-dashboard-newproduct-price'>
                        <MdPriceCheck size={30} color='tomato'/>
                        <input 
                            type="number" 
                            placeholder='Product Price'
                            required
                            onChange={(e) => setPrice(e.target.value)}    
                        />
                    </div>

                    {/* DISCRIPTIONS START  */}
                    <div className='admin-dashboard-newproduct-description'>
                        <TbFileDescription size={33} color='tomato'/>
                        <textarea 
                            cols="30" 
                            rows="1" 
                            placeholder="Product Description" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </textarea>
                    </div>


                     <div className='admin-dashboard-newproduct-description'>
                        <TbFileDescription size={33} color='tomato'/>
                        <textarea 
                            cols="30" 
                            rows="1" 
                            placeholder="Product Description" 
                            value={descriptiona} 
                            onChange={(e) => setDescriptionA(e.target.value)}
                        >
                        </textarea>
                    </div>

                     <div className='admin-dashboard-newproduct-description'>
                        <TbFileDescription size={33} color='tomato'/>
                        <textarea 
                            cols="30" 
                            rows="1" 
                            placeholder="Product Description" 
                            value={descriptionb} 
                            onChange={(e) => setDescriptionB(e.target.value)}
                        >
                        </textarea>
                    </div>

                     <div className='admin-dashboard-newproduct-description'>
                        <TbFileDescription size={33} color='tomato'/>
                        <textarea 
                            cols="30" 
                            rows="1" 
                            placeholder="Product Description" 
                            value={descriptionc} 
                            onChange={(e) => setDescriptionC(e.target.value)}
                        >
                        </textarea>
                    </div>


                    {/* DISCRIPTIONS ENDS  */}

                    <div className='admin-dashboard-newproduct-categories'>
                        <BiCategory size={30} color='tomato'/>
                        <select onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Choose Category</option>
                            {categories.map((cate) =>(
                                <option value={cate} key={cate}>
                                    {cate}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='admin-dashboard-newproduct-stock'>
                        <AiOutlineStock size={33} color='tomato'/>
                        <input 
                                type="number" 
                                placeholder='Stock'
                                required
                                onChange={(e) => setStock(e.target.value)}    
                        />
                    </div>

                    <div id="createProductFormFile">
                        <input 
                            type="file" 
                            name="products"
                            accept='images'
                            multiple
                            onChange={createProductImageChnage}
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

            
        </div>

    </Fragment>
  )
}


export default NewProduct