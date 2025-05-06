import mysql.connector
from mysql.connector import Error

def testar_conexao():
    try:
        conexao = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="bd_pv",
            port="3308"
        )
        if conexao.is_connected():
            print("Conexão com o banco de dados bem-sucedida!")
            conexao.close()
    except Error as e:
        print(f"Erro ao conectar ao banco de dados: {e}")

if __name__ == "__main__":
    testar_conexao()