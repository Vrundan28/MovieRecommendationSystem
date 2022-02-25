import pandas as pd
import sqlite3
import json
import time
# from django.conf import settings


def addEscapeSequences(mystr):
    with_escape = ""
    for pos in range(0, len(mystr)):
        if(mystr[pos] == "'"):
            with_escape = with_escape+"\\"
        with_escape += mystr[pos]
    return with_escape


dataset = pd.read_csv(
    'D:\\SDP2\\MovieRecommendationApp\\MovieOperations\\today_dataset.csv', encoding="utf-8")
df = pd.DataFrame(dataset)
conn = sqlite3.connect(
    'D:\\SDP2\\MovieRecommendationApp\\db.sqlite3')
cursor = conn.cursor()
start = time.time_ns()
for i, j in df.iterrows():
    # print(i,j['production_companies'])
    # production_companies_json = json.loads(j['production_companies'])
    # production_companies_string = ""
    # for k in range(0, len(production_companies_json)):
    # production_companies_string += production_companies_json[k]['name']+" "
    # print(production_companies_string)
    print(i)
    # insert_query = "insert into MovieOperations_movie(movieTitle,movieDescription,movieKeywords,movieCast,movieDirector,movieProduction,movieRuntime,movieGenre,movieTagline,movieRating) VALUES ('" + addEscapeSequences(j['original_title'])+"','"+addEscapeSequences(j['overview'])+"','"+addEscapeSequences(j['keywords'])+"','"+addEscapeSequences(j['cast'])+"','"+addEscapeSequences(j['director'])+"','" + addEscapeSequences(production_companies_string)+"','"+addEscapeSequences(str(j['runtime']))+"','"+addEscapeSequences(j['genres'])+"','"+addEscapeSequences(j['tagline'])+"','"+"10"+"')"
    # insert_query = "insert into MovieOperations_movie(movieTitle,movieDescription,movieKeywords,movieCast,movieDirector,movieProduction,movieRuntime,movieGenre,movieTagline,movieRating) VALUES ('" + (j['original_title'])+"','"+(j['overview'])+"','"+(j['keywords'])+"','"+(j['cast'])+"','"+(j['director'])+"','" + (production_companies_string)+"','"+(str(j['runtime']))+"','"+(j['genres'])+"','"+(j['tagline'])+"','"+"10"+"')"
    # print(insert_query)
    # print()
    # insert_query1=""
    # for l in range(0,len(insert_query)):
    #     if(insert_query[l]=='"' or insert_query[l]=="'"):
    #         insert_query1=insert_query1+'\\'
    #     insert_query1+=insert_query[l]
    # print(insert_query1)

    # insert_query = "insert into MovieOperations_movie(movieTitle,movieDescription,movieKeywords,movieCast,movieDirector,movieProduction,movieRuntime,movieGenre,movieTagline,movieRating) VALUES ('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')"

    # (j['original_title'], j['overview'], j['keywords'], j['cast'], j['director'], production_companies_string, str(j['runtime']), j['genres'], j['tagline'], "10")
    # if(i == 36 or i == 37 or i == 58):
    #     continue
    # conn.execute(insert_query)
    # cursor.execute(insert_query, (j['original_title'], j['overview'], j['keywords'], j['cast'],j['director'], production_companies_string, str(j['runtime']), j['genres'], j['tagline'], "10"))

    insert_query="""INSERT INTO MovieOperations_movie(movieTitle,movieDescription,movieKeywords,movieCast,movieDirector,movieProduction,movieRuntime,movieGenre,movieTagline,movieRating,moviePoster) VALUES (?,?,?,?,?,?,?,?,?,?,?)"""
    movieTitle=j['movieTitle']
    movieDescription=j['movieDescription']
    movieKeywords=j['movieKeywords']
    movieCast=j['movieCast']
    movieDirector=j['movieDirector']
    movieProduction=j['movieProduction']
    movieRuntime=str(j['movieRuntime'])
    movieGenre=j['movieGenre']
    movieTagline=j['movieTagline']
    movieRating="10"
    moviePoster = j['movieCover']
    data_tuple=(movieTitle,movieDescription,movieKeywords,movieCast,movieDirector,movieProduction,movieRuntime,movieGenre,movieTagline,movieRating,moviePoster)
    cursor.execute(insert_query,data_tuple)

    # update_query = """Update MovieOperations_movie SET moviePoster = ? where movieId = ? """
    # moviePoster = j['movieCover']
    # movieId = j['movieId']
    # data_tuple = (moviePoster, movieId)
    # cursor.execute(update_query, data_tuple)

conn.commit()
end = time.time_ns()

print(end-start)
