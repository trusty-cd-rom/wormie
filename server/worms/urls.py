from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from worms import views

urlpatterns = [
    url(r'^wormholes/$', views.WormholeList.as_view()),
    url(r'^wormholes/(?P<pk>[0-9]+)/$', views.WormholeDetail.as_view()),
    url(r'^submissions/$', views.SubmissionList.as_view()),
    url(r'^submissions/(?P<pk>[0-9]+)/$', views.SubmissionDetail.as_view()),
    url(r'^users/$', views.UserList.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
