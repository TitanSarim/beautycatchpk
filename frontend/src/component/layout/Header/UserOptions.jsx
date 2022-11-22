import React,{Fragment, useState} from 'react'
import {SpeedDial, SpeedDialAction} from '@mui/material';
import {useHistory} from 'react-router-dom';

import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Backdrop from '@mui/material/Backdrop';
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
        {icon: <LogoutIcon/>, name: "Logout", func: logourUser},
    ]

    if(user.role === "admin"){
        options.unshift( {icon: <DashboardRoundedIcon/>, name: "Admin Panel", func: dashboard})
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
        history.push("/login");
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
                    src={"/profile.png"}
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