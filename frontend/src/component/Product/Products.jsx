import React,{useEffect, Fragment, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Pagination from 'react-js-pagination'
import {getProduct, clearErrors} from '../../actions/productAction';
import { Slider } from '@mui/material';
import Typography from '@mui/material/Typography';
import {MdFilterList} from 'react-icons/md'
import { useAlert } from 'react-alert';

import Loader from '../layout/loader/Loader';
import AllProductsCard from './AllProductsCard';
import MetaData from '../layout/MetaData'
import categories from '../../categories'


import './Products.css'
import Reload from '../Home/Reload';
import Banners from '../banners/Banners';


const Products = ({match}) => {

    const dispatch = useDispatch();

    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 1000])
    const [category, setCategory] = useState("")
    const [ratings, setRatings] = useState(0)

    const {loading, error, products, productCount, resultPerPage, filteredProductsCount} = useSelector(state=>state.products)

    const keyword = match.params.keyword

    const setCurrentPageNo = (e) =>{
        setCurrentPage(e)
    }
    const PriceHandler= (event, newPrice) => {
       
        setPrice(newPrice)
    }

    let count = filteredProductsCount;

    useEffect(() =>{

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch(getProduct(keyword, currentPage, price, category, ratings));

    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error])

    

  return (
    <Fragment>

        {loading ? <Loader/> : (
            
            <Fragment>

                <MetaData title="PRODUCTS -- ECOMMERCE"/>

                <div>
                    <Banners/>
                </div>

                <h2 className='products-headeing'>All Products</h2>

            <div className='products-container'>
                <div className='products-wrapper'>

                    {/* filters */}
                    <div className='filter-box'>
                        
                        <span>Filters <MdFilterList size={25}/></span>

                        <fieldset>
                            <Typography className='categoryheading' component="legend">Price</Typography>
                            <Slider
                                value={price}
                                onChange={PriceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={1000}
                            />
                        </fieldset>

                            
                        <fieldset>   
                        <Typography className='categoryheading' component="legend">Categories</Typography>
                        <ul className="categories">
                                <li className='category-link' >
                                    <Reload/>
                                </li>
                            {categories.map((category) => (
                                <li 
                                    className='category-link' 
                                    key={category}
                                    onClick={() => setCategory(category)}
                                    >
                                    {category}
                                </li>
                            ))}     
                        </ul>   
                        </fieldset>

                        <fieldset>
                                <Typography className='categoryheading' component="legend">Ratings</Typography>
                                <Slider
                                    value={ratings}
                                    onChange={(e, newRating) =>{
                                        setRatings(newRating);
                                    }}
                                    aria-labelledby="continuous-Slider"
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={5}
                                />
                        </fieldset>  

                    </div>

                    {/* products */}

                    <div className='products'> 
                        {products && 
                            products.map((product) =>(
                                <AllProductsCard key={product._id} product={product}/>
                            ))}
                    </div>

                </div>

            </div>
                    
                {resultPerPage < count && (
                    <div className='pagination'>
                    <Pagination 
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="Last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"
                    />
                </div>
                )}

            </Fragment>
            
        )}

    </Fragment>
  )
}

export default Products