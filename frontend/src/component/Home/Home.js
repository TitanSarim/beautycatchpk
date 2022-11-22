import React,{useEffect, Fragment, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getProduct, clearErrors} from '../../actions/productAction';
import Banners from '../banners/Banners'
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';

import Reload from './Reload'
import Loader from '../layout/loader/Loader';
import ProductCard from './ProductCard';
import MetaData from '../layout/MetaData'

import categories from '../../categories'

import "./home.css"






// ====================================
const Home = ({match}) => {

// ==============================================================

    const dispatch = useDispatch();

    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 1000])
    const [category, setCategory] = useState("")

    const {loading, error, products} = useSelector(state=>state.products)

    const keyword = match.params.keyword



    useEffect(() =>{

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch(getProduct(keyword, currentPage, price, category, ));

    }, [dispatch, keyword, currentPage, price, category, alert, error])

// ==============================================================


  return (
    <Fragment>

        {loading ? <Loader/> : 
            <Fragment>

            <MetaData title="BeautyCatch"/>
    
            <div className='home-hero'>

                <div className='filter-box-home'>  
                    <fieldset>   
                    <Typography className='categoryheading-home' component="legend">Categories</Typography>
                    <ul className="categories-home">
                        <li className='category-link-home' >
                            <Reload/>
                        </li>
                        {categories.map((category) => (
                            <li 
                                className='category-link-home' 
                                key={category}
                                onClick={() => setCategory(category)}
                                >
                                {category}
                            </li>
                        ))}
                        
                    </ul>   
                    </fieldset>
                </div>


                <div>
                    <Banners/>
                </div>

            </div>
    
            
            <h2 className='featured-heading'>Featured Products</h2>
    
            <div className="product-container" id='container'>
    
                {products && products.reverse().map((product, index) =>(
                    <ProductCard product={product} key={index}/>
                ))}

            </div>


            <div  className='home-view-allproducts-container'>
                <Link to='/products'>
                    <button className='home-view-allproducts'>
                        Load More
                    </button>
                </Link>
            </div>


            
    
        </Fragment>
        }

    </Fragment>
  )
}

export default Home

