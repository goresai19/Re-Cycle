import React from 'react'

import ReCycle from './ReCycle';
import {useState} from "react";



function Price() {
    const [price, setPrice] = useState("");

    const fetchPrice = async () => {

      };
  return (
    <>
    <ReCycle/>
     <div className='message'>Thank You!</div>
      
      <div className='message'>For standing up for the planet</div>

      <div className="price-field">
        <div className='message'>Expected Price:</div>
        <input type="text" value={price} disabled />
      </div>

      <button onClick={fetchPrice}>Show price</button>
      

      
    </>
  )
}

export default Price