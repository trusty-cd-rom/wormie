from django.conf.urls import url
from worms import views

urlpatterns = [
    url(r'^wormholes/$', views.wormhole_list),
]
