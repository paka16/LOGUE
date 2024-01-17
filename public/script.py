import sys
import json
import socket
import time
import pickle
import requests

time. sleep(1)
HOST = "127.0.0.1"  # The server's hostname or IP address
PORT = 65430  # The port used by the server
REDIRECT_URL = "http://localhost:8080/microservice"
# ------------- SQL commands -------------
#SELECT TOP 3 * FROM Customers;

print("QUERY: " + sys.argv[1])
data= sys.argv[1]

byte_data = bytes(data, 'utf-8')
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:

    s.connect((HOST, PORT))
    print(f"Sending sql query: {data}")
    # uses .sendall to send the message to the server
    s.sendall(byte_data)

    data = s.recv(4096)
    data_load = pickle.loads(data)
    
print("----------------------------------------------------------------------------------------------------------")
print(f"|Received the following book data back: {data_load} |")

# format data_load into JSON object
dictionary = {}
for i in range(len(data_load)):
    dictionary[i] = data_load[i]

print(f"dictionary: {dictionary}")

format_data= json.dumps(dictionary, indent=4)

# write dictionary to file to use in server

with open("microservice_result.json", "w") as file:
    file.write(format_data)
    
print("closed file and left script.py")
sys.stdout.flush()


