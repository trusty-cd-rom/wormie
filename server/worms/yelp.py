import rauth
import time

def yelpMain(category_filter, term, location):
    # category = "restaurants"
    # term = "tacos"
    # location = "San Francisco, CA"
    print('inside yelpmain in yelp.py')
    params = get_search_parameters(category_filter, term, location)
        
    ##Do other processing 
    return get_results(params)

def get_results(params):

    #Obtain these from Yelp's manage access page
    consumer_key = "0l_3FmIyG-HLdYwKxmOibg"
    consumer_secret = "U0TxM7KazL21nLpLsB9uRL3aJdU"
    token = "4mFVbbDOROX9qiID4kbSI2ItMjLo4gkp"
    token_secret = "kUvp_omiFPTS2ts8AepeveIc_s0"
    
    session = rauth.OAuth1Session(
        consumer_key = consumer_key
        ,consumer_secret = consumer_secret
        ,access_token = token
        ,access_token_secret = token_secret)
        
    request = session.get("http://api.yelp.com/v2/search", params=params)
    
    #Transforms the JSON API response into a Python dictionary
    data = request.json()
    session.close()
    
    return data
        
def get_search_parameters(category_filter, term, location):
    #See the Yelp API for more details
    params = {}
    params["category_filter"] = category_filter
    params["term"] = term
    params["location"] = location
    
    # params["ll"] = "{},{}".format(str(lat),str(long))
    params["radius_filter"] = "2000"
    params["limit"] = "20"

    return params

if __name__=="__main__":
    main()
