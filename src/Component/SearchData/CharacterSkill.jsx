import {React, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../Css/CharacterSkill.scss";


function SkillArea({data, GemInfo}) {

    
    let ActiveTripods = data.Tripods.filter((Data) => Data.IsSelected === true);
    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    const [CharacterGems, setCharacterGems] = useState(null);

    

  

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
                                <img src={data.Rune.Icon} alt="룬 이미지" />
                            </div>
                            <p>{data.Rune.Name}</p>
                        </> : ""
                    }
                </div>

                <div className="JemArea">
                    <div className="JemBackground">
                        {/* <img src="" alt="보석" /> */}
                    </div>
                </div>
            </div>

            <div className="ActiveTripodsInfo">
                {ActiveTripods.map((Data, index) => (
                    <div className="ActiveTripodsArea">
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
                {CharacterSkillInfo !== null ? CharacterSkillInfo.map((Data, index) => <SkillArea data={Data} GemInfo={CharacterSkillGems !== null ? CharacterSkillGems : ""} />) : "준비중"}
            </div>
        </div>
    )
}

export default CharacterSkill;