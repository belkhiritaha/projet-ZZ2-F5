import json
import sys

def retrieve_json_file(json_name):
    res  = []

    with open(json_name) as f:
        data = json.load(f)

    if data['owner'] != "":
            res.append(data['owner'])

    if data['VMid'] != "":
        
        res.append(data['VMid']+data['VMname'])
    
    for key in data['VMservices']:
        print(key)
        print(data['VMservices'])
        for clef, value in data['VMservices'][key].items():
            if value == True:
                res.append(clef)

    f.close()
    return res