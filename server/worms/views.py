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
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

@csrf_exempt
def wormhole_list(request):
    """
    List all open wormholes, or create a new wormhole
    """ 
    if request.method == 'GET':
        wormholes = Wormhole.objects.all()
        serializer = WormholeSerializer(wormholes, many=True)
        return JSONResponse(serializer.data)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = WormholeSerializer(data=data)
        if serializer_is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        return JSONResponse(serializer.errors, status=400)
