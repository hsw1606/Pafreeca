document.querySelector('.ajaxSend').addEventListener('click', function() {
      var inputData = document.forms[0].elements[0].value;
      sendAjax('http://127.0.0.1:52273/ajax_send_account', inputData);
    });

    // Ajax로 전달
    function sendAjax(url, data) {
      var data[] = {
        'a_nickname' : data,
        'a_email' : data,
        'a_pass' : data,
        'a_brith' : data,
        'a_sex' : data,};
      //data = JSON.stringify(data); // json -> string

      var xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.open('POST', url);
      xmlHttpRequest.setRequestHeader('Content-Type', "application/json");
      xmlHttpRequest.send(data);

      xmlHttpRequest.addEventListener('load', function() {
        var result = JSON.parse(xmlHttpRequest.responseText);
        var resultDiv = document.querySelector(".result");
        if (result.result !== "ok")  resultDiv.innerHTML = "Not Found";
        else resultDiv.innerHTML = result.name;
      });

    }