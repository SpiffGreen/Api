import random
from flask import *
from flask_login import current_user, login_required
from Api import *
from Api.models import Movie, MovieSchema, Data, DataSchema, Friend, Users, Exciting, Store
from flask_cors import cross_origin

api = Blueprint('api', __name__)


# home
@api.route('/api/', methods=['GET'])
@cross_origin()
def home():
    movies = Movie.query.all()
    movie_schema = MovieSchema(many=True)
    result = movie_schema.dump(movies)
    if current_user.is_authenticated:
        id = current_user.id
        name = current_user.name
        profile = current_user.profile
        email = current_user.email
        friends = Friend.query.filter_by(get=current_user).filter(Friend.u_friend != 'null').all()
        friend = len(friends)
        return jsonify({
            "data": result,
            "user_id": id,
            "user_name": name,
            'user_image': name,
            "email": email,
            'friends': friend,
            'logged in': True
        }), 200
    return jsonify({
        "data": result,
        "message": "user not logged in",
        'logged in': False
    })


@api.route('/api/genre/<string:genre>', methods=['GET'])
@cross_origin()
def genres(genre):
    movies = Movie.query.filter_by(genre=f"{str(genre[0]).upper()+str(genre[1:]).lower()}").all()
    movie_schema = MovieSchema(many=True)
    result = movie_schema.dump(movies)
    return jsonify({
        "data": result,
    }), 200


# searching for movie
@api.route('/api/search/movie', methods=['GET'])
@cross_origin()
def search():
    data = request.get_json()
    print(str(data['name']).lower())
    movie_name = Movie.query.filter(str(Movie.name).lower() == str(data['name']).lower()).all()
    if not movie_name:
        movie_name = Movie.query.filter_by(genre=data['name']).all()
        if not movie_name:
            movie_name = Movie.query.filter_by(creator=data['name']).all()
            if not movie_name:
                return jsonify({
                    "message": " Could not find Name"
                }), 404
    movie_schema = MovieSchema(many=True)
    result = movie_schema.dump(movie_name)
    return jsonify({
        'data': result
    }), 200


# link to redirect to selected movie
# watching alone
@api.route('/api/get/movie/<string:u_id>/', methods=['GET'])
@cross_origin()
@login_required
def get_movie(u_id):
    movie_name = Movie.query.filter_by(public_id=u_id).first()
    movie_name.popular = movie_name.popular + 1
    db.session.commit()
    movie_schema = MovieSchema()
    result = movie_schema.dump(movie_name)
    id = current_user.id
    name = current_user.name
    try:
        return jsonify({
            'data': result,
            "user_id": id,
            "user_name": name
        }), 200
    except:
        return jsonify({
            'message': "could not load data"
        })


@api.route('/api/similar/movie/<string:u_id>', methods=['GET'])
@cross_origin()
@login_required
def similar_movie(u_id):
    movie_name = Movie.query.filter_by(public_id=u_id).first()
    movies = Movie.query.filter_by(genre=movie_name.genre).all()
    movie_schema = MovieSchema(many=True)
    result = movie_schema.dump(movies)
    return jsonify({
        'data': result
    }), 200


# thumbs up a movie
@api.route('/api/like/movie/<string:u_id>', methods=['POST'])
@cross_origin()
@login_required
def like(u_id):
    movie = Movie.query.filter_by(public_id=u_id).first()
    movie.thumbs_up = movie.thumbs_up + 1
    loved_movie = Exciting(rate=current_user, loved=movie.name)
    db.session.add(loved_movie)
    db.session.commit()
    return jsonify({
        'data': movie.thumbs_up
    })


# thumbs down movie
@api.route('/api/dislike/movie/<string:u_id>', methods=['POST'])
@cross_origin()
@login_required
def dislike(u_id):
    movie = Movie.query.filter_by(public_id=u_id).first()
    movie.thumbs_down = movie.thumbs_down + 1
    db.session.commit()
    return jsonify({
        'data': movie.thumbs_down
    })


# getting user's registered genre's choice for data processing
@api.route('/api/choice')
@cross_origin()
@login_required
def choice():
    selected_genres = []
    suggested_movies = []
    datas = Data.query.filter_by(love=current_user).all()

    datas_schema = DataSchema(many=True)
    result = datas_schema.dump(datas)
    for i in result:
        for key, value in i.items():
            if value == True:
                selected_genres.append(key)
    try:
        selected_genres.remove('id')
        selected_genres.remove('love')
    except:
        pass

    for i in selected_genres:
        movie = Movie.query.filter_by(genre=f'{i[0].upper() + i[1:]}').all()

        for z in movie:
            suggested_movies.append({'name': z.name,
                                     'id': z.public_id,
                                     "genre": z.genre,
                                     'overview': z.description})
            random.shuffle(suggested_movies)
    return jsonify({
        "data": suggested_movies
    })


# using user's interested movies for data processing
@api.route('/api/loved/movies')
@cross_origin()
@login_required
def loved_movies():
    result = []
    t = []
    data = Exciting.query.filter_by(rate=current_user).all()
    for i in data:
        result.append(i.loved)
    for c in result:
        liked = Movie.query.filter_by(name=c).first()
        movies = Movie.query.filter_by(genre=liked.genre).all()
        # get movies related to liked movies
        for movie in movies:
            t.append({'name': movie.name,
                      'genre': movie.genre,
                      'id': movie.public_id,
                      'overview': movie.description,
                      })
    return jsonify({
        'data': t
    })


# suggesting movies a user and his friend likes
@api.route('/api/my/friend/<string:name>/suggest')
@cross_origin()
@login_required
def i_and_my_friend(name):
    conjoin = []
    suggested_movies = []
    user = Users.query.filter_by(name=name).first()
    if user:
        friend = Friend.query.filter_by(get=current_user).filter_by(u_friend=name).first()
        if friend:
            _choice = Data.query.filter_by(love=current_user).first()
            friend_choice = Data.query.filter_by(love=user).first()
            datas_schema = DataSchema()
            result = datas_schema.dump(_choice)
            friend_result = datas_schema.dump(friend_choice)
            _list = [i for i in result.items()]
            friend_list = [i for i in friend_result.items()]
            for mine, _friend in zip(_list, friend_list):
                if mine[1] == True and _friend[1] == True:
                    conjoin.append(mine[0])
            for genres in conjoin:
                movie = Movie.query.filter_by(genre=f'{genres[0].upper() + genres[1:]}').all()

                for i in movie:
                    suggested_movies.append({
                                            'name': i.name,
                                             'id': i.public_id,
                                             'genre': i.genre,
                                             'runtime ': i.runtime,
                                             "overview": i.description

                                             })
                    random.shuffle(suggested_movies)
            # set(conjoin)
            return jsonify({
                "we both like ": suggested_movies
            })
        return jsonify({
            "message": f"{user} is not your friend"
        })
    return jsonify({"message": f"{name} not registered"})


@api.route('/api/popular')
@cross_origin()
def popular():
    movies = Movie.query.order_by(Movie.review.desc()).all()
    movie_schema = MovieSchema(many=True)
    result = movie_schema.dump(movies)
    return jsonify({
        "data": result,
    }), 200


@api.route('/api/trending')
@cross_origin()
def trending():
    movies = Movie.query.order_by(Movie.popular.desc()).all()
    movie_schema = MovieSchema(many=True)
    result = movie_schema.dump(movies)
    return jsonify({
        "data": result,
    }), 200


@api.route('/api/add/list/<string:movie_id>', methods=['POST'])
@cross_origin()
@login_required
def add_to_list(movie_id):
    movie = Movie.query.filter_by(public_id=movie_id).first()
    store = Store(saved=current_user)
    store.stored_data = movie.public_id
    db.session.add(store)
    db.session.commit()
    return jsonify({
        "data": 'committed',
    }), 200


@api.route('/api/my/list')
@cross_origin()
@login_required
def my_list():
    store = Store.query.filter_by(saved=current_user).all()
    data = []
    for movie_id in store:
        movies = Movie.query.filter_by(public_id=movie_id.stored_data).all()
        for movie in movies:
            data.append({'name': movie.name,
                         'genre': movie.genre,
                         'id': movie.public_id,
                         'overview': movie.description,
                         })
    return jsonify({
        "data": data,
    }), 200
