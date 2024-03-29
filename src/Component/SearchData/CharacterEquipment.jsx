import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Parser from 'html-react-parser';
import "../../Css/CharacterEquipment.scss";

// 장비 모덜 창
function EquipmentModalArea({LvValue, TooltipInfo, Data, BackColor, index, QualityColor, ShowModalArea}) {

    let [SplitText, setSplitText] = useState(TooltipInfo.Element_005.value.Element_001);
    
    let test = Object.entries(JSON.parse(Data.Tooltip))
    let filterItemPartBox = test.filter((Test) => Test[1].type === "ItemPartBox")
    
    return (
        <div className="ModalBigBox" style={ShowModalArea === true ?{display: "flex"} : {display: "none"}}>
            <div onClick={() => {console.log(TooltipInfo)}}>
                {Parser(TooltipInfo.Element_000.value)}
            </div>

            <div className="FirstArea">
                <img src={Data.Icon} alt="장비" style={{background: BackColor}}/>
                <div className="InnerArea">
                {/* {Parser(TooltipInfo.Element_001.leftStr0)} */}
                    {/* 부위, 레벨, 티어 */}
                    <div>
                        <span>{Parser(TooltipInfo.Element_001.value.leftStr0)}</span>
                        <span>{Parser(TooltipInfo.Element_001.value.leftStr2)}</span>
                    </div>
                    
                    {index < 11 ? 
                        <div className="QualityArea">
                            <span className="QuallityValueText" style={{color: `${QualityColor}`}}>
                                {TooltipInfo.Element_001.value.qualityValue !== null ? TooltipInfo.Element_001.value.qualityValue < 0 ? 0 : TooltipInfo.Element_001.value.qualityValue : ""}
                            </span>
                            <div className="StickBox">
                                <div className="StickValue" style={{width: TooltipInfo.Element_001.value.qualityValue < 0 ? 0 : `${TooltipInfo.Element_001.value.qualityValue}%`, background: `${QualityColor}`}}></div>
                            </div> 
                        </div> : ""
                    }
                </div>
            </div>

            <div className="BasicStatArea">

                {/* 기본스탯  */}
                {filterItemPartBox.length > 0 ?  
                    filterItemPartBox.map((FilterData, index1) =>  index < 11  ? <p className="Stat1" key={index1}>{Parser(FilterData[1].value.Element_001)}</p> : "") : ""
                }
                 {/* 어빌리티 스톤 */}
                 
                 <p>{Data.Type === "어빌리티 스톤" && TooltipInfo.Element_004.value.Element_001 !== undefined ? Parser(TooltipInfo.Element_004.value.Element_001) : ""}</p>
                 {/* 팔찌 옵션 */}
                 <p className="BraceletModal">{Data.Type !== "팔찌" && TooltipInfo.Element_004.value.Element_001 !== null ? "" : Parser("" + TooltipInfo.Element_004.value.Element_001)}</p>
            </div>

            

            <div>
                {/* 어빌리티 스톤 보너스체력 (보너스가 활성화되어있으면 나오고 없으면 안나옴) */}
                
                {/* <p>{TooltipInfo.Element_006.value.Element_001 !== undefined ? TooltipInfo.Element_006.value.Element_001.includes("BR") ? Parser(TooltipInfo.Element_006.value.Element_001) : TooltipInfo.Element_006.value.Element_001 : TooltipInfo.Element_006.value.Element_001 }</p> */}
                {/* <p className="EquipmentLevel">{index < 6 && TooltipInfo.Element_008.value.Element_001 !== undefined ? Parser(TooltipInfo.Element_008.value.Element_001) : ""}</p> */}
                {/* <p>{index < 6 && LvValue.includes("Lv") ? LvValue : ""}</p> */}
                {/* 어빌리티 스톤 체력  */}

              
                {  
                     TooltipInfo.Element_006.value.Element_000 !== undefined && TooltipInfo.Element_006.type === "IndentStringGroup" ? 
                        <>
                            <p className="AbilityStoneHp">{Data.Type === "어빌리티 스톤" ? Parser(TooltipInfo.Element_005.value.Element_001) : ""}</p>
                            <p clas sName="EngravingName" onClick={() => {console.log(TooltipInfo.Element_006.value.Element_000.contentStr.Element_001)}}>{index < 12 & index > 5 ? Parser(TooltipInfo.Element_006.value.Element_000.contentStr.Element_000.contentStr) : ""}</p>
                            <p className="EngravingName">{index < 12 && index > 5 && TooltipInfo.Element_006.value.Element_000.contentStr.Element_001 !== undefined ? Parser(TooltipInfo.Element_006.value.Element_000.contentStr.Element_001.contentStr) : ""}</p>
                            <p className="EngravingName debuff">{index < 12 && index > 5 && TooltipInfo.Element_006.value.Element_000.contentStr.Element_002 !== undefined ? Parser(TooltipInfo.Element_006.value.Element_000.contentStr.Element_002.contentStr) : ""}</p>
                        </> :
                         TooltipInfo.Element_005.type === "IndentStringGroup" ?
                        <>
                              <p className="EngravingName">{index < 12 && index > 5 ? Parser(TooltipInfo.Element_005.value.Element_000.contentStr.Element_000.contentStr) : ""}</p>
                              <p className="EngravingName">{index < 12 && index > 5 ? Parser(TooltipInfo.Element_005.value.Element_000.contentStr.Element_001.contentStr) : ""}</p>
                              <p className="EngravingName debuff">{index < 12 && index > 5 ? Parser(TooltipInfo.Element_005.value.Element_000.contentStr.Element_002.contentStr) : ""}</p>
                        </> : <></>
                    
                }
            </div>
        </div>
    )
} 


function NoEquipmentArea() {
    return (
        <div className="EquipmentInfo" >
            <div className="ImageArea">
                 <img src="" alt="" />
            </div>
        </div>
    )
}

function EquipentArea({EquipmentData, Data, index}) {

    const [BackColorStyle, setBackColorStyle] = useState(null); // 아이템 뒷 배경 
    const [FontColorStyle, setFontColorStyle] = useState(null); // 아이템 폰트.
    const [LvValue, setLvValue] = useState(null); // 세트레벨
    const [QualityValue, setQualityValue] = useState(null) // 품질 그래프 색상
    const [QualityColor, setQualityColor] = useState(null); // 품질 문자 색상
    const [TooltipInfo, setTooltipInfo] = useState(null); // 품질 문자 색상
    const [ShowModalArea, setShowModalArea] = useState(false); // 마우스 OVER시 true로 변경
    const [Bracelet, setBracelet] = useState([]); // 팔찌
    
    // </img>의 위치를 담아놓는 배열
    const [ImgBasket, setImgBasket] = useState([50, 100, 200, 300, 400]);
    const [ImgLocation, setImgLocation] = useState([]);
    const BraceletEffectArray = ['체력', '힘', '민첩', '지능', '치명', '특화', '신속', '제압', '인내', '숙련', '최대 생명력', '최대 마나', '물리 방어력', '마법 방어력', '오뚝이', '돌진', '강타', '타격', '마나회수', '속공', '투자', '반전', '멸시', '무시', '전투 중 생명력 회복량', '회생', '긴급수혈', '응급처치', '앵콜', '쐐기', '망치', '열정', '냉정', '비수', '약점 노출', '깨달음', '응원', '수확', '보상', '무기 공격력', '우월', '습격', '정밀', '상처약화', '분개', '기습', '결투', '적립'];
    const DataTypeArray = ['어깨', '투구', '상의', '하의', '장갑', '무기', '목걸이', '귀걸이', '귀걸이', '반지', '반지', '어빌리티 스톤', '팔찌'];
    const NickName = useParams();

    let ExistAbilityStone = Data.Tooltip.includes("어빌리티 스톤");
    
    useEffect(() => {
        setLvValue(Data.Tooltip.substr(Data.Tooltip.indexOf("세트 효과 레벨") + 66, 4));
        setQualityValue(parseInt(Data.Tooltip.substr(Data.Tooltip.indexOf('qualityValue') + 15, 3)));
        setTooltipInfo(JSON.parse(Data.Tooltip));
            
        if(Data.Type === "팔찌" && TooltipInfo !== null && TooltipInfo.Element_004.value.Element_001 !== undefined) 
        {
            const Data2 = [];
            BraceletEffectArray.map((Data, index1) => {
                if(TooltipInfo.Element_004.value.Element_001.includes(Data))
                {
                    Data2.push(Data);
                }
            })
            setBracelet(Data2);
        }
        
        // 등급별 폰트색 및 배경색
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
        
        // 품질 색상
        if(QualityValue !== null)
        {
            switch(Math.floor(QualityValue / 10))
            {
                case 10: 
                    setQualityColor("#F9AE00");
                    break;
                case 9 : 
                    setQualityColor("#8045DD");
                    break;
                case 8:
                case 7:
                    setQualityColor("#2AB1F6");
                    break;
                case 6:
                case 5:
                case 4:
                case 3:
                    setQualityColor("#A0E716");
                    break;
                case 2:
                case 1: 
                    setQualityColor("#FFE81D");
                    break;
                default :
                    setQualityColor("black");
                    break;
            }
        }

    }, [EquipmentData, NickName, QualityValue]);
    
    const ClickFunction = () => {
        if(TooltipInfo !== null)
        {
            for(let i=0; i < 5; i++)
            {
                let newNumber = TooltipInfo.Element_004.value.Element_001.indexOf('mg>', ImgBasket[i]);

                setImgLocation([...ImgLocation, newNumber])
            }
            console.log(ImgLocation)
        }
    }

    return (
        <div className="EquipmentInfo" >
           <div className="ImageArea">
                <img src={Data.Type === DataTypeArray[index] ? Data.Icon : ""} onClick={() => {ClickFunction()}} alt="" style={Data.Type === DataTypeArray[index] ? {background: BackColorStyle} : {}} onMouseEnter={()=>{setShowModalArea(true)}} onMouseOut={() => {setShowModalArea(false)}}/>
           </div>

            <div className="TextArea" style={Data.Type === DataTypeArray[index] ? {} : {display: "none"}}>
                <p style={{color: FontColorStyle}}>{Data.Name}</p>
                
                <div className="BottomArea">
                    {/* 장비 레벨에 대한 정보 [무기 방어구에만 보인다.] */}
                    {LvValue !== null && index < 6 && LvValue.charAt(0) === "L" ? <span onClick={() => {console.log(LvValue)}} className="EquipmentLevel">{LvValue}</span> : ""}
                    {index < 11 ? 
                    <>
                        {/* 품질 */}
                        <span className="QuallityValueText" style={{color: `${QualityColor}`}}>{QualityValue !== null ? QualityValue < 0 ? 0 : QualityValue : "X"}</span>
                        <div className="StickBox">
                            <div className="StickValue" style={{width: QualityValue < 0 ? "0px" : `${QualityValue}%`, background: `${QualityColor}`}}></div>
                        </div> 
                    </> :  Data.Type === "어빌리티 스톤" & TooltipInfo !== null ? 
                        
                        // 어빌리티 스톤 정보
                        <div className="AbilityStoneInfo">
                            {ExistAbilityStone === true && TooltipInfo.Element_006.value.Element_000 !== undefined ? 
                                <>
                                    <span onClick={() => {console.log(TooltipInfo)}}>보기</span>
                                    <span>{TooltipInfo.Element_006.value.Element_000.contentStr.Element_000.contentStr.split('').reverse().join('').charAt(4)}</span>
                                    <span>{TooltipInfo.Element_006.value.Element_000.contentStr.Element_001.contentStr.split('').reverse().join('').charAt(4)}</span>
                                    <span className="Debuff">{TooltipInfo.Element_006.value.Element_000.contentStr.Element_002.contentStr.split('').reverse().join('').charAt(4)}</span>
                                </> : 
                            
                                TooltipInfo.Element_005.value.Element_000.contentStr !== undefined  ? 
                                    <>
                                        <span>{TooltipInfo.Element_005.value.Element_000.contentStr.Element_000.contentStr.split('').reverse().join('').charAt(4)}</span>
                                        <span>{TooltipInfo.Element_005.value.Element_000.contentStr.Element_001.contentStr.split('').reverse().join('').charAt(4)}</span>
                                        <span className="Debuff">{TooltipInfo.Element_005.value.Element_000.contentStr.Element_002.contentStr.split('').reverse().join('').charAt(4)}</span>
                                    </> : ""
                                 
                            }
                        </div> : <div className="BraceletAbilityTextBox">{Bracelet.length > 0 ? <span>준비중</span> : "ㅁ"}</div>
                    }
                </div>
            </div>

            {TooltipInfo !== null & Data.Type === DataTypeArray[index] ? 
                <EquipmentModalArea LvValue={LvValue !== null ? LvValue : ""} ShowModalArea={ShowModalArea} TooltipInfo={TooltipInfo} Data={Data} BackColor={BackColorStyle} index={index} QualityColor={QualityColor}/> :
            ""}
        </div>
    )
}

function CharacterEquipment() {

    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    const NickName = useParams();
    const [EquipmentData, setEquipmentData] = useState(null);
    const [EngravingData, setEngravingData] = useState(null);
    
    const GetEngravings = async () =>  {
        try {
            const response = await axios.get(`https://developer-lostark.game.onstove.com/armories/characters/${NickName.searchCharacter}/engravings`, {
                headers: {Authorization: `bearer ${Key}`}
            });

            if(response.data !== null)
            {
                setEngravingData(response.data.Engravings);  
            } else if (response.data === null)
            {
                setEngravingData(null);
            }

            
        } catch (error) {
            console.log(error)
        }
    };
    
    const GetEquipment = async () => {
        try {
            const response = await axios.get(`https://developer-lostark.game.onstove.com/armories/characters/${NickName.searchCharacter}/equipment`, {
                headers: {Authorization: `bearer ${Key}`}
            });
            
            if(response.data !== null) {
                let tmp =  response.data[5];
                response.data[5] = response.data[0];
                response.data[0] = tmp;
                setEquipmentData(response.data)
            } else if (response.data === null)
            {
                setEquipmentData(null)
            }
            
            
        } catch {
            console.log("에러발생")
        }
    }

    let NoEquipment = [];
   
    useEffect(() => {
        GetEngravings();
        GetEquipment();
    }, [NickName])

    if(EquipmentData !== null)
    {
        let test = 13 - EquipmentData.length;

        for(let i = 0; i < test; i++)
        {
            NoEquipment.push(i);
        }
    } else {
        for(let i = 0; i < 13; i++)
        {
            NoEquipment.push(i);
        }
    }
    
    return (
        <div className="EquipmentParentBox">
            <div className="EquipmentZone">
                
                <div className="FirstBox">
                    {EquipmentData !== null ? EquipmentData.map((Data, index) => {
                        if(index < 6)
                        {
                            return (  
                                    <EquipentArea key={index} EquipmentData={EquipmentData} Data={Data} index={index} />
                            )
                        }
                    }) : NoEquipment.map((Data, index) => {    
                        if(NoEquipment.length > 6 )
                        {
                            if(index < 6) {
                                return (  
                                    <NoEquipmentArea key={index}  />            
                                )
                            }
                            
                        }
                    })}
                    <div className="EngravingBox">
                        {EngravingData !== null ? EngravingData.map((Data, index1) => (
                            <div className="EngravingInfo" key={index1}>
                                <img src={Data.Icon} alt="각인 아이콘" />
                                <div>
                                    <h5>{Data.Name}</h5>
                                    <span>활성 포인트 
                                        {Data.Tooltip.substr(Data.Tooltip.indexOf("활성 포인트") + 7, 3).includes("<") ? Data.Tooltip.substr(Data.Tooltip.indexOf("활성 포인트") + 7, 2) : Data.Tooltip.substr(Data.Tooltip.indexOf("활성 포인트") + 7, 3)}
                                    </span>
                                </div>
                                
                            </div>
                        )) : 
                            <div className="NotHaveEngravingInfo">
                                <div></div>
                                <div></div>
                            </div>
                        
                        }
                    </div>
                </div>

                <div className="SecondBox">
                    {EquipmentData !== null && EquipmentData.length > 6 ? EquipmentData.map((Data, index) => {
                        if(index >= 6 && index < 13)
                        {
                            return (  
                                    <EquipentArea key={index} EquipmentData={EquipmentData} Data={Data} index={index} />
                            )
                        } 
                    }): NoEquipment.length > 1 ? NoEquipment.map((Data, index) => {    
                            if(NoEquipment.length > 8)
                            {
                                if(index >= 6) {
                                    return (  
                                        <NoEquipmentArea key={index}  />            
                                    )
                                }   
                            } else {
                                return (
                                    <NoEquipmentArea key={index}  />            
                                )
                            }
                            
                       
                    }) : "1"}

                </div>
            </div>
        </div>
    )
}

export default CharacterEquipment;