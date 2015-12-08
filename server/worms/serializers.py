from rest_framework import serializers
from worms.models import Wormhole, Submission, Account
from django.contrib.auth.models import User


class WormholeSerializer(serializers.ModelSerializer):

    owner_name = serializers.ReadOnlyField(source='owner.username')
    submissions = serializers.PrimaryKeyRelatedField(many=True, queryset=Submission.objects.all())

    class Meta:
        model = Wormhole
        fields = ('id', 'title', 'latitude', 'longitude',
            'deadline', 'notes', 'status', 'owner', 'owner_name', 'submissions')


class SubmissionSerializer(serializers.ModelSerializer):

    owner_name = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Submission
        field = ('id', 'notes', 'video_url', 'wormhole_id', 'owner', 'owner_name')


class UserSerializer(serializers.ModelSerializer):

    wormholes = serializers.PrimaryKeyRelatedField(many=True, queryset=Wormhole.objects.all())
    submissions = serializers.PrimaryKeyRelatedField(many=True, queryset=Submission.objects.all())

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'wormholes', 'submissions')


class AccountSerializer(serializers.ModelSerializer):

    user = UserSerializer()

    class Meta:
        model = Account
        field = ('id', 'user', 'picture_url', 'location', 'about_me', 'wormie_color')
