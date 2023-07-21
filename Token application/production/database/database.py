from werkzeug.security import generate_password_hash, check_password_hash
from .server import database_info
from flask import Flask, request, session, jsonify
from datetime import datetime
from random import randint
import psycopg2.extras
import psycopg2
from http import HTTPStatus

app = Flask(__name__)
app.secret_key = 'your_secret_key'


# Criando a Classe Database para interagir com a API em main.py
class Database():
    def __init__(self):
        # Conectando com o banco de dados
        self.conn = psycopg2.connect(
            host=database_info['host'],
            database=database_info['database'],
            user=database_info['user'],
            password=database_info['password'],
            port=database_info['port']
        )
        
    def registro(self, user):
        cur = self.conn.cursor()
        cur.execute("SELECT * FROM users WHERE email=%s", (user["email"],))
        account = cur.fetchall()

        if account:
            return {'erro': 'este usuário já existe', 'status code': HTTPStatus.CONFLICT}, HTTPStatus.CONFLICT
        
        else:
            _hashed_password = generate_password_hash(user["password"])
            cur.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (user["name"], user["email"], _hashed_password))
            self.conn.commit()
            return {'nova conta criada': user, 'status code': HTTPStatus.CREATED}, HTTPStatus.CREATED
        
    def login(self, user):
        cur = self.conn.cursor()
        cur.execute("SELECT * FROM users WHERE email=%s", (user["email"],))
        account = cur.fetchone()

        if account:
            if check_password_hash(account[4], user["password"]):
                session['loggedin'] = True
                session['id'] = account[0]
                session['username'] = account[2]
                return {'login bem sucedido': session, 'status code': HTTPStatus.OK}, HTTPStatus.OK
            
            else:
                return {'senha inválida': user["password"], 'status code': HTTPStatus.UNAUTHORIZED}, HTTPStatus.UNAUTHORIZED
        else:
            return {'erro': 'conta inexistente', 'status code': HTTPStatus.NOT_FOUND}, HTTPStatus.NOT_FOUND
        
    def dashboard(self):
        # Verificando se o usuário está logado
        if 'loggedin' in session:
            name = session['username']
            user_id = session['id']
            cur = self.conn.cursor()
            # Obtendo as informações do usuário
            cur.execute("SELECT * FROM users WHERE id=%s", (user_id,))
            account = cur.fetchone()

            # Buscando saldo da carteira do usuário
            tokens_on_wallet = account[1]
            email_wallet_adress = account[3]

            # Buscando o extrato da conta

            # Transações de débito
            cur.execute("SELECT * FROM transactions WHERE wallet_sender=%s", (email_wallet_adress,))
            sender_transactions = cur.fetchall()
            # Transações de crédito
            cur.execute("SELECT * FROM transactions WHERE wallet_receiver=%s", (email_wallet_adress,))
            receiver_transactions = cur.fetchall()
            # Extrato da conta com débitos e créditos
            extract =  {'débitos (saídas)': sender_transactions, 'créditos (entradas)':  receiver_transactions}
            
            return {'name': name, 'tokens': tokens_on_wallet, 'wallet adress': email_wallet_adress , 'account_extract': extract}, HTTPStatus.OK
        else:
            return {'erro': 'acesso não permitido', 'status code': HTTPStatus.UNAUTHORIZED}, HTTPStatus.UNAUTHORIZED

    def transaction(self, transaction):
        if 'loggedin' in session:
            cur = self.conn.cursor()
            # Identificando remetente
            cur.execute("SELECT * FROM users WHERE id=%s", (session['id'],))
            account_sender = cur.fetchone()
            # Identificando destinatário
            cur.execute("SELECT * FROM users WHERE email=%s", (transaction["wallet"],))
            account_receiver = cur.fetchone()

            if account_receiver:
                if account_sender == account_receiver:
                    return {'erro': 'não é possível enviar tokens para a mesma carteira de origem', 'status code': HTTPStatus.CONFLICT}, HTTPStatus.CONFLICT
                else:
                    tokens = transaction["tokens"] # Definindo quantidade de Tokens para transferir
                    
                    if tokens > account_sender[1]: # Verificando saldo do remetente
                        return {'erro': 'saldo insuficiente', 'status code': HTTPStatus.PAYMENT_REQUIRED}, HTTPStatus.PAYMENT_REQUIRED
                    else:
                        # Iniciando a transferência

                        # Atualizando valores nas carteiras (tabela usuários)
                        cur.execute("UPDATE users SET wallet = wallet + %s::REAL WHERE email = %s", (tokens, transaction["wallet"]))
                        self.conn.commit()
                        cur.execute("UPDATE users SET wallet = wallet - %s::REAL WHERE id = %s", (tokens, session['id']))
                        self.conn.commit()

                        # Obtendo data e hora atual
                        current_time = datetime.now()
                        formatted_time = current_time.strftime("%d/%m/%y %H:%M")

                        # Gerando um ID de transação único usando randint e hash
                        transaction_id = randint(0, 999999)
                        # Convertendo o ID de transação para string antes de aplicar o hash
                        transaction_id_str = str(transaction_id)
                        # Aplicando o hash no ID de transação e adicionando mais caracteres identificadores (evitando ids iguais)
                        hashed_transaction_id = generate_password_hash(transaction_id_str + formatted_time + account_sender[3] + account_receiver[3])

                        # Atualizando valores na tabela de transações
                        cur.execute("INSERT INTO  transactions (tokens, sender, receiver, wallet_sender, wallet_receiver, time, transaction_id) VALUES (%s, %s, %s, %s, %s, %s, %s)", (tokens, account_sender[2], account_receiver[2], account_sender[3], account_receiver[3], formatted_time, hashed_transaction_id))
                        self.conn.commit()
                        print(transaction_id_str)
                        print(hashed_transaction_id)
                        return {'info': 'transação concluída', 'tokens': tokens, 'transaction_id': hashed_transaction_id, 'status code': HTTPStatus.OK}, HTTPStatus.OK
            else:
                return {'erro': 'carteira não encontrada', 'status code': HTTPStatus.NOT_FOUND}, HTTPStatus.NOT_FOUND
        else:
            return {'erro': 'acesso não permitido', 'status code': HTTPStatus.UNAUTHORIZED}, HTTPStatus.UNAUTHORIZED


