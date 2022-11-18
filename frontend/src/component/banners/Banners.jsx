import React,{useEffect, Fragment, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getBanners, clearErrors} from '../../actions/bannerAction';
import { useAlert } from 'react-alert';
import Carousel from 'react-material-ui-carousel'


import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData'


import './banner.css'





const Banners = () => {

    const dispatch = useDispatch();

    const alert = useAlert();

    const {loading, error, banners} = useSelector(state=>state.Getbanner)
    

    useEffect(() =>{

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch(getBanners());

    }, [dispatch, alert, error])

   const carosel ={
        navButtonsAlwaysVisible: true,
        animation: "fade"
    }

  return (
    <Fragment> 
    
        {loading ? <Loader/> :
        
            <div className='banner-container'>

                

                <div className='banner-carosel'>
                    <Carousel {...carosel}>
                        {banners && 
                            banners.map((banner) => (
                                <div>
                                    {banner.images &&
                                        banner.images.map((item, i) => (
                                            
                                            <img 
                                                className='banner-img-carosel'
                                                key={item.url}
                                                src={item.url}
                                                alt={`${i} Slide`}
                                            />
                                        ))
                                    }
                                </div>
                            ))}
                        </Carousel>
                </div>

            </div>

        }

    </Fragment>   
  )
}

export default Banners