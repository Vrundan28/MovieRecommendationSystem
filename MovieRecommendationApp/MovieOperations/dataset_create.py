import pandas as pd
import sqlite3
import json
import time
import imdb
from imdb import IMDbError
from csv import writer
# from MovieOperations.models import Movie


# import sqlite3 as mdb
# def chk_conn(conn):
#      try:
#         conn.cursor()
#         return True
#      except Exception as ex:
#         return False

# myconn = sqlite3.connect('..\db.sqlite3')
# print(chk_conn(myconn))

# conn = sqlite3.connect("db.sqlite3")
# cursor = conn.cursor()
# cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
# print(cursor.fetchall())

dataset = pd.read_csv('tmp_dataset.csv')
# print (dataset)
# import imdb
df = pd.DataFrame(dataset)

feilds = ["movieId", "movieTitle", "movieDescription", "movieKeywords", "movieCast", "movieDirector",
          "movieProduction", "movieRuntime", "movieGenre", "movieTagline", "movieRating", "movieCover"]
print(df)
print("vrundan")
access = imdb.IMDb()
rows = []
err = []
for i, j in df.iterrows():
    print(j['movieId'])
    try:
        movie = access.search_movie(j['movieTitle'])
        if(len(movie) > 0):
            row = [j['movieId'], j['movieTitle'], j['movieDescription'], j['movieKeywords'], j['movieCast'], j['movieDirector'],
                j['movieProduction'], j['movieRuntime'], j['movieGenre'], j['movieTagline'], j['movieRating'], movie[0]['cover url']]
        else:
            row = [j['movieId'], j['movieTitle'], j['movieDescription'], j['movieKeywords'], j['movieCast'], j['movieDirector'],
               j['movieProduction'], j['movieRuntime'], j['movieGenre'], j['movieTagline'], j['movieRating'], "-"]
        print(row)
        rows.append(row)
    except IMDbError as e:
        err.append(j['movieId'])

        # print ("title: %s year: %s" % (movie[0]['title'], movie[0]['year']))
        # print ("Cover url: %s" % movie[0]['cover url'])
print(rows)
with open('tmp1_dataset.csv', 'a', encoding="utf-8") as f_object:
    writer_object = writer(f_object)
    writer_object.writerow(feilds)
    writer_object.writerows(rows)
    f_object.close()

with open('tmp.csv', 'w', encoding="utf-8") as f_object:
    writer_object = writer(f_object)
    writer_object.writerow(err)
    f_object.close()

# cursor = conn.execute("SELECT movieTitle from MovieOperations_movie")
# for row in cursor:
#    print ("ID = ", row[0])
#    print ("NAME = ", row[1])
#    print ("ADDRESS = ", row[2])
#    print ("SALARY = ", row[3], "\n")

# cursor.execute("SELECT * FROM MovieOperations_movie")
# movies = cursor.fetchall()

# feilds = ["movieId","movieTitle","movieDescription","movieKeywords","movieCast","movieDirector","movieProduction","movieRuntime","movieGenre","movieTagline","movieRating"]

# rows = []
# for movie in movies:
#     row = [movie.movieId,movie.movieTitle,movie.movieDescription,movie.movieDescription,movie.movieKeywords,movie.movieCast,movie.movieDirector,movie.movieProduction,movie.movieRuntime,movie.movieGenre,movie.movieTagline,movie.movieRating]
#     rows.append(row)

# print(rows)

# print(dataset)
