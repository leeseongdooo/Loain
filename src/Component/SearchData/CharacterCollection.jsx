import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {GiCrestedHelmet} from 'react-icons/gi';
import {AiOutlineCheck} from 'react-icons/ai';
import "../../Css/CharacterCollection.scss";
import axios from "axios";

function CharacterInfoTopArea({CharacterInfo}) {

    const [EquipmentInfo, setEquipmentInfo] = useState(null);
    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    const NickName = useParams();
    let array = [1, 2, 3];
    
    let BackgroundColor = "";

    async function GetEquipment() {
        try {
            const response = await axios.get(`https://developer-lostark.game.onstove.com/armories/characters/${NickName.searchCharacter}/equipment`, {
                headers: {Authorization: `bearer ${Key}`}
            });
            
            let filter = response.data.filter((Data) => Data.Type === "나침반" || Data.Type === "부적" || Data.Type === "문장");
            console.log(filter)
            setEquipmentInfo(filter)
            
        } catch {
            console.log("에러발생")
        }
    }

    useEffect(() => {
        GetEquipment();
    }, [])

    

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
                <div className="PropensityAndLevel">
                    <h3>캐릭터 성향</h3>
                    <div className="Propensity">
                        {CharacterInfo.Tendencies.map((Data) => (
                            <div>   
                                <p className="Type">{Data.Type}</p>
                                <p className="Point">{Data.Point}</p>
                            </div>
                        ))}
                    </div>
                    
                </div>

                <div className="Equipment">
                    <h3>특수 장비</h3>   
                    <div className="EquipmentBox">

                        
                        {EquipmentInfo !== null ? array.map((Data,index) => {

                            if(EquipmentInfo[index] !== undefined)
                            {
                                let BackgroundColor = "black";
                                let FontColor = ""

                                if(EquipmentInfo[index].Grade === "유물")
                                {
                                    BackgroundColor = "linear-gradient(135deg,#341a09,#a24006)";
                                    FontColor = "#FA5D00";
                                } 
                                else if(EquipmentInfo[index].Grade === "전설")
                                {
                                    BackgroundColor = "linear-gradient(135deg,#362003,#9e5f04)";
                                    FontColor = "#F9AE00";
                                }
                                else if(EquipmentInfo[index].Grade === "영웅")
                                {
                                    BackgroundColor = "linear-gradient(135deg,#261331,#480d5d)";
                                    FontColor = "#8045DD";
                                } 
                                else if(EquipmentInfo[index].Grade === "희귀")
                                {
                                    BackgroundColor = "linear-gradient(135deg,#111f2c,#113d5d)";
                                    FontColor = "#2AB1F6";
                                } 
                                else if(EquipmentInfo[index].Grade === "고급")
                                {
                                    BackgroundColor = "linear-gradient(135deg,#18220b,#304911)";
                                    FontColor = "#93BC46";
                                }  

                                return (
                                    <div className="EquipmentInfo" key={index}>
                                        <div className="BackgroundImg" >
                                            <img src={ EquipmentInfo[index].Icon} alt="" style={{background: BackgroundColor}}/>
                                        </div>
                                        <h5 style={{color: FontColor}}>{EquipmentInfo[index].Name}</h5>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div className="EquipmentInfo">
                                        <div className="BackgroundImg"></div>
                                        <h5></h5>
                                    </div>
                                )
                            }
                            
                            
                        }) : ""}
                        

                    </div>
                </div>
            </div>
        </div>

    )
}

function CategoryDesign({Data, setSelectCollectionName, ClickStyle}) {

    let Percent = ((Data.Point / Data.MaxPoint) * 100).toFixed(1);
    

    
    return (
        <div className={ClickStyle === true ? "CategoryMiniBox Click" : "CategoryMiniBox NoClick"} onClick={() => {setSelectCollectionName(Data.Type);}} >
            <p className="NumberOfCollection">{Data.Point}</p>

            <div className="Info">
                <div className="TextArea">
                    <p className="CollectionName">{Data.Type}</p>
                    <p className="Progress">{Percent}%</p>
                </div>

            
                <div className="BackStick">
                    <div className="Stick" style={{width: Percent + "%"}}>

                    </div>
                </div>
            </div>
        </div>
    )
}

function SelectedCollection({CollectionData, SelectCollectionName}) {

    const [Click, setClick] = useState(false);
    let Filter = [];
   
    if(CollectionData !== "")
    {
        Filter = CollectionData.filter((Data) => Data.Type === SelectCollectionName);
        console.log(Filter)
    }    
    
    return (
        <div className="SelectedBox">
            <div className="TopArea">
                <p className="Name">{Filter.length > 0 ? <>{Filter[0].Type} {Filter[0].Point} / {Filter[0].MaxPoint}</> : "" }</p>

                <div className="FilterArea">
                    <p>미휙득 항목만 보기</p>

                    <div className="BackStick" style={Click === true ? {backgroundColor: "orange"} : {backgroundColor: "#ABACB8"}} onClick={() => setClick(!Click)}>
                        <div className="Circle" style={Click === true ? {left: 50 + "%"} : {left: 10 + "%"}}></div>
                    </div>
                </div>
            </div>
            <div className="Contents-List">
                {Filter.length > 0 ? Filter[0].CollectiblePoints.map((Data, index) => (
                    <>
                            <div className="TextArea" style={Click === true && Data.Point === 0 ? {} : Click === true && Data.Point === Data.MaxPoint ? {display: "none"} : {}}>
                                <div className="FirstBox">
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <p className="Contents-Number">{index + 1}</p>
                                        <p className="Contents-Name">{Data.PointName}</p>
                                    </div>
                                    
                                    <p style={Data.Point === Data.MaxPoint && Filter[0].Type !== "모코코 씨앗" ? {} : {display: "none"}}>
                                        <AiOutlineCheck className="Icon" />
                                    </p>
                                </div>

                                <div className={SelectCollectionName !== "모코코 씨앗" ? "SecondBox" : "SecondBox YesMokoko"}>
                                    {SelectCollectionName !== "모코코 씨앗" ? <p>{Data.PointName}</p> : <p className="MokokoLength">{Data.Point} / {Data.MaxPoint}</p>}
                                    {SelectCollectionName === "모코코 씨앗" && Data.Point === Data.MaxPoint ? <AiOutlineCheck className="Icon" /> : <p className="NoIcon">&nbsp;</p>}
                                </div>
                            </div>    
                        
                    </>
                )) : ""}
            </div>
            
        </div>
    )
}

function CharacterCollection({CharacterInfo}) {
    const [CollectionData, setCollectionData] = useState(null);
    const [SelectCollectionName, setSelectCollectionName] = useState("모코코 씨앗");
    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    const NickName = useParams();
    
    async function GetCollectionData() {
        try {
            const response = await axios.get(`/armories/characters/${NickName.searchCharacter}/collectibles`, {
                headers: {Authorization: `bearer ${Key}`}
            })
            setCollectionData(response.data);
            console.log(response.data)
        } 
        catch(Error) {
            console.log(Error);
        }
    }

    useEffect(() => {
        GetCollectionData();
    }, [])

    useEffect(() => {
        console.log(SelectCollectionName)
    }, [SelectCollectionName])

    return (
        <div className="CollectionBox">
            <CharacterInfoTopArea CharacterInfo={CharacterInfo}/>
            <div className="MiddleArea">
                <div className="Collection-Category">
                    {CollectionData !== null ? CollectionData.map((Data, index) => <CategoryDesign key={index} setSelectCollectionName={setSelectCollectionName} Data={Data} ClickStyle={SelectCollectionName === Data.Type ? true : false}/>) : ""}
                </div>

                <div className="Select-Collection-List">
                    <SelectedCollection SelectCollectionName={SelectCollectionName} CollectionData={CollectionData !== null ? CollectionData : ""} />
                </div>
            </div>
            <div className="MarginArea"></div>
        </div>
    )
}

export default CharacterCollection;