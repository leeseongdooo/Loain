import React, {useState, useEffect, useMemo, useRef} from "react";
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
    const [AdventureIslandImageData, setAdventureIslandImageData] = useState(null)
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

    // 모험섬 데이터, 
    const AdventureIslandImage = [
        {
            id: 1,
            IslandName: "고요한 안식의 섬",
            IslandImage: '/img/sabbath.png'
        },
        {
            id: 2,
            IslandName: "잔혹한 장난감 성",
            IslandImage: '/img/brutaltoycastle.png'
        },
        {
            id: 3,
            IslandName: "환영 나비의 섬",
            IslandImage: '/img/phantombutterfly.png'
        },
        {
            id: 4,
            IslandName: "수라도",
            IslandImage: '/img/suras.png'
        },
        {
            id: 5,
            IslandName: "메데이아",
            IslandImage: '/img/medeia.png'
        },
        {
            id: 6,
            IslandName: "스노우팡 아일랜드",
            IslandImage: '/img/snow.png'
        },
        {
            id: 7,
            IslandName: "기회의 섬",
            IslandImage: '/img/chance.png'
        },
        {
            id: 8,
            IslandName: "죽음의 협곡",
            IslandImage: '/img/deathvalley.png'
        },
        {
            id: 9,
            IslandName: "우거진 갈대의 섬",
            IslandImage: '/img/lushreeds.png'
        },
        {
            id: 10,
            IslandName: "포르페",
            IslandImage: '/img/forpe.png'
        },
        {
            id: 11,
            IslandName: "볼라르 섬",
            IslandImage: '/img/volare.png'
        },
        {
            id: 12,
            IslandName: "블루홀 섬",
            IslandImage: '/img/bluehole.png'
        },
        {
            id: 13,
            IslandName: "하모니 섬",
            IslandImage: '/img/harmony.png'
        },
        {
            id: 14,
            IslandName: "몬테 섬",
            IslandImage: '/img/monte.png'
        }, 
    ];

    // 모험섬 보상 데이터
    const reward = [
        {
            id: 1,
            rewardName: "카드",
            rewardImage: ["/img/island_cardpack.png", "/img/island_exp.png", "/img/island_heart.png", "/img/island_simbol.png"]
        },
        {
            id: 2,
            rewardName: "주화",
            rewardImage: ["/img/island_coinbox.png", "/img/island_coin1.png", "/img/island_heart.png", "/img/island_simbol.png"]
        },
        {
            id: 3,
            rewardName: "실링",
            rewardImage: ["/img/island_siling.png", "/img/island_heart.png", "/img/island_simbol.png"]
        },
        {
            id: 4,
            rewardName: "골드",
            rewardImage: ["/img/island_gold.png", "/img/island_heart.png", "/img/island_simbol.png"]
        }
    ]

    const AdventureIsland = async () => {
        try {
          const response = await axios.get("https://lostarkapi.ga/adventureisland");
          let copycat = response.data.Island;

          AdventureIslandImage.map((Data) => {
            copycat.map((Data2, index) => {
                if(Data.IslandName === Data2.Name)
                {
                    console.log(copycat[index]);
                    copycat[index].IslandImage = Data.IslandImage;
                    setAdventureIslandImageData(copycat);
                }
            })
        })
          
        } catch(e) {
          console.log(e)
        }
      };

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
        AdventureIsland();
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
            console.log(NowSecTime)
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
                                    <span style={Data.ContentsDay.includes(today.korDate) ? {} : {color: "#B1B5C3"}}>{Data.contentName}</span>
                                </div>
                                <span style={Data.ContentsDay.includes(today.korDate) ? {} : {color: "#B1B5C3"}}>{Data.ContentsDay.includes(today.korDate) ? DayContentsTimer : Data.NoContents }</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="AdventureIslandBox">
                    {AdventureIslandImageData !== null  ? AdventureIslandImageData.map((Data, index) => {
                            return(
                                <div className="MiniIslandBox">
                                    <img src={Data.IslandImage} alt="" className="IslandImage" onClick={() => {console.log(Data)}} />
                                    <div className="TextInfo">
                                        <div className="TopInfo">
                                            <span className="Reward" style={Data.Reward === "실링" ? {backgroundColor: "#7D839533", color: "#7D8395"} : Data.Reward === "카드" ? {backgroundColor: "#F38F0033", color: "#F38F00"} : Data.Reward === "주화" ? {backgroundColor: "#CE43FC33", color: "#AA37D1"} : {backgroundColor: "#E8B83833", color: "#DCA000"}}>{Data.Reward}</span>
                                            <span className="IslandName">{Data.Name}</span>
                                        </div>

                                        <div className="BottomInfo">
                                            {reward.map((Data2) => Data2.rewardName === Data.Reward ? Data2.rewardImage.map((ImgData, index) => <img key={index} src={ImgData} className="rewardImage"/>) : "")}
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