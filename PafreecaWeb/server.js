

var express = require("express")
var app = express()
var bodyParser = require('body-parser');

var mysql = require('mysql')
var ps = require('python-shell');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));


// 파이썬 실행옵션 설정
var crawlingoptions = {
    mode: 'text',
    pythonPath: '',
    pythonOptions: ['-u'],
    scriptPath: '',
    args: []
};

// 유튜브 인기영상 크롤링
var youtubeData = [];
ps.PythonShell.run('./best/youtube-best.py', crawlingoptions, function (err, results) {
    if (err) throw err;
    youtubeData = results
    console.log('Youtube Data Loaded')
});

// 트위치 인기영상 크롤링
var twitchData = [];
ps.PythonShell.run('./best/twitch-best.py', crawlingoptions, function (err, results) {
    if (err) throw err;
    twitchData = results
    console.log('Twitch Data Loaded')
});



// 카카오 인기영상 크롤링
var kakaoData = [];
ps.PythonShell.run('./best/kakao-best.py', crawlingoptions, function (err, results) {
    if (err) throw err;
    kakaoData = results
    console.log('Kakao Data Loaded')
});

// 브이라이브 인기영상 크롤링
var vliveData = [];
ps.PythonShell.run('./best/vlive-best.py', crawlingoptions, function (err, results) {
    if (err) throw err;
    vliveData = results
    console.log('Vlive Data Loaded')
});


// 네이버 인기영상 크롤링
var navertvData = [];
ps.PythonShell.run('./best/navertv-best.py', crawlingoptions, function (err, results) {
    if (err) throw err;
    navertvData = results
    console.log('Navertv Data Loaded')
});




// MySQL에 로그인
var client = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '13109388',
    database: 'webdb'
})

// MySQL에 접속
client.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack)
        return;
    }

    console.log('DB connected as id ' + client.threadId)
});

// 클라이언트가 메인페이지 접속 시 요청 처리
app.get('/youtube-best-video', function (req, res) {
    res.send(youtubeData);
})
app.get('/twitch-best-video', function (req, res) {
    res.send(twitchData);
})
app.get('/kakao-best-video', function (req, res) {
    res.send(kakaoData);
})

app.get('/vlive-best-video', function (req, res) {
    res.send(vliveData);
})
app.get('/navertv-best-video', function (req, res) {
    res.send(navertvData);
})



// 회원가입 요청 처리
app.post('/signup', (request, response) => {

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

// 유튜브 검색 요청 처리
app.post('/youtubesearch', (request, response) => {

    var search = request.body.search;
    var youtubedata = [] // 응답할 데이터
    var youtubeNode = require('youtube-node')
    var youtube = new youtubeNode();
    var word = search; // 검색어 지정
    var limit = 10; // 출력 갯수
    youtube.setKey('AIzaSyBMZEIuMtExrnqrTPbdBgz2raund-aHD84'); // API 키 입력

    // 검색 parameter 설정
    var param = {
        'part': 'snippet',
        'order': 'relevance',
        'q': search,
        'regionCode': 'KR',
        'relevanceLanguage': 'ko',
        'type': 'video'
    }

    // Youtube API 검색
    youtube.search('', limit, param, function (err, result) {
        // 에러 처리
        if (err) { console.log(err); return; } 

        // 받아온 전체 리스트 출력
        //console.log(JSON.stringify(result, null, 2)); 

        // JSON 결과 파싱
        var items = result["items"]; 
        for (var i in items) {
            var it = items[i];
            var title = it["snippet"]["title"];
            var video_id = it["id"]["videoId"];
            var url = "https://www.youtube.com/embed/" + video_id;
            var thumbnailurl = it["snippet"]["thumbnails"]["high"]["url"];
            var channel = it["snippet"]["channelTitle"];

            // JSON Object 생성 후 youtubedata객체에 추가
            var youtubedataJSON = {
                title: title,
                url: url,
                thumbnailurl: thumbnailurl,
                channel: channel
            }
            youtubedata.push(JSON.stringify(youtubedataJSON))
        }

        // 응답
        response.send(youtubedata)

    });
})

// 트위치 검색 요청 처리
app.post('/twitchsearch', (request, response) => {
    var search = request.body.search;
    var twitchdata = [] // 응답할 데이터

    // 파이썬 실행옵션 설정
    var searchoptions = {
        mode: 'text',
        pythonPath: '',
        pythonOptions: ['-u'],
        scriptPath: '',
        args: [search]
    }

    // 트게더 검색결과 크롤링
    ps.PythonShell.run('./search/twitch-search.py', searchoptions, function (err, results) {
        // 에러 처리
        if (err) throw err;

        // JSON 결과 파싱
        for (var item in results) {
            itemJSON = JSON.parse(results[item])

            // JSON Object 생성 후 twitchdata객체에 추가
            var twitchdataJSON = {
                title: itemJSON.title,
                url: itemJSON.video_url,
                thumbnailurl: itemJSON.thumbnail,
                channel: itemJSON.channel
            }
            twitchdata.push(JSON.stringify(twitchdataJSON))
        }
        // 응답
        response.send(twitchdata)

    });
})



// 카카오 검색 요청 처리
app.post('/kakaosearch', (request, response) => {
    var search = request.body.search;
    var kakaodata = [] // 응답할 데이터

    // 파이썬 실행옵션 설정
    var searchoptions = {
        mode: 'text',
        pythonPath: '',
        pythonOptions: ['-u'],
        scriptPath: '',
        args: [search]
    }

    // 카카오 검색결과 크롤링
    ps.PythonShell.run('./search/kakao-search.py', searchoptions, function (err, results) {
        // 에러 처리
        if (err) throw err;

        // JSON 결과 파싱
        for (var item in results) {
            itemJSON = JSON.parse(results[item])

            // JSON Object 생성 후 kakaodata객체에 추가
            var kakaodataJSON = {
                title: itemJSON.title,
                url: itemJSON.video_url,
                thumbnailurl: itemJSON.thumbnail,
                channel: itemJSON.channel
            }
            kakaodata.push(JSON.stringify(kakaodataJSON))
        }
        // 응답
        response.send(kakaodata)

    });
})

// 브이라이브 검색 요청 처리
app.post('/vlivesearch', (request, response) => {
    var search = request.body.search;
    var vlivedata = [] // 응답할 데이터

    // 파이썬 실행옵션 설정
    var searchoptions = {
        mode: 'text',
        pythonPath: '',
        pythonOptions: ['-u'],
        scriptPath: '',
        args: [search]
    }

    // 브이라이브 검색결과 크롤링
    ps.PythonShell.run('./search/vlive-search.py', searchoptions, function (err, results) {
        // 에러 처리
        if (err) throw err;

        // JSON 결과 파싱
        for (var item in results) {
            itemJSON = JSON.parse(results[item])

            // JSON Object 생성 후 vlivedata객체에 추가
            var vlivedataJSON = {
                title: itemJSON.title,
                url: itemJSON.video_url,
                thumbnailurl: itemJSON.thumbnail,
                channel: itemJSON.channel
            }
            vlivedata.push(JSON.stringify(vlivedataJSON))
        }
        // 응답
        response.send(vlivedata)

    });
})



// 네이버티비 검색 요청 처리
app.post('/navertvsearch', (request, response) => {
    var search = request.body.search;
    var navertvdata = [] // 응답할 데이터
    

    // 파이썬 실행옵션 설정
    var searchoptions = {
        mode: 'text',
        pythonPath: '',
        pythonOptions: ['-u'],
        scriptPath: '',
        args: [search]
    }

    // 네이버티비 검색결과 크롤링
    ps.PythonShell.run('./search/navertv-search.py', searchoptions, function (err, results) {
        // 에러 처리
        if (err) throw err;

        // JSON 결과 파싱
        for (var item in results) {
            itemJSON = JSON.parse(results[item])

            // JSON Object 생성 후 navertvdata객체에 추가
            var navertvdataJSON = {
                title: itemJSON.title,
                url: itemJSON.video_url,
                thumbnailurl: itemJSON.thumbnail,
                channel: itemJSON.channel
            }
            navertvdata.push(JSON.stringify(navertvdataJSON))
        }
        // 응답
        response.send(navertvdata)

    });
})





// 검색을 눌렀을 때 요청 처리
app.post('/searchpage', (request, response) => {

    var search = request.body.search;

    url = 'search.html?search=' + encodeURI(search)

    response.writeHead(302, { 'Location': url })
    response.end()
})

// 로그인 요청 처리
var session = require('express-session');

app.use(session({
    secret: '12312dajfj23rj2po4$#%@#',
    resave: false,
    saveUninitialized: true
}));


app.get('/count', function (req, res) {
    if (req.session.count) {//값이 있을때
        req.session.count++;
    } else {//처음 접속했을때 즉 값이 없을 때
        req.session.count = 1;//세션을 만듬
    }
    res.send('count : ' + req.session.count);

});

app.get('/login', function (req, res) {
    if (req.session.displayName) {
        res.send('1');
    }
    else {
        res.send('0');
    }
});


app.post('/login', function (req, res) {

    var userId = req.body['nickname'];
    var userPw = req.body['pass'];

    // DB에서 id와 p/w 비교
    client.query('select * from account where a_nickname=? and a_pass=?', [userId, userPw], function (err, rows) {
        if (!err) {
            if (rows[0] != undefined) {

                req.session.displayName = userId;
                console.log("userId[" + req.session.displayName + "] log-in-Complete");
                res.redirect('index.html');
            } else {
                res.send('no data');
            }

        } else {
            res.send('error : ' + err);
        }
    });
});

//로그아웃기능
app.get('/logout', function (req, res) {
    if (req.session.displayName) {
        //client.query('insert into playhistory(ph_title, a_nickname) value(?,?)', ["안녕?", req.session.displayName]);
        console.log("userId[" + req.session.displayName + "] log-out-Complete");
        delete req.session.displayName;//세션 삭제
        res.send('2');
    }
    else {
        res.send('3');
    }
    //res.redirect('index.html');
});


// 동영상을 클릭했을 때의 요청 처리
app.post('/savehistory', function (req, res) {
    if (req.session.displayName) {

        // Parameter 가져오기
        var title = req.body.title

        // DB에 유저이름과 클릭한 동영상 제목 저장
        client.query('insert into playhistory(ph_title, a_nickname) value(?,?)', [title, req.session.displayName], function (error, data) {
            if (error) {
                console.log(error)
            } else {
                console.log('Insert title done: ')
                console.log('nickname: ' + req.session.displayName)
                console.log('title: ' + title)
            }
        })
        res.send('suck');
    }
})

// 취향저격 동영상 요청 처리
app.get('/preference-video', function (req, res) {
    if (req.session.displayName) {
        // 유저 'qdad123'이 재생한 동영상 제목들을 DB에서 가져오기
        client.query('select ph_title from playhistory where a_nickname=?', [req.session.displayName], function (err, rows) {
            if (!err) {
                if (rows[0] != undefined) {

                    // 동영상 제목들을 전부 playhistory에 저장
                    playhistory = ''
                    for (var row in rows) {
                        playhistory += rows[row]['ph_title'] + '. '
                    }

                    // 텍스트마이닝 실행 옵션
                    var textminingoptions = {
                        mode: 'text',
                        pythonPath: '',
                        pythonOptions: ['-u'],
                        scriptPath: '',
                        args: [playhistory]
                    }

                    // TextMining으로 상위 빈도 10위의 키워드 가져오기
                    ps.PythonShell.run('./wordanalysis/textmining.py', textminingoptions, function (err, results_tm) {

                        if (err) throw err;

                        parsedresults_tm = JSON.parse(results_tm)
                        console.log(parsedresults_tm)
                        topkeyword = parsedresults_tm[0][0]
                        //console.log(topkeyword)


                        // Word2Vec 실행 옵션
                        var w2voptions = {
                            mode: 'text',
                            pythonPath: '',
                            pythonOptions: ['-u'],
                            scriptPath: '',
                            args: [topkeyword]
                        }

                        ps.PythonShell.run('./wordanalysis/wikiexec.py', w2voptions, function (err, results_w2v) {
                            if (err) throw err;

                            var parsedresults_w2v = JSON.parse(results_w2v)
                            var keywordData = [topkeyword, parsedresults_w2v[0][0]]

                            res.send(keywordData)
                        })
                    });
                } else {
                    res.send('no data');
                }
            } else {
                res.send('error : ' + err);
            }
        });
    } else {
        res.send('Client is not logged-in')
    }
})

// 서버 실행
app.listen(52273, () => {
    console.log('Server Running at http:127.0.0.1:52273')
})