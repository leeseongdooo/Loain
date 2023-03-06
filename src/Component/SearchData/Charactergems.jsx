import React, {useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../Css/CharacterGems.scss";


function Yesgem({Data, Grade, SkillInfo}) {
    const [BackColorStyle, setBackColorStyle] = useState(null);
    
    const SkillData = SkillInfo.filter((Data2) => Data2.GemSlot === Data.Slot);
    const [SkillInfoShow, setSkillInfoShow] = useState(false);
    useEffect(() => {
        switch(Grade)
        {
            case "에스더" :
                setBackColorStyle('linear-gradient(135deg,#0c2e2c,#2faba8)');
                break;
            case "고대" : 
                setBackColorStyle('linear-gradient(135deg,#3d3325,#dcc999)');
                break;
            case "유물" : 
                setBackColorStyle('linear-gradient(135deg,#341a09,#a24006)');
                break;
            case "전설" : 
                setBackColorStyle('linear-gradient(135deg,#362003,#9e5f04)');
                break;
            case "영웅" : 
                setBackColorStyle('linear-gradient(135deg,#261331,#480d5d)');
                break;

            case "희귀" :
                setBackColorStyle('linear-gradient(135deg,#111f2c,#113d5d)');
                break;

            case "고급" : 
                setBackColorStyle('linear-gradient(135deg,#18220b,#304911)');
                break;
            default: 
                break;
        }
    }, [Data])

    return (
        <>
            <div className="JamBox" onMouseEnter={() => {setSkillInfoShow(true)}} onMouseLeave={() => {setSkillInfoShow(false)}}>
                <img src={Data.Icon} style={BackColorStyle !== null ? {background: BackColorStyle} : {}} />
                <p className="JamLevel">{Data.Level}</p>
                
                <div className="SkillInfo" style={SkillInfoShow === true ? {display: "flex"} : {display: "none"}}>
                    <p className="SkillName">{SkillData[0].Name}</p>
                    <p>{SkillData[0].Description}</p>
                </div>
            </div>
        </>
    )
}

function NoJam() {
    return (
        <div className="JamBox"></div>
    )
}

function Charactergems() {
    const [NoJamLength, setNoJamLength] = useState(null);
    const [SearchGems, setSearchGems] = useState(null);
    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    const NickName = useParams();
    let noJamlist = [];
    
    
    const GemsApiData = async () => {
        try {
            setNoJamLength(null);
            const response = await axios.get(`https://developer-lostark.game.onstove.com/armories/characters/${NickName.searchCharacter}/gems`, {
                headers: {Authorization: `bearer ${Key}`}
            })
            setSearchGems(response.data);


            if(response.data !== null)
            {
                const noJamLength = 11 - response.data.Gems.length;
                
                for(let i = 0; i < noJamLength; i++)
                {
                    if(noJamlist.length < noJamLength)
                    {
                        noJamlist.push(i);
                    }            
                }
                setNoJamLength(noJamlist);
            } else if(response.data === null)
            {
                
                for(let i = 0; i < 11; i++)
                {
                        noJamlist.push(i);            
                }
                setNoJamLength(noJamlist);
            }

            
        } catch(error) {
            console.log(error);
        }
    };

    

    useEffect(() => {
        GemsApiData();
        
    }, [NickName])

    return (
        <div className="GemBox">
            <p className="IntroduceTitle">보석</p>
            <div className="InnerBox">
               {SearchGems !== null ? SearchGems.Gems.map((Data, index) => <Yesgem key={index} Data={Data} Grade={Data.Grade} SkillInfo={SearchGems.Effects}/> ) : ""}
               {NoJamLength !== null ? NoJamLength.map((Data, index) => <NoJam key={index} />) : ""}
            </div>
        </div>
    )
}

export default Charactergems;