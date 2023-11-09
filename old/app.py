from flask import Flask
import os

app = Flask(__name__)

@app.route('/')
def hello():
    testroad = os.getcwd()
    print(testroad)
    if str(testroad) != '/mnt/c/MAMP/htdocs/Across-the-road/frontend/home':
        template = os.chdir('../frontend/test')
        template = open('index.html', 'r')
    else:
        template = open('index.html', 'r')
    return template.read()


@app.route('/bonjour/<nom>')
def bonjour(nom):
    return f"<h3>Bonjour, {nom} !</h3>"



# Lancement du serveur Flask
# IMPERATIVEMENT A LA FIN DU FICHIER
if __name__ == '__main__':
    app.run()

