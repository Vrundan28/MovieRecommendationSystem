from django.http import JsonResponse
from django.shortcuts import render
from .models import Friendship
from Accounts.models import CustomUser
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


@csrf_exempt
def add_friend(request):
    from_user = request.POST["from"]
    to_user = request.POST["to"]
    friendship = Friendship.objects.filter(
        from_user=from_user, to_user=to_user)
    if friendship.count() != 0:
        return JsonResponse("Friend already exists", safe=False)
    user1 = CustomUser.objects.get(id=from_user)
    user2 = CustomUser.objects.get(id=to_user)
    create_friendship = Friendship(from_user=user1, to_user=user2)
    create_friendship.save()
    return JsonResponse("Friend Added Successfully", safe=False)


@csrf_exempt
def get_all_friends_of_user(request):
    userId = request.POST["userId"]
    userobj = CustomUser.objects.get(id=userId)
    from_user_side = Friendship.objects.filter(from_user=userobj)
    sent_to_user = Friendship.objects.filter(to_user=userobj)
    print(from_user_side)
    print(sent_to_user)

    friendlist = []

    for usr in from_user_side.iterator():
        user_to_add = CustomUser.objects.get(id=usr.to_user.id)
        friendlist.append(user_to_add)
    for usr in sent_to_user.iterator():
        user_to_add = CustomUser.objects.get(id=usr.from_user.id)
        friendlist.append(user_to_add)
    print(friendlist)

    # REMINDER : In future create this get friend functionality as a function and not a view because it will be used in many different views for different purpose
    # For now returning empty object

    return JsonResponse({}, safe=False)
