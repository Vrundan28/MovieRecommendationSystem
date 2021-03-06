from json import JSONEncoder
from rest_framework import serializers
from MovieOperations.models import Movie

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('movieId',
                  'movieTitle',
                  'movieDescription',
                  'movieKeywords',
                  'movieCast',
                  'movieDirector',
                  'movieProduction',
                  'movieRuntime',
                  'movieGenre',
                  'movieTagline',
                  'movieRating',
                  'movieUrl',
                  'moviePoster' )

class MovieEncoder(JSONEncoder):
    def default(self, o):
        return o.__dict__