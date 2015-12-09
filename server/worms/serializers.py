from rest_framework import serializers
from worms.models import Wormhole, Submission, Account
from django.contrib.auth.models import User


class SubmissionSerializer(serializers.ModelSerializer):

    owner_name = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Submission
        field = ('id', 'notes', 'video_url', 'wormhole_id', 'owner', 'owner_name')


class WormholeSerializer(serializers.ModelSerializer):

    # submissions = serializers.PrimaryKeyRelatedField(many=True, queryset=Submission.objects.all())
    owner_name = serializers.ReadOnlyField(source='owner.username')
    owner_wormiecolor = serializers.ReadOnlyField(source='owner.wormie_color')
    submissions = SubmissionSerializer(many=True, read_only=True)

    class Meta:
        model = Wormhole
        fields = ('id', 'title', 'latitude', 'longitude',
            'deadline', 'notes', 'status', 'owner', 'owner_name', 'owner_wormiecolor', 'submissions')


class UserSerializer(serializers.ModelSerializer):

    # wormholes = serializers.PrimaryKeyRelatedField(many=True, queryset=Wormhole.objects.all())
    # submissions = serializers.PrimaryKeyRelatedField(many=True, queryset=Submission.objects.all())
    wormholes = WormholeSerializer(many=True, read_only=True)
    submissions = SubmissionSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('username', 'id', 'first_name', 'last_name', 'email', 'wormholes', 'submissions', 'submissions')


class AccountSerializer(serializers.ModelSerializer):

    user = UserSerializer()

    class Meta:
        model = Account
        field = ('id', 'user', 'picture_url', 'location', 'about_me', 'wormie_color')
