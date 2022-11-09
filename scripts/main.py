from config import *

def main():
    configEnv("topin", "passwd")
    createDockerCompose(3, "grafana", "influxdb", "telegraf")
        




if __name__ == "__main__":
    main()