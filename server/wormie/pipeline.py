from worms.models import Account, User
from worms.serializers import AccountSerializer, UserSerializer
import logging
logger = logging.getLogger(__name__)

def create_account(backend, user, response, is_new, *args, **kwargs):
    url = "http://graph.facebook.com/" + response["id"] + "/picture?type=large"
    AccountSerializer(Account.objects.create(user=user, picture_url=url))
    return None
