import axios from "axios"


export const commonApi= async(reqMethod,url,reqBody,reqHeader)=>{

    const reqConfig={
        method:reqMethod,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"}
    }

   return await axios(reqConfig).then((result)=>{
       return result
    }).catch((err)=>{
       return(err)
    })
}