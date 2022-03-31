import perro from '../../img/perro.png'
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
const NftCard = ({ item, setCan, setModalText, setRenderModal }) => {
    const _context = useContext(DataContext)
    return (
        <div onClick={_ => { setCan(item); setRenderModal(true); setModalText("Confirm!") }} className="nftCard">

            <div className="d-flex justify-content-between">
                <div className='button-market px-1'>
                    <img src="" alt="" /> {item.onSale.price} BNB
                </div>
                <div className="px-2 lb-color item-id"> #{item.id} </div>
            </div>
            <div>
                <div className="px-2 lb-color wallet-market">{_context.lastForWallet(item.wallet)}</div>
            </div>
            <div className="text-center">
                <img height="100px" src={perro} alt="" />
            </div>
            <div className="mt-2">
                <div className="p-2 ">
                    <div className="">
                        <div className="lb-color nft-name"> {item.name} </div>
                    </div>
                    <div>
                        <div className='d-flex justify-content-between  align-items-center'>
                            <div className='lb-color '>
                                Acceleration
                                <progress className='' min={"0"} value={item.aceleracion} max={"300"} name="" id="" />
                            </div>
                            <div className='totalStats lb-color'> {item.aceleracion} </div>
                        </div>
                        <div className='d-flex justify-content-between  align-items-center'>
                            <div className='lb-color'>Aerodinamic
                                <div > <progress min={"0"} value={item.aerodinamica} max={"300"} name="" id="" /> </div>

                            </div>
                            <div className='totalStats lb-color'> {item.aerodinamica} </div>
                        </div>
                        <div className='d-flex justify-content-between  align-items-center'>
                            <div className='lb-color'>Resistence
                                <div> <progress min={"0"} value={item.resistencia} max={"300"} name="" id="" /> </div>

                            </div>
                            <div className='totalStats lb-color'> {item.resistencia} </div>
                        </div>

                    </div>
                    <div className="d-flex justify-content-between mt-1">
                        {item.rarity === "1" && <i className="rarity common">Common </i>}
                        {item.rarity === "2" && <i className="rarity rare">Rare </i>}
                        {item.rarity === "3" && <i className="rarity epic">Epic </i>}
                        {item.rarity === "4" && <i className="rarity legendary">Legendary </i>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NftCard