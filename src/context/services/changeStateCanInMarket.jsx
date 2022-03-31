import axios from "axios"
const baseUrl = "https://cryptocans.io/api/v1/"
const changeStateCanInMarket = async (canId)=>{
    console.log(canId)
    const body = {
        canId:canId.id,
        blockchainStatus: false
    }

   axios.post(baseUrl+"marketplace", body).then((res)=>{
       console.log(res.data.response)
       console.log("termino todo")
       localStorage.removeItem("windowsData")
   }).catch(error => console.log(error))
}
export default changeStateCanInMarket