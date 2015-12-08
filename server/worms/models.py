from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User


class Wormhole(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=100)
    latitude = models.DecimalField(max_digits=9, decimal_places=7, validators=[MinValueValidator(-90), MaxValueValidator(90)])
    longitude = models.DecimalField(max_digits=10, decimal_places=7, validators=[MinValueValidator(-180), MaxValueValidator(180)])
    deadline = models.DateTimeField()
    notes = models.CharField(max_length=2000)
    status = models.CharField(max_length=100)
    owner = models.ForeignKey(User, related_name='wormholes')

    class Meta:
        ordering = ('created_at',)


class Submission(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    notes = models.TextField(max_length=2000)
    video_url = models.TextField(max_length=255)
    wormhole_id = models.ForeignKey(Wormhole, related_name='submissions')
    owner = models.ForeignKey(User, related_name='submissions')

    class Meta:
        ordering = ('created_at',)


class Account(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.OneToOneField(User)
    picture_url = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    about_me = models.CharField(max_length=255)
    wormie_color = models.CharField(max_length=100)

    class Meta:
        ordering = ('created_at',)


# Note: the standard User model has:
#   username
#   password
#   first_name
#   last_name
#   email
