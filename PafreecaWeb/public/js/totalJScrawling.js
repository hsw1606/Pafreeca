$(document).ready(function () {

    $.ajax({
        url: '/youtube-best-video',
        type: 'get',
        dataType: 'json',
        success: (data) => {

            var thumblist = {};
            var urllist = {};
            var title = {};
            var channel = {};
            for (var i = 0; i < 8; i++) {

                dataJSON = eval("(" + data[i] + ")")
                thumblist[i] = dataJSON.thumbnail
                urllist[i] = dataJSON.video_url
                title[i] = dataJSON.title
                channel[i] = dataJSON.channel

                document.getElementsByClassName('youtube-best-video-img')[i].setAttribute('src', thumblist[i])
                document.getElementsByClassName('youtube-best-video-url')[i].innerHTML = urllist[i]
                document.getElementsByClassName('youtube-video_name')[i].innerHTML = title[i]
                document.getElementsByClassName('youtube-video_location')[i].innerHTML = channel[i]




            }


        }
    })



    $.ajax({
        url: '/twitch-best-video',
        type: 'get',
        dataType: 'json',
        success: (data) => {

            var thumblist = {};
            var urllist = {};
            var title = {};
            var channel = {};
            for (var i = 0; i < 8; i++) {

                dataJSON = eval("(" + data[i] + ")")
                thumblist[i] = dataJSON.thumbnail
                urllist[i] = dataJSON.video_url
                title[i] = dataJSON.title
                channel[i] = dataJSON.channel

                document.getElementsByClassName('twitch-best-video-img')[i].setAttribute('src', thumblist[i])
                document.getElementsByClassName('twitch-best-video-url')[i].innerHTML = urllist[i]
                document.getElementsByClassName('twitch-video_name')[i].innerHTML = title[i]
                document.getElementsByClassName('twitch-video_location')[i].innerHTML = channel[i]



            }


        }
    })

    
    $.ajax({
        url: '/kakao-best-video',
        type: 'get',
        dataType: 'json',
        success: (data) => {

            var thumblist = {};
            var urllist = {};
            var title = {};
            var channel = {};
            for (var i = 0; i < 8; i++) {

                dataJSON = eval("(" + data[i] + ")")
                thumblist[i] = dataJSON.thumbnail
                urllist[i] = dataJSON.video_url
                title[i] = dataJSON.title
                channel[i] = dataJSON.channel

                document.getElementsByClassName('kakao-best-video-img')[i].setAttribute('src', thumblist[i])
                document.getElementsByClassName('kakao-best-video-url')[i].innerHTML = urllist[i]
                document.getElementsByClassName('kakao-video_name')[i].innerHTML = title[i]
                document.getElementsByClassName('kakao-video_location')[i].innerHTML = channel[i]



            }


        }
    })

    
    $.ajax({
        url: '/vlive-best-video',
        type: 'get',
        dataType: 'json',
        success: (data) => {

            var thumblist = {};
            var urllist = {};
            var title = {};
            var channel = {};
            for (var i = 0; i < 8; i++) {

                dataJSON = eval("(" + data[i] + ")")
                thumblist[i] = dataJSON.thumbnail
                urllist[i] = dataJSON.video_url
                title[i] = dataJSON.title
                channel[i] = dataJSON.channel

                document.getElementsByClassName('vlive-best-video-img')[i].setAttribute('src', thumblist[i])
                document.getElementsByClassName('vlive-best-video-url')[i].innerHTML = urllist[i]
                document.getElementsByClassName('vlive-video_name')[i].innerHTML = title[i]
                document.getElementsByClassName('vlive-video_location')[i].innerHTML = channel[i]



            }


        }
    })
    
    $.ajax({
        url: '/navertv-best-video',
        type: 'get',
        dataType: 'json',
        success: (data) => {

            var thumblist = {};
            var urllist = {};
            var title = {};
            var channel = {};
            for (var i = 0; i < 8; i++) {

                dataJSON = eval("(" + data[i] + ")")
                thumblist[i] = dataJSON.thumbnail
                urllist[i] = dataJSON.video_url
                title[i] = dataJSON.title
                channel[i] = dataJSON.channel

                document.getElementsByClassName('navertv-best-video-img')[i].setAttribute('src', thumblist[i])
                document.getElementsByClassName('navertv-best-video-url')[i].innerHTML = urllist[i]
                document.getElementsByClassName('navertv-video_name')[i].innerHTML = title[i]
                document.getElementsByClassName('navertv-video_location')[i].innerHTML = channel[i]



            }
            
        }
    })




})