#!/usr/bin/env python
import subprocess
import time


def main():
    print("Quels docker-compose ?")
    path = input()

    result = subprocess.run(["kompose", "convert", "-f", path])
    time.sleep(5)
    move = subprocess.call('./move.sh')

    return 0




if __name__ == '__main__':
    main()