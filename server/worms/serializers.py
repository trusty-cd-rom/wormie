from rest_framework import serializers
from worms.models import Wormhole

class WormholeSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Wormhole
        fields = ('id', 'title', 'latitude', 'longitude', 
            'deadline', 'notes', 'status', 'requestor_id')
