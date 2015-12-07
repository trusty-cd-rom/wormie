from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from worms.models import Wormhole
from worms.serializers import WormholeSerializer

# Create your views here.
class JSONResponse(HttpResponse):
    """
    An HTTPResponse that renders its content into JSON
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content-type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

@csrf_exempt
def wormhole_list(request):
    """
    List all open wormholes, or create a new wormhole
    """ 

