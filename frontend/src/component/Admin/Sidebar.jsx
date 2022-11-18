import React from 'react'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';

import {MdArrowForwardIos, MdAdd, MdDashboard, MdOutlineRateReview} from 'react-icons/md'
import {IoIosArrowDown} from 'react-icons/io';
import {TiThSmall} from 'react-icons/ti';
import {BsCardList} from 'react-icons/bs';
import {SiGoogleadsense} from 'react-icons/si'
import {FiUsers} from 'react-icons/fi';

import './Sidebar.css'

const Sidebar = () => {
  return (

    <div className='admin-sidebar'>

        <Link  to='/'>
            <img src={logo} alt="Ecommerce" />
        </Link>

        <div className='admin-sidebar-content'>

          <Link to='/admin/dashboard'>
              <p>
                  <MdDashboard size={25}/> Dashboard
              </p>
          </Link>

          <Link>
              <TreeView
                defaultCollapseIcon={<IoIosArrowDown />}
                defaultExpandIcon={<MdArrowForwardIos/>}
              >

                <TreeItem nodeId='1' label="Products">

                    <Link to="/admin/products">
                      <TreeItem nodeId='2' label='All' icon={<TiThSmall/>}/>
                    </Link>

                    <Link to='/admin/product'>
                      <TreeItem nodeId='3' label='Create' icon={<MdAdd/>}/>
                    </Link>

                </TreeItem>

              </TreeView>
          </Link>

          <Link>
              <TreeView
                defaultCollapseIcon={<IoIosArrowDown />}
                defaultExpandIcon={<SiGoogleadsense/>}
              >

                <TreeItem nodeId='1' label="Banner">

                    <Link to="/admin/allbanners">
                      <TreeItem nodeId='2' label='All' icon={<TiThSmall/>}/>
                    </Link>

                    <Link to='/admin/createbanner'>
                      <TreeItem nodeId='3' label='Create' icon={<MdAdd/>}/>
                    </Link>

                </TreeItem>

              </TreeView>
          </Link>

          <Link to='/admin/orders'>
            <p>
              <BsCardList size={25}/>
              Orders
            </p>
          </Link>

          <Link to='/admin/users'>
            <p>
              <FiUsers size={25}/>
              Users
            </p>
          </Link>

          <Link to='/admin/reviews'>
            <p>
              <MdOutlineRateReview size={25}/>
              Reviews
            </p>
          </Link>
        </div>

    </div>

  )
}

export default Sidebar