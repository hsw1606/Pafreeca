/*  
 *  Youtube API Key Value
 *  AIzaSyBMZEIuMtExrnqrTPbdBgz2raund-aHD84
 *  
 *  Twitch API Client ID
 *  nmwpmgck2yp0h03c7uy7ma0v45pkck
 *  */

/*

// Youtube API로 동영상 검색하기
var youtubeNode = require('youtube-node')
var youtube = new youtubeNode();
var word = '강아지'; // 검색어 지정
var limit = 10;  // 출력 갯수
youtube.setKey('AIzaSyBMZEIuMtExrnqrTPbdBgz2raund-aHD84'); // API 키 입력
//// 검색 옵션 시작
youtube.addParam('order', 'rating'); // 평점 순으로 정렬
youtube.addParam('type', 'video');   // 타입 지정
youtube.addParam('videoLicense', 'creativeCommon'); // 크리에이티브 커먼즈 아이템만 불러옴
//// 검색 옵션 끝
youtube.search(word, limit, function (err, result) { // 검색 실행
    if (err) { console.log(err); return; } // 에러일 경우 에러공지하고 빠져나감
    console.log(JSON.stringify(result, null, 2)); // 받아온 전체 리스트 출력
    var items = result["items"]; // 결과 중 items 항목만 가져옴
    for (var i in items) {
        var it = items[i];
        var title = it["snippet"]["title"];
        var video_id = it["id"]["videoId"];
        var url = "https://www.youtube.com/watch?v=" + video_id;
        console.log("제목 : " + title);
        console.log("URL : " + url);
        console.log("-----------");
    }
});


//Twitch API로 클립 검색하기
var twitch = require('twitch-api-v5')
twitch.clientID = 'nmwpmgck2yp0h03c7uy7ma0v45pkck'
twitch.clips.top({ period: 'day', trending: false, language: 'ko' }, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        //console.log(res["clips"])
        for (var i in res["clips"]) {
            var item = res["clips"][i];
            var title = item["title"];
            var url = item["url"];
            console.log("제목 : " + title);
            console.log("URL : " + url);
            console.log("-----------");

        }
    }
})

*/

/*
//Twitch 클라이언트에서 트위치 top clip 요청하기
<html>
    <head>
        <title>Clips Carousel</title>
    </head>
    <body>
        <div id="clips-display"></div>
    </body>
</html>
var httpRequest = new XMLHttpRequest();
httpRequest.addEventListener('load', clipsLoaded);
httpRequest.open('GET', 'https://api.twitch.tv/kraken/clips/top?limit=10&channel=moonmoon_ow');
httpRequest.setRequestHeader('Client-ID', 'uo6dggojyb8d6soh92zknwmi5ej1q2');
httpRequest.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
httpRequest.send();
function clipsLoaded() {
    var clipsDisplay = document.getElementById('clips-display'),
        clipList = JSON.parse(httpRequest.responseText);
    clipList.clips.forEach(function (clip, index, array) {
        clipItem = document.createElement('div');
        clipItem.innerHTML = clip.embed_html;
        clipsDisplay.appendChild(clipItem);
    });
}
*/

var ps = require('python-shell');

var options = {

    mode: 'text',

    pythonPath: '',

    pythonOptions: ['-u'],

    scriptPath: '',

    args: ['value1', 'value2', 'value3']

};

ps.PythonShell.run('youtube-best.py', options, function (err, results) {
    if (err) throw err;

    youtubeData = results
    console.log(youtubeData)
});

var twitchData = [];
ps.PythonShell.run('twitch-best.py', options, function (err, results) {
    if (err) throw err;

    twitchData = results
    console.log(twitchData)
});


const express = require("express")
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser');

var items = [{
    nickname: '',
    email: '',
    pass: '',
    repass: '',
    birth: '',
    male: '',
    female: ''
}];

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));

var client = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'noh12345',
    database: 'webdb'
})

client.connect();
client.query('select * from account', [
], function (error, data) {
    if (error) {
        console.log(error)
    } else {
        console.log(data);
    }
})

app.get('/youtube-best-video', function (req, res) {
    for (var i in youtubeData) {
        console.log(youtubeData[i])
    }
    res.send(youtubeData);
})
app.get('/twitch-best-video', function (req, res) {
    for (var i in twitchData) {
        console.log(twitchData[i])
    }
    res.send(twitchData);
})


app.post('/log.html', (request, response) => {
    // 변수를 선언합니다.
    var nickname = request.body.nickname;
    var email = request.body.email;
    var pass = request.body.pass;
    var birth = request.body.birth;
    var male = request.body.male;

    var sex = 0;
    if (male == 'on') {
        sex = 1;
    } else {
        sex = 0;
    }

    // 응답합니다.
    response.send({
        message: '데이터를 추가했습니다.',
        data: nickname, email, pass, birth, sex
    });

    client.query('insert into account value(?,?,?,?,?)', [nickname, email, pass, birth, sex], function (error, data) {
        if (error) {
            console.log(error)
        } else {
            console.log('Insert done: ')
            console.log(nickname, email, pass, birth, sex)
        }
    })
});

app.listen(52273, () => {
    console.log('Server Running at http:127.0.0.1:52273')
})