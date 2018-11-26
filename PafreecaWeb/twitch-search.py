#!/usr/bin/python
# coding=cp949

from bs4 import BeautifulSoup
import json
import requests
import sys

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
        title = item.find('a', {'class':'clip-launch'}).get_text()
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
                    #print(ordchar)
                    #print(i)
                    #print(ord(title[i]))
                    IsRemoved = True
        
        video_url = 'https://tgd.kr' + item.find('a', {'href':True, 'class':'clip-launch'}).get('href')
        thumbnail = item.find('img', {'src':True, 'class':'clips-thumbnail'}).get('src')
        channel = item.find('a', {'class':'streamer'}).get_text()
        
        video_info = {

            'title':title,

            'video_url':video_url,

            'thumbnail':thumbnail,

            'channel':channel

        }
        video_info_str = json.dumps(video_info)
        print(video_info_str)
        #print(video_info)
    
    #return video_info

if len(sys.argv) is 1:
    print('No arguments')
else:
    target_url = 'https://tgd.kr/clips?date_range=overall&sortby=like&term=' + sys.argv[1]
    get_video_info(target_url)


