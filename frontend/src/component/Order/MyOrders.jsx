import React,{Fragment, useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData'
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import {BsBoxArrowUpRight} from 'react-icons/bs'

import {clearErrors, myOrders} from '../../actions/orderAction'

import './MyOrders.css'







const MyOrders = () => {

    const dispatch = useDispatch()
    const alert = useAlert();

    const {loading, error, orders} = useSelector((state)=> state.myOrders);
    const {user} = useSelector((state)=> state.user);


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

        {field: "actions", headerName: "Actions", type:"number", minWidth: 130, flex:0.3, sortable:false,
         renderCell: (params) => {
            return(
                <Link to={`/order/${params.getValue(params.id, "id")}`} >
                    <div className='goto'>
                        <BsBoxArrowUpRight style={{color:"green"}} size={23} />
                    </div>
                </Link>
            )
         }
        },


    ];

    const rows = [];

    orders && 
    orders.forEach((item, index) => {
        rows.push({
            itemsQty: item.orderItems.length,
            status: item.orderStatus,
            id: item._id,
            amount: item.totalPrice,
        })
    })


    useEffect(() => {
        
    if(error){
        alert.error(error);
        dispatch(clearErrors());
    }
        dispatch(myOrders());
    }, [dispatch, alert, error])

  return (
    <Fragment>

        <MetaData title={`${user.name}s Orders`}/>

        {loading ? <Loader/> : (

            <div className='myorders-table'>

                <DataGrid 
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='myorders-table'
                    autoHeight
                />


                <h2 id='myordersHeading'>{user.name}'s Orders</h2>

            </div>

        ) }

    </Fragment>
  )
}

export default MyOrders