import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../Css/CharacterEquipment.scss";

function FirstEquipmentArea({EquipmentData, Data}) {

    const [BackColorStyle, setBackColorStyle] = useState(null);
    const [FontColorStyle, setFontColorStyle] = useState(null);

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
    
    }, [EquipmentData]);
    
    
    return (
        <div className="EquipmentInfo" >
           <div className="ImageArea">
                <img src={Data.Icon} alt=""  style={{background: BackColorStyle}} />
           </div>

            <div className="TextArea">
                <p style={{color: FontColorStyle}}>{Data.Name}</p>
               
            </div>

        </div>
    )
}

function CharacterEquipment() {

    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    const NickName = useParams();
    const [EquipmentData, setEquipmentData] = useState();
    
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

    useEffect(() => {
       GetEquipment();
    }, [NickName])

    return (
        <div className="EquipmentParentBox">
            <div className="EquipmentZone">
                {EquipmentData !== undefined ? EquipmentData.map((Data, index) => {
                    if(index < 12)
                    {
                        return (
                            <FirstEquipmentArea key={index} EquipmentData={EquipmentData} Data={Data} />
                        )
                    }
                } ): "로딩중"}
            </div>
            <button onClick={() => {if(EquipmentData !== null) console.log(EquipmentData[0].Tooltip.includes("quality"))}}>1</button>

        </div>
    )
}

export default CharacterEquipment;