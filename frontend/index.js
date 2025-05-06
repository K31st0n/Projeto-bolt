"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// filepath: frontend/index.ts
const axios_1 = __importDefault(require("axios"));
const enviarDados = () => __awaiter(void 0, void 0, void 0, function* () {
    const dados = {
        nome: "João Silva",
        data_nascimento: "1990-01-01",
        cpf: "123.456.789-00",
        email1: "joao.silva@email.com",
        senha: "senha123"
    };
    try {
        const resposta = yield axios_1.default.post('http://127.0.0.1:5000/inserir', dados);
        console.log(resposta.data);
    }
    catch (erro) {
        console.error("Erro ao enviar dados:", erro);
    }
});
enviarDados();
