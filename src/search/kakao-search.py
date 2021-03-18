#!/usr/bin/python

from bs4 import BeautifulSoup
import json
import requests
import sys
from urllib.request import urlopen

video_info = {

    'title':'',

    'video_url':'',

    'thumbnail':'',

    'channel':''

}

def get_video_info(target_url):

    html = requests.get(target_url)
    soup = BeautifulSoup(html.text, 'lxml')
    list = soup.find_all('div', {'class':'inner_videoitem'})

    
    for item in list:
        title = item.find('strong', {'class':'tit_item'})
        if title is None:
            pass
        else:
            title = title.get_text()
            
            IsRemoved = False
            for i in range(len(title)):
                if IsRemoved == True:
                    i = i - 1
                    IsRemoved = False
                
                if i < len(title):
                    ordchar = ord(title[i])
                    if ordchar > 0xFFFF:
                        if i == 0:
                            title = title[1:]
                        elif i == len(title)-1:
                            title = title[:i]
                        else:
                            title = title[:i] + title[i+1:]
                        IsRemoved = True

            video_split = item.find('a', {'href':True, 'class':'link_itembox'})
            thumbnail = item.find('img', {'src':True, 'class':'thumb_img'})
            channel = item.find('span', {'class':'assist_info'})

            if video_split is None or thumbnail is None or channel is None:
                pass
            else:
                video_split = video_split.get('href')
                video_id = video_split.split("/")[4]
                video_url = 'https://tv.kakao.com/embed/player/cliplink/' + video_id
                thumbnail = thumbnail.get('src')
                channel = channel.get_text().replace('출처 :', '')
            
                video_info = {

                    'title':title,

                    'video_url':video_url,

                    'thumbnail':thumbnail,

                    'channel':channel

                }
                video_info_str = json.dumps(video_info)
                print(video_info_str)

if len(sys.argv) is 1:
    print('No arguments')
else:
    target_url = 'https://tv.kakao.com/search?q=' + sys.argv[1]    
    get_video_info(target_url)
