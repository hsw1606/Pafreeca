#!/usr/bin/python

import warnings
warnings.filterwarnings(action='ignore', category=UserWarning, module='gensim')

from gensim.test.utils import common_texts
import numpy as np
from gensim.models import word2vec
import sys
import json

model = word2vec.Word2Vec.load('./wordanalysis/wiki.model')

score = model.wv.most_similar(positive=[sys.argv[1]], topn=1)
score.append(sys.argv[1])

print(json.dumps(score))


