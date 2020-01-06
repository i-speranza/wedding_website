from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL
import pandas as pd
import os

app = Flask(__name__)

img_path = '../static/images/listaNozze/'

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'ToBeDone'
app.config['MYSQL_DB'] = 'wedding'

mysql = MySQL()
mysql.init_app(app)

def fetch_from_DB(present_id):
    conn = mysql.connection
    cursor = conn.cursor()
    cursor.execute('''SELECT ID, NAME, PREZZO, PERC FROM PRESENTS
                      WHERE ID = {}'''.format(present_id))
    return cursor.fetchone()

def update_perc_in_DB(present_id, new_perc):
    conn = mysql.connection
    cursor = conn.cursor()
    cursor.execute('''UPDATE PRESENTS SET PERC = {}
                      WHERE ID = {}'''.format(new_perc, present_id))
    conn.commit()

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/donate',methods=['POST'])
def donate():
    # read the posted values from the UI
    _id = request.form['id'].split('-')[1]
    _, _, prezzo, curr_perc = fetch_from_DB(_id)

    _donation = request.form['importo']

    if _donation: # check if it contains a value
        _donation = float(_donation)
        new_perc = round(curr_perc + 100*_donation/prezzo)

        # limit new_perc between 0 and 100
        new_perc = max(0, min(100, new_perc))

        update_perc_in_DB(_id, new_perc)

        valid_donation = True
    else:
        new_perc = curr_perc
        valid_donation = False

    return jsonify({'newPerc': new_perc, 'validDonation': valid_donation})

@app.route('/populateListaCasa',methods=['POST'])
def populateListaCasa():
    conn = mysql.connection
    cursor = conn.cursor()
    cursor.execute('''SELECT ID, NAME, PREZZO, PERC, IMG, CATEGORY FROM PRESENTS
                      WHERE CATEGORY = "casa"''')
    res = cursor.fetchall()
    res = pd.DataFrame(list(res), columns = ['Id', 'Name', 'Prezzo', 'Perc', 'Img', 'Category'])
    res.Img = res.Img.apply(lambda img: os.path.join(img_path, img))

    return jsonify(res.to_json(orient='records'))

@app.route('/populateListaViaggio',methods=['POST'])
def populateListaViaggio():
    conn = mysql.connection
    cursor = conn.cursor()
    cursor.execute('''SELECT ID, NAME, PREZZO, PERC, IMG, CATEGORY FROM PRESENTS
                      WHERE CATEGORY = "viaggio"''')
    res = cursor.fetchall()
    res = pd.DataFrame(list(res), columns = ['Id', 'Name', 'Prezzo', 'Perc', 'Img', 'Category'])
    res.Img = res.Img.apply(lambda img: os.path.join(img_path, img))

    return jsonify(res.to_json(orient='records'))


if __name__ == '__main__':
    app.run(debug=True)
