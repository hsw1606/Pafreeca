const express = require("express")
const app = express()
const mysql = require('mysql')
const fs = require("fs")
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
    password: '13109388',
    database: 'webdb'
})

client.connect();
client.query('select * from account', [
], function (error, data) {
    if (error) {
        console(error)
    } else {
        console.log(data);
    }
})

//app.get('/', (request, response) => {
//    // 파일 읽기
//    fs.readFile("data/USvideos.csv", 'utf8', function (err, data) {

//        //Table 생성
//        var allRows = data.split('\n');
//        var table = '<table>';
//        for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
//            if (singleRow === 0) {
//                table += '<thead>';
//                table += '<tr>';
//            } else {
//                table += '<tr>';
//            }
//            var rowCells = allRows[singleRow].split(',');
//            for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
//                if (singleRow === 0) {
//                    table += '<th>';
//                    table += rowCells[rowCell];
//                    table += '</th>';
//                } else {
//                    table += '<td>';
//                    table += rowCells[rowCell];
//                    table += '</td>';
//                }
//            }
//            if (singleRow === 0) {
//                table += '</tr>';
//                table += '</thead>';
//                table += '<tbody>';
//            } else {
//                table += '</tr>';
//            }
//        }
//        table += '</tbody>';
//        table += '</table>';

//        response.send((table))
//    })   
//})

app.get('/log.html', (request, response) => {
    response.send('log get checked')
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
            console(error)
        } else {
            console.log('Insert done: ')
            console.log(nickname, email, pass, birth, sex)
        }
    })
});

app.listen(52273, () => {
    console.log('Server Running at http:127.0.0.1:52273')
})