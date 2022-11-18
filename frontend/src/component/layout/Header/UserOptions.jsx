import React,{Fragment, useState} from 'react'
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import {useHistory} from 'react-router-dom';

import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Backdrop from "@material-ui/core/Backdrop";
import {useAlert} from 'react-alert';
import {logout} from '../../../actions/userAction'
import { useDispatch, useSelector } from 'react-redux';

import './UserOptions.css'



// 
const UserOptions = ({user}) => {

    const {cartItems} = useSelector((state)=> state.cart);

    const [open, setOpen] = useState(false);
    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();

    const options = [
        {icon: <ListAltIcon/>, name: "Orders", func: orders},
        {icon: <PersonIcon/>, name: "Profile", func: account},
        {icon: <ShoppingCartOutlinedIcon style={{color: cartItems.length > 0 ? "tomato" : "unset"}}/>, name: `Cart(${cartItems.length})`, func: cart},
        {icon: <ExitToAppIcon/>, name: "Logout", func: logourUser},
    ]

    if(user.role === "admin"){
        options.unshift( {icon: <DashboardIcon/>, name: "Admin Panel", func: dashboard})
    }

    function dashboard(){
        history.push("/admin/dashboard");
    }

    function orders(){
        history.push("/orders");
    }

    function cart(){
        history.push("/cart");
    }

    function account(){
        history.push("/account");
    }

    function logourUser(){
        dispatch(logout());
        alert.success("Logout Successfully")
    }


  return (
    <Fragment>
        <Backdrop open={open} style={{zIndex: "10"}}/>
        <SpeedDial
            ariaLabel="SpeedDial toottip example"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            style={{zIndex: "11"}}
            open={open}
            direction="down"
            className='speedDial'
            icon={
                <img
                    className='speedDialIcon'
                    src={user.avatar.url ? user.avatar.url : "/profile.png"}
                    alt="Profile"
                />
            }
        >

           {options.map((item) =>(
            <SpeedDialAction 
                    icon={item.icon} 
                    // tooltipOpen
                    tooltipTitle={item.name} 
                    onClick={item.func}
                    key={item.name}
            />
           ))}
            

        </SpeedDial>

    </Fragment>
  )
}

export default UserOptions