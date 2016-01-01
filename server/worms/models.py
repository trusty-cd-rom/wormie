from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User


class Wormhole(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=100)
    latitude = models.DecimalField(max_digits=11, decimal_places=9, validators=[MinValueValidator(-90), MaxValueValidator(90)])
    longitude = models.DecimalField(max_digits=12, decimal_places=9, validators=[MinValueValidator(-180), MaxValueValidator(180)])
    deadline = models.DateTimeField()
    notes = models.CharField(max_length=2000, blank=True)
    status = models.CharField(max_length=100)
    requestor = models.ForeignKey(User, related_name='wormholes')

    class Meta:
        ordering = ('-created_at',)


class Submission(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    notes = models.TextField(max_length=2000, blank=True)
    location = models.TextField(max_length=2000)
    video_url = models.TextField(max_length=255)
    wormhole = models.ForeignKey(Wormhole, related_name='submissions')
    submitter = models.ForeignKey(User, related_name='submissions')

    class Meta:
        ordering = ('-created_at',)


class Account(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.OneToOneField(User)
    picture_url = models.CharField(max_length=1000)
    about_me = models.CharField(max_length=255)
    wormie_color = models.CharField(max_length=100)
    fb_id = models.CharField(max_length=200, default="12345")
    submission_likes = models.ManyToManyField(Submission, related_name='likers')
    wormhole_likes = models.ManyToManyField(Wormhole, related_name='likers')

    class Meta:
        ordering = ('created_at',)


# Note: the standard User model has:
#   username
#   password
#   first_name
#   last_name
#   email
