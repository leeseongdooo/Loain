import React, {useState, useEffect} from "react";
import {GiCrestedHelmet} from 'react-icons/gi';
import { useParams, Link } from "react-router-dom";
import {IoIosArrowDown} from "react-icons/io"
import "../../Css/CharacterPvp.scss";
import axios from "axios";


function CharacterInfoTopArea({CharacterInfo, Data}) {

    console.log(Data);
    let History = Data !== null ? Data.Colosseums.filter((List) => List.Competitive !== null) : 11;
    let Final = Data !== null ? Data.Colosseums[Data.Colosseums.length - 1] : ""
    console.log(Final)
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
                {History.length !== 0 && Data !== null ? 
                    <div className="RecentTier">
                        <img src={History[History.length - 1].Competitive.RankIcon} />
                        <p className="RankName">{History[History.length - 1].Competitive.RankName}</p>
                        <p className="SeasonName">{History[History.length - 1].SeasonName}</p>
                    </div> : 
                <div className="RecentTier">
                    <img src="https://cdn.korlark.com/images/profile/img_pvp_none.svg" />
                    <p className="RankName">{CharacterInfo.PvpGradeName}</p>
                    <p className="SeasonName">{Final.SeasonName}</p>
                </div> 
                }
                

                <div className="HistoryTier">
                    {History.length !== 0 && Data !== null ? History.map((List, index) => {

                        if(index !== History.length - 1)
                        {
                            return (
                                <div className="TierDesign">
                                    <img src={History[index].Competitive.RankIcon} />
                                    <p className="RankName">{History[index].Competitive.RankName}</p>
                                    <p className="SeasonName">{History[index].SeasonName}</p>
                               </div>
                           )
                        }

                        
                    }) : 
                    <div className="NotHaveData">
                        <p>이전 경쟁전 등급 기록이 없습니다</p>
                    </div>

                    }

                    
                </div>
            </div>
        </div>

    )
}

function DonutGraph({PercentData}) {
    return (
        <div >
            <div style={{ width: '200px', height: '200px' }}>
                <svg viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="90" fill="none" stroke="beige" strokeWidth="20" className="BackDonut" />
                    <circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="royalblue"
                        strokeWidth="20"
                        strokeDasharray={`${2 * Math.PI * 90 * (PercentData * 0.01)} ${2 * Math.PI * 90 * (1 - (PercentData * 0.01))}`}
                        strokeDashoffset={2 * Math.PI * 90 * 0.25}
                    />
                </svg>
                <span className="Percent">{PercentData}%</span>
            </div>
        </div>
    )
}


function PvPRecordArea({Data}) {
    const [ShowSeasonList, setShowSeasonList] = useState(false);
    const [SelectSeasons, setSelectSeason] = useState(Data !== null ? Data.Colosseums[Data.Colosseums.length - 1].SeasonName : "시즌 6");

    const FilterData = Data !== null ? Data.Colosseums.filter((List) => List.SeasonName === SelectSeasons) : [];

    let FilterTest = FilterData[0];

    // 경쟁전 우승 %
    let Competitive = 0;
    
    // 섬멸전 우승 %
    let TeamDeathmatch = 0;

    // 대장전 우승 %
    let TeamElimination = 0;

    if(FilterTest !== undefined && FilterTest.Competitive !== null)
    {
        Competitive = ((100 / FilterTest.Competitive.PlayCount) * FilterTest.Competitive.VictoryCount).toFixed(1);       
    }
    
    if(FilterTest !== undefined && FilterTest.TeamDeathmatch !== null)
    {
        TeamDeathmatch = ((100 / FilterTest.TeamDeathmatch.PlayCount) * FilterTest.TeamDeathmatch.VictoryCount).toFixed(1);       
    }

    if(FilterTest !== undefined && FilterTest.TeamElimination !== null)
    {
        TeamElimination = ((100 / FilterTest.TeamElimination.PlayCount) * FilterTest.TeamElimination.VictoryCount).toFixed(1);       
    }

    // 
    return (
        <div className="PvPRecordArea">
            <div className="TopArea">
                {/* 시즌 선택하는 영역 */}
               <div className="SeasonList">
                    <button onClick={() => {setShowSeasonList(!ShowSeasonList)}}>{SelectSeasons} <IoIosArrowDown/></button>

                    <ul className="ShowListStyle" style={ShowSeasonList === true ? {} : {display: "none"}}>
                        {Data !== null ? Data.Colosseums.map((List, index) => <li key={index} onClick={() => {setSelectSeason(List.SeasonName); setShowSeasonList(false);}}>{List.SeasonName}</li>) : ""}
                    </ul>
               </div>

                <div className="SelectButtonBox">
                    <button>캐릭터</button>
                    <button>원정대</button>
                </div>
            </div>

            {FilterTest !== undefined  ? 
            <div className="RecordArea">
                
                <div className="MiddleArea">
                        <div className="TopText">
                            <span>경쟁전</span>
                        </div>

                        <div className="CanvasArea">
                            {Competitive > 0 ? <DonutGraph PercentData={Competitive} /> : <p className="NotGraphData">경쟁전에 참가 기록이 없습니다.</p>}
                        </div>  

                        <div className="BottomArea">
                            <div className="Record">
                                <span className="VictoryCount">{FilterTest.Competitive !== null ? FilterTest.Competitive.VictoryCount : " - "}승</span>
                            </div>
                            
                            <hr />
                            {Competitive > 0 ? 
                                <h3>에이스 달성률 {FilterTest.Competitive !== null ? ((100 / FilterTest.Competitive.PlayCount) * FilterTest.Competitive.AceCount).toFixed(1) : ""}%</h3> :
                                <h3>전적 없음</h3>   
                            }
                            
                        </div>                  
                </div>

                <div className="MiddleArea">
                        <div className="TopText">
                            <span>섬멸전</span>
                        </div>

                        <div className="CanvasArea">
                            {TeamDeathmatch > 0 ? <DonutGraph PercentData={TeamDeathmatch} /> : <p className="NotGraphData">섬멸전에 참가 기록이 없습니다.</p>}
                        </div>  

                        <div className="BottomArea">
                            <div className="Record">
                                <span className="PlayCount">{FilterTest.TeamDeathmatch !== null ? FilterTest.TeamDeathmatch.PlayCount : " - "}전</span>
                                <span classNames="Slash">/</span>
                                <span className="VictoryCount">{FilterTest.TeamDeathmatch !== null ? FilterTest.TeamDeathmatch.VictoryCount : " - "}승</span>
                                <span className="LoseCount">/ {FilterTest.TeamDeathmatch !== null ? FilterTest.TeamDeathmatch.LoseCount : " - "}패</span>
                            </div>
                            <hr />
                            {
                                TeamDeathmatch > 0 ? 
                                <h3>에이스 달성률 {FilterData[0].TeamDeathmatch !== null ? ((100 / FilterData[0].TeamDeathmatch.PlayCount) * FilterData[0].TeamDeathmatch.AceCount).toFixed(1) : ""}%</h3> :
                                <h3>전적 없음</h3>
                            }
                            
                        </div>                  
                </div>

                <div className="MiddleArea">
                        <div className="TopText">
                            <span>대장전</span>
                        </div>

                        <div className="CanvasArea">
                            {TeamElimination > 0 ? <DonutGraph PercentData={TeamElimination} /> : <p className="NotGraphData">대장전에 참가 기록이 없습니다.</p>}
                        </div>  

                        <div className="BottomArea">
                            <div className="Record">
                                <span className="PlayCount">{FilterTest.TeamElimination !== null ? FilterTest.TeamElimination.PlayCount : " - "}전</span>
                                <span classNames="Slash">/</span>
                                <span className="VictoryCount">{FilterTest.TeamElimination !== null ? FilterTest.TeamElimination.VictoryCount : " - "}승</span>
                                <span className="LoseCount">/ {FilterTest.TeamElimination !== null ? FilterTest.TeamElimination.LoseCount : " - "}패</span>
                            </div>
                            <hr />
                            {
                                TeamElimination > 0 ? 
                                <h3>에이스 달성률 {FilterData[0].TeamElimination !== null ? ((100 / FilterData[0].TeamElimination.PlayCount) * FilterData[0].TeamElimination.AceCount).toFixed(1) : ""}%</h3>
                                : <h3>전적 없음</h3>
                            }
                            
                        </div>                  
                </div>
            </div> : "" }
         
        </div>
    )
}

function CharacterPvp({CharacterInfo}) {

    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    const NickName = useParams();
    const [PvPInfo, setPvPInfo] = useState(null);

    async function GetPvPInfo() {
        try {
            const response = await axios.get(`/armories/characters/${NickName.searchCharacter}/colosseums`, {
                headers: {Authorization: `bearer ${Key}`}
            })
            setPvPInfo(response.data);
        } catch(Error)
        {
            console.log(Error)
        }
    }

    useEffect(() => {
        GetPvPInfo();
    }, [])

    return (
        <div className="CharacterPvPArea">
            <div>
                <CharacterInfoTopArea CharacterInfo={CharacterInfo} Data={PvPInfo !== null ? PvPInfo : null }/>
                <PvPRecordArea Data={PvPInfo !== null ? PvPInfo : null } />
            </div>

            <div className="MarginBox"></div>
        </div>
    )
}

export default CharacterPvp;