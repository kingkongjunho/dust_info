/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import dustLogo from './images/dust_logo.png'
import './App.css';
import axios from 'axios';
import Login from "./login"


function App() {
  const [apiData, setApiData] = useState([]);
  const [favArr, setFavArr] = useState([]);

  // selectList부분
  const selectList = [
    "지역선택","전국","서울","인천","경기","강원","충북","충남","전북","전남","경남","경북","제주"
  ];
  const [selected, setSelected] = useState("");
  
  const handleSelect = (e) => {
    setSelected(e.target.value);
  }
  useEffect( () => {
    if (selected !== "") {
      const getParameters = {
        serviceKey: 'SvNwvCiIHM1%2BOVMfDYJADZkZpbotGZSsTZtyYTxckm%2Fd0LaVyi8b6y%2BNjsRC5OBqjHB1V%2Frf0tEVBlgSCRMPQQ%3D%3D',    
        returnType:"json",
        numOfRows:"auto",
        pageNo:"1",
        sidoName: selected, // 시/도이름
        ver:"1.0",
      };
      fetch(`B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${getParameters['serviceKey']}&returnType=${getParameters['returnType']}&numOfRows=${getParameters['numOfRows']}&pageNo=${getParameters['pageNo']}&sidoName=${getParameters['sidoName']}&ver=${getParameters['ver']}`)
      .then(response => response.json())
      .then(data => {
        const copy = [...data.response.body.items];
        copy.map((arr) => {
          arr.favFlag = false;
        })
        setApiData(copy);
      });
    }
  }, [selected]);
  if (!apiData) return <div>Loading...</div>;


//로그인 부분
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 회원가입 또는 로그인 요청을 보내는 로직을 작성합니다.
    // 예를 들어, axios를 사용하여 서버에 POST 요청을 보낼 수 있습니다.
    // 아래에는 간단한 예시 코드가 있습니다.

    const data = {
      email: email,
      password: password
    };

    // 회원가입 또는 로그인 요청 예시 (axios를 사용한 경우)
    axios.post('/api/login', data)
      .then((response) => {
        // 로그인 또는 회원가입이 성공한 경우에 대한 처리를 작성합니다.
        console.log(response.data);
      })
      .catch((error) => {
        // 로그인 또는 회원가입이 실패한 경우에 대한 처리를 작성합니다.
        console.error(error);
      });
  };
};

// /////////////////////////////////
// // 사용자의 현재 위치를 가져옵니다.
// const position = navigator.geolocation.getCurrentPosition();
// // 위치 정보 출력
// console.log(position);

// console.log(position.coords.latitude); // 위도
// console.log(position.coords.longitude); // 경도
// console.log(position.coords.accuracy); // 위치 정확도

// // 사용자의 위치를 추적합니다.
// const watchId = navigator.geolocation.watchPosition(function(position) {
//   console.log(position);
// });
// // 위치 추적 종료
// navigator.geolocation.clearWatch(watchId);
// /////////////////////////////////



  // 즐겨찾기 부분
  // 기존 즐겨찾기

    const handleClick = (index) => {
      const copy = [...apiData];
      const copyFavArr = [...favArr];

      if(apiData[index].favFlag === false) {
     
        copyFavArr.push(copy[index]);
        setFavArr(copyFavArr);

      } else if (apiData[index].favFlag === true) {

        const returnIndex = copyFavArr.findIndex((data) => { return data.stationName === copy[index].stationName});
        copyFavArr.splice(returnIndex, 1);
        setFavArr(copyFavArr);
      }
      copy[index].favFlag = !copy[index].favFlag;
      setApiData(copy);
    };

    
    //즐겨찾기 취소
    const handleRemoveFavorite = (index) => {
      const updatedFavArr = [...favArr];
      const copy = [...apiData];
      updatedFavArr.splice(index, 1); // 해당 아이템을 제거합니다.
      setFavArr(updatedFavArr); // 업데이트된 즐겨찾기 목록을 설정합니다.
      // useEffect(() => {
      //   console.log(favArr);
      // }, [favArr]);
      
    };

    
    useEffect(()=>{
      console.log(favArr);
    },[favArr])
    // const [favorites, setFavorites] = useState([]);
    // const handleFavorite = (id) => {
    //   if (favorites.includes(id)) {
    //     setFavorites(favorites.filter((favorite) => favorite !== id));
    //   } else {
    //     setFavorites([...favorites, id]);
    //   }
    // };

    
  //-----------------------------------------------------------//
  // let post = '강남 우동 맛집';
  // // let a = num[0];
  // let [따봉,따봉변경] = useState(0);  
  // let [글제목,글제목변경] = useState([
  //   '남자 코트 추천', 
  //   '강남 우동 맛집', 
  //   '파이썬 독학'
  // ]);
  //-----------------------------------------------------------//

    
    

  //-----------------------------------------------------------//

  return (
    <div className="App">
      <header>
        <div className="inner">
          <a style={{ fontSize: "32px", fontWeight: "bold" }}
            target="_self"
            href="#">
          </a>


          <div className="sub-menu">
            <div className='logo'>
            <img src={dustLogo} className='' style={{maxWidth:"100px", height:"100px"}} />
            </div>
            <ul className="menu">
              <li>
                <a target="_self" href="./login">
                  <Login></Login>
                </a>
              </li>
              <li>
                <a target="_self" href="#none">
                  내정보
                </a>
              </li>
              <li>
                <a target="_self" href="#none">
                  커스텀
                </a>
              </li>
            </ul>

            <div className="search">
              <input type="text" />
              <div className="material-icons">search</div>
            </div>
          </div>
        </div>

        {/* Select부분 */}
        <div className="nav">
          <div className="select">
            {/* 기존 셀렉트 */}
            {/* <select onChange={handleSelect} value={selected}>
              {selectList.map((item) => (
                <option value={item} key={item}>{item}</option>
           ))}
            </select> */}

            {/* 수정 후 셀렉트 */}
            <select onChange={handleSelect} value={selected}>
              {selectList.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>

            {/* 수정 수정 후 셀렉트 */}
            {/* {selectList.map((location, index) => (
              <div key={index}>
                <span>{location}</span>
                <button onClick={() => handleFavorite(index)}>
                  {favorites.includes(index) ? "★" : "☆"}
                </button>
              </div>
            ))} */}

            <p style={{fontSize: "32px",fontWeight: "bold",
            color: "#333",marginTop: "10px"}}>
              <b>Selected : {selected}</b>
            </p>
          </div>


          <div className="container">
            <ul className="list-box">
              {apiData.map((item, index) => {
                
                let stateNow = "";
                let bgStyle = {backgroundColor:""};
                let fontStyle = {color:""};

                if(item.pm10Grade === "1" ) {
                  stateNow = "좋음";
                  bgStyle.backgroundColor = "#31a0fe"
                  fontStyle.color = "#31a0fe"
                } else if(item.pm10Grade === "2" ) {
                  stateNow = "보통"; 
                  bgStyle.backgroundColor = "#02c63c"
                  fontStyle.color = "#02c63c"
                } else if(item.pm10Grade === "3" ) {
                  stateNow = "한때나쁨";
                  bgStyle.backgroundColor = "yellow"
                  fontStyle.color = "yellow"
                } else if(item.pm10Grade === "4" ) {
                  stateNow = "나쁨";
                  bgStyle.backgroundColor = "orange"
                  fontStyle.color = "orange"
                } else if(item.pm10Grade === "5" ) {
                  stateNow = "매우나쁨";
                  bgStyle.backgroundColor = "red"
                  fontStyle.color = "red"
                } else {
                  stateNow = "알수없음";
                  bgStyle.backgroundColor = "#7f7f7f"
                  fontStyle.color = "#7f7f7f"
                }

                
                return (
                  <li className="card-item-list" key={index}>
                    <div className="item-card" style={bgStyle}>
                      <ul className="card">
                        <li>
                          <div>
                            <span className="stname_1 stname">
                              {item.stationName}
                            </span>
                            <span className="stname_2 stname">
                              {item.sidoName}
                            </span>
                          </div>
                          <div className="material-icons">
                              <a onClick={()=>{handleClick(index)}} className='star' 
                                  targert="_self" href="#none" boder="0" alt="글제목" 
                                  rel="noreferrer">{item.favFlag === false ? "star_outline" : "star"}</a>
                            </div>
                        </li>
                        <li>
                          <div className="item-card-text">
                            <span style={fontStyle}>{stateNow}</span>
                          </div>
                        </li>
                        <li>
                          <div className="dust_content">
                            <div>미세먼지 수치 : {item.pm25Value}</div>
                            <div>초미세먼지 수치 : {item.pm10Value}</div>
                            <div>({item.dataTime})</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          
        </div>
      </header>

      <div className="footer">
        <div className='title-box'>
          즐겨찾기 리스트
        </div>
          <div className="container">
            <ul className="list-box">
              {favArr.map((item, index) => {
                
                if (favArr.length < 1) {
                  return;
                }
                let stateNow = "";
                let bgStyle = {backgroundColor:""};
                let fontStyle = {color:""};

                if(item.pm10Grade === "1" ) {
                  stateNow = "좋음";
                  bgStyle.backgroundColor = "#31a0fe"
                  fontStyle.color = "#31a0fe"
                } else if(item.pm10Grade === "2" ) {
                  stateNow = "보통"; 
                  bgStyle.backgroundColor = "#02c63c"
                  fontStyle.color = "#02c63c"
                } else if(item.pm10Grade === "3" ) {
                  stateNow = "한때나쁨";
                  bgStyle.backgroundColor = "yellow"
                  fontStyle.color = "yellow"
                } else if(item.pm10Grade === "4" ) {
                  stateNow = "나쁨";
                  bgStyle.backgroundColor = "orange"
                  fontStyle.color = "orange"
                } else if(item.pm10Grade === "5" ) {
                  stateNow = "매우나쁨";
                  bgStyle.backgroundColor = "red"
                  fontStyle.color = "red"
                } else {
                  stateNow = "알수없음";
                  bgStyle.backgroundColor = "#7f7f7f"
                  fontStyle.color = "#7f7f7f"
                }

                
                return (
                  <li className="card-item-list" key={index}>
                    <div className="item-card" style={bgStyle}>
                      <ul className="card">
                        <li>
                          <div>
                            <span className="stname_1 stname">
                              {item.stationName}
                            </span>
                            <span className="stname_2 stname">
                              {item.sidoName}
                            </span>
                          </div>
                          <div className="cancle">
                            <a className='star' 
                            targert="_self" href="#none" boder="0" alt="글제목"
                            onClick={() => handleRemoveFavorite(index)} 
                            // 클릭 이벤트에 handleRemoveFavorite 함수를 연결합니다.
                            border="0" rel="noreferrer">즐겨찾기 취소</a></div>

                        </li>
                        <li>
                          <div className="item-card-text">
                            <span style={fontStyle}>{stateNow}</span>
                          </div>
                        </li>
                        <li>
                          <div className="dust_content">
                            <div>미세먼지 수치 : {item.pm25Value}</div>
                            <div>초미세먼지 수치 : {item.pm10Value}</div>
                            <div>({item.dataTime})</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
        </div>
      </div>
      <div className="footer-fixed">
        <ul className="footer-menu">
          <li className="footer-menu-title"><a target="#" href="#">이미지1</a></li>
          <li className="footer-menu-title"><a target="#" href="#">이미지2</a></li>
          <li className="footer-menu-title"><a target="#" href="#">이미지3</a></li>
        </ul>
      </div>
    </div>
  );
  }


  // function Modal() {
  //   return (
  //     <div className="modal">
  //       <h4>제목</h4>
  //       <p>날짜</p>
  //       <p>상세내용</p>
  //     </div>
  //   )
  // }
  // function Date() {
  //   return (
  //     <div className="date">
  //       <p>3월 27일 발행</p>   
  //     </div>
  //   )
  // }
  // function Zz() {
  //   return (
  //     <div className="zz">
  //       <h4>{ 글제목[0] }</h4>   
  //     </div>
  //   )
  // }




export default App;
