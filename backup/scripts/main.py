from config import *

def main (*args):
    configEnv("topin", "passwd")

    #vérifier que le 

    createDockerCompose(3.6, "grafana", "influxdb", "telegraf")
    
    #lancer le docker-compose




if __name__ == "__main__":
    main()