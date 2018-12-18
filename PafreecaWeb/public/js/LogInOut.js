$(document).ready(function () {
    $('.loginout').click(function (){
        $.ajax({
            url: '/logout',
            type: 'get',
            dataType: 'text',
            success: (data) => {
                if (data == '2') {
                    alert("로그아웃되었습니다.");
                    
                }
            }
        })
    })


    $.ajax({
        url: '/login',
        type: 'get',
        dataType: 'text',
        success: (data) => {
            if (data == '1') {
                $('.loginout').text('로그아웃');
                $('.sign').text('');
                $('.preference-show').css('display', 'block');
            }
        }
    })
});