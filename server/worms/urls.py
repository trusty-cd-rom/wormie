from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from worms import views

urlpatterns = [
    url(r'^api/wormholes/$', views.WormholeList.as_view()),
    url(r'^api/wormholes/(?P<pk>[0-9]+)/$', views.WormholeDetail.as_view()),
    url(r'^api/submissions/$', views.SubmissionList.as_view()),
    url(r'^api/submissions/(?P<pk>[0-9]+)/$', views.SubmissionDetail.as_view()),
    url(r'^api/users/$', views.UserList.as_view()),
    url(r'^api/users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
    url(r'^api/users/fb/(?P<fb_id>[0-9]+)/$', views.UserDetailFB.as_view()),
    url(r'^api/accounts/$', views.AccountList.as_view()),
    url(r'^api/accounts/(?P<pk>[0-9]+)/$', views.AccountDetail.as_view()),
    url(r'^api/discover/$', views.yelp_list),
    url(r'^api/sort_by/$', views.sorted_list),
]

urlpatterns = format_suffix_patterns(urlpatterns)

