# wedding_website
Website created for my wedding in May 2020, based on Bootstrap4, jQuery, Flask and Postgress
Deployed on Heroku (both website and DB)

To run locally the website: python app.py
Then the website will be available at localhost:5000

BEFORE running it:
- set environmental variables DATABASE_URL, MAIL_USERNAME, MAIL_PASSWORD
- populate DB on Heroku
- check that lista_nozze.csv contains the presents you want to insert
- run scripts contained in populateDB
