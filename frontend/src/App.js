import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React,{useEffect} from 'react'

import ProdectedRoute from './component/Route/ProdectedRoute';

import Header from './component/layout/Header/Header'
import Nav from './component/layout/Header/Nav';
import Home from './component/Home/Home';
import Footer from './component/layout/Footer/Footer';
// import SubNav from './component/layout/Header/SubNav'
import Profile from './component/user/Profile';
import UpdateUserProfile from './component/user/UpdateUserProfile';
import UpdatePassword from './component/user/UpdatePassword';
import ForgotPassword from './component/user/ForgotPassword';
import ResetPassword from './component/user/ResetPassword';

import Cart from './component/Cart/Cart'
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from './component/Cart/Payment';
import Success from './component/Cart/Success';

import MyOrders from './component/Order/MyOrders';
import MyOrderDetails from './component/Order/MyOrderDetails';

import Dashboard from './component/Admin/Dashboard';
import ProductList from './component/Admin/ProductList';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews.jsx';
import Banner from './component/Admin/Banner';
import NewBanner from './component/Admin/NewBanner';
import BannerList from './component/Admin/BannerList'

import UserOptions from './component/layout/Header/UserOptions'
import ProductDetails from './component/Product/ProductDetails'
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/user/LoginSignUp';
import store from './store'


import About from './component/infopages/About';
import Contact from './component/infopages/Contact';
import Privacy from './component/infopages/Privacy';

import NotFound from './component/Not Found/NotFound';


import './App.css';
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';


function App() {

  const {isAuthenticated, user} = useSelector(state => state.user)

  
  useEffect(() =>{
    store.dispatch(loadUser());
  }, [])


  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (

   <Router>
    <Nav/>
      {/* <SubNav/> */}
      
      <Header/> 

      {isAuthenticated && <UserOptions user={user}/> }



      <Switch>

        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:keyword" component={Products} />
        <Route exact path="/search" component={Search} />

        <Route exact path="/login" component={LoginSignUp}/>
        <ProdectedRoute exact path="/account" component={Profile}/>
        <ProdectedRoute exact path="/me/update" component={UpdateUserProfile}/>
        <ProdectedRoute exact path="/password/update" component={UpdatePassword}/>
        <ProdectedRoute exact path="/shipping" component={Shipping}/>


        <Route exact path="/aboutus" component={About}/>
        <Route exact path="/Contactus" component={Contact}/>
        <Route exact path="/privacy" component={Privacy}/>
        
        
        <ProdectedRoute exact path="/success" component={Success}/>

        <ProdectedRoute exact path="/orders" component={MyOrders}/>


        <ProdectedRoute exact path="/order/confirm" component={ConfirmOrder}/>
        <ProdectedRoute exact path="/order/:id" component={MyOrderDetails}/>
        

        <Route exact path="/password/forgot" component={ForgotPassword}/>
        <Route exact path="/password/reset/:token" component={ResetPassword}/>
        <Route exact path="/password/reset/:token" component={ResetPassword}/>

        <Route exact path="/cart" component={Cart}/>

        

        <ProdectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard}/>
        <ProdectedRoute isAdmin={true} exact path="/admin/products" component={ProductList}/>
        <ProdectedRoute isAdmin={true} exact path="/admin/product" component={NewProduct}/>
        <ProdectedRoute isAdmin={true} exact path="/admin/product/:id" component={UpdateProduct}/>
        <ProdectedRoute isAdmin={true} exact path="/admin/orders" component={OrderList}/>
        <ProdectedRoute isAdmin={true} exact path="/admin/order/:id" component={ProcessOrder}/>
        <ProdectedRoute isAdmin={true} exact path="/admin/users" component={UsersList}/>
        <ProdectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser}/>
        <ProdectedRoute isAdmin={true} exact path="/admin/reviews" component={ProductReviews}/>
        <ProdectedRoute isAdmin={true} exact path="/admin/banner" component={Banner}/>
        <ProdectedRoute isAdmin={true} exact path="/admin/allbanners" component={BannerList}/>
        <ProdectedRoute isAdmin={true} exact path="/admin/createbanner" component={NewBanner}/>


        <Route exact path="/process/payment" component={Payment}/>

        <Route component={window.location.pathname === "/process/payment" ? null : NotFound}/>

      </Switch>

    <Footer/>
   </Router>

  );
}

export default App;
