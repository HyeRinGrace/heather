const API = `f1e2e51600f17045a5d0a6b6b56f164c`; //API는 고유하기 때문에 고정
let cloudArr = []; // 클라우드는 배열로 되어있어 배열로 선언
let tempObj = {}; // 배열 대신 객체로 변경
let area = '';

// 필요한 도큐멘트 쿼리 불러오기
const name = document.querySelector('.name');
const cloud = document.querySelector('.cloud');
const temper = document.querySelector('.temper');
const Seoul = document.querySelector('.Seoul');
const Hanam = document.querySelector('.Hanam');
const Jeju = document.querySelector('.Jeju');
const Gangwon = document.querySelector('.Gangwon');

// 공통 URL 세팅(let 으로 할당한 이유는 url 값이 지역마다 변화하기 때문)
let url = `http://api.openweathermap.org/data/2.5/weather?lat=37.529&lon=127&lang=kr&appid=${API}`;



// 서울 url 따로 지정
Seoul.addEventListener('click', (event)=>{
    url = `http://api.openweathermap.org/data/2.5/weather?lat=37.529&lon=127&lang=kr&appid=${API}`;
    SettingURL();
})

//경기 url
Hanam.addEventListener('click',(event)=>{
    url = `http://api.openweathermap.org/data/2.5/weather?lat=37.529&lon=127.22&lang=kr&appid=${API}`;
    SettingURL();
})

//제주 url
Jeju.addEventListener('click',()=>{
    url = `http://api.openweathermap.org/data/2.5/weather?lat=33.11&lon=126.58&lang=kr&appid=${API}`;
    SettingURL();
})

//강원 url
Gangwon.addEventListener('click',()=>{
    url = `http://api.openweathermap.org/data/2.5/weather?lat=37.3&lon=127.9&lang=kr&appid=${API}`;
    SettingURL();
})

//API를 받아오는 함수
const SettingURL = async () =>{
    try{
        let response = await fetch(url); // url을 비동기 방식으로 불러움 (async fetch문으로)
        const data = await response.json(); //값을 우리가 읽을 수 있도록 json 파일 형태로 변환

        area = data.name; // area = 지역
        cloudArr = data.weather;
        tempObj = data.main; // 객체로 할당

    
        day();
        cloudRender();
        iconRender();
        temperRender();
    }catch(e){
        console.log('error',e);
        
    }


}

// 구름량/날씨 받아오는 함수
function cloudRender(){
    cloudArr.find((item)=>{
        cloud.innerHTML = `날씨 : ${item.description}`;
    })
}

//아이콘 받아오는 함수
function iconRender(){
    cloudArr.find((item)=>{
        const icon = document.querySelector('.icon');
        const iconInfo = item.icon;
        const iconURL = `http://openweathermap.org/img/wn/${iconInfo}@2x.png`;

        icon.setAttribute("src",iconURL);
    })

}

//온도 받아오는 함수
const temperRender = () => {
    // tempObj가 객체이므로 바로 접근하여 값을 표시
    name.innerHTML = `위치 : ${area}`;
    let averageTemper = (tempObj.temp - 273.15).toFixed(2);
    let minTemper = (tempObj.temp_min - 273.15).toFixed(2);
    let maxTemper = (tempObj.temp_max - 273.15).toFixed(2);
    let feelTemper = (tempObj.feels_like - 273.15).toFixed(2);

    temper.innerHTML = `평균 온도 : ${averageTemper}C <br> 최저 온도 : ${minTemper}C <br> 최고 온도 : ${maxTemper}C <br> 체감 온도 : ${feelTemper}C` ; // 예시로 최소 온도를 표시하도록 함
    
};


//날짜 받아오는 함수
const day = () =>{
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay()+4;
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const second = date.getSeconds();

    document.querySelector('.day').innerHTML = `${year}년 ${month}월 ${day}일 ${hour}시 ${minutes}분`;

}


SettingURL();
