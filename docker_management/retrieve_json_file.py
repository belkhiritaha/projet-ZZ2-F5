import json


def retrieve_json_file():
    res  = []

    with open('test.json') as f:
        data = json.load(f)

    if data['VMid'] != "":
        res.append(data['VMid'])

    if data['VMname'] != "":
        res.append(data['VMname'])

    for key in data['VMservices']:

        for clef, value in data['VMservices'][key].items():
            if value == True:
                res.append(clef)

    f.close()
    return res

print(retrieve_json_file())