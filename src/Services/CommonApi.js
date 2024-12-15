import axios from "axios";

const CommonApi=async(httpMethod,url,reqBody,reqHeader)=>{
    const reqConfig={
        method:httpMethod,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"}
    }
    return await axios(reqConfig).then(res=>{
        return res
    }).catch(err=>{
        return err
    })
}
   

export default CommonApi