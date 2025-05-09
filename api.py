# filepath: c:\Users\kelst\Downloads\PV\api.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from conexao import criar_conexao, inserir_dados, fechar_conexao
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Permite requisições de outros domínios


@app.route('/inserir', methods=['POST'])
def inserir():
    try:
        dados = request.json
        print("Dados recebidos no backend:", dados)  # Log para depuração

        nome = dados.get('nome')
        data_nascimento = dados.get('data_nascimento')
        cpf = dados.get('cpf')
        email1 = dados.get('email1')
        senha = dados.get('senha')

        # Validação dos campos obrigatórios
        if not all([nome, data_nascimento, cpf, email1, senha]):
            return jsonify({"erro": "Todos os campos são obrigatórios."}), 400

        # Validação e conversão do formato da data
        try:
            data_nascimento = datetime.strptime(data_nascimento, "%d/%m/%Y").strftime("%Y-%m-%d")
        except ValueError:
            return jsonify({"erro": "Formato de data inválido. Use DD/MM/YYYY."}), 400

        # Conexão com o banco de dados
        conexao = criar_conexao("localhost", "root", "", "bd_pv", "3308")
        if conexao:
            try:
                inserir_dados(conexao, nome, data_nascimento, cpf, email1, senha)
                return jsonify({"mensagem": "Dados inseridos com sucesso!"}), 201
            except Exception as e:
                print("Erro ao inserir dados no banco:", e)  # Log para depuração
                return jsonify({"erro": str(e)}), 500
            finally:
                fechar_conexao(conexao)
        else:
            return jsonify({"erro": "Erro ao conectar ao banco de dados"}), 500
    except Exception as e:
        print("Erro no backend:", e)  # Log para depuração
        return jsonify({"erro": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

# Código sugerido para enviar dados ao backend usando axios
# Salve o código abaixo em um arquivo separado com extensão .js e execute-o em um ambiente JavaScript.

"""
try {
    const resposta = await axios.post('http://127.0.0.1:5000/inserir', dados, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log("Resposta do backend:", resposta.data); // Log para depuração
} catch (erro) {
    if (axios.isAxiosError(erro)) {
        console.error("Erro ao enviar dados:", erro.response?.data || erro.message);
    } else {
        console.error("Erro ao enviar dados:", erro);
    }
}
"""