import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../Css/CharacterEquipment.scss";

function EquipentArea({EquipmentData, Data, index}) {

    const [BackColorStyle, setBackColorStyle] = useState(null);
    const [FontColorStyle, setFontColorStyle] = useState(null);
    const [LvValue, setLvValue] = useState(null);
    const [QualityValue, setQualityValue] = useState(null)
    const [QualityColor, setQualityColor] = useState(null);
    const [AbilityStoneNumber, setAbilityStoneNumber] = useState([]);
    const NickName = useParams();

    useEffect(() => {
        switch(Data.Grade)
        {
            case "에스더" :
                setBackColorStyle('linear-gradient(135deg,#0c2e2c,#2faba8)');
                setFontColorStyle('#1AB9B6');
                break;
            case "고대" : 
                setBackColorStyle('linear-gradient(135deg,#3d3325,#dcc999)');
                setFontColorStyle('#D9AB48');
                break;
            case "유물" : 
                setBackColorStyle('linear-gradient(135deg,#341a09,#a24006)');
                setFontColorStyle('#FA5D00');
                break;
            case "전설" : 
                setBackColorStyle('linear-gradient(135deg,#362003,#9e5f04)');
                setFontColorStyle('#F9AE00');
                break;
            case "영웅" : 
                setBackColorStyle('linear-gradient(135deg,#261331,#480d5d)');
                setFontColorStyle('#8045DD');
                break;

            case "희귀" :
                setBackColorStyle('linear-gradient(135deg,#111f2c,#113d5d)');
                setFontColorStyle('#2AB1F6');
                break;

            case "고급" : 
                setBackColorStyle('linear-gradient(135deg,#18220b,#304911)');
                setFontColorStyle('#93BC46');
                break;
            default: 
                break;
        }
        
        setLvValue(Data.Tooltip.substr(Data.Tooltip.indexOf("세트 효과 레벨") + 66, 4));
        setQualityValue(parseInt(Data.Tooltip.substr(Data.Tooltip.indexOf('qualityValue') + 15, 3)));
        

        if(QualityValue !== null)
        {
            switch(Math.floor(QualityValue / 10))
            {
                case 10: 
                    setQualityColor("#F9AE00");
                    break;
                case 9 : 
                    setQualityColor("#8045DD");
                    break;
                case 8:
                case 7:
                    setQualityColor("#2AB1F6");
                    break;
                case 6:
                case 5:
                case 4:
                case 3:
                    setQualityColor("#A0E716");
                    break;
                case 2:
                case 1: 
                    setQualityColor("#FFE81D");
                    break;
                default :
                    setQualityColor("#FFE81D");
                    break;
            }
        }

        
    }, [EquipmentData, NickName, QualityValue]);
    
    
    return (
        <div className="EquipmentInfo" >
           <div className="ImageArea">
                <img src={Data.Icon} alt=""  style={{background: BackColorStyle}} />
           </div>

            <div className="TextArea">
                <p style={{color: FontColorStyle}}>{Data.Name}</p>
                
                <div className="BottomArea">
                    {/* 장비 레벨에 대한 정보 [무기 방어구에만 보인다.] */}
                    {index < 6 ? <span className="EquipmentLevel">{LvValue}</span> : ""}
                    {index < 11 ? 
                    <>
                        {/* 품질 */}
                        <span className="QuallityValueText" style={{color: `${QualityColor}`}}>{QualityValue !== null ? QualityValue : "X"}</span>
                        <div className="StickBox">
                            <div className="StickValue" style={{width: `${QualityValue}%`, background: `${QualityColor}`}}></div>
                        </div> 
                    </> :  index === 11 ? 
                        <div className="AbilityStoneInfo">
                            <h3>어빌</h3>
                        </div> : "팔찌~"
                    
                    }
                   
                </div>
               
            </div>

        </div>
    )
}

function CharacterEquipment() {

    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    const NickName = useParams();
    const [EquipmentData, setEquipmentData] = useState();
    const [EngravingData, setEngravingData] = useState(null);
    const GetEquipment = async () => {
        try {
            const response = await axios.get(`https://developer-lostark.game.onstove.com/armories/characters/${NickName.searchCharacter}/equipment`, {
                headers: {Authorization: `bearer ${Key}`}
            });
            
            let tmp =  response.data[5];
            response.data[5] = response.data[0];
            response.data[0] = tmp;
            setEquipmentData(response.data)
            console.log(response.data);
            
        } catch {
            console.log("에러발생")
        }
    }

    const GetEngravings = async () =>  {
        try {
            const response = await axios.get(`https://developer-lostark.game.onstove.com/armories/characters/${NickName.searchCharacter}/engravings`, {
                headers: {Authorization: `bearer ${Key}`}
            });
            setEngravingData(response.data.Engravings);  
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
       GetEquipment();
       GetEngravings();
    }, [NickName])
    

    return (
        <div className="EquipmentParentBox">
            <div className="EquipmentZone">
                
                <div className="FirstBox">
                    {EquipmentData !== undefined ? EquipmentData.map((Data, index) => {
                        if(index < 6)
                        {
                            return (  
                                    <EquipentArea key={index} EquipmentData={EquipmentData} Data={Data} index={index} />
                            )
                        }
                    } ): "로딩중"}
                    <div className="EngravingBox">
                        {EngravingData !== null ? EngravingData.map((Data) => (
                            <div className="EngravingInfo">
                                <img src={Data.Icon} alt="각인 아이콘" />
                                <div>
                                    <h5>{Data.Name}</h5>
                                    <span>활성 포인트 {Data.Tooltip.substr(Data.Tooltip.indexOf("활성 포인트") + 8, 2)}</span>
                                </div>
                                
                            </div>
                        )) : ""}
                    </div>
                </div>

                <div className="SecondBox">
                    {EquipmentData !== undefined ? EquipmentData.map((Data, index) => {
                        if(index >= 6 && index < 13)
                        {
                            return (  
                                    <EquipentArea key={index} EquipmentData={EquipmentData} Data={Data} index={index} />
                            )
                        }
                    } ): "로딩중"}
                </div>

               
            </div>
            <button onClick={() => {if(EquipmentData !== null) console.log(EngravingData[0].Tooltip)}}>툴팁확인용도</button>
            
        </div>
    )
}

export default CharacterEquipment;