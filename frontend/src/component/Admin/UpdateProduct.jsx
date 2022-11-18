import React,{Fragment, useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {clearErrors, updateProduct, getProductDetails } from '../../actions/productAction';
import { UPDATE_PRODUCT_REST } from '../../constants/productConstants';
import {useAlert} from 'react-alert';
import Sidebar from './Sidebar';
import MetaData from '../layout/MetaData';



import './UpdateProduct.css'

const UpdateProduct = ({history, match}) => {


    
    const dispatch = useDispatch();
    const alert = useAlert();
    

    const {loading, error: updateError, isUpdated} = useSelector((state)=> state.updateProduct);
    const {error, product} = useSelector((state)=> state.productDetails);

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [descriptiona, setDescriptionA] = useState("")
    const [descriptionb, setDescriptionB] = useState("")
    const [descriptionc, setDescriptionC] = useState("")
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState("")
    const [images, setImages] = useState([])
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);


    const categories =[
        "2 Piece",
        "3 Piece",
        "Towels",
        "Shirts",
        "Genes",
        "Tops",
    ]

    const productId = match.params.id;

    useEffect(() =>{

        if(product && product._id !== productId){
            dispatch(getProductDetails(productId))
        }else{
            setName(product.name);
            setDescription(product.description);
            setDescriptionA(product.descriptionA);
            setDescriptionB(product.descriptionB);
            setDescriptionC(product.descriptionC);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.stock);
            setImages(product.images);
            setOldImages(product.images);
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
            alert.success("Product updated Successfully");
            history.push("/admin/products");
            dispatch({type: UPDATE_PRODUCT_REST});
        }
        
    }, [dispatch, error, alert, history, loading, isUpdated, productId, product, updateError])


    const updateProductSubmitHandler = (e) => {
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

        dispatch(updateProduct(productId, myForm))
    }


    const updateProductImageChnage = (e) =>{
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

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
        
        <MetaData title="Update Product"/>

        <div className='admin-dashboard'>
            <Sidebar/>

            <div className='admin-dashboard-updateproduct'>

                <form 
                    encType='multipart/form-data'
                    onSubmit={updateProductSubmitHandler}
                    className='admin-dashboard-updateproduct-form'
                >

                    <div className='admin-dashboard-updateproduct-heading'>
                        <h2>Create Product</h2>
                    </div>

                    <div className='admin-dashboard-updateproduct-name'>
                        <input 
                            type="text" 
                            placeholder='Product Name'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}    
                        />
                    </div>

                    <div className='admin-dashboard-updateproduct-price'>
                        <input 
                            type="number" 
                            placeholder='Product Price'
                            value={price}
                            required
                            onChange={(e) => setPrice(e.target.value)}    
                        />
                    </div>


                    {/*Description Starts  */}
                    <div className='admin-dashboard-updateproduct-description'>

                        <textarea 
                            cols="30" 
                            rows="1" 
                            placeholder="Product Description" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </textarea>
                    </div>

                    
                     <div className='admin-dashboard-updateproduct-description'>

                        <textarea 
                            cols="30" 
                            rows="1" 
                            placeholder="Product Description" 
                            value={descriptiona} 
                            onChange={(e) => setDescriptionA(e.target.value)}
                        >
                        </textarea>
                    </div>

                     <div className='admin-dashboard-updateproduct-description'>

                        <textarea 
                            cols="30" 
                            rows="1" 
                            placeholder="Product Description" 
                            value={descriptionb} 
                            onChange={(e) => setDescriptionB(e.target.value)}
                        >
                        </textarea>
                    </div>

                     <div className='admin-dashboard-updateproduct-description'>

                        <textarea 
                            cols="30" 
                            rows="1" 
                            placeholder="Product Description" 
                            value={descriptionc} 
                            onChange={(e) => setDescriptionC(e.target.value)}
                        >
                        </textarea>
                    </div>


                    {/* Description Ends */}
                    <div className='admin-dashboard-updateproduct-categories'>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Choose Category</option>
                            {categories.map((cate) =>(
                                <option value={cate} key={cate}>
                                    {cate}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='admin-dashboard-updateproduct-stock'>
                        <input 
                                type="number" 
                                placeholder='Stock'
                                value={stock}
                                required
                                onChange={(e) => setStock(e.target.value)}    
                        />
                    </div>

                    <div id="createProductFormFile">
                        <input 
                            type="file" 
                            name="avatar"
                            accept='image'
                            multiple
                            onChange={updateProductImageChnage}
                        />
                    </div>


                    <div id="createProductFormImage">
                        {oldImages && oldImages.map((image, index) => (
                            <img key={index}  src={image.url} alt="Old Product Preview" />
                        ))}
                    </div>


                    <div id="createProductFormImage">
                        {imagesPreview.map((image, index) => (
                            <img key={index} alt="Product Preview" src={image} />
                        ))}
                    </div>

                    

                    <button 
                        id="createProductBtn"
                        className='admin-dashboard-updateproduct-btn'
                        disabled={loading ? true : false}
                    >
                        Update Product
                    </button>
                    

                </form>

            </div>

            
        </div>

    </Fragment>
  )
}

export default UpdateProduct