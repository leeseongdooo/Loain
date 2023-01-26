import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../Css/CharacterInfo.scss";
import {GiCrestedHelmet} from 'react-icons/gi'
import CharacterEngravings from "./CharacterEngravings";
import CharacterEquipment from "./CharacterEquipment";



// eslint-disable-next-line no-lone-blocks
function NewDesign({SearchCharacter}) {{
    return (
        // 큰 div
        <div className="NewCharacterInfoBox">
            <div className="InformationArea">
                <div className="TopArea">
                    <div className="SimpleInformation">
                        <span>Lv. {SearchCharacter.CharacterLevel} {SearchCharacter.CharacterClassName} @ {SearchCharacter.ServerName}</span>
                    </div>
                    
                    <h2>{SearchCharacter.CharacterName}</h2>
                    
                    <div className="ItemLevelArea">
                        <GiCrestedHelmet className="Icon" /> 
                        <h2>{SearchCharacter.ItemAvgLevel}</h2>
                    </div>
                    
                </div>

                <div className="BottomArea">
                    <div>
                        <p className="TitleName">원정대</p>
                        <p>Lv. {SearchCharacter.ExpeditionLevel}</p>
                    </div>

                    <div>
                        <p className="TitleName">칭호</p>
                        <p>{SearchCharacter.Title}</p>
                    </div>

                    <div>
                        <p className="TitleName">길드</p>
                        <p>{SearchCharacter.GuildName}</p>
                    </div>

                    <div>
                        <p className="TitleName">영지</p>
                        <p>Lv.{SearchCharacter.TownLevel} {SearchCharacter.TownName}</p>
                    </div>

                    <div>
                        <p className="TitleName">PVP</p>
                        <p>{SearchCharacter.PvpGradeName}</p>
                    </div>            
                </div>
            </div>
            
            <div className="CharacterImageArea">
               <img src={SearchCharacter.CharacterImage} alt="" />
            </div>
        </div>
    )
}}


function CharacterInfo({SearchCharacter, CharacterStats}) {

    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    const NickName = useParams();
    console.log(SearchCharacter);
    return (
        
        <div className="CharacterSearchResult">
            <div className="CharacterInfoArea">
                <NewDesign SearchCharacter={SearchCharacter}/>
                
                <div className="CharacterEquipment"> {/* 캐릭터의 장비를 보여주는 Area입니다.*/}
                        <CharacterEquipment />
                </div>
            </div>
            

          <div className="Specifications">
                  <div className="StatArea MiniBox">
                    
                    <p className="GuideText">전투 특성</p>
                    
                    <ul className="BattleStat">
                        {CharacterStats.map((Data, index) =>  {
                            if(index < 6)
                            {
                                return (
                                    <li key={index}>
                                        <span id="StatName">{Data.Type}</span>
                                        <span id="StatNumber">{Data.Value}</span>
                                    </li>
                                )
                            }
                        })}                        
                    </ul>

                    <p className="GuideText">기본 특성</p>
                    
                    <ul className="BasicStat">
                       {CharacterStats.map((Data, index) => {
                            if(index >= 6)
                            {
                                return (
                                    <li key={index}>
                                        <span id="StatName">{Data.Type}</span>
                                        <span id="StatNumber">{Data.Value}</span>
                                    </li>
                                )
                            }
                       })} 
                    </ul>

                  </div>

                  <div className="AbilityArea MiniBox">
                       <CharacterEngravings/>
                  </div>

          </div>

          

        </div>
    )
}

export default CharacterInfo;