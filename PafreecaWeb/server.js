const express = require("express")
const fs = require("fs")

const app = express()


app.use(express.static('public'))


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


app.listen(52273, () => {

    console.log('Server Running at http:127.0.0.1:52273')
})