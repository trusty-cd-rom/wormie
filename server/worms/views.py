from worms.models import Wormhole, Submission, Account
from worms.serializers import WormholeSerializer, SubmissionSerializer
from worms.serializers import AccountSerializer
from worms.serializers import PersonBaseSerializer, PersonExpandedSerializer
from worms.serializers import WormholeBaseSerializer, SubmissionBaseSerializer
from worms.permissions import IsOwnerOrReadOnly
from django.http import Http404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from rest_framework import status, generics, permissions
from rest_framework.authtoken.models import Token

# 
from worms.yelp import yelpMain
from worms.distance import distanceMain
from rest_framework.decorators import api_view
import json
# from oauth2_provider.ext.rest_framework import TokenHasReadWriteScope, TokenHasScope

#############################
# WORMHOLES
#############################


class WormholeList(APIView):

    # Uses class based views

    """
    List all wormholes, or create a new wormhole
    """

    def get(self, request, format=None):
        # status = APIView.GET.get('status','')
        # print(status)
        print('wormholelist')
        print(Wormhole.objects.all())
        wormholes = Wormhole.objects.all()
        serializer = WormholeSerializer(wormholes, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = WormholeBaseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WormholeDetail(APIView):

    # Uses normal class based views

    """
    Retrieve, update, or a delete a wormhole instance
    """

    def get_object(self, pk):
        try:
            return Wormhole.objects.get(pk=pk)
        except Wormhole.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        wormhole = self.get_object(pk)
        serializer = WormholeSerializer(wormhole)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        wormhole = self.get_object(pk)
        serializer = WormholeSerializer(wormhole, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        wormhole = self.get_object(pk)
        wormhole.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#############################
# SUBMISSIONS
#############################


class SubmissionList(APIView):

    # Uses class-based views

    """
    List all submissions, or create a new submission
    """

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)

    # queryset = Submission.objects.all()
    # serializer_class = SubmissionSerializer

    def get(self, request, format=None):
        submissions = Submission.objects.all()
        serializer = SubmissionSerializer(submissions, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = SubmissionBaseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SubmissionDetail(APIView):

    # Uses class based views

    """
    Retrieve, update, or delete a submission instance.
    """

    def get_object(self, pk):
        try:
            return Submission.objects.get(pk=pk)
        except Submission.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        submission = self.get_object(pk)
        serializer = SubmissionSerializer(submission)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        submission = self.get_object(pk)
        serializer = SubmissionSerializer(submission, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        submission = self.get_object(pk)
        submission.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#############################
# USERS
#############################


class UserList(generics.ListAPIView):

    # Uses 'generic' class based views from REST framework

    """
    List all Users
    """

    queryset = User.objects.all()
    serializer_class = PersonExpandedSerializer


class UserDetail(APIView):

    # Uses class-based view

    """
    Retrieve, update, or delete a USER instance.
    """

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = PersonExpandedSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = PersonExpandedSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#############################
# USER DETAIL WITH FB ID
#############################

class UserDetailFB(APIView):

    # Uses class-based view

    """
    Retrieve, update, or delete a USER with their Facebook id.
    """

    def get_account(self, fb_id):
        try:
            return Account.objects.get(fb_id=fb_id)
        except Account.DoesNotExist:
            raise Http404

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, fb_id, format=None):
        account = self.get_account(fb_id)
        pk = account.user.id
        user = self.get_user(pk)
        serializer = PersonExpandedSerializer(user)
        return Response(serializer.data)

    def put(self, request, fb_id, format=None):
        account = self.get_account(fb_id)
        pk = account.user.id
        user = self.get_user(pk)
        serializer = PersonExpandedSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, fb_id, format=None):
        account = self.get_account(fb_id)
        pk = account.user.id
        user = self.get_user(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#############################
# ACCOUNTS
#############################


class AccountList(generics.ListCreateAPIView):

    # Uses generics class-based view

    """
    List all accounts or create an account
    """

    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class AccountDetail(APIView):

    # Uses class-based view

    """
    Retrieve, update, or delete an ACCOUNT instance.
    """

    def get_object(self, pk):
        try:
            return Account.objects.get(pk=pk)
        except Account.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        account = self.get_object(pk)
        serializer = AccountSerializer(account)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        account = self.get_object(pk)
        serializer = AccountSerializer(account, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        account = self.get_object(pk)
        account.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



#############################
# DISCOVER(YELP)
#############################


@api_view(['GET', 'POST'])

def yelp_list(request):

    """
    List all snippets, or create a new snippet.
    """
    
    print('inside yelpmain in view.py')
    term = request.GET.get('term','')
    location = request.GET.get('location','')
    category_filter = request.GET.get('category_filter','')
    if request.method == 'GET':
        yelp_data = yelpMain(category_filter, term, location)
        return Response(yelp_data)


#############################
# SORTING
#############################


@api_view(['GET', 'POST'])
def sorted_list(request):

    """
    Sorting criteria: nearby, recent
    """

    sorting_criteria = request.GET.get('sort_by', '')

    if request.method == 'GET':
        
        if sorting_criteria == 'recent':
            wormholes = Wormhole.objects.all()
            serializer = WormholeSerializer(wormholes, many=True)
            return Response(serializer.data)

        elif sorting_criteria == 'popular':
            wormholes = Wormhole.objects.all()
            serializer = WormholeSerializer(wormholes, many=True).data

            # sort by like
            sortedWormholes = sorted(serializer, key=lambda worm: worm.likers[0])
            return Response(sortedWormholes)

        elif sorting_criteria == 'nearby':
            wormholes = Wormhole.objects.all()
            serializer = WormholeSerializer(wormholes, many=True).data

            lon2 = request.GET.get('longitude', '')
            lat2 = request.GET.get('latitude', '')

            # loop through wormholes and add distance key for each wormhole
            for worm in serializer:
                lon1 = worm.get('longitude')
                lat1 = worm.get('latitude')
                dist = distanceMain(lon1, lat1, lon2, lat2)
                worm.distance = dist

            # sort by distance
            sortedWormholes = sorted(serializer, key=lambda worm: worm.distance)
            return Response(sortedWormholes)


