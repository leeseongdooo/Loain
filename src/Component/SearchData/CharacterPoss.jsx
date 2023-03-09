import React, {useState, useEffect} from "react";
import {GiCrestedHelmet} from 'react-icons/gi';
import { useParams, Link } from "react-router-dom";
import "../../Css/CharacterPoss.scss";
import axios from "axios";

function CharacterInfoTopArea({CharacterInfo}) {
    console.log(CharacterInfo.CharacterClassName);



    return (
        <div className="CharacterInfoArea">
            {/* 캐릭터 정보 영역. */}
            <div className="TopArea">
                    <div className="ImageArea">
                        <img src={CharacterInfo.CharacterImage} alt="" />
                    </div>
                    
                    <div className="TextArea">
                        <div className="SimpleInformation" onClick={() => {console.log(CharacterInfo)}}>
                            <span>Lv. {CharacterInfo.CharacterLevel} {CharacterInfo.CharacterClassName} @ {CharacterInfo.ServerName !== "" ? CharacterInfo.ServerName : "서버X"}</span>
                        </div>
                        
                        <h2 className="CharacterName">{CharacterInfo.CharacterName}</h2>
                        
                        <div className="ItemLevelArea">
                            <GiCrestedHelmet className="Icon" /> 
                            <h2>{CharacterInfo.ItemAvgLevel}</h2>
                        </div>
                    </div>
            </div>

            <div className="SecondBox">
                <h3>아직 준비중입니다.</h3>
            </div>
        </div>

    )
}

function CharacterPoss({CharacterInfo}) {
    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    const NickName = useParams();
    let List = [];
    const [CharacterList, setCharacterList] = useState(null);
    const ServerNameList = ['루페온', '실리안', '니나브', '아만', '아브렐슈드', '카단', '카제로스', '카마인'];

    async function PossCharacterList() {
        try {
            const response = await axios.get(`/characters/${NickName.searchCharacter}/siblings`, {
                headers: {Authorization: `bearer ${Key}`}
            })
            
            setCharacterList(response.data);
        } catch(Error)
        {
            console.log(Error)
        }
    }

    useEffect(() => {
        PossCharacterList();   
    }, [])

    if(CharacterList !== null)
    {
        let ServerFilter = ServerNameList.map((serverName) => CharacterList.filter((Data) => Data.ServerName === serverName))
        ServerFilter.map((Data) => {
            if(Data.length > 0)
            {
                List.push(Data);

            }
        });
    }
    let OrderByList = List.sort((a, b) => b.length - a.length);
    
    

    return (
        <div className="CharacterPossArea">
            <CharacterInfoTopArea CharacterInfo={CharacterInfo}/>
            {OrderByList.length > 0 ?  
                OrderByList.map((Data, index) => {                
                    
                    let OrderByCharacterLevel = Data.sort((a, b) => parseInt(b.ItemAvgLevel.replace(/,/g , '')) - parseInt(a.ItemAvgLevel.replace(/,/g , '')) );
                    console.log(OrderByCharacterLevel);                    

                    return(
                        <div className="ServerBox" key={index}>
                            <div className="TopArea">
                                <p className="ServerName">{Data[0].ServerName}</p>
                                <p className="CharacterLength">보유 캐릭터 <span>{Data.length}</span></p>
                            </div>

                            <div className="CharacterList">
                                {OrderByCharacterLevel.map((CharacterInfo) => (
                                    <Link to={"/Search/" + CharacterInfo.CharacterName} className="CharacterInfoMiniver">
                                        
        
                                        <div>
                                            <p className="TopInfo">Lv. {CharacterInfo.CharacterLevel} {CharacterInfo.CharacterClassName}</p>
                                            <p className="Name">{CharacterInfo.CharacterName}</p>
                                            <p className="ItemLevel">{CharacterInfo.ItemAvgLevel}</p>
                                        </div>
                                        
                                    </Link>
                                ))}
                            </div>
                        </div> 
                )})
                : ""}

                <div className="MarginArea"></div>
        </div>
    )
}

export default CharacterPoss;