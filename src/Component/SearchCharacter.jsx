import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useSearchParams } from "react-router-dom";
import CharacterInfo from "./SearchData/CharacterInfo";
import axios from "axios";
import "../Css/SearchCharacter.scss";
import CharacterSkill from "./SearchData/CharacterSkill";
import CharacterPoss from "./SearchData/CharacterPoss";
import CharacterCollection from "./SearchData/CharacterCollection";
import CharacterPvp from "./SearchData/CharacterPvp";


function WrongNickName() {
    const NickName = useParams();

    return (
        <div className="WrongNickNameBox">
            <img src="https://cdn.korlark.com/images/profile/img_characters_empty.png" alt="모코코사진" />
            <h3>{NickName.searchCharacter}</h3>
            <span>검색하신 캐릭터 정보가 없습니다.</span>
        </div>
    )
}

function SearchCharacter() {

    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    
    const NickName = useParams();
    
    const [Searchresult, setSearchResult] = useState(null); // 유저 닉네임 검색 후 있으면 true 없으면 null
    const [SearchCharacter, setSearchCharacter] = useState(null);
    const [CharacterStats, setCharacterStats] = useState([]);
    const Location = useLocation();
    
    const [SearchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
            const getCharacterInfo = async () => {
                try {
                    const response = await axios.get(`https://developer-lostark.game.onstove.com/armories/characters/${NickName.searchCharacter}/profiles`, {
                        headers: {Authorization: `bearer ${Key}`}
                    });
                    if(response.data === null) 
                    {
                        setSearchResult(null);
                        console.log("결과 : " + Searchresult);
                    } else if(response.data !== null)
                    {
                        setSearchResult(true);
                        console.log(response.data);
                        setSearchCharacter(response.data);
                        setCharacterStats(response.data.Stats);
                    }
                }
                catch (error) {
                    console.log(error)
                }
            }

            getCharacterInfo();  
            
        }, [NickName, Location]);
    return (
       
        <div className="SearchPageBox">
            {Searchresult === null ? <WrongNickName /> : 
                <>
                    <div className="CategoryBox">
                        <Link to=""><p className={SearchParams.get("tab") === null ? "focusStyle" : ""}>능력치</p></Link>
                        <Link to="?tab=skill"><p className={SearchParams.get("tab") === "skill" ? "focusStyle" : ""}>스킬</p></Link>
                        <Link to="?tab=expedition"><p className={SearchParams.get("tab") === "expedition" ? "focusStyle" : ""}>보유 캐릭터</p></Link>
                        <Link to="?tab=collection"><p className={SearchParams.get("tab") === "collection" ? "focusStyle" : ""}>수집형 포인트</p></Link>
                        <Link to="?tab=pvp"><p className={SearchParams.get("tab") === "pvp" ? "focusStyle" : ""}>증명의 전장</p></Link>
                    </div>

                    <div className="ShowBox">
                        {
                            Location.search === "" ? <CharacterInfo SearchCharacter={SearchCharacter} CharacterStats={CharacterStats} /> : 
                            Location.search === "?tab=skill" ? <CharacterSkill CharacterInfo={SearchCharacter !== null ? SearchCharacter : ""}/> : 
                            Location.search === "?tab=expedition" ? <CharacterPoss CharacterInfo={SearchCharacter !== null ? SearchCharacter : ""}/> : 
                            Location.search === "?tab=collection" ? <CharacterCollection CharacterInfo={SearchCharacter !== null ? SearchCharacter : ""}/> : 
                            Location.search === "?tab=pvp" ? <CharacterPvp CharacterInfo={SearchCharacter !== null ? SearchCharacter : ""}/> : "" 
                        }
                        
                    </div>
                </>
            }
        </div>
    )
}

export default SearchCharacter;