# import sqlite3
import os
import mysql.connector
from mysql.connector import Error

try:
    connection = mysql.connector.connect(host='localhost',
                                         database='wedding',
                                         user='root',
                                         password='ToBeDone')
    if connection.is_connected():
        db_Info = connection.get_server_info()
        print("Connected to MySQL Server version ", db_Info)
        cursor = connection.cursor()
        cursor.execute("select database();")
        record = cursor.fetchone()
        print("You're connected to database: ", record)

        mySql_Create_Table_Query = """CREATE TABLE PRESENTS
                  (ID             INT AUTO_INCREMENT PRIMARY KEY,
                   NAME           VARCHAR(100)    NOT NULL,
                   PREZZO         INT     NOT NULL,
                   PERC           INT     NOT NULL,
                   IMG            VARCHAR(100) NOT NULL,
                   CATEGORY       VARCHAR(20) NOT NULL,
                   UNIQUE KEY unique_name (NAME));"""

    cursor = connection.cursor()
    result = cursor.execute(mySql_Create_Table_Query)
    print("PRESENTS Table created successfully ")

except Error as e:
    print("Error while connecting to MySQL: {}".format(e))
finally:
    if (connection.is_connected()):
        cursor.close()
        connection.close()
        print("MySQL connection is closed")

# conn = sqlite3.connect('weddingWebsite.db')
# print("Opened database successfully")
#
# conn.execute('''CREATE TABLE PRESENTS
#          (NAME           TEXT PRIMARY KEY   NOT NULL,
#           IMPORTO        INT     NOT NULL,
#           PERC           INT     NOT NULL);''')
# print("Table created successfully")
#
# conn.close()
