import pandas as pd
import sqlite3
import json
import time
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

conn = sqlite3.connect("db.sqlite3")
cursor = conn.cursor()
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
print(cursor.fetchall())
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
