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
    list = soup.find_all('div', {'class':'clips'})
    
    for item in list:
        title = item.find('a', {'class':'clip-launch'})
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
            
            video_url = item.find('a', {'href':True, 'class':'clip-launch'})
            thumbnail = item.find('img', {'src':True, 'class':'clips-thumbnail'})
            channel = item.find('a', {'class':'streamer'})

            if video_url is None or thumbnail is None or channel is None:
                pass
            else:
                video_url = video_url.get('href')
                video_url = 'https://tgd.kr' + video_url
                thumbnail = thumbnail.get('src')
                channel = channel.get_text()

                resp = urlopen(video_url)
                source=resp.read()
                resp.close()
                soup2=BeautifulSoup(source, "lxml")
                video_url = soup2.find('iframe', {'id':'clip-iframe'})
                if video_url is None:
                    pass
                else:
                    video_url = video_url.get('src')
                
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
    target_url = 'https://tgd.kr/clips?date_range=overall&sortby=like&term=' + sys.argv[1]
    get_video_info(target_url)


