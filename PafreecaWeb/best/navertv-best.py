#!/usr/bin/python

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time
import json
from urllib.request import urlopen
#import re


video_info = {

    'title':'',

    'video_url':'',

    'thumbnail':'',

    'channel':''

}

def get_video_info(target_url):

    driver = webdriver.Chrome('./best/chromedriver.exe')

    driver.get(target_url)

    time.sleep(2)

    body = driver.find_element_by_tag_name("body")

    num_of_pagedowns = 50

    while num_of_pagedowns:
        body.send_keys(Keys.PAGE_DOWN)
        time.sleep(0.1)
        num_of_pagedowns -= 1
  

    html = driver.page_source
    soup = BeautifulSoup(html, 'lxml')

    rankcontainer = soup.find('div', {'class':'rank_container'})
    list = rankcontainer.find_all('li')
    
    for idx, item in enumerate(list):
        if idx == 4:
            break;
        tooltips = item.find_all('tooltip')
        title = tooltips[0].get('title')
        channel = tooltips[1].get('title')
        
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
        
        video_url = item.find('a', {'href':True}).get('href')
        thumbnail = item.find('img', {'src':True}).get('src')

        resp = urlopen(video_url)
        source = resp.read()
        resp.close()
        soup = BeautifulSoup(source, "lxml")
        video_url = soup.find('meta', {'property':'og:video:secure_url'}).get('content')

        video_info = {

            'title':title,

            'video_url':video_url,

            'thumbnail':thumbnail,

            'channel':channel

        }
        video_info_str = json.dumps(video_info)
        print(video_info_str)
    
    driver.close()
    return video_info

target_url = 'https://tv.naver.com/'
get_video_info(target_url)
