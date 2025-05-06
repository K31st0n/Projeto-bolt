from conexao import criar_conexao, fechar_conexao

def inserir_dados(conexao, email, senha):
    try:
        with conexao.cursor() as cursor:  # Gerenciador de contexto para o cursor
            sql = "INSERT INTO usuarios (email, senha) VALUES (%s, %s)"
            valores = (email, senha)
            cursor.execute(sql, valores)
            conexao.commit()
            print("Dados inseridos com sucesso!")
    except Exception as e:
        print(f"Erro ao inserir dados: {e}")

def validar_email(email):
    # Simples validação de email
    import re
    padrao = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(padrao, email)

def main():
    conexao = criar_conexao("localhost", "root", "123456", "bd_pv")
    if conexao:
        try:
            email = input("Digite o email: ")
            if not validar_email(email):
                print("Email inválido!")
                return
            
            senha = input("Digite a senha: ")
            if not senha:
                print("A senha não pode estar vazia!")
                return

            inserir_dados(conexao, email, senha)
        finally:
            fechar_conexao(conexao)
    else:
        print("Erro ao conectar ao banco de dados.")

if __name__ == "__main__":
    main()