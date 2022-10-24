#/usr/local/bin/python3

import subprocess
from first_node import first_node


def main():
    while True:
        print("1. Install the first node of k3s")
        print("2. Install an other node of k3s")
        print("3. Exit")
        choice = input("Enter choice: ")


        if choice == "1":
            first_node()
        elif choice == "2":
            print("Choix 2")
        else:
            exit()
        




if __name__ == "__main__":
    main()

res = subprocess.run(["ls"])
print(res)