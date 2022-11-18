import React,{Fragment, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { useAlert } from 'react-alert';
import { DataGrid } from "@material-ui/data-grid";
import { clearErrors, getAllUsers, delateUser } from '../../actions/userAction';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar';
import { Button } from "@material-ui/core";
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai';

import './ProductList.css'
import { DELETE_USER_RESET} from '../../constants/userConstants';













const UsersList = ({history}) => {


      const dispatch = useDispatch()
      const alert = useAlert();

      const {error, users} = useSelector((state)=> state.allUsers);
      const {error: deleteError, isDeleted, message} = useSelector((state)=> state.adminControl);

      const deleteUserHandler = (id) =>{
          dispatch(delateUser(id))
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
              alert.success(message);
              history.push("/admin/users");
              dispatch({type:  DELETE_USER_RESET});
          }

          dispatch(getAllUsers());

      }, [dispatch, alert, error, deleteError, isDeleted, history, message])

      const columns = [
          {field: "id", headerName:"User ID", minWidth: 200, flex: 0.8},
          {field: "email", headerName:"Email", minWidth: 200, flex: 1},
          {field: "name", headerName:"name", minWidth: 150, flex: 0.5},
          {field: "role", headerName:"role", minWidth: 150, flex: 0.3,

            cellClassName: (params)  =>{
              return params.getValue(params.id,"role") === "admin" 
                  ? "greenColor" : "redColor"
              },

          },

          {field: "actions", headerName:"Actions", type:"number", minWidth: 150, flex: 0.3, sortable:false,
              renderCell: (params) => {
                  return(
                      <Fragment>
                          <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                              <AiOutlineEdit size={23}/>
                          </Link>

                          <Button onClick={() => deleteUserHandler(params.getValue(params.id, "id"))}>
                              <AiOutlineDelete size={23} color="tomato"/>
                          </Button>

                      </Fragment>
                  );
              }
          },
      ]

      const rows = [];

      users && 
        users.forEach((user) => {
              rows.push({
                  id: user._id,
                  role: user.role,
                  email: user.email,
                  name: user.name,
              })
          })


  return (

    <Fragment>

      <MetaData title={`All Users - Admin`} />

        <div className='admin-dashboard'>

            <Sidebar/>

            <div className='admin-dashboard-allproducts'>
                
                <div className='admin-dashboard-allproducts-heading'>
                    <h2>All USERS</h2>
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

export default UsersList