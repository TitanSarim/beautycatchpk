import React,{useEffect, Fragment, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {clearErrors, getAdminBanners, deleteBanner } from '../../actions/bannerAction';
import { DELETE_BANNNER_REST} from '../../constants/bannerConstants'
import { useAlert } from 'react-alert';
import Sidebar from './Sidebar';
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import {AiOutlineDelete} from 'react-icons/ai';

import Loader from '../layout/loader/Loader';



const BannerList = ({history}) => {

  const dispatch = useDispatch();

    const alert = useAlert();

    const {loading, error, banners} = useSelector(state=>state.Getbanner)
    const {error: deleteError, isDeleted} = useSelector((state)=> state.deleteBanner);


    const deleteBannerHandler = (id) =>{
        dispatch(deleteBanner(id))
    }


    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(deleteError){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(isDeleted){
            alert.success("Banner Deleted Successfully");
            history.push("/admin/dashboard");
            dispatch({type: DELETE_BANNNER_REST});
        }

        dispatch(getAdminBanners());

    }, [dispatch, alert, error, deleteError, isDeleted, history])


    const columns = [
      {field: "id", headerName:"Banner ID", minWidth: 200, flex: 0.5},
      {field: "name", headerName:"Name", minWidth: 350, flex: 1},
      {field: "actions", headerName:"Actions", type:"number", minWidth: 150, flex: 0.3, sortable:false,
          renderCell: (params) => {
              return(
                  <Fragment>
                      {/* <Link to={`/admin/banners/${params.getValue(params.id, "id")}`}>
                          <AiOutlineEdit size={23}/>
                      </Link> */}

                      <Button onClick={() => deleteBannerHandler(params.getValue(params.id, "id"))}>
                          <AiOutlineDelete size={23} color="tomato"/>
                      </Button>

                  </Fragment>
              );
          }
      },
  ]

  const rows = [];

  banners && 
    banners.forEach((item) => {
          rows.push({
              id: item._id,
              name: item.name,
          })
      })



  return (
    
    <Fragment>

      {loading ? <Loader/> :
      
        <div className='admin-dashboard'>
          <Sidebar/>

          <div className='admin-dashboard-allproducts'>
                    
                    <div className='admin-dashboard-allproducts-heading'>
                        <h2>All Banners</h2>
                    </div>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className=''
                        autoHeight
                    />
                    
          </div>
        
        
        </div>
      }


    </Fragment>

  )
}

export default BannerList