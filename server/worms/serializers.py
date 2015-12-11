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
        field = ('picture_url', 'location', 'about_me', 'wormie_color')


class PersonBaseSerializer(serializers.ModelSerializer):

    """
    Base User info, including info from the Account model
    """

    account_id = serializers.ReadOnlyField(source='account.id')
    picture_url = serializers.ReadOnlyField(source='account.picture_url')
    wormie_color = serializers.ReadOnlyField(source='account.wormie_color')

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name',
            'email', 'account_id', 'picture_url', 'wormie_color')


class SubmissionSerializer(SubmissionBaseSerializer):

    """
    Show base user detail and base wormhole detail
    """

    wormhole = WormholeBaseSerializer()
    submitter = PersonBaseSerializer()


class WormholeSerializer(WormholeBaseSerializer):

    """
    Show base user detail and full submissions detail
    """

    requestor = PersonBaseSerializer()
    submissions = SubmissionSerializer(many=True, read_only=True)


class PersonExpandedSerializer(PersonBaseSerializer):

    """
    Show full wormhole and submission details for a User
    """
    wormholes = WormholeSerializer(many=True, read_only=True)
    submissions = SubmissionSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name',
            'email', 'picture_url', 'wormie_color', 'wormholes', 'submissions')


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
