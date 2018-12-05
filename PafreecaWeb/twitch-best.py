#!/usr/bin/python
# coding=cp949

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time
import json
from urllib.request import urlopen

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
        #try:
        #    driver.find_element_by_xpath("""//*[@id="feed-main-what_to_watch"]/button""").click()
        #except:
        #    None   

    html = driver.page_source
    soup = BeautifulSoup(html, 'lxml')
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



        resp = urlopen(video_url)
        source=resp.read()
        resp.close()
        soup2=BeautifulSoup(source, "lxml")
        video_url = soup2.find('iframe', {'id':'clip-iframe'}).get('src')
    
    
        
        
        video_info = {

            'title':title,

            'video_url':video_url,
            

            'thumbnail':thumbnail,

            'channel':channel

        }
        video_info_str = json.dumps(video_info)
        print(video_info_str)
        #print(video_info)
    
    driver.close()
    return video_info

target_url = 'https://tgd.kr/clips'
get_video_info(target_url)
