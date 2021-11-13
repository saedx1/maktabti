import json
import os
import requests


GRAPHQL_ENDPOINT = os.environ.get(
    "GRAPHQL_ENDPOINT", "http://localhost:8899/v1/graphql"
)


def execute_graphql_query(query, variables=None):
    response = requests.post(
        GRAPHQL_ENDPOINT, data=json.dumps({"query": query, "variables": variables})
    )
    if response.text is None:
        return response.text

    return json.loads(response.text)
