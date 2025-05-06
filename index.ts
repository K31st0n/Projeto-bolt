// filepath: frontend/index.ts
import axios from 'axios';

const enviarDados = async () => {
    const dados = {
        nome: "João Silva",
        data_nascimento: "01/01/2000", // Formato DD/MM/YYYY
        cpf: "123.456.789-00",
        email1: "joao.silva@email.com",
        senha: "senha123"
    };

    console.log("Enviando dados para o backend:", dados); // Log para depuração

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
};

enviarDados();