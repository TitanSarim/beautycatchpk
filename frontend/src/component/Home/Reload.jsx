import React from 'react'


import './Reload.css'

const Reload = () => {

    function refreshPage(){
        window.location.reload(false)
    }


  return (

    <div className='reload-btn'>
        <button onClick={refreshPage}>All</button>
    </div>


  )
}

export default Reload