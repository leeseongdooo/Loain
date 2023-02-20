import {React, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../Css/CharacterSkill.scss";


function SkillArea({data, GemInfo}) {

    
    let ActiveTripods = data.Tripods.filter((Data) => Data.IsSelected === true);
    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    const [CharacterGems, setCharacterGems] = useState(null);
    const [RuneBackColor, setRuneBackColor] = useState("");
    const [GemBackColor, setGemBackColor] = useState("");
    
    useEffect(() => {

        // 룬 등급
        if(data.Rune !== null)
        {
            switch(data.Rune.Grade)
            {
                case "에스더" :
                    setRuneBackColor('linear-gradient(135deg,#0c2e2c,#2faba8)');
                    break;
                case "고대" : 
                    setRuneBackColor('linear-gradient(135deg,#3d3325,#dcc999)');
                    break;
                case "유물" : 
                    setRuneBackColor('linear-gradient(135deg,#341a09,#a24006)');
                    break;
                case "전설" : 
                    setRuneBackColor('linear-gradient(135deg,#362003,#9e5f04)');
                    break;
                case "영웅" : 
                    setRuneBackColor('linear-gradient(135deg,#261331,#480d5d)');
                    break;
    
                case "희귀" :
                    setRuneBackColor('linear-gradient(135deg,#111f2c,#113d5d)');
                    break;
    
                case "고급" : 
                    setRuneBackColor('linear-gradient(135deg,#18220b,#304911)');
                    break;
                default: 
                    break;
            }
        }
       

        let FilterGems = GemInfo.Gems.filter((Data) => Data.Tooltip.includes(data.Name));
        console.log(FilterGems);
        
        FilterGems.map((Icon, index) => {
            console.log(Icon.Grade);
            switch(Icon.Grade)
            {
                case "에스더" :
                    setGemBackColor('linear-gradient(135deg,#0c2e2c,#2faba8)');
                    break;
                case "고대" : 
                    setGemBackColor('linear-gradient(135deg,#3d3325,#dcc999)');
                    break;
                case "유물" : 
                    setGemBackColor('linear-gradient(135deg,#341a09,#a24006)');
                    break;
                case "전설" : 
                    setGemBackColor('linear-gradient(135deg,#362003,#9e5f04)');
                    break;
                case "영웅" : 
                    setGemBackColor ('linear-gradient(135deg,#261331,#480d5d)');
                    break;
                case "희귀" :
                    setGemBackColor('linear-gradient(135deg,#111f2c,#113d5d)');
                    break;
                case "고급" : 
                    setGemBackColor('linear-gradient(135deg,#18220b,#304911)');
                    break;
                default: 
                    break;
            }   
        })
        
        setCharacterGems(GemInfo.Gems.filter((Data) => Data.Tooltip.includes(data.Name)));
    }, [])
      

    return (
        <div className="SkillAreaParents">
            <div className="ImageAndName">
                <img src={data.Icon} alt="스킬 이미지" />
                <p>{data.Name}</p>
            </div>

            <div className="TripodsAndRune">
                <p className="SkillLevel">{data.Level}레벨</p>
                
                <div className="TripodsOrder">
                    {ActiveTripods.map((Data, index) => (
                        <div key={index}>
                            {Data.Slot}
                        </div>
                    ))}
                </div>
                
                
                <div className="RuneArea">
                    {data.Rune !== null ? 
                        <>
                            <div className="RuneBackground">
                                <img src={data.Rune.Icon} alt="룬 이미지" style={{background: RuneBackColor}}/>
                            </div>
                            <p>{data.Rune.Name}</p>
                        </> : ""
                    }
                </div>

                <div className="JemArea">
                    <div className="JemBackground">
                        {CharacterGems !== null ? CharacterGems.map((Icon, index) => 
                            {
                                let backgroundColor = ""
                                
                                switch(Icon.Grade)
                                {
                                    case "에스더" :
                                        backgroundColor = 'linear-gradient(135deg,#0c2e2c,#2faba8)';
                                        break;
                                    case "고대" : 
                                        backgroundColor = 'linear-gradient(135deg,#3d3325,#dcc999)';
                                        break;
                                    case "유물" : 
                                        backgroundColor = 'linear-gradient(135deg,#341a09,#a24006)';
                                        break;
                                    case "전설" : 
                                        backgroundColor = 'linear-gradient(135deg,#362003,#9e5f04)';
                                        break;
                                    case "영웅" : 
                                        backgroundColor = 'linear-gradient(135deg,#261331,#480d5d)';
                                        break;
                                    case "희귀" :
                                        backgroundColor = 'linear-gradient(135deg,#111f2c,#113d5d)';
                                        break;
                                    case "고급" : 
                                        backgroundColor = 'linear-gradient(135deg,#18220b,#304911)';
                                        break;
                                    default: 
                                        break;
                                }

                                return (
                                    <img src={Icon.Icon} key={index} style={{background: backgroundColor}} />    
                                )
                            }
                        ) : ""}
                    </div>
                </div>
            </div>

            <div className="ActiveTripodsInfo">
                {ActiveTripods.map((Data, index) => (
                    <div className="ActiveTripodsArea" key={index}>
                        <img src={Data.Icon} alt="" />
                        <div className="NameAndLevel">
                            <p>{Data.Name}</p>
                            <p>Lv.{Data.Level}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function CharacterSkill() {

    // 검색한 캐릭터의 이름. 
    const NickName = useParams();
    
    // API 키.
    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    
    // 캐릭터의 스킬을 저장하는 변수.
    const [CharacterSkillInfo, setCharacterSkillInfo] = useState(null);
    const [CharacterSkillGems, setCharacterSkillGems] = useState(null);
    async function SKillData() {
        try {
            const response = await axios.get(`/armories/characters/${NickName.searchCharacter}/combat-skills`, {
                headers: {authorization: `bearer ${Key}`}
            })
            // SkillPoint가 1보다 크거나 룬읶져ㅕ 있거나.
            let filterSkill = response.data.filter((Data) => Data.Rune !== null || Data.Level > 1);
            setCharacterSkillInfo(filterSkill);
            
        } catch(Error) {
            console.log(Error);
        }
    }

    async function getGems() {
        try {
            const response = await axios.get(`/armories/characters/${NickName.searchCharacter}/gems`, {
                headers: {authorization: `bearer ${Key}`}
            })
            setCharacterSkillGems(response.data);
            
        } catch(Error) {
            console.log(Error)
        }
    }

    useEffect(() => {
        SKillData();
        getGems();
    }, [NickName])

    return (
        <div className="CharacterSkillBox">

            <div className="CharacterInfoArea">

            </div>

            <div className="SkillBox">
                {CharacterSkillInfo !== null ? CharacterSkillInfo.map((Data, index) => <SkillArea key={index} data={Data} GemInfo={CharacterSkillGems !== null ? CharacterSkillGems : ""} />) : "준비중"}
            </div>
        </div>
    )
}

export default CharacterSkill;