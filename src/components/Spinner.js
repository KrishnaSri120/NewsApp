import React, { Component } from 'react'
import loading from '../loading.gif'
const Spinner = () => {
  return (
    <div className='text-center'>
      <img src={loading} className='my-3' style={{ height: '60px' }} alt="loading"></img>
    </div>
  )
}
export default Spinner
