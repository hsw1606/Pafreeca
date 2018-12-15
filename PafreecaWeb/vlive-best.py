#!/usr/bin/python
# coding=cp949

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time
import json

video_info = {

    'title':'',

    'video_url':'',

    'thumbnail':'',

    'channel':''

}

def get_video_info(target_url):

    driver = webdriver.Chrome()

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
        
        video_url = 'https://www.vlive.tv' + item.find('a', {'href':True, 'class':'thumb_area'}).get('href')
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
    
    driver.close()
    return video_info

target_url = 'https://www.vlive.tv/home/chart?sub=VIDEO&period=HOUR_24&country=ALL'
get_video_info(target_url)
