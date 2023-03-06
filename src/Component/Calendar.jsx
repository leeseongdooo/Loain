import React, {useState, useEffect, useMemo, useRef} from "react";
import axios from "axios";
import Year from "react-live-clock";
import Month from "react-live-clock";
import "../Css/Calendar.scss";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";

function AdventureIsland({today}) {
    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    const [AdventureIslandData, setAdventureIslandData] = useState([]);
    const [TodayItem, setTodayItem] = useState([]);
    const [ArrayIndex, setArrayIndex] = useState([false, false, false]);
    let today2 = `${today.year}-0${today.month}-${today.date}`;

    if(today.date < 10)
    {
        today2 = `${today.year}-0${today.month}-0${today.date}`
    }

     // 오늘의 모험섬 데이터 가져오기.
     async function getTodayAdventureIsland() {
        try {
            
        //응답 성공
        const response = await axios.get(`/gamecontents/calendar`, {
            headers: {Authorization: `bearer ${Key}`}
        });
        
        let FirstFilter = response.data.filter((data) => data.CategoryName === "모험 섬");
        console.log(FirstFilter);
        let test = [];

        FirstFilter.map((data) => {
            for(let i = 0; i < data.StartTimes.length; i++)
            {
                if(data.StartTimes[i].includes(today2))
                {
                    test.push(data); 
                    break;
                }
            }
        });
        console.log(test);
        
        setAdventureIslandData(test);
    
        } catch (error) {
          //응답 실패
          console.error(error);
        }
      }

      useEffect(() => {
        getTodayAdventureIsland();
      }, []);

    return (
        <div className="AdventureIslandBox">
        {AdventureIslandData.length !== 0 ? AdventureIslandData.map((Data, index) => {
            
            // 필요한건 아래 보상 리워드
            let RewardArray = Data.RewardItems;

            const BackClick = () => {
                const aaa = ArrayIndex;
                aaa[index] = false;
                setArrayIndex(aaa);
            }

            const FrontClick = () => {
                    const aaa = ArrayIndex; 
                    aaa[index] = true;
                    console.log(aaa);
                    setArrayIndex(aaa);
            }
           
            return (
                <div className="MiniIslandBox" key={index}>
                    <img src={Data.ContentsIcon} alt="" className="IslandImage" onClick={() => console.log(Data)} />
                    <div className="TextInfo">
                        
                        <div className="TopInfo">
                            <span className="IslandName">{Data.ContentsName}</span>
                        </div>

                        <div className="BottomInfo">
                        
                            {/* <FiArrowLeftCircle onClick={() => {BackClick()}} className="Icon" style={ArrayIndex[index] === true ? {} : {display: "none"}}/> */}
                            
                            {/* {RewardArray.length > 0 ? RewardArray.map((Data2, index2) => 
                            {
                                    
                                  

                                    let backgroundColor = '';
                                    switch(Data2.Grade)
                                    {
                                        case "유물" : 
                                            backgroundColor = "linear-gradient(135deg,#341a09,#a24006)";
                                            break;
                                        case "전설" : 
                                            backgroundColor = "linear-gradient(135deg,#362003,#9e5f04)";
                                            break;
                                        case "영웅" : 
                                            backgroundColor = "linear-gradient(135deg,#261331,#480d5d)";
                                            break;
                                        case "희귀" :
                                            backgroundColor = "linear-gradient(135deg,#111f2c,#113d5d)";
                                            
                                            break;
                                        case "고급" : 
                                            backgroundColor = "linear-gradient(135deg,#18220b,#304911)";
                                            break;
                                        default: 
                                            backgroundColor = "linear-gradient(135deg,#18220b,#304911)";
                                            break;
                                    }

                                  
                                    if(index2 < 6)
                                    {
                                        return (
                                            <>
                                                <img key={index2} style={{background: backgroundColor}} src={Data2.Icon} className="rewardImage"/>
                                            </>
                                        )
                                    } 
                                
                            }
                            ) : ""} */}

                            <FiArrowRightCircle onClick={() => {FrontClick()}} className="Icon"/>
                            
                        
                        </div>
                    </div>
                </div>
            )
        }) : "로딩중입니다."}
    </div>
    )
}

function ChallengeGuardian() {
    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    const [ChallengeGuardianInfo, setChallengeGuardianInfo] = useState([]);

    async function getThisWeekChallengeGuardian() {
        try {
            //응답 성공
            const response = await axios.get(`gamecontents/challenge-guardian-raids`, {
                headers: {Authorization: `bearer ${Key}`}
            });

            setChallengeGuardianInfo(response.data.Raids);
            
        
        } catch (error) {
          //응답 실패
          console.error(error);
        }
      }

      useEffect(() => {
        getThisWeekChallengeGuardian();
      }, [])
    
    return (
        <div className="ChallengeGuardianBox">
            <h3>도전 가디언 토벌</h3>
            
            <div className="GuardianFlexBox">
                {ChallengeGuardianInfo.length !== 0 ? ChallengeGuardianInfo.map((Data, index) => (
                    <div className="GuardianInfo" key={index}>
                        
                        <div className="TextArea">
                            <p className="Name">{Data.Name}</p>
                            <img src={Data.Image} alt="가디언 이미지" />
                            {/* <p className="SeeMore" onClick={() => {alert("준비 중 입니다! 빠른 시일 내에 추가할게요!")}}>자세히 보기 <BsFillArrowRightCircleFill className="Icon"/></p> */}
                        </div>
                    </div>
                )) : ""}
            </div>
            
        </div>    
    )
}

function ChallengeAbyss() {
    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    const [ChallengeAbyssInfo, setChallengeAbyssInfo] = useState([]);

    async function getThisWeekChallengeGuardian() {
        try {
            //응답 성공
            const response = await axios.get(`gamecontents/challenge-abyss-dungeons`, {
                headers: {Authorization: `bearer ${Key}`}
            });
            
            setChallengeAbyssInfo(response.data);
            
        
        } catch (error) {
          //응답 실패
          console.error(error);
        }
      }

      useEffect(() => {
        getThisWeekChallengeGuardian();
      }, [])
      return (
        <div className="ChallengeAbyssDungeons">
            <h3>도전 어비스 던전</h3>
            <div className="ChallengeAbyssBox">
            {ChallengeAbyssInfo.length !== 0 ? ChallengeAbyssInfo.map((Data, index) => (
                <div className="AbyssInfo" key={index}>
                    
                    <div className="TextArea">
                        <p className="Name">{Data.Name}</p>
                        <img src={Data.Image} alt="가디언 이미지" />
                        {/* <p className="SeeMore" onClick={() => {alert("준비 중 입니다! 빠른 시일 내에 추가할게요!")}}>자세히 보기 <BsFillArrowRightCircleFill className="Icon"/></p> */}
                    </div>
                </div>
            )) : ""}
        </div>    
        </div>
      )
}


function Calendar() {

    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    
    const KorWeek = ['일', '월', '화', '수', '목', '금', '토', '일']; // 요일
    let now = new Date();
    let lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    const [NowWidth, setNowWidth] = useState(window.innerWidth);
    const handleResize = () => {
        console.log(`브라우전 화면 사이즈 : ${window.innerWidth}`);
        setNowWidth(window.innerWidth);
    }
    
    const [today, setToday] = useState(
        {
            "year": now.getFullYear(),
            "month": now.getMonth() + 1,
            "date": now.getDate(),
            "korDate": KorWeek[now.getDay()],
        }
    ); // 오늘
    
    const [ThisMonthlastDay, setThisMonthLastDay] = useState(new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()); // 오늘 기준으로 해당 달에 마지막날
    const [lastMonthFinalDay, setlastMonthFinalDay] = useState(new Date(now.getFullYear(), now.getMonth(), 0).getDate()); // 오늘 기준으로 지난 달에 마지막날
    const [TestArray, setTestArray] = useState([]);
    const [BackColorStyle, setBackColorStyle] = useState(null);

    // 날짜 UI 만드는것
    const getMiniCalendar = () => {
        let miniarray = [];
        for(let i = -7; i <= 7; i++)
        {
            let minusDay = now.getDate() + i;
            
            if(minusDay > lastDay.getDate())
            {
                
                minusDay = minusDay - lastDay.getDate();
            }

            if(minusDay <= 0)
            {
                const lastDays = new Date(`${now.getFullYear()}-${now.getMonth()}-${lastMonthFinalDay + minusDay}`).getDay();
                const lastMonthInfo = {
                    "year": now.getFullYear(),
                    "month": now.getMonth(),
                    "date": lastMonthFinalDay + minusDay,
                    "korDate": KorWeek[lastDays],
                } 
                
                miniarray.push(lastMonthInfo);
                
            } else {
                const lastDays = new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${minusDay}`).getDay();
                const lastMonthInfo = {
                    "year": now.getFullYear(),
                    "month": now.getMonth() + 1,
                    "date": minusDay,
                    "korDate": KorWeek[lastDays],
                } 
               
                miniarray.push(lastMonthInfo );       
            }    
        }
        setTestArray(miniarray);
        
    }
    
    // 금일 콘텐츠
    const DayContents = [
        {
            id: 1,
            icon: 'https://kloa.gg/_next/static/media/ico_boss_on.5fa466bf.png',
            noIcon: 'https://kloa.gg/_next/static/media/ico_boss_off.6c4eae60.png',
            contentName: "필드보스",
            NoContents: "<자리비움>",
            ContentsDay: ['화', '금', '일']
        },
        {
            id: 2,
            icon: 'https://kloa.gg/_next/static/media/ico_ghost_on.b465f4fc.png',
            noIcon: 'https://kloa.gg/_next/static/media/ico_ghost_off.08a42f6d.png',
            contentName: "유령선",
            NoContents: "<자리비움>",
            ContentsDay: ['화', '목', '토', '일']
        },
        {
            id: 3,
            icon: 'https://kloa.gg/_next/static/media/ico_chaos_on.2cc006ba.png',
            noIcon: 'https://kloa.gg/_next/static/media/ico_chaos_off.43129e91.png',
            contentName: "카오스게이트",
            NoContents: "<자리비움>",
            ContentsDay: ['월', '목', '토','일']
        }
    ]
 
    // 카운트
    const padNumber = (num, length) => {
        return String(num).padStart(length, '0');
    };

    const weekDayAdventureIsland = [11, 13, 19, 21, 23];
    const weekendAdventureIsland = [9, 11, 13, 19, 21, 23];

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    // 지금 시간
    const NowSecTime = (hours * 60 * 60) + (minutes * 60) + seconds;
    
    const [Adventurehour, setAdventureHour] = useState(0);
    const [Adventuremin, setAdventureMin] = useState(0);
    const [Adventuresec, setAdventureSec] = useState(0);

    let NextAdventureIsland = [];
    weekDayAdventureIsland.map((Data, index) => {
        // 현재시간보다 큰것.
        if(hours < Data)
        {
            NextAdventureIsland.push(Data);
        } else if(hours === 23 ) {
            NextAdventureIsland = [11, 13, 19, 21, 23];
        }
    
    }); 

    // NextAdventureIsland[0] * 3600 - NowSecTime
    const [AdventureIslandTimer, setAdventureIslandTimer] = useState(0);
    const [NextsecTime, setNextsecTime] = useState(NextAdventureIsland[0] * 3600 - NowSecTime); // 다음 시간을 초로 변환
    // 다음 모험섬 시간을 구하는 함수
    const [DayContentsTimer, setDayContentsTimer] = useState("");
  
    // 하루 콘텐츠 1시간
    const tempHour = 1;
    const tempMin = 0;
    const tempSec = 0;
    
    // 타이머를 초단위로 변환한 initialTime과 setInterval을 저장할 interval ref
    const [initialTime, setInitialTime] = useState((tempHour * 60 * 60 + tempMin * 60 + tempSec) - (minutes * 60 + seconds));
    const [hour, setHour] = useState(padNumber(tempHour, 2));
    const [min, setMin] = useState(padNumber(tempMin, 2));
    const [sec, setSec] = useState(padNumber(tempSec, 2));

    useEffect(() => {
        getMiniCalendar();
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            // count => count - 1            
            setInitialTime(initialTime => initialTime - 1);
            
            setSec(padNumber(initialTime % 60, 2));
            setMin(padNumber(parseInt(initialTime / 60), 2));
            setHour(padNumber(parseInt(initialTime / 60 / 60), 2));
            setDayContentsTimer(hour + " : " + min + " : " + sec);

        }, 1000);
        if(initialTime === 0){
            setInitialTime(3600);
            return () => clearInterval(id);
        }
        return () => clearInterval(id);
    }, [initialTime])
    
    useEffect(() => {
        const NextTime = setInterval(() => {
            setNextsecTime(NextsecTime => NextsecTime - 1);
            
            setAdventureSec(padNumber(NextsecTime % 60, 2));
            setAdventureMin(padNumber(parseInt((NextsecTime / 60) % 60), 2));
            setAdventureHour(padNumber(parseInt(NextsecTime / 60 / 60), 2));
            setAdventureIslandTimer(Adventurehour + " : " + Adventuremin + " : " + Adventuresec);
        }, [1000]);
        
        if(NextsecTime <= 0)
        {                        
            if(hours === 23)
            {
                setNextsecTime(NextAdventureIsland[0] * 3600);
                return clearInterval(NextTime);
            } else {
                setNextsecTime(NextAdventureIsland[0] * 3600 - NowSecTime);
                return clearInterval(NextTime);
            }

            
        }
        return () => clearInterval(NextTime);
    }, [NowSecTime])

    return (
        <div className="CalenderBigBox">
            <div className="TitleAndTimer">
                <div>
                    <span>모험 섬</span>
                    <span className="TimerText" onClick={() => console.log(NextAdventureIsland)}>{AdventureIslandTimer}</span>
                </div>
                
                <div>
                    <span className="Year">
                        <Year
                        id="Year"
                        format={"YYYY"}
                        ticking={false}
                        timezone={"Asia/Seoul"}
                        />년
                    </span>
                    &nbsp;&nbsp;
                    <span className="Month">
                        <Month format={"MM"} ticking={false} timezone={"Asia/Seoul"}/>
                        월
                    </span>
                </div>
            </div>

            <div className="ContentsBox">
                <div className="ChooseDayBox">
                      {TestArray.map((Data, index) => {
                        if(NowWidth < 720)
                        {
                            if(index > 6)
                            {
                                return  (
                                    <div className="MiniCalendar" key={index} style={Data.date == today.date ? {backgroundColor: "royalblue", color: "white"} : {}}>
                                        <p className="KorDate" style={Data.date == today.date ? {color: "white"} : {}}>{Data.korDate}</p>
                                        <p className="Date" style={Data.korDate === "일" ? {color: 'red'} : {}}>{Data.date}</p>
                                    </div>
                                )
                            }
                        } else if(NowWidth > 720) {
                            return  (
                                <div className="MiniCalendar" key={index} style={Data.date == today.date ? {backgroundColor: "royalblue", color: "white"} : {}}>
                                    <p className="KorDate" style={Data.date === today.date ? {color: "white"} : {}}>{Data.korDate}</p>
                                    <p className="Date" style={Data.korDate === "일" ? {color: 'red'} : {}}>{Data.date}</p>
                                </div>
                            )
                        }
                      })}
                </div>

                <hr className="Line"/>

                <div className="DayContentsBox">
                    <div className="ContentsForm">
                        {DayContents.map((Data, index) => (
                            <div className="MiniContentsBox" key={index}>
                                <div className="IconAndName">
                                    <img src={Data.ContentsDay.includes(today.korDate) ? Data.icon : Data.noIcon} alt={"X"} className="Icon"/>
                                    <span style={Data.ContentsDay.includes(today.korDate) ? {} : {color: "#B1B5C3"}}>{Data.contentName}</span>
                                </div>
                                <span style={Data.ContentsDay.includes(today.korDate) ? {} : {color: "#B1B5C3"}}>{Data.ContentsDay.includes(today.korDate) ? DayContentsTimer : Data.NoContents }</span>
                            </div>
                        ))}
                    </div>
                    <AdventureIsland today={today} />
                </div>
            </div>

            <span className="ContentsName">주간 도전 컨텐츠</span>
            <div className="ChallengContentsBox">
                
                <div className="ChallengContentsInnerBox">
                    <ChallengeGuardian />
                    <ChallengeAbyss />
                </div>

            </div>
            
        </div>
    )
}

export default Calendar;