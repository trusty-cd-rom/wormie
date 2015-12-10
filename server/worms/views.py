from worms.models import Wormhole, Submission, Account
from worms.serializers import WormholeSerializer, SubmissionSerializer, AccountSerializer, UserSerializer
from worms.permissions import IsOwnerOrReadOnly
from django.http import Http404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from rest_framework import status, generics, permissions
from rest_framework.authtoken.models import Token
# from oauth2_provider.ext.rest_framework import TokenHasReadWriteScope, TokenHasScope

#############################
# WORMHOLES
#############################


class WormholeList(APIView):

    # Uses class based views

    """
    List all wormholes, or create a new wormhole
    """

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)

    # queryset = Wormhole.objects.all()
    # serializer_class = WormholeSerializer

    def get(self, request, format=None):
        wormholes = Wormhole.objects.all()
        serializer = WormholeSerializer(wormholes, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = WormholeSerializer(data=request.data)
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
        serializer = SubmissionSerializer(data=request.data)
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
    serializer_class = UserSerializer


class UserDetail(APIView):

    # Uses class-based view

    """
    Retrieve, update, or delete an ACCOUNT instance.
    Note: User instance will be included in the Account.
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
# ACCOUNTS
#############################


class AccountList(generics.ListCreateAPIView):

    """
    List all accounts or create an account
    """

    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class AccountDetail(generics.RetrieveAPIView):

    """
    Retrieve an account instance
    """

    queryset = Account.objects.all()
    serializer_class = AccountSerializer


#############################
# TRUEUSERS - this is temporary for testing and deleting user accounts
#############################

class TrueUserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
