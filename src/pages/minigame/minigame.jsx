import { useContext, useEffect, useState } from "react"
import axios from "axios"
import t1 from '../../img/tikets/t1.png'
import t2 from '../../img/tikets/t2.png'
import t3 from '../../img/tikets/t3.png'
import t4 from '../../img/tikets/t4.png'
import v1 from '../../img/tikets/v1.png'
import v2 from '../../img/tikets/v2.png'
import v3 from '../../img/tikets/v3.png'
import v4 from '../../img/tikets/v4.png'
import { DataContext } from "../../context/DataContext"
import w3S from "../../services/w3S"
import enviroment from "../../env"
import '../../css/pages/minigame.scss'
import Loader from '../../components/loader/loader'
import ticketImg from '../../img/tikets/ticket.png'
import passTicket from '../../img/tikets/pass.png'
const Minigame = () => {

    const { wallet, tiket, pass, exectConnect,setLoading,loading } = useContext(DataContext)
    const [codes, setCodes] = useState(false)
    const [tiket1, setTiket1] = useState(false)
    const [tiket2, setTiket2] = useState(false)
    const [tiket3, setTiket3] = useState(false)
    const [tiket4, setTiket4] = useState(false)
    const [modalFinding, setModalFinding] = useState(false)
    const [modalInfo, setModalInfo] = useState(false)
    const [finding, setFinding] = useState(false)
    const [finded, setFinded] = useState([])
    const [alertTicket, setAlertTicket] = useState({ status: false, title: "", btn: "" })

    useEffect(() => {
        generateCodes()
    }, [])

    const generateCodes = () => {
        let aux = []
        for (let i = 1; i <= 400; i++) {
            aux.push(i)
        }
        setCodes(aux)
    }

    const verify = async () => {
        setLoading(true)
        const account = await w3S.requestAccounts()
        const _wallet = account[0]
        const body = { wallet: _wallet }
        const res = await axios.post(enviroment().baseurl + "codes/verify", body)
        console.log(res.data.response)
        if (res.data.response == "Add Pass") {
            setTiket1(false)
            setTiket2(false)
            setTiket3(false)
            setTiket4(false)
            generateCodes()
            await exectConnect()
            setLoading(false)
            handlertAlert(true, "Pass added succesfully", "Continue");
        } else {
            alert("Failed to get pass")
        }
    }

    const renderBoxes = (finding) => {
        let aux = finded
        aux.push(finding)
        setFinded(aux)
        generateCodes()
    }

    const find = async (item) => {
        const body = { wallet, code: item }
        try {
            const res = await axios.post(enviroment().baseurl + "codes", body)
            const validate = res.data.response
            if (validate.result) {
                if (validate.key === "a") setTiket1(true)
                if (validate.key === "b") setTiket2(true)
                if (validate.key === "c") setTiket3(true)
                if (validate.key === "d") setTiket4(true)
                renderBoxes(finding)
                setLoading(false);
            } else {
                setLoading(false);
                handlertAlert(true, "😬 Bab Luck", "Continue");
            }
        } catch (error) {
            console.log(error)
        }
        /*  const res = await service.find(i)
         console.log("res:",res) */
        /*  validateArray[res]() */
    }

    const playGame = (item) => {
        if (tiket != false && tiket > 0) {
            setFinding(item)
            setModalFinding(true)
        } else {
            setAlertTicket(true, "You don't have a ticket, buy in the shop", "OK")
        }
    }

    const handlertAlert = (status = false, title = "", btn = "") => {
        setAlertTicket({
            status,
            title,
            btn
        })
    }

    return (<>
        {loading && <Loader />}
        {alertTicket.status && <div className="modalX">
            <div className="">
                <div className="w-100 d-flex align-items-center justify-content-center h-100">
                    <div className="text-center w-100">
                        <h1>
                            {alertTicket.title}
                        </h1>
                        <button className="w-100 btn btn-primary" onClick={() => handlertAlert(false, "", "")}> {alertTicket.btn} </button>
                    </div>
                </div>
            </div>
        </div>}

        {modalInfo && <div className="modalX">
            <div className="modalInfoMinigame">
                <div className="text-center p-4">
                    <img src="https://www.gitbook.com/cdn-cgi/image/width=40,height=40,fit=contain,dpr=1,format=auto/https%3A%2F%2F3560466799-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FvdVUvBGUcENGvjpmxl0I%252Ficon%252FsEeQ2Ok9hqgKz7s54DHm%252Flogo.png%3Falt%3Dmedia%26token%3D5aa3fb3c-cf78-4d0c-b397-c31cfd419ab9" />
                    <div className="infoText p-4">
                        <p>Participate together with other players in the search for the pieces of lost tickets.</p>
                        <p>Search inside all the boxes and find the four parts of the ticket, join them to obtain a Race Pass and you will have the right to participate in the races with your dogs in the different game modes or you can also sell them in the market to other players.</p>
                    </div>
                    <div className="pt-4">
                        <button onClick={() => setModalInfo(false)} className="btn btn-primary">It is understood! </button>
                    </div>
                </div>
            </div>
        </div>}
        {modalFinding && <div className="modalX">
            <div className="">
                <div className="w-100 d-flex align-items-center justify-content-center h-100">
                    <div className="text-center w-100">
                        <h1>
                            {finding && finding}
                        </h1>
                        <button className="w-100 btn btn-primary" onClick={() => { find(finding); setModalFinding(false); setLoading(true) }}> Good Look </button>
                    </div>
                </div>
            </div>
        </div>}
        <div className="">
            <div className="container-fluid">
                <div className="text-center">
                    <h3>
                        find the hidden ticket
                    </h3>
                    {/*  <div>
                        Tickets: {tiket && tiket} -
                        Race Pass: {pass && pass}
                    </div> */}
                </div>
                <div className="row p-3">
                    <div className="col-12 col-md-3">
                        <div className="conteinert-fluid">
                            <div className="row">
                                <div className='col-md-6 col-12 mb-3'>
                                    <div className='itemSection'>
                                        <div className='inItem'>
                                            <img height={"30px"} src={passTicket} alt="" />
                                            <div className='numberItemMinigame'> {pass & pass} </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6 col-12 mb-3'>
                                    <div className='itemSection'>
                                        <div className='inItem'>
                                            <img height={"30px"} src={ticketImg} alt="" />
                                            <div className='numberItemMinigame'> {tiket & tiket} </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="w-50">
                                {tiket1 ? <img src={v1} className="w-100" alt="" /> : <img src={t1} className="w-100" alt="" />}
                            </div>
                            <div className="w-50">
                                {tiket2 ? <img src={v2} className="w-100" alt="" /> : <img src={t2} className="w-100" alt="" />}
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="w-50">
                                {tiket3 ? <img src={v3} className="w-100" alt="" /> : <img src={t3} className="w-100" alt="" />}
                            </div>
                            <div className="w-50">
                                {tiket4 ? <img src={v4} className="w-100" alt="" /> : <img src={t4} className="w-100" alt="" />}
                            </div>
                        </div>
                        <div>
                            {tiket1 && tiket2 && tiket3 && tiket4 ?
                                <button onClick={() => verify()} className="btn w-100 mt-3 btn-primary"> Verify </button> :
                                <button disabled className="btn btn-secondary w-100 mt-3" >  Verify </button>
                            }
                        </div>
                        <div className="pt-4 text-center">
                            <span className="m-2">Info</span>
                            <button onClick={() => setModalInfo(true)} className="infoBtn"> ! </button>
                        </div>
                    </div>
                    <div className="col-12 col-md-9">
                        <div className="">
                            {codes && codes.map((item) =>
                                finded.includes(item) ?
                                    <button key={item} className="boxyMinigame boxy1  text-white">
                                        {item}
                                    </button>
                                    :
                                    <button key={item} onClick={() => playGame(item)} className="boxyMinigame boxy2 text-white">
                                        {item}
                                    </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default Minigame
/* 
const codes = {
    1: 145,
    2: 45,
    3: 1,
    4: 456,
    5: 12,
    6: 20,
    7: 32,
    8: 45
} */