from rest_framework import serializers
from worms.models import Wormhole, Submission, Account
from django.contrib.auth.models import User


class SubmissionBaseSerializer(serializers.ModelSerializer):

    """
    Submission model (this is used for POST requests)
    """

    class Meta:
        model = Submission


class WormholeBaseSerializer(serializers.ModelSerializer):

    """
    Wormhole model (this is used for POST requests)
    """

    class Meta:
        model = Wormhole


class AccountSerializer(serializers.ModelSerializer):

    """
    Account model
    """

    class Meta:
        model = Account
        field = ('picture_url', 'location', 'about_me', 'wormie_color',
            'fb_id', 'submission_likes', 'wormhole_likes')


class PersonBaseSerializer(serializers.ModelSerializer):

    """
    Base User info, including info from the Account model
    """

    account_id = serializers.ReadOnlyField(source='account.id')
    about_me = serializers.ReadOnlyField(source='account.about_me')
    picture_url = serializers.ReadOnlyField(source='account.picture_url')
    wormie_color = serializers.ReadOnlyField(source='account.wormie_color')
    fb_id = serializers.ReadOnlyField(source='account.fb_id')
    submission_likes = serializers.PrimaryKeyRelatedField(many=True, read_only=True, source='account.submission_likes')
    wormhole_likes = serializers.PrimaryKeyRelatedField(many=True, read_only=True, source='account.wormhole_likes')

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name',
            'email', 'account_id', 'about_me', 'picture_url', 'wormie_color',
            'fb_id', 'submission_likes', 'wormhole_likes')


class SubmissionSerializer(SubmissionBaseSerializer):

    """
    Show base user detail and base wormhole detail
    """

    wormhole = WormholeBaseSerializer()
    submitter = PersonBaseSerializer()
    likers = serializers.PrimaryKeyRelatedField(many=True, read_only=True)


class WormholeSerializer(WormholeBaseSerializer):

    """
    Show base user detail and full submissions detail
    """

    requestor = PersonBaseSerializer()
    submissions = SubmissionSerializer(many=True, read_only=True)
    likers = serializers.PrimaryKeyRelatedField(many=True, read_only=True)



class PersonExpandedSerializer(PersonBaseSerializer):

    """
    Show full wormhole and submission details for a User
    """
    wormholes = WormholeSerializer(many=True, read_only=True)
    submissions = SubmissionSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name',
            'email', 'account_id', 'about_me', 'picture_url', 'wormie_color', 'fb_id',
            'submission_likes', 'wormhole_likes', 'wormholes', 'submissions')


class UserSerializer(serializers.ModelSerializer):

    """
    Required for the Authorization flow
    """

    account = AccountSerializer()
    # Show all fields for wormholes and submissions in User
    wormholes = WormholeSerializer(many=True, read_only=True)
    submissions = SubmissionSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name',
            'email', 'account', 'wormholes', 'submissions'
        )
