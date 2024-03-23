import { Request, Response } from 'express'
import User from '../models/user'

export const getUsers = async (req: Request, res: Response) => {
    try {
        const listUsers = await User.findAll()
        res.json(listUsers)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro ao obter usuario' });
    }
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ msg: `Não existe usuario com o id ${id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro ao obter usuario' });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({ msg: `Não existe usuario com id ${id}` });
        } else {
            await user.destroy();
            res.json({ msg: 'usuario eliminado com sucesso!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro ao excluir usuario' });
    }
}

export const postUser = async (req: Request, res: Response) => {
    const { body } = req;
    const { userName } = body;
    try {
        // Verifica se o nome de usuário já existe no banco de dados
        const existingUser = await User.findOne({ where: { userName } });
        if (existingUser) {
            return res.status(400).json({ msg: 'O nome de usuário já está em uso.' });
        }
        // Se o nome de usuário não existir, cria o usuário
        await User.create(body);
        res.json({ msg: 'Usuário adicionado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro ao adicionar o usuário' });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await user.update(body);
            res.json({ msg: 'usuario atualizado com sucesso!' });
        } else {
            res.status(404).json({ msg: `Não existe usuario com o id ${id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro ao atualizar o usuario' });
    }
}

export const authenticateUser = async (req: Request, res: Response) => {
    const { userName, password } = req.body;
    try {
        const user = await User.findOne({ where: { userName, password } });
        if (user) {
            res.json(user.toJSON()); // Certifique-se de que toJSON() retorna um objeto que segue a estrutura da interface User.
        } else {
            res.status(401).json({ msg: 'Credenciais inválidas. Verifique o nome de usuário e senha.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro ao autenticar usuário' });
    }
}

