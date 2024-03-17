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
    try {
        await User.create(body);
        res.json({ msg: 'usuario adicionado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro ao adicionar o usuario' });
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
