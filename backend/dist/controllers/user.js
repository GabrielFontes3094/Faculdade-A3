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
exports.authenticateUser = exports.updateUser = exports.postUser = exports.deleteUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listUsers = yield user_1.default.findAll();
        res.json(listUsers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro ao obter usuario' });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ msg: `Não existe usuario com o id ${id}` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro ao obter usuario' });
    }
});
exports.getUser = getUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({ msg: `Não existe usuario com id ${id}` });
        }
        else {
            yield user.destroy();
            res.json({ msg: 'usuario eliminado com sucesso!' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro ao excluir usuario' });
    }
});
exports.deleteUser = deleteUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { userName } = body;
    try {
        // Verifica se o nome de usuário já existe no banco de dados
        const existingUser = yield user_1.default.findOne({ where: { userName } });
        if (existingUser) {
            return res.status(400).json({ msg: 'O nome de usuário já está em uso.' });
        }
        // Se o nome de usuário não existir, cria o usuário
        yield user_1.default.create(body);
        res.json({ msg: 'Usuário adicionado com sucesso!' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro ao adicionar o usuário' });
    }
});
exports.postUser = postUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (user) {
            yield user.update(body);
            res.json({ msg: 'usuario atualizado com sucesso!' });
        }
        else {
            res.status(404).json({ msg: `Não existe usuario com o id ${id}` });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro ao atualizar o usuario' });
    }
});
exports.updateUser = updateUser;
const authenticateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ where: { userName, password } });
        if (user) {
            res.json(user.toJSON()); // Certifique-se de que toJSON() retorna um objeto que segue a estrutura da interface User.
        }
        else {
            res.status(401).json({ msg: 'Credenciais inválidas. Verifique o nome de usuário e senha.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro ao autenticar usuário' });
    }
});
exports.authenticateUser = authenticateUser;
