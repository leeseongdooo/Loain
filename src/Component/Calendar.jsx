import React, {useState, useEffect, useMemo} from "react";
import axios from "axios";
import Year from "react-live-clock";
import Month from "react-live-clock";
import "../Css/Calendar.scss";

function Calendar() {
    const KorWeek = ['일', '월', '화', '수', '목', '금', '토', '일']; // 요일
    let now = new Date();
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
    const [AdventureIslandData, setAdventureIslandData] = useState(null);
    const [TestArray, setTestArray] = useState([]);
    
    const getMiniCalendar = () => {
        let miniarray = [];
        for(let i = -7; i <= 7; i++)
        {
            let minusDay = now.getDate() + i;
            if(minusDay <= 0)
            {
                const lastDays = new Date(`${now.getFullYear()}-${now.getMonth()}-${lastMonthFinalDay + minusDay}`).getDay();
                const lastMonthInfo = {
                    "year": now.getFullYear(),
                    "month": now.getMonth(),
                    "date": lastMonthFinalDay + minusDay,
                    "korDate": KorWeek[lastDays],
                } 
                console.log("저번달 : " + lastMonthInfo);
                miniarray.push(lastMonthInfo);
                console.log("저번달 성공!");
            } else {
                console.log("이번달 : " + minusDay);
                const lastDays = new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${minusDay}`).getDay();
                const lastMonthInfo = {
                    "year": now.getFullYear(),
                    "month": now.getMonth() + 1,
                    "date": minusDay,
                    "korDate": KorWeek[lastDays],
                } 
                miniarray.push(lastMonthInfo );       
                console.log(miniarray);         
                console.log("이번달 성공!");
            }    
        }
        setTestArray(miniarray);
        
    }
    
    const DayContents = [
        {
            id: 1,
            icon: '	https://kloa.gg/_next/static/media/ico_boss_on.5fa466bf.png',
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
    const AdventureIsland = async () => {
        try {
          const response = await axios.get("https://lostarkapi.ga/adventureisland");
          setAdventureIslandData(response.data.Island);
        } catch(e) {
          console.log(e)
        }
      };

    useEffect(() => {
        getMiniCalendar();
        AdventureIsland();
    }, [])
    
    return (
        <div className="CalenderBigBox">
            <div className="TitleAndTimer">
                <div>
                    <span>모험 섬</span>
                    <span className="TimerText">타이머</span>
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
                      {TestArray.map((Data) => (
                        <div className="MiniCalendar" style={Data.date == today.date ? {backgroundColor: "royalblue", color: "white"} : {}}>
                            <p className="KorDate" style={Data.date == today.date ? {color: "white"} : {}}>{Data.korDate}</p>
                            <p className="Date" style={Data.korDate === "일" ? {color: 'red'} : {}}>{Data.date}</p>
                        </div>
                        ))}
                </div>

                <hr className="Line"/>

                <div className="DayContentsBox">
                    <div className="ContentsForm">
                        {DayContents.map((Data) => (
                            <div className="MiniContentsBox">
                                <div className="IconAndName">
                                    <img src={Data.ContentsDay.includes(today.korDate) ? Data.icon : Data.noIcon} alt={"X"} className="Icon"/>
                                    <span>{Data.contentName}</span>
                                </div>
                                <span>{Data.ContentsDay.includes(today.korDate) ? "타이머" : Data.NoContents }</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="AdventureIslandBox">
                {AdventureIslandData !== null ? AdventureIslandData.map((Data, index) => {
                        return(
                            <div className="MiniIslandBox">
                                <img src="" alt="섬사진" className="IslandImage"/>
                                <div className="TextInfo">
                                    <div className="TopInfo">
                                        <span className="Reward" style={Data.Reward === "실링" ? {backgroundColor: "#7D839533", color: "#7D8395"} : Data.Reward === "카드" ? {backgroundColor: "#F38F0033", color: "#F38F00"} : {backgroundColor: "#CE43FC33", color: "#AA37D1"}}>{Data.Reward}</span>
                                        <span className="IslandName">{Data.Name}</span>
                                    </div>

                                    <div className="BottomInfo">

                                    </div>
                                </div>
                            </div>
                        )
                    }) : "로딩중입니다."}
                </div>
            </div>
        </div>
    )
}

export default Calendar;