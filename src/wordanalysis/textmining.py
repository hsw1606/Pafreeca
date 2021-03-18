#!/usr/bin/python

from collections import Counter
import sys
import json

# 변수 okja에 argument 저장
okja = sys.argv[1]

# Okt 패키지 안에 konlpy 모듈호출
from konlpy.tag import Okt
okt = Okt()

# 문장에서 형태소 얻기
morph = okt.pos(okja)
#print(json.dumps(morph))

# 명사와 영어만 선별해 리스트에 담기
noun_list = []
for word, tag in morph:
    if tag in ['Noun', 'Alpha']:
        noun_list.append(word)
#print(json.dumps(noun_list))

# 선별된 품사별 빈도수 계산 & 상위 빈도 3위 까지 출력
counts = Counter(noun_list)
print(json.dumps(counts.most_common(3)))
