from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from worms import views

urlpatterns = [
    url(r'^wormholes/$', views.WormholeList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
