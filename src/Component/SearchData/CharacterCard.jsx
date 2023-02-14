import axios from "axios";
import "../../Css/CharacterCard.scss";
import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md"
import { AiOutlineClose } from "react-icons/ai";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";

function CardDesign({Data}) {
    return (
        <div className="CardDesignBox">
            <img src={Data.Icon} className="CardImage"/>
            {/* <img src="/img/img_profile_awake.png" alt="" className="UnAwakeImage"/> */}
            
            <div className="UnAwakeImage" style={{backgroundImage:`url(/img/img_profile_awake.png)`}}>
                   <div className="AwakeImage" style={{backgroundImage:`url(/img/img_profile_awake.png)`, width: `${Data.AwakeCount * 14}px` }} onClick={() => {console.log(Data.AwakeCount * 12)}}></div>
            </div>                
            <span className="CardName">{Data.Name}</span>
        </div>
    )
}

function CardEffect({Data2}) {

    return (
        <div className="Show_CardEffectText" >
            {Data2[0].Items.map((Data) => 
            <div className="CardEffectTextZone">
                <p className="ActiveSet">{Data.Name.includes("(") !== true ? Data.Name.substr(Data.Name.length - 3, 3) : Data.Name.substr(Data.Name.length - 7, 4)}</p>
                <p className="SetDescription">{Data.Description}</p>
            </div>)}
        </div>
    )
}

function CharacterCard() {
    const [CardInfo, setCardInfo] = useState(null);
    const [EffectInfo, setEffectInfo] = useState(null);
    const [EffectMode, setEffectMode] = useState(false);
    const NickName = useParams();
    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";

    const CardData = async () => {
        try {
            const response = await axios.get(`https://developer-lostark.game.onstove.com/armories/characters/${NickName.searchCharacter}/cards`, {
                headers: {Authorization: `bearer ${Key}`}
            })
            setEffectInfo(response.data.Effects);
            setCardInfo(response.data.Cards);
        } catch(Error) {
            console.log(Error)
        }
    }
    
    useEffect(() => {
        CardData();
    }, [NickName])


    return (
        <div className="CharacterCardBox">
            <div className="TopArea">
                {
                        EffectMode !== true ?
                        <>
                            <p className="GuideText">카드</p>
                            <div className="TopArea_Text" onClick={() => {setEffectMode(!EffectMode);}}>
                                <span className="ActiveEffectName">{EffectInfo !== null ? <p>{EffectInfo[0].Items[EffectInfo[0].Items.length - 1].Name}</p> : "준비중"}</span>
                                <MdOutlineArrowForwardIos className="Icon"/>
                            </div>
                        </> : 
                        <div className="ShowEffect">
                            <div className="TopArea_Text" onClick={() => {setEffectMode(!EffectMode);}}>
                                <span className="ActiveEffectName">{EffectInfo !== null ? <p>{EffectInfo[0].Items[EffectInfo[0].Items.length - 1].Name}</p> : "준비중"}</span>
                            </div>
                            <AiOutlineClose onClick={() => {setEffectMode(!EffectMode)}} className="Icon"/>
                        </div>
                }
               

            </div>

            <hr style={EffectMode === true ? {display: "none"} : {}}/>

            <div className="BottomArea">
                {
                    EffectMode !== true ? CardInfo !== null ? CardInfo.map((Data, index) => <CardDesign Data={Data}/>) : "" : <CardEffect Data2={EffectInfo !== undefined ? EffectInfo : "1"}/>
    }
            </div>  
        </div>
    )
}

export default CharacterCard;