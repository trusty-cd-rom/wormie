from rest_framework import serializers
from worms.models import Wormhole, Submission, Account
from django.contrib.auth.models import User


class SubmissionSerializer(serializers.ModelSerializer):

    # Submitter details
    submitter_id = serializers.ReadOnlyField(source='submitter.id')
    submitter_username = serializers.ReadOnlyField(source='submitter.username')
    submitter_first_name = serializers.ReadOnlyField(source='submitter.first_name')
    submitter_last_name = serializers.ReadOnlyField(source='submitter.last_name')
    submitter_picture_url = serializers.ReadOnlyField(source='submitter.account.picture_url')
    submitter_wormiecolor = serializers.ReadOnlyField(source='submitter.account.wormie_color')

    # Wormhole details
    wormhole_id = serializers.ReadOnlyField(source='wormhole.id')
    wormhole_title = serializers.ReadOnlyField(source='wormhole.title')
    wormhole_latitude = serializers.ReadOnlyField(source='wormhole.latitude')
    wormhole_longitude = serializers.ReadOnlyField(source='wormhole.longitude')
    wormhole_deadline = serializers.ReadOnlyField(source='wormhole.deadline')
    wormhole_notes = serializers.ReadOnlyField(source='wormhole.notes')
    wormhole_status = serializers.ReadOnlyField(source='wormhole.status')
    
    # Requestor details
    requestor_id = serializers.ReadOnlyField(source='wormhole.requestor_id')
    requestor_username = serializers.ReadOnlyField(source='wormhole.requestor.username')
    requestor_first_name = serializers.ReadOnlyField(source='wormhole.requestor.first_name')
    requestor_last_name = serializers.ReadOnlyField(source='wormhole.requestor.last_name')
    requestor_picture_url = serializers.ReadOnlyField(source='wormhole.requestor.account.picture_url')
    requestor_wormiecolor = serializers.ReadOnlyField(source='wormhole.requestor.account.wormie_color')

    class Meta:
        model = Submission
        field = ('id', 'notes', 'video_url', 'submitter_id', 'submitter_username',
            'submitter_first_name', 'submitter_last_name', 'submitter_picture_url', 'submitter_wormiecolor',
            'wormhole_id', 'wormhole_title', 'wormhole_latitude', 'wormhole_longitude', 'wormhole_deadline',
            'wormhole_notes','wormhole_status', 
            'requestor_id', 'requestor_username',
            'requestor_first_name', 'requestor_last_name',
            'requestor_picture_url', 'requestor_wormiecolor')

class WormholeSerializer(serializers.ModelSerializer):

    # Requestor details
    requestor_id = serializers.ReadOnlyField(source='requestor.id')
    requestor_username = serializers.ReadOnlyField(source='requestor.username')
    requestor_first_name = serializers.ReadOnlyField(source='requestor.first_name')
    requestor_last_name = serializers.ReadOnlyField(source='requestor.last_name')
    requestor_picture_url = serializers.ReadOnlyField(source='requestor.account.picture_url')
    requestor_wormiecolor = serializers.ReadOnlyField(source='requestor.account.wormie_color')

    submissions = SubmissionSerializer(many=True, read_only=True)

    class Meta:
        model = Wormhole
        fields = ('id', 'title', 'latitude', 'longitude','deadline', 'notes', 'status', 'requestor_id', 
            'requestor_username', 'requestor_first_name', 'requestor_last_name', 
            'requestor_picture_url', 'requestor_wormiecolor', 'submissions')


class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        field = ('picture_url', 'location', 'about_me', 'wormie_color')


class UserSerializer(serializers.ModelSerializer):

    account = AccountSerializer()
    # Show all fields for wormholes and submissions in User
    wormholes = WormholeSerializer(many=True, read_only=True)
    submissions = SubmissionSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name',
            'email', 'account', 'wormholes', 'submissions'
        )
