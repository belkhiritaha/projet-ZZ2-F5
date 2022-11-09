from config import *

def main():
    createEnvFile("topin", "passwd")
    createDockerCompose(3, "grafana", "influxdb", "telegraf")
        




if __name__ == "__main__":
    main()