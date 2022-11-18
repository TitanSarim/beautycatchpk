import React,{Fragment, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';
import { DataGrid } from '@mui/x-data-grid';
import { clearErrors, getAdminProducts, deleteProduct } from '../../actions/productAction';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar';
import Button from '@mui/material/Button';
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai';

import './ProductList.css'
import { DELETE_PRODUCT_REST } from '../../constants/productConstants';












const ProductList = ({history}) => {


    const dispatch = useDispatch()
    const alert = useAlert();

    const {loading, error, products} = useSelector((state)=> state.products);
    const {error: deleteError, isDeleted} = useSelector((state)=> state.deleteProduct);

    const deleteProductHandler = (id) =>{
        dispatch(deleteProduct(id))
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
            alert.success("Product Deleted Successfully");
            history.push("/admin/dashboard");
            dispatch({type: DELETE_PRODUCT_REST});
        }

        dispatch(getAdminProducts());

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const columns = [
        {field: "id", headerName:"Product ID", minWidth: 200, flex: 0.5},
        {field: "name", headerName:"Name", minWidth: 350, flex: 1},
        {field: "stock", headerName:"Stock", type:"number", minWidth: 150, flex: 0.3},
        {field: "price", headerName:"Price", type:"number", minWidth: 250, flex: 0.5},
        {field: "actions", headerName:"Actions", type:"number", minWidth: 150, flex: 0.3, sortable:false,
            renderCell: (params) => {
                return(
                    <Fragment>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            <AiOutlineEdit size={23}/>
                        </Link>

                        <Button onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}>
                            <AiOutlineDelete size={23} color="tomato"/>
                        </Button>

                    </Fragment>
                );
            }
        },
    ]

    const rows = [];

    products && 
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.stock,
                price: item.price,
                name: item.name,
            })
        })



  return (
    <Fragment>

        <MetaData title={`All Products - Admin`} />

        {loading ? <Loader/> :
        
            <div className='admin-dashboard'>

                <Sidebar/>

                <div className='admin-dashboard-allproducts'>
                    
                    <div className='admin-dashboard-allproducts-heading'>
                        <h2>All Products</h2>
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

export default ProductList