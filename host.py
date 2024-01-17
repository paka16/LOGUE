# socket code skeleton comes from
# https://realpython.com/python-sockets/
# https://planetscale.com/blog/using-mysql-with-sql-alchemy-hands-on-examples

from sqlalchemy import create_engine, ForeignKey, Column, String, Integer, CHAR, text #need to pip install sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import socket
import json
import pickle

# connection_string = "mysql+mysqlconnector://sup_user:200201556Aa!1@localhost/library"

#[(War and Peace y  124326)]
class server:

    def __init__(self):
        self.HOST = "127.0.0.1"  # Standard loopback interface address (localhost)
        self.PORT = 65430  # Port to listen on (non-privileged ports are > 1023)
        self.data = 0
        self.x = 0
        self.disp = ""

    def runSocket(self):

        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            print("DEBUG: MICROSERVICE SOCKET RUNNING")
            s.bind((self.HOST, self.PORT))
            s.listen()
            conn, addr = s.accept()
            with conn:
                while True:
                    # receiving message from the client
                    data = conn.recv(1024)
                    if not data:
                        break
                    # sends the data back to the client?
                    
                    # query
                    self.data = data
                    decoded_data = data.decode()
                    print(f"DEBUG - self.data: {self.data}")
                    #conn.sendall(data)
                    book_result = self.sql(decoded_data) #results. book_res <list>
                    data_dump = pickle.dumps(book_result)
                    # sending the data back to main
                    # byte_result = bytes(book_result, 'utf-8') #create bytestring
                    print("byte result is ", type(data_dump))
                    conn.sendall(data_dump)
    
    def sql(self, query_data):
        print("DEBUG - IN SQL()")
        print(f"DEBUG - TYPE OF QUERY_DATA: {type(query_data)}")
        connection_string = "mysql+mysqlconnector://sup_user:200201556Aa!1@localhost/library"

        engine = create_engine(connection_string, echo=True)
        print("engine created")
        result = []
        # Test the connection
        with engine.connect() as connection:
            print("engine connected")
            
            query_result = connection.execute(text(query_data))
            for row in query_result.mappings():
                result.append({"id": row['id'], "title" : row["title"]})
                print("title:" , row["title"])
            
            connection.close()
        return result
            