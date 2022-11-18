import React,{useEffect} from 'react'
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Doughnut, Line} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import {useSelector, useDispatch} from 'react-redux';
import {getAdminProducts } from '../../actions/productAction';
import {getAllOrders} from '../../actions/orderAction';
import {getAllUsers} from '../../actions/userAction';

import './Dashboard.css'








const Dashboard = () => {

  const dispatch = useDispatch()

  const { products} = useSelector((state)=> state.products);
  const { orders} = useSelector((state)=> state.allOrders);
  const {error, users} = useSelector((state)=> state.allUsers);

  let outOfStock = 0;
  
  products &&
    products.forEach((item) => {
      if(item.stock === 0){
        outOfStock += 1;
      }
    })


    useEffect(() => {

      dispatch(getAdminProducts());
      dispatch(getAllOrders())
      dispatch(getAllUsers());

    }, [dispatch])

   let totalAmount  = 0;
   orders && 
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    })

  Chart.register(...registerables);

  const linestate = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: 'Total Amount',
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197,  72, 49)"],
        data: [0, totalAmount],
      }
    ]
  }

  const doughnutState = {
    labels: ["Out Of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#E74C3C", "#273746"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      }
    ]
  }


  return (

    <div className='admin-dashboard'>

        <Sidebar/>

        <div className='admin-dashboard-container'>
            
            <div className='admin-dashboard-heading'>
              <h2>Dashboard</h2>
            </div>

          <div className='admin-dashboard-summary'>

              <div className='admin-dashboard-total-amount'>
                  <p className='admin-dashboard-desc'>Total Amount</p>
                  <p>{totalAmount.toFixed(2.)} PKR</p>
              </div>

            
              <Link to='/admin/products' className='admin-dashboard-total-products'>
                <div className='admin-dashboard-total-products-inner-div'>
                  <p className='admin-dashboard-desc'>Total Products</p>
                  <p>{products && products.length}</p>
                </div>
              </Link>

              <Link to='/admin/orders' className='admin-dashboard-total-orders'>
                <div className='admin-dashboard-total-products-inner-div'>
                  <p className='admin-dashboard-desc'>Total Orders</p>
                  <p>{orders && orders.length}</p>
                </div>
              </Link>

              <Link to='/admin/users' className='admin-dashboard-total-users'>
                <div className='admin-dashboard-total-products-inner-div'>
                  <p className='admin-dashboard-desc'>All Users</p>
                  <p>{users && users.length}</p>
                </div>
              </Link>

            </div>


          <div className='admin-dashboard-charts'>

            <div className='admin-dashboard-linecgart'>
              <h2>Total Revenue</h2>
              <Line data={linestate}/>
            </div>

            <div className='admin-dashboard-piechart'>
              <h2>Stock</h2>
              <Doughnut data={doughnutState }/>
            </div>

          </div>
         

        </div>

    </div>

  )
}

export default Dashboard