# wedding_website
Website created for my wedding in May 2020, based on Bootstrap4, jQuery, Flask and MySQL

To run locally the website: python app.py
Then the website will be available at localhost:5000

BEFORE running it:
- create an empty MySQL database called wedding
- open src/create_table_presents.py and src insert_presents.py and modify DB configs accordingly with your psw
- run python create_table_presents.py
- check that lista_nozze.csv contains the presents you want to insert
- run python insert_presents.py

