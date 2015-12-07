from worms.models import Wormhole, Submission, Account
from worms.serializers import WormholeSerializer, SubmissionSerializer, AccountSerializer, UserSerializer
from django.http import Http404
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics

#############################
# WORMHOLES
#############################


class WormholeList(APIView):

    """
    List all wormholes, or create a new wormhole
    """

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


class SubmissionList(APIView):

    """
    List all submissions, or create a new submission
    """

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

    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer


#############################
# ACCOUNTS
#############################
