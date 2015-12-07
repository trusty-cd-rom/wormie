from rest_framework import serializers
from worms.models import Wormhole, Submission, Account


class WormholeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Wormhole
        fields = ('id', 'title', 'latitude', 'longitude',
            'deadline', 'notes', 'status', 'requestor_id',
            'created_at', 'updated_at')


class SubmissionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Submission
        field = ('id', 'created_at', 'updated_at', 'notes', 'video_url',
            'wormhole_id', 'submitter_id')


class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        field = ('id', 'created_at', 'updated_at', 'user',
            'name', 'picture_url', 'location', 'email', 'about_me',
            'wormie_color')
