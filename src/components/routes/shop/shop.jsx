import React, { useContext, useState } from "react";
import sobre1 from "../../../img/sobre.png"
import sobre2 from "../../../img/sobre2.png"
import sobre3 from "../../../img/sobre3.png"
import { DataContext } from "../../../context/DataContext";
import Loader from "../../chunk/loader/loader";
import axios from "axios"
import web3 from "../../../tokens/canes/canes"
import { Contract } from "../../../tokens/canes/canes"

const Shop = () => {
    const { loading, setLoading, wallet, Connect, commonPackagePrice, epicPackagePrice, legendaryPackagePrice } = useContext(DataContext)

    const buyPackage = (packageId, wallet, price) => {
        setLoading(true)
        axios.post("https://cryptocans.io/api/v1/cans/", { id: packageId, wallet }).then((res) => {
            const response = res.data.response
            console.log(response)
            const value = web3.utils.toWei(price, "ether")
            const addressTo = wallet
            const tokenId = response.id.toString()
            const nftType = response.packageId.toString()
            Contract.methods.mint(addressTo, tokenId, nftType).send({ from: wallet, value }).then((res) => {
                console.log(res)
                //actualizo el estado del perro
                console.log(res.transactionHash)
                const hash = res.transactionHash
                axios.patch("https://cryptocans.io/api/v1/cans/" + response.id + "/" + hash).then((res) => {
                    console.log(res.data)
                    alert("Minteo Exitoso")
                    setLoading(false)
                })
            }).catch(error => console.log(error))
        })
    }

    async function timer() {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }
    return (
        <div className="bg-dogs">
            {loading && <Loader />}
           {/*  <button onClick={timer}> timer  </button> */}
            <div className="container py-4">
                <div className="neon">
                    <div className="w-100 ">
                        <div className=" w-100">
                            <div className="row text-center">
                                <div className="col-12 col-sm-6 mb-3 col-md-4">
                                    <div className="nftBg">
                                        <div className="text-center">
                                            <h4 className="text-white">Minted 0 / 1000 </h4>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <div className=" nft-img2">
                                                <img className="nft-img " src={sobre1} alt="" />
                                                <div className="text-right">
                                                    <h3 className="text-warning"> {commonPackagePrice} BNB </h3>
                                                    {loading ? <div className="btn w-100 border"><h4>Loading</h4></div> : <>
                                                        {wallet ?
                                                            <button onClick={() => buyPackage("1", wallet, commonPackagePrice)} className="btn-ccan mt-2 w-100"> Mint </button>
                                                            :
                                                            <button onClick={Connect} className="btn-ccan mt-2 w-100"> Connect </button>}
                                                    </>}
                                                    <div className="percent">
                                                        60% Common<br />
                                                        30% UnCommon<br />
                                                        0.9% Epic<br />
                                                        0.1% Legendary
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 mb-3 col-md-4">
                                    <div className="nftBg">
                                        <div className="text-center">
                                            <h4 className="text-white">Minted 0 / 500 </h4>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <div className=" nft-img2">
                                                <img className="nft-img" src={sobre2} alt="" />
                                                <div className="text-right">
                                                    <h3 className="text-warning"> {epicPackagePrice} BNB </h3>
                                                    {loading ? <div className="btn w-100 border"><h4>Loading</h4></div> : <>
                                                        {wallet ?
                                                            <button onClick={_ => buyPackage(2, wallet, epicPackagePrice)} className="btn-ccan mt-2 w-100"> Mint </button>
                                                            :
                                                            <button onClick={Connect} className="btn-ccan mt-2 w-100"> Connect </button>}
                                                    </>}
                                                    <div className="percent">
                                                        30% Common<br />
                                                        60% UnCommon<br />
                                                        10% Epic<br />
                                                        3% Legendary
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 mb-3 col-md-4">
                                    <div className="nftBg">
                                        <div className="text-center">
                                            <h4 className="text-white">Minted 0 / 250 </h4>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <div className=" nft-img2">

                                                <img className="nft-img" src={sobre3} alt="" />
                                                <div className="text-right">
                                                    <h3 className="text-warning"> {legendaryPackagePrice} BNB </h3>
                                                    {loading ? <div className="btn w-100 border"><h4>Loading</h4></div> : <>
                                                        {wallet ?
                                                            <button onClick={_ => buyPackage(3, wallet, legendaryPackagePrice)} className="btn-ccan mt-2 w-100"> Mint </button>
                                                            :
                                                            <button onClick={Connect} className="btn-ccan mt-2 w-100"> Connect </button>}
                                                    </>}
                                                    <div className="percent">
                                                        0% Common<br />
                                                        60% UnCommon<br />
                                                        30% Epic<br />
                                                        10% Legendary
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Shop