import cognitojwt

REGION = "us-east-1"
USERPOOL_ID = "us-east-1_sUdOL4MZl"
APP_CLIENT_ID = "1e3fi179legtiq394d1ttqkga1"


def verify_token(id_token):
    try:
        verified_claims = cognitojwt.decode(id_token, REGION, USERPOOL_ID)
        return verified_claims
    except:
        return None
