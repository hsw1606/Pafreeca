#!/usr/bin/python
# coding=cp949

from bs4 import BeautifulSoup
import json
import requests
import sys
from urllib.request import urlopen
import re

video_info = {

    'title':'',

    'video_url':'',

    'thumbnail':'',

    'channel':''

}

def get_video_info(target_url):
    
    html = requests.get(target_url)
    soup = BeautifulSoup(html.text, 'lxml')
    list = soup.find_all('li', {'class':'video_list_cont'})   

    
    for item in list:
        title = item.find('a', {'class':'thumb_area'}).get('data-ga-name')
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
        
        video_href = item.find('a', {'href':True, 'class':'thumb_area'}).get('href')
        video_id = re.sub('/video', '', video_href)
        video_url = 'https://www.vlive.tv/embed' + video_id + '?autoPlay=true'
        thumbnail = item.find('img', {'src':True}).get('src')
        channel = item.find('a', {'class':'thumb_area'}).get('data-ga-cname')
        
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
    target_url = 'https://www.vlive.tv/search/all?query=' + sys.argv[1]
    get_video_info(target_url)


