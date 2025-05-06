from conexao import criar_conexao, fechar_conexao

def inserer_dados(conexao, email, senha):
    try:
        cursor = conexao.cursor()
        sql = "INSERT INTO usuarios (email, senha) VALUES (%s, %s)"
        valores = (email, senha)
        cursor.execute(sql, valores)
        conexao.commit()
        print("Dados inseridos com sucesso!")
    except Exception as e:
        print(f"Erro ao inserir dados: {e}")
    finally:
        cursor.close()

def main():
    conexao = criar_conexao("localhost", "root", "123456", "bd_pv")
    if conexao:
        try:
            email = input("Digite o email: ")
            senha = input("Digite a senha: ")
            inserer_dados(conexao, email, senha)
        finally:
            fechar_conexao(conexao)
    else:
        print("Erro ao conectar ao banco de dados.")

if __name__ == "__main__":
    main()