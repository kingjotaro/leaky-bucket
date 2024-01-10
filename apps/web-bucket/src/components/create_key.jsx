import React from 'react'
import verify from '../routes/verify'
import { useState } from 'react';




function create_key() {

  const [text, SetText] = useState('')

async function create() {
  const { status } = await verify();
  if (status === 200) {
   SetText('Key verified')
  }
 }

  return (
    <div>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg" 
    onClick={create}>Create Key or Verify Key</button>
   
   {text && (
    <p className={text.includes('Key')  ? 'text-green' : 'hidden'}>{text} </p>
   )}
   
  </div>
  )
}

export default create_key