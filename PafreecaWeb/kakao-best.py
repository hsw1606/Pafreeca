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
        #try:
        #    driver.find_element_by_xpath("""//*[@id="feed-main-what_to_watch"]/button""").click()
        #except:
        #    None   

    html = driver.page_source
    soup = BeautifulSoup(html, 'lxml')
    highlight1 = soup.find_all('div', {'class':'slick-active', 'data-slick-index':'0'})
    highlight2 = soup.find_all('div', {'class':'slick-active', 'data-slick-index':'0'})
    highlight3 = soup.find_all('div', {'class':'slick-active', 'data-slick-index':'0'})
    highlight4 = soup.find_all('div', {'class':'slick-active', 'data-slick-index':'0'})

    list=[]
    list.append(highlight1[1])
    list.append(highlight2[1])
    list.append(highlight3[1])
    list.append(highlight4[1])
    
    for item in list:
        title = item.find('strong', {'class':'tit_item'}).get_text()
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

        video_split, b = item.find('a', {'href':True, 'class':'link_itembox'}).get('href').split('?')
        video_id = video_split.split('/')[4]
        video_url = 'https://tv.kakao.com/embed/player/cliplink/' + video_id
        thumbnail = item.find('img', {'src':True, 'class':'thumb_img'}).get('src')
        channel = item.find('span', {'class':'screen_out'}).get_text().replace('<span class="screen_out">출처 :</span>', '')
        
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

target_url = 'https://tv.kakao.com/'
get_video_info(target_url)
