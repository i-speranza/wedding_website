from flask import Flask, render_template, request, jsonify, redirect, url_for
# from flask_mysqldb import MySQL
from flask_mail import Mail,  Message
import psycopg2
import pandas as pd
import os

app = Flask(__name__)

img_path = '../static/images/listaNozze/'

DATABASE_URL = os.environ['DATABASE_URL']
conn = psycopg2.connect(DATABASE_URL, sslmode='require')

app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_TLS= False,
    MAIL_USE_SSL=True,
    MAIL_USERNAME=os.environ['MAIL_USERNAME'],
    MAIL_PASSWORD=os.environ['MAIL_PASSWORD'],
)

mail = Mail(app)

# mysql = MySQL()
# mysql.init_app(app)

def fetch_from_DB(present_id):
    # conn = mysql.connection
    cursor = conn.cursor()
    cursor.execute("""SELECT ID, NAME, PREZZO, REGALATO FROM PRESENTS
                      WHERE ID = {}""".format(present_id))
    ret = cursor.fetchone()
    cursor.close()
    return ret

def update_regalato_in_DB(present_id, new_value):
    # conn = mysql.connection
    cursor = conn.cursor()
    cursor.execute("""UPDATE PRESENTS SET REGALATO = {}
                      WHERE ID = {}""".format(new_value, present_id))
    conn.commit()
    cursor.close()

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/donate',methods=['POST'])
def donate():
    # read the posted values from the UI
    _id = request.form['id'].split('-')[1]
    _, _, prezzo, curr_value = fetch_from_DB(_id)

    _donation = request.form['importo']
    present_complete = False

    if _donation: # check if it contains a value
        _donation = float(_donation)
        new_value = min(curr_value + _donation, prezzo)
        new_perc = round(100*new_value/prezzo)

        # limit new_perc between 0 and 100
        # new_perc = max(0, min(100, new_perc))

        update_regalato_in_DB(_id, new_value)

        if new_value >= prezzo:
            present_complete = True

        valid_donation = True
    else:
        new_perc = curr_perc
        new_value = curr_value
        valid_donation = False

    return jsonify({'newPerc': new_perc, 'newValue': new_value, 'validDonation': valid_donation, 'presentComplete': present_complete})

@app.route('/populateListaCasa',methods=['POST'])
def populateListaCasa():
    # conn = mysql.connection
    cursor = conn.cursor()
    cursor.execute("""SELECT ID, NAME, PREZZO, REGALATO, IMG, CATEGORY FROM PRESENTS
                    WHERE CATEGORY = 'casa';""")
    res = cursor.fetchall()
    res = pd.DataFrame(list(res), columns = ['Id', 'Name', 'Prezzo', 'Regalato', 'Img', 'Category'])
    res.Img = res.Img.apply(lambda img: os.path.join(img_path, img))
    res = res.assign(Perc = round(100*res.Regalato/res.Prezzo))
    cursor.close()
    return jsonify(res.to_json(orient='records'))

@app.route('/populateListaViaggio',methods=['POST'])
def populateListaViaggio():
    # conn = mysql.connection
    cursor = conn.cursor()
    cursor.execute("""SELECT ID, NAME, PREZZO, REGALATO, IMG, CATEGORY FROM PRESENTS
                    WHERE CATEGORY = 'viaggio';""")
    res = cursor.fetchall()
    res = pd.DataFrame(list(res), columns = ['Id', 'Name', 'Prezzo', 'Regalato', 'Img', 'Category'])
    res.Img = res.Img.apply(lambda img: os.path.join(img_path, img))
    res = res.assign(Perc = round(100*res.Regalato/res.Prezzo))
    cursor.close()

    return jsonify(res.to_json(orient='records'))

@app.route('/sendMailRSVP', methods = ['POST'])
def sendMailRSVP():
    nome = request.form['nome']
    email = request.form['email']
    num_adulti = request.form['numAdulti']
    num_bimbi = request.form['numBimbi']
    num_bebe = request.form['numBebe']
    allergie = request.form['allergie']

    with app.app_context():
        msg = Message(subject="Nuovo partecipante!",
                      sender=app.config.get("MAIL_USERNAME"),
                      recipients=["giacomoeilaria.16maggio2020@gmail.com"], # replace with your email for testing
                      body="Nome: {}\nEmail: {}\nAdulti: {}\nBimbi: {}\nInfanti: {}\nAllergie: {}".format(nome, email, num_adulti, num_bimbi, num_bebe, allergie))
        mail.send(msg)

    return 'OK'

@app.route('/sendMailRegalo', methods = ['POST'])
def sendMailRegalo():
    donor = request.form['name']
    chosen_present = request.form['regalo']
    donor_email = request.form['email']
    donor_msg = request.form['message']
    donation = request.form['importo']

    if donor_email:
        with app.app_context():
            msg = Message(subject="Grazie da Giacomo e Ilaria!",
                          sender=app.config.get("MAIL_USERNAME"),
                          recipients=[donor_email], # replace with your email for testing
                          body="""Ciao {}, grazie di cuore per il tuo regalo!

Per effettuare il tuo regalo tramite bonifico le coordinate sono
IBAN: IT20P0306933480100000000946
intestato a: Ilaria Speranza
presso: Banca Intesa san Paolo, filiale di Opera

A presto!
Giacomo e Ilaria""".format(donor))
            mail.send(msg)

    with app.app_context():
        msg = Message(subject="Nuovo regalo! {} ha contribuito a {}".format(donor, chosen_present),
                      sender=app.config.get("MAIL_USERNAME"),
                      recipients=["giacomoeilaria.16maggio2020@gmail.com"], # replace with your email for testing
                      body="Email: {}\nImporto: {}\nMessaggio:\n{}".format(donor_email, donation, donor_msg))
        mail.send(msg)

    return 'OK'

if __name__ == '__main__':
    app.run(debug=True)
