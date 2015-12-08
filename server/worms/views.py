from worms.models import Wormhole, Submission, Account
from worms.serializers import WormholeSerializer, SubmissionSerializer, AccountSerializer, UserSerializer
from worms.permissions import IsOwnerOrReadOnly
from django.http import Http404
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from rest_framework import status, generics, permissions
from rest_framework.authtoken.models import Token


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


class UserDetail(APIView):

    # Uses class-based view

    # !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    # TBD - Currently returning Account instances !!
    # !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    """
    Retrieve, update, or delete a user instance
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
        serializer = AccountSerializer(account, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        account = self.get_object(pk)
        account.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#############################
# SIGNUP AND SIGNIN
#############################


class Signup(APIView):

    """
    Signup new user
    """

    def post(self, request, format=None):
        try:
            data = request.data
        except ParseError as error:
            return Response('Invalid: {0}'.format(error.detail), status=status.HTTP_400_BAD_REQUEST)
        if "username" not in data or "password" not in data:
            return Response('Username or password not provided', status=status.HTTP_400_BAD_REQUEST)
        username = data["username"]
        password = data["password"]

        if User.objects.filter(username=username).exists():
            return Response('Username already taken', status.HTTP_400_BAD_REQUEST)
        else:
            user = User.objects.create_user(username=username, password=password)
            token = Token.objects.create(user=user)
            account = AccountSerializer(Account.objects.create(user=user)).data
            return Response({'token': token.key, 'account': account})

        # user = authenticate(username=username, password=password)

        # if user is not None:
        #     token = Token.objects.get_or_create(user=user)[0]
        #     account = AccountSerializer(Account.objects.get(user=user)).data
        #     return Response({'token': token.key, 'account': account})



# class Signin(APIView):



# class TokenCheck(APIView):



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