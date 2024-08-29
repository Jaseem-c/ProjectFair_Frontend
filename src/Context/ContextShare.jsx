import React, { createContext, useState } from 'react'

export  const addResponseContext=createContext({})
export const updateResponseContext=createContext({})
export const isLoginAuthContext=createContext({})

function ContextShare({children}) {

    const [addResponse,setAddResponse]=useState({})
    const [updateResponse,setUpdateResponse]=useState({})
    const [isLoginStatus,setLoginStatus]=useState(false)
 
    
  return (
    <addResponseContext.Provider value={{addResponse,setAddResponse}}>
       <updateResponseContext.Provider value={{updateResponse}}>
        <isLoginAuthContext.Provider value={{isLoginStatus,setLoginStatus}}> 
          {children}
          </isLoginAuthContext.Provider>

         </updateResponseContext.Provider>
      
    </addResponseContext.Provider>
  
  )
}

export default ContextShare