

def main():
    while True:
        print("1. Calculate checksum")
        print("2. Remove junk")
        print("3. Translate hex file")
        print("4. Look for string")
        print("5. Mqtt subscribe and listen")
        print("6. Mqtt publish")
        print("7. Exit")
        choice = input("Enter choice: ")


        if choice == "1":
            filename = input("Enter filename: ")
        
        elif choice == "2":
            filename = input("Enter filename: ")

        elif choice == "3":
            filename = input("Enter filename: ")

        elif choice == "4":
            filename = input("Enter filename: ")
            string = input("Enter string: ")
            lookForString(filename, string)

        elif choice == "5":
            user = input("Enter user: ")
            passwd = input("Enter password: ")
            server = input("Enter server: ")
            port = int(input("Enter port: "))
            topic = input("Enter topic: ")
        
        elif choice == "6":
            user = input("Enter user: ")
            passwd = input("Enter password: ")
            server = input("Enter server: ")
            port = int(input("Enter port: "))
            topic = input("Enter topic: ")
            msg = input("Enter message: ")
            iter = int(input("Nombre itération: "))
        
        else:
            exit()
        




if __name__ == "__main__":
    main()
