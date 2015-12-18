import rauth
import time

def main():
    locations = [("restaurants", "tacos", "San Francisco, CA"),("restaurants", "noodle", "San Francisco, CA"),("restaurants", "bbq", "San Francisco, CA")]
    api_calls = []
    for category, term, location in locations:
        params = get_search_parameters(category, term, location)
        api_calls.append(get_results(params))
        #Be a good internet citizen and rate-limit yourself
        time.sleep(1.0)
        
    ##Do other processing 
    print(api_calls)

def get_results(params):

    #Obtain these from Yelp's manage access page
    consumer_key = "0l_3FmIyG-HLdYwKxmOibg"
    consumer_secret = "U0TxM7KazL21nLpLsB9uRL3aJdU"
    token = "depFrp5R6XneFPOOspXUG7kBn9zmzJIr"
    token_secret = "JgE6BjBzmSxcDzQEd-5CLXNYB04"
    
    session = rauth.OAuth1Session(
        consumer_key = consumer_key
        ,consumer_secret = consumer_secret
        ,access_token = token
        ,access_token_secret = token_secret)
        
    request = session.get("http://api.yelp.com/v2/search",params=params)
    
    #Transforms the JSON API response into a Python dictionary
    data = request.json()
    session.close()
    
    return data
        
def get_search_parameters(category, term, location):
    #See the Yelp API for more details
    params = {}
    params["category_filter"] = category
    params["term"] = term
    params["location"] = location
    
    # params["ll"] = "{},{}".format(str(lat),str(long))
    params["radius_filter"] = "2000"
    params["limit"] = "10"

    return params

if __name__=="__main__":
    main()
