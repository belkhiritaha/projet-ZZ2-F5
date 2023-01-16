import json


def retrieve_json_file():
    res  = []

    with open('test.json') as f:
        data = json.load(f)

    if data['VMid'] != "":
        res.append(data['VMid'])

    if data['VMname'] != "":
        res.append(data['VMname'])

    for key, value in data['VMservices']['db'].items():
        if value == True:
            res.append(key)

    for key, value in data['VMservices']['web'].items():
        if value == True:
            res.append(key)
               
    for key, value in data['VMservices']['other'].items():
        if value == True:
            res.append(key)

    f.close()
    return res

