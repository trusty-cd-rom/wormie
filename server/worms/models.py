from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User

        
class Request(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=100)
    latitude = models.DecimalField(max_digits=9, decimal_places=7, validators=[MinValueValidator(-90), MaxValueValidator(90)])
    longitude = models.DecimalField(max_digits=10, decimal_places=7, validators=[MinValueValidator(-180), MaxValueValidator(180)])
    deadline = models.DateTimeField()
    notes = models.CharField(max_length=2000)
    status = models.CharField(max_length=100)
    requestor_id = models.ForeignKey(User)
    # submissions = models.OnetoManyField(Submission, related_name='submissions')

    class Meta:
        ordering = ('created_at',)

class Submission(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    notes = models.TextField(max_length=2000)
    video_url = models.TextField(max_length=255)
    request_id = models.ForeignKey(Request)
    submitter_id = models.ForeignKey(User)

    class Meta:
        ordering = ('created_at',)

class Account(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.OneToOneField(User)
    name = models.CharField(max_length=100)
    picture_url = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    email = models.CharField(max_length=100)
    about_me = models.CharField(max_length=255)
    wormie_color = models.CharField(max_length=100)
    requests = models.OneToManyField(Request, related_name='requests')
    submissions = models.OneToManyField(Submission, related_name='submissions')

    class Meta:
        ordering = ('created_at',)
