# UNIVERSIDADE FEDERAL DO PARÁ - UFPA.2023
# https://github.com/IK-R-S/eco-tokens
# ECO-TOKENS SYSTEM V.0.1
# GNU GPL 3.0 LICENSE

from flask import Flask, request, redirect, jsonify
from database.database import Database
from flask_cors import CORS
from http import HTTPStatus
import secrets

app = Flask(__name__)
app.secret_key = 'segredo'
app.config['JWT_SECRET_KEY'] = secrets.token_urlsafe(32)
CORS(app)

@app.route('/', methods=['GET'])
def index():
    return redirect('https://github.com/IK-R-S/RESTful-Flask-API')

@app.route('/status', methods=['GET'])
def status():
    return jsonify({
        'application': 'Tokens system',
        'framework': 'flask',
        'server': 'online',
        'status code': HTTPStatus.OK
    })

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    user = {
        "name": data['name'],
        "email": data['email'],
        "password": data['password'],
    }
    db = Database()
    response, status = db.registro(user)
    return jsonify(response), status.value

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = {
        "email": data['email'],
        "password": data['password'],
    }
    db = Database()
    response, status = db.login(user)
    return jsonify(response), status.value

@app.route('/api/dashboard', methods=['GET'])
def dashboard():
    db = Database()
    response, status = db.dashboard()
    return jsonify(response), status.value

@app.route('/api/transaction', methods=['POST'])
def transaction():
    data = request.json
    destino = {
        "wallet": data['wallet'],
        "tokens": data['tokens']
    }
    db = Database()
    response, status = db.transaction(destino)
    return jsonify(response), status.value

if __name__ == '__main__':
    app.run(port=8000, debug=True)
