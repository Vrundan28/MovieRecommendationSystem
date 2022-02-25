from nbformat import write
import pandas as pd
import requests
from csv import writer
from requests.exceptions import ConnectionError

dataset = pd.read_csv('tmp1_dataset.csv')
df = pd.DataFrame(dataset)

count = 0
rows = []
notfetched = []
fields = ["movieId", "movieTitle", "movieDescription", "movieKeywords", "movieCast", "movieDirector",
          "movieProduction", "movieRuntime", "movieGenre", "movieTagline", "movieRating", "movieCover"]
count = 0
col = ['error_vali_col']
with open('today_dataset.csv', 'a', encoding="utf-8") as f_object:
    writer_object = writer(f_object)
    writer_object.writerow(fields)
    for i, j in df.iterrows():
        count += 1
        if count == 4258:
            continue
        print(j['movieId'])
        print(j['movieTitle'])
        moviename = j['movieTitle']
        reqUrl = "https://api.themoviedb.org/3/search/movie?api_key=a6f6f1174f01adb09d23682e1c0b044b&query=" + moviename
        # print(jsonData)
        try:
            res = requests.get(reqUrl)
            json = res.json()
            if 'results' in json and len(json['results']) > 0:
                record = json['results'][0]
                if record is not None and record['poster_path'] is not None:
                    posterURL = "https://image.tmdb.org/t/p/w500/" + \
                        record['poster_path']
                    row = [j['movieId'], j['movieTitle'], j['movieDescription'], j['movieKeywords'], j['movieCast'], j['movieDirector'],
                           j['movieProduction'], j['movieRuntime'], j['movieGenre'], j['movieTagline'], j['movieRating'], posterURL]
                    rows.append(row)
                    writer_object.writerow(row)
        except ConnectionError as e:
            nf = j['movieId']
            notfetched.append(nf)
    # j['movieCover'] = posterURL

    f_object.close()
# with open('notfetched.csv', 'a', encoding="utf-8") as f_object:
#     writer_object = writer(f_object)
#     writer_object.writerow(col)
#     writer_object.writerows(notfetched)
#     f_object.close()
