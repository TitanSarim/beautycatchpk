import React,{Fragment, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { useAlert } from 'react-alert';
import { DataGrid } from '@mui/x-data-grid';
import { clearErrors, getAllOrders, deleteOrder} from '../../actions/orderAction';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar';
import Button from '@mui/material/Button';
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai';

import './ProductList.css'
import {DELETE_ORDER_REST } from '../../constants/orderConstants';










const OrderList = ({history}) => {


    const dispatch = useDispatch()
    const alert = useAlert();

    const {error, orders} = useSelector((state)=> state.allOrders);

    const {error: deleteError, isDeleted} = useSelector((state)=> state.order);

    const deleteOrderHandler = (id) =>{
        dispatch(deleteOrder(id))
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
            alert.success("Order Deleted Successfully");
            history.push("/admin/dashboard");
            dispatch({type: DELETE_ORDER_REST});
        }

        dispatch(getAllOrders());

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const columns = [

        {field: "id", headerName: "Order ID", minWidth: 300, flex:1},

        {field: "status", headerName: "Status", minWidth: 140, flex:0.5,
        cellClassName: (params)  =>{
            return params.getValue(params.id,"status") === "Delivered" 
                ? "greenColor" : "redColor"
            },
        },

        {field: "itemsQty", headerName: "Items Qty", type:"number", minWidth: 110, flex:0.3},

        {field: "amount", headerName: "Amount PKR", type:"number", minWidth: 130, flex:0.5},

        {field: "actions", headerName:"Actions", type:"number", minWidth: 150, flex: 0.3, sortable:false,
            renderCell: (params) => {
                return(
                    <Fragment>
                        <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                            <AiOutlineEdit size={23}/>
                        </Link>

                        <Button onClick={() => deleteOrderHandler(params.getValue(params.id, "id"))}>
                            <AiOutlineDelete size={23} color="tomato"/>
                        </Button>

                    </Fragment>
                );
            }
        },
    
    ]

    const rows = [];

    orders && 
        orders.forEach((item) => {
            rows.push({
                id: item._id,
                itemsQty: item.orderItems.length,
                amount: item.totalPrice,
                name: item.name,
                status: item.orderStatus,
            })
        })


  return (
    <Fragment>

    <MetaData title={`All Orders - Admin`} />

        <div className='admin-dashboard'>

            <Sidebar/>

            <div className='admin-dashboard-allproducts'>
                
                <div className='admin-dashboard-allproducts-heading'>
                    <h2>All Orders</h2>
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

    </Fragment>
  )
}

export default OrderList