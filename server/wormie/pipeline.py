# from worms.models import Account, User
# from worms.serializers import AccountSerializer, UserSerializer
import logging
logger = logging.getLogger(__name__)

def create_account(backend, user, response, is_new, *args, **kwargs):
    logger.info("STARWARS")
    url = "http://graph.facebook.com/" + response["id"] + "/picture?type=large"
    logger.info(url)
    return None
