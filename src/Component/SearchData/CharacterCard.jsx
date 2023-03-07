import axios from "axios";
import "../../Css/CharacterCard.scss";
import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md"
import { AiOutlineClose } from "react-icons/ai";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";

function NoCardDesign({})
{
    return (
        <div className="NoCardDesignBox">
            <img src="" className="CardImage"/>
            {/* <img src="/img/img_profile_awake.png" alt="" className="UnAwakeImage"/> */}            
        </div>
    )
}

function CardDesign({Data}) {

    console.log(Data.Grade);

    let GradeNumber = 0;
    // 카드 등급에 따라 GradeNumber를 지정해줍니다.
    switch(Data.Grade)
    {
        case "일반" : 
            GradeNumber = 0;
            break;
        case "고급" :
            GradeNumber = 1;
            break;
        case "희귀" : 
            GradeNumber = 2;
            break;
        case "영웅" : 
            GradeNumber = 3;
            break;
        case "전설" : 
            GradeNumber = 4;
            break;
        default: 
            GradeNumber = 0;
            break;
    }

    return (
        <div className="CardBox">
            <div className="CardDesignBox">
                <div className="CardGrade" style={{backgroundPosition: `-${107 * GradeNumber}px 0`}}></div>
                <img src={Data.Icon} className="CardImage"/>
                {/* <img src="/img/img_profile_awake.png" alt="" className="UnAwakeImage"/> */}
                
                <div className="UnAwakeImage" style={{backgroundImage:`url(/img/img_profile_awake.png)`}}>
                    <div className="AwakeImage" style={{backgroundImage:`url(/img/img_profile_awake.png)`, width: `${Data.AwakeCount * 14}px` }} onClick={() => {console.log(Data.AwakeCount * 12)}}></div>
                </div>                
            </div>

             <p className="CardName">{Data.Name}</p>
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
    const [CardInfo, setCardInfo] = useState(null); // 카드에 대한 정보를 저장하는 변수입니다.
    const [EffectInfo, setEffectInfo] = useState(null);
    const [EffectMode, setEffectMode] = useState(false);
    const NoCardInfo = [1, 2, 3, 4, 5, 6];
    const NickName = useParams();
    
    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";

    const CardData = async () => {
        try {

            let Test = [];

            const response = await axios.get(`https://developer-lostark.game.onstove.com/armories/characters/${NickName.searchCharacter}/cards`, {
                headers: {Authorization: `bearer ${Key}`}
            })
            console.log(response.data);
            if(response.data !== null)
            {
                setEffectInfo(response.data.Effects);
            
                for(let i = 0; i < 6; i++)
                {
                    if(response.data.Cards[i] !== undefined)
                    {
                        Test.push(response.data.Cards[i]);
                    } else {
                        Test.push("");
                    }
                }
                console.log(Test);
                setCardInfo(Test);
            } else if (response.data === null)
            {
             setEffectInfo(null);
             setCardInfo(null)
            }
            
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
                                <span className="ActiveEffectName">{EffectInfo !== null ? <p>{EffectInfo[0].Items[EffectInfo[0].Items.length - 1].Name}</p> : ""}</span>
                                <MdOutlineArrowForwardIos className="Icon"/>
                            </div>
                        </> : 
                        <div className="ShowEffect">
                            <div className="TopArea_Text" onClick={() => {setEffectMode(!EffectMode);}}>
                                <span className="ActiveEffectName">{EffectInfo !== null ? <p>{EffectInfo[0].Items[EffectInfo[0].Items.length - 1].Name}</p> : ""}</span>
                            </div>
                            <AiOutlineClose onClick={() => {setEffectMode(!EffectMode)}} className="Icon"/>
                        </div>
                }
               

            </div>

            <hr style={EffectMode === true ? {display: "none"} : {}}/>

            <div className="BottomArea">
                {
                    EffectMode !== true ? 
                        CardInfo !== null ? 
                            CardInfo.map((Data, index) => {
                                if(Data !== "")
                                {
                                    return (
                                        <CardDesign Data={Data} key={index} />
                                    )
                                } else if(Data === "")
                                {
                                    return (
                                        <NoCardDesign />
                                    )
                                }
                            }) : 
                            NoCardInfo.map((Data, index) => <NoCardDesign key={index}/>) : 
                            EffectMode === true && CardInfo !== null ?  <CardEffect Data2={EffectInfo !== undefined ? EffectInfo : "1"}/> : ""
                }
            </div>  
        </div>
    )
}

export default CharacterCard;