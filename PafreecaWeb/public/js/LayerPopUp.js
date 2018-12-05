$(document).ready(function () {
    $('.moveframe').click(function () {
        var $href = $(this).attr('href');
        layer_popup($href);
        $('.framepop').attr('src', $(this).children('.video_url').text());
        $('.frame_video_title').text($(this).children('.video_title').text());
        $('.frame_video_publisher').text($(this).children('.video_publisher').text());
    });


    function layer_popup(el){

        var $el = $(el);        //레이어의 id를 $el 변수에 저장
        var isDim = $el.prev().hasClass('dimBg');   //dimmed 레이어를 감지하기 위한 boolean 변수

        isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();

        var $elWidth = ~~($el.outerWidth()),
            $elHeight = ~~($el.outerHeight()),
            docWidth = $(document).width(),
            docHeight = $(document).height();

        // 화면의 중앙에 레이어를 띄운다.
        if ($elHeight < docHeight || $elWidth < docWidth) {
            $el.css({
                marginTop: -$elHeight /2,
                marginLeft: -$elWidth/2
            })
        } else {
            $el.css({top: 0, left: 0});
        }

        $el.find('a.btn-layerClose').click(function(){
            isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); //닫기 버튼을 클릭하면 레이어가 닫힌다.
            $('.framepop').attr('src','');
            return false;
        });

        $('.layer .dimBg').click(function(){
            $('.dim-layer').fadeOut();
            return false;
        });

        $(document).click(function (e) { //문서 body를 클릭했을때
            if (e.target.className == "dimBg") { //내가 클릭한 요소(target)를 기준으로 상위요소에 .dimBg이 없으면 (갯수가 0이라면)
                isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
                $('.framepop').attr('src',''); // URL을 다시 로드
                return false;
            }
        })

    }

    
    

});


