from worms.models import Account, User
from worms.serializers import AccountSerializer, UserSerializer
import logging
logger = logging.getLogger(__name__)

def create_account(backend, user, response, is_new, *args, **kwargs):
    url = "http://graph.facebook.com/" + response["id"] + "/picture?type=large"
    fb_id = response["id"]
    AccountSerializer(Account.objects.get_or_create(user=user, picture_url=url, fb_id=fb_id))
    return None
