import { Request, Response } from 'express'
import Producto from '../models/producto'

export const getProducts = async (req: Request, res: Response) => {
    const listProducts = await Producto.findAll()
    res.json(listProducts)
}

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if(producto) {
        res.json(producto)
    } else {
        res.status(404).json({
            msg: `Não existe produto com o id ${id}`
        })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if(!producto){
        res.status(404).json({
            msg: `Não existe produto com id ${id}`
        })
    } else {
        await producto.destroy()
        res.json({
            msg: 'Produto eliminado com sucesso!'
        })
    }
}

export const postProduct = async (req: Request, res: Response) => {
    const { body } = req;
    try{
        await Producto.create(body);
        res.json({
            msg: 'Produto adicionado com sucesso!'
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Erro ao adicionar o produto!`
        })
    }      
}

export const updateProduct = async(req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try{
        const producto = await Producto.findByPk(id);
    if(producto){
        await producto.update(body);
        res.json({
            msg: 'Produto atualizado com sucesso!'
        }) 
    } else {
        res.status(404).json({
            msg: `Não existe produto com o id ${id}`
        })
    }
    } catch(error) { 
        console.log(error);
        res.json({
            msg: 'Erro ao conectar no banco'
        })
    }
}

