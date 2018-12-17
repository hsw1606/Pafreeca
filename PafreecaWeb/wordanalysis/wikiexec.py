from gensim.test.utils import common_texts
import numpy as np
from gensim.models import word2vec
model = word2vec.Word2Vec.load('wiki.model')

score = model.wv.most_similar(positive=["블리자드"], topn=10)
print(score)


