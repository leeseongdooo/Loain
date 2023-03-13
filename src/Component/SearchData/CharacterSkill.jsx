import {React, useState, useEffect, useRef} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {GiCrestedHelmet} from 'react-icons/gi';
import Parser from 'html-react-parser';
import "../../Css/CharacterSkill.scss";


function SkillModalArea({Data})
{   
    const ModalHeight = useRef();
    let ParseTooltip = JSON.parse(Data.Tooltip);

    return (
        <div className="ModalArea" ref={ModalHeight} >
            <h4 className="SkillName">{ParseTooltip.Element_000.value}</h4>

            <div className="FirstBox">
                <div className="SkillImageBox">
                    {/* 스킬 이미지 */}
                    <img src={Data.Icon} alt="" />
                </div>

                <div className="TextArea">
                    {/* 스킬 타입 */}
                    <div className="TopArea">
                        <p>{Parser(ParseTooltip.Element_001.value.name)}</p>
                        <p className="SkillForm">{Parser(ParseTooltip.Element_001.value.level)}</p>
                    </div>
                    {/* 재사용 대기시간 */}
                    <p>{Parser(ParseTooltip.Element_001.value.leftText)}</p>
                </div>
            </div>

            {ParseTooltip.Element_004.value.includes("소모") && ParseTooltip !== undefined ? 
                 <>
                    <div className="SecondBox">            
                        <div className="ManaArea">
                            {/* 마나 쓰는 캐릭터는Element_004가 마나 마나 안쓰는 캐릭터는 마나창이 없다 */}
                            <p>{Parser(ParseTooltip.Element_004.value)}</p>
                        </div>

                        <div className="SkillManual">
                            <p>{Parser(ParseTooltip.Element_005.value)}</p>
                        </div>
                    </div>

                    {ParseTooltip.Element_006.type.includes("Tripod") === true ? 
                        <div className="ThirdBox">
                            <div>
                                    <p className="NameAndLevel">{Parser(ParseTooltip.Element_006.value.Element_000.name)} {Parser(ParseTooltip.Element_006.value.Element_000.tier)} </p>
                                    <p>{Parser(ParseTooltip.Element_006.value.Element_000.desc)}</p>
                            </div>

                            <div>
                                    <p className="NameAndLevel">{Parser(ParseTooltip.Element_006.value.Element_001.name)} {Parser(ParseTooltip.Element_006.value.Element_001.tier)} </p>
                                    <p>{Parser(ParseTooltip.Element_006.value.Element_001.desc)}</p>
                            </div>

                            <div>
                                    <p className="NameAndLevel">{Parser(ParseTooltip.Element_006.value.Element_002.name)} {Parser(ParseTooltip.Element_006.value.Element_002.tier)} </p>
                                    <p>{Parser(ParseTooltip.Element_006.value.Element_002.desc)}</p>
                            </div>
                        </div> : "" }
                </>
                : 
                <>
                <div className="SecondBox">            
            
                    <div className="SkillManual">
                        <p>{Parser(ParseTooltip.Element_004.value)}</p>
                    </div>
                </div>

                {ParseTooltip.Element_005.type.includes("Tripod") === true ? 
                    <div className="ThirdBox">
                        <div>
                                <p className="NameAndLevel">{Parser(ParseTooltip.Element_005.value.Element_000.name)} {Parser(ParseTooltip.Element_005.value.Element_000.tier)} </p>
                                <p>{Parser(ParseTooltip.Element_005.value.Element_000.desc)}</p>
                        </div>

                        <div>
                                <p className="NameAndLevel">{Parser(ParseTooltip.Element_005.value.Element_001.name)} {Parser(ParseTooltip.Element_005.value.Element_001.tier)} </p>
                                <p>{Parser(ParseTooltip.Element_005.value.Element_001.desc)}</p>
                        </div>

                        <div>
                                <p className="NameAndLevel">{Parser(ParseTooltip.Element_005.value.Element_002.name)} {Parser(ParseTooltip.Element_005.value.Element_002.tier)} </p>
                                <p>{Parser(ParseTooltip.Element_005.value.Element_002.desc)}</p>
                        </div>
                    </div> : "" }
            </>}
        </div>
    )
}

function RuneModalArea({}) 
{    
}

function GemModalArea({})
{

}


export function TopArea({CharacterInfo, CharacterSkillInfo}) {
    let counter = "";
    let powerless = "";
    let Destruction = "";
    let TripodLength = 0;
    
    if(CharacterSkillInfo.length > 0)
    {
        // CharacterSkillInfo.map((Data) => console.log(Data.Tooltip.includes("카운터")));
        counter = CharacterSkillInfo.filter((Data) => Data.Tooltip.includes("카운터"));
        powerless = CharacterSkillInfo.filter((Data) => Data.Tooltip.includes("무력"));
        Destruction = CharacterSkillInfo.filter((Data) => Data.Tooltip.includes("부위 파괴"));
        
        let FiveLevelTripodLength = CharacterSkillInfo.map((Data) => Data.Tripods.filter((Tri) => Tri.Level === 5).length);
        let sum = 0;

        for(let i=0; i < FiveLevelTripodLength.length; i++)
        {
            sum += FiveLevelTripodLength[i];
        }
        
        TripodLength = sum;

    }    

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

                <div className="SkillSummary">
                     <div className="SkillPointArea">
                            <h3>스킬포인트 <span className="InnerFontStyle">{CharacterInfo.UsingSkillPoint} / {CharacterInfo.TotalSkillPoint}</span></h3>
                     </div>

                     <div className="SkillTypeArea">
                            <span>5레벨 트포 <span className="InnerFontStyle">{TripodLength}개</span></span>
                            <span>카운터 스킬 <span className="InnerFontStyle">{counter.length}개</span></span>
                            <span>무력화 스킬 <span className="InnerFontStyle">{powerless.length}개</span></span>
                            <span>부위파괴 스킬 <span className="InnerFontStyle">{Destruction.length}개</span></span>
                     </div>
                </div>
            </div>
    )
}

function SkillArea({data, GemInfo}) {
    
    let ActiveTripods = data.Tripods.filter((Data) => Data.IsSelected === true);
    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    const [CharacterGems, setCharacterGems] = useState(null);
    const [RuneBackColor, setRuneBackColor] = useState("");
    const [GemBackColor, setGemBackColor] = useState("");
    const [Show, setShow] = useState(false);
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
       

        console.log(GemInfo);
        let FilterGems = GemInfo !== "" ? GemInfo.Gems.filter((Data) => Data.Tooltip.includes(data.Name)) : undefined;
        
        console.log(FilterGems);
        if(FilterGems !== undefined)
        {
            FilterGems.map((Icon, index) => {
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
        }
       
    }, [])
      

    return (
        <div className="SkillAreaParents">
            {Show === true ? <SkillModalArea Data={data} /> : "" }
            {/* 첫번째 박스 입니다. [스킬 이미지부터 룬까지]*/}
            <div className="FirstBox">
                <div className="ImageAndName">
                    <img src={data.Icon} alt="스킬 이미지" onMouseEnter={() => {setShow(true)}} onMouseOut={() => {setShow(false)}} />
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
                </div>
            </div>
          

            {/* 두번째 박스 입니다. [보석부터 트라이포드까지] */}
            <div className="SecondBox">
                <div className="JemArea">
                        <div className="JemBackground">
                            {CharacterGems !== null ? CharacterGems.map((Icon, index) => 
                                {
                                    let backgroundColor = ""
                                    let FilterTest = GemInfo.Effects.filter((Effect) => Effect.GemSlot === Icon.Slot);
                                    console.log(FilterTest);
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
                                        <div className="JemBox">
                                            <img src={Icon.Icon} key={index} style={{background: backgroundColor}} />
                                            <span className="JemLevel">{Icon.Level}</span>
                                            <div className="TextArea">
                                                {Parser(Icon.Name)}
                                                <p>{FilterTest[0].Description}</p>
                                            </div>
                                            
                                        </div>
                                    )
                                }
                            ) : ""}
                            
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
          
        </div>
    )
}

function CharacterSkill({CharacterInfo}) {

    console.log(CharacterInfo)
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
            console.log(response)
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

            <TopArea CharacterInfo={CharacterInfo} CharacterSkillInfo={CharacterSkillInfo !== null ? CharacterSkillInfo : []} />
            <div className="SkillBox">
                {CharacterSkillInfo !== null ? CharacterSkillInfo.map((Data, index) => <SkillArea key={index} data={Data} GemInfo={CharacterSkillGems !== null ? CharacterSkillGems : ""} />) : ""}
            
                {CharacterInfo.TotalSkillPoint === 0 ? <p className="NotSkillPoint">스킬 정보가 없어요! ㅜㅜ</p> : ""}
            </div>
            
        </div>
    )
}

export default CharacterSkill;