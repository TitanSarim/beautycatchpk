import React from 'react'


const Form = () => {


  return (
    <>
         <h1>Write us</h1>
                  <form action="https://formsubmit.co/beautycatchpk@gmail.com" method="POST">
                    <input type="text" placeholder='Name' required name="user_name"/>
                    <input type="text" placeholder='Email' required name="user_email"/>
                    <input type="number" placeholder='Phone NO' required name="user_number"/>
                    <textarea placeholder='Message' required name="message"/>
                    <input type="submit" value="Send" className='submitbtn'/>
         </form>
    </>
  )
}

export default Form