# Pafreeca
여러 동영상 스트리밍 플랫폼의 인기영상을 보여주고  
동영상 검색하거나 검색 키워드를 통해 추천 동영상을 제공하는 웹사이트입니다.

# <br>개발환경
+ 운영체제 : Windows 10
+ 언어 : JavaScript, Python, HTML, CSS
+ 사용기술
  + jQuery, AJAX
  + Node.js, Express
  + MySQL
  + 자연어처리(KoNLPy, Word2Vec)

# <br>디렉토리 구조
주요 디렉토리 구조입니다.

```
.
└── PafreecaWeb/
    ├── best/
    |   ├── kakao-best.py
    |   ├── navertv-best.py
    |   ├── twitch-best.py
    |   ├── vlive-best.py
    |   └── youtube-best.py
    ├── public/
    |   ├── css/
    |   ├── images/
    |   ├── index.html
    |   ├── introduce.html
    |   ├── login.html
    |   ├── search.html
    |   └── signup.html
    ├── search/
    |   ├── kakao-search.py
    |   ├── navertv-search.py
    |   ├── twitch-search.py
    |   └── vlive-search.py
    └── wordanalysis/
    |   ├── wiki.model
    |   └── wikiexec.py
    └── server.js
```

## best/
각 플랫폼 별 인기영상을 크롤링하는 파이썬 스크립트들이 있습니다.

## public/
Pafreeca의 페이지를 구성하는 HTML 및 css style 입니다.
웹페이지의 엘리먼트를 제어하는데 jQuery 와 AJAX를 사용했습니다.

## search/
각 플랫폼마다 동영상을 검색하는 파이썬 스크립트들이 있습니다.

## wordanalysis/
위키피디프의 덤프데이터를 학습하기 위한 파이썬 스크립트와 그 결과물인 Word2Vec 모델이 있습니다.

## server.js
Node.js 의 Express 를 사용한 API 를 구현했습니다.
클라이언트의 요청에 따라 인기영상, 동영상검색, 취향저격 동영상 기능에 대한 결과를 응답해줍니다.

# <br>구현기능
## 인기영상
유튜브, 트게더, 카카오tv, 브이라이브, 네이버tv 의 인기영상을 모아서 보여줍니다.  
python-shell 을 활용해 Python을 실행하였고  
BeautifulSoup 라이브러리를 통해 해당 플랫폼을 크롤링하여 필요한 정보를 가져왔습니다.

## 동영상 검색
검색 키워드를 통해 유튜브, 트게더, 카카오tv, 브이라이브, 네이버tv의 동영상 검색 결과를 보여줍니다.  
유튜브 동영상 검색에는 Youtube Data API를 사용하였으며  
그 외의 플랫폼은 크롤링으로 검색결과를 가져왔습니다.

## 취향저격 동영상
사용자의 검색 키워드에 따라 관련 키워드에 대한 동영상을 보여줍니다.  
사용자의 검색 키워드를 데이터베이스에 저장한 뒤 KoNLPy를 사용한 형태소 분석을 통해 빈도수가 상위 키워드를 추출했습니다.  
그 뒤 위키디피아의 약 2.5GB 분량의 덤프데이터를 학습한 Word2Vec 모델을 통해 추출한 연관어를 통해  
검색한 동영상을 제공하는 기능입니다.
