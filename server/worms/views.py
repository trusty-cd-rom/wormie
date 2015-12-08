from worms.models import Wormhole, Submission, Account
from worms.serializers import WormholeSerializer, SubmissionSerializer, AccountSerializer, UserSerializer
from worms.permissions import IsOwnerOrReadOnly
from django.http import Http404
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions


#############################
# WORMHOLES
#############################


class WormholeList(generics.ListCreateAPIView):

    # Uses 'generic' class based views from REST framework

    """
    List all wormholes, or create a new wormhole
    """

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly)

    queryset = Wormhole.objects.all()
    serializer_class = WormholeSerializer


class WormholeDetail(APIView):

    # Uses normal class based views

    """
    Retrieve, update, or a delete a wormhole instance
    """

    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly)

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
        serializer = WormholeSerializer(wormhole, data=request.data)
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


class SubmissionList(generics.ListCreateAPIView):

    # Uses 'generic' class based views from REST framework

    """
    List all submissions, or create a new submission
    """

    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly)

    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer


class SubmissionDetail(APIView):

    # Uses class based views

    """
    Retrieve, update, or delete a submission instance.
    """

    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly)

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
        serializer = SubmissionSerializer(submission, data=request.data)
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
    List all users
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):

    # Uses 'generic' class based views from REST framework

    """
    Retrieve a user instance
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer


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
