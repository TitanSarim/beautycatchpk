import React,{useEffect, Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Pagination from 'react-js-pagination'
import {getProduct, clearErrors} from '../../../actions/productAction';
import { useAlert } from 'react-alert';

import Loader from '../loader/Loader';
import './subNav.css'

const categories =[
    "2 Piece",
    "3 Piece",
    "Towels",
    "Shirts",
    "Genes",
    "Tops",
]

const SubNav = () => {

    const dispatch = useDispatch();

    const alert = useAlert();

    const {loading, error} = useSelector(state=>state.products)

    const [category, setCategory] = useState("")

    useEffect(() =>{

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch(getProduct(category));

    }, [dispatch, category,])

  return (
    <Fragment>

        {loading ? <Loader/> : (
            <div className='subNav-container'>

                    <ul className="subNav-categories">
                        {categories.map((category) => (
                            <li  
                                key={category}
                                onClick={() => setCategory(category)}
                                >
                                {category}
                                </li>
                            ))}     
                    </ul>  
             
            </div>
        )}

    </Fragment>
  )
}

export default SubNav