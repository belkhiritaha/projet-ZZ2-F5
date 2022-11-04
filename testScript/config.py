import yaml

def test():

    contents = [{'version': '3', 'services':
                {'influxdb':
                {'image' : 'influxdb', 'container_name': 'influxdb', 'restart': 'on_failure', 'hostname': 'influxdb', 
                 'volumes': [".influxdb:/var/lib/influxdb"]}}}]

    add = "yoooo"
    contents2 = [{'banger' : add}]

    stream = open("docker-compose2.yml","w")

    yaml.dump_all(contents, stream)
    yaml.dump_all(contents2, stream)
    print(type(contents))
    print("done")
    
    stream.close()

def test2():

    with open("docker-compose.yml") as file:
        
        content = yaml.safe_load_all(file)
        print(next(content))


test()
#test2()