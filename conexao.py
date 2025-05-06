import mysql.connector
from mysql.connector import Error
from flask import request, Flask

app = Flask(__name__)

def criar_conexao(host, usuario, senha, banco, porta):
    """
    Cria uma conexão com o banco de dados MySQL.
    """
    try:
        print(f"Tentando conectar ao banco de dados: host={host}, usuario={usuario}, banco={banco}, porta={porta}")
        conexao = mysql.connector.connect(
            host=host,
            user=usuario,
            password=senha,
            database=banco,
            port=porta
        )
        if conexao.is_connected():
            print("Conexão bem-sucedida!")
            return conexao
    except Error as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        return None

def fechar_conexao(conexao):
    """
    Fecha a conexão com o banco de dados MySQL.
    """
    try:
        if conexao and conexao.is_connected():
            conexao.close()
            print("Conexão encerrada.")
    except Error as e:
        print(f"Erro ao fechar a conexão: {e}")

def inserir_dados(conexao, nome, data_nascimento, cpf, email1, senha):
    """
    Insere dados na tabela 'cadastro'.
    """
    try:
        cursor = conexao.cursor()
        sql = """
        INSERT INTO cadastro (nome, data_nascimento, cpf, email1, senha)
        VALUES (%s, %s, %s, %s, %s)
        """
        valores = (nome, data_nascimento, cpf, email1, senha)
        cursor.execute(sql, valores)
        conexao.commit()
        print("Dados inseridos com sucesso!")
    except Exception as e:
        print(f"Erro ao inserir dados: {e}")
    finally:
        cursor.close()

@app.route('/inserir', methods=['POST'])
def main():
    # Substitua pelos seus dados de conexão
    host = "localhost"
    porta = "3308"
    usuario = "root"
    senha = ""
    banco = "bd_pv"

    # Cria a conexão
    conexao = criar_conexao(host, usuario, senha, banco, porta)
    if conexao:
        try:
            # Dados a serem inseridos
            dados = request.json
            nome = dados.get("nome")
            data_nascimento = dados.get("data_nascimento")
            cpf = dados.get("cpf")
            email1 = dados.get("email1")
            senha = dados.get("senha")
            inserir_dados(conexao, nome, data_nascimento, cpf, email1, senha)
            
            # Exibe os bancos de dados
            cursor = conexao.cursor()
            cursor.execute("SHOW DATABASES;")
            for db in cursor:
                print(db)
        finally:
            fechar_conexao(conexao)
    else:
        print("Erro ao conectar ao banco de dados.")
    return "Operação concluída"

if __name__ == "__main__":
    app.run(debug=True, port=5001)