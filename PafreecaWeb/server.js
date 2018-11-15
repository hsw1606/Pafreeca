const express = require("express")
var bodyParser = require('body-parser');
var items = [{
    nickname: '우유',
    email: '2000',
    pass: '1234',
    repass: '1234',
    birth: '1234',
    male: 'off',
    female: 'off'
}];



const app = express()

const fs = require("fs")


const mysql = require('mysql')


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
    ], function (errer, data) {
        console.log(data);
})

/*client.query('insert into account value(1334,1234,1234,1234,0)', function (error, data) {
    console.log('done')
})*/

app.get('/', (request, response) => {

    // 파일 읽기
    fs.readFile("data/USvideos.csv", 'utf8', function (err, data) {

        //Table 생성
        var allRows = data.split('\n');
        var table = '<table>';
        for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
            if (singleRow === 0) {
                table += '<thead>';
                table += '<tr>';
            } else {
                table += '<tr>';
            }
            var rowCells = allRows[singleRow].split(',');
            for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
                if (singleRow === 0) {
                    table += '<th>';
                    table += rowCells[rowCell];
                    table += '</th>';
                } else {
                    table += '<td>';
                    table += rowCells[rowCell];
                    table += '</td>';
                }
            }
            if (singleRow === 0) {
                table += '</tr>';
                table += '</thead>';
                table += '<tbody>';
            } else {
                table += '</tr>';
            }
        }
        table += '</tbody>';
        table += '</table>';

        response.send((table))
    })   
})

app.get('/log.html', (request, response) => {
    response.send('log get checked')
})

app.post('/log.html', (request, response) => {
    // 변수를 선언합니다.
    var a_nickname = request.body.nickname;
    var a_email = request.body.email;
    var a_pass = request.body.pass;
    var repass = request.body.repass;
    var male = request.body.male;

    var a_sex = 0;
    if (male == 'on') {
        a_sex = 1;
    } else {
        a_sex = 0;
    }

    // 응답합니다.
    response.send({
        message: '데이터를 추가했습니다.',
        data: a_nickname
    });

    client.query('insert into account value(?,?,?,?,?)', [a_nickname, a_email, a_pass, repass, a_sex], function (error, data) {
        console.log('Insert done')
    })


});



app.listen(52273, () => {

    console.log('Server Running at http:127.0.0.1:52273')
})