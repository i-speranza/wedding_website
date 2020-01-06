import mysql.connector
from mysql.connector import Error
import pandas as pd

def checkTableExists(dbcon, tablename):
    dbcur = dbcon.cursor()
    dbcur.execute(""" SELECT count(*)
                      FROM information_schema.tables
                      WHERE table_name='{}' """.format(tablename))
    if dbcur.fetchone()[0] == 1:
        dbcur.close()
        return True

    dbcur.close()
    return False

def insertVariblesIntoTable(conn, recordTuple):
    try:
        cursor = conn.cursor()
        mySql_insert_query = """INSERT INTO PRESENTS (NAME, PREZZO, PERC, IMG, CATEGORY)
                                VALUES (%s, %s, %s, %s, %s) """

        cursor.execute(mySql_insert_query, recordTuple)
        conn.commit()

    except mysql.connector.Error as error:
        print("Failed to insert into MySQL table {}".format(error))

    finally:
        cursor.close()

if __name__  == '__main__':

    lista_nozze = pd.read_csv('lista_nozze.csv', sep = ';')

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

        if checkTableExists(connection, 'PRESENTS'):
            cursor = connection.cursor()
            cursor.execute('DELETE FROM PRESENTS')
            print('*****************\nDeleting old rows\n*****************')

        for _, regalo in lista_nozze.iterrows():
            insertVariblesIntoTable(connection, tuple(regalo))

    except Error as e:
        print("Error while connecting to MySQL: {}".format(e))
    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()
            print("MySQL connection is closed")
