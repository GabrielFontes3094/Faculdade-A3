import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routeProducto from '../routes/producto';
import db from '../db/connection';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();  
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicação na porta ${this.port}`)
        })
    }

    routes(){
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API trabalhando'
            })
        })
        this.app.use('/api/productos', routeProducto)
    }

    midlewares() {
        this.app.use(express.json());

        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await db.authenticate();
        console.log('base conectada')
        } catch (error) {
            console.log(error);
            console.log('Erro ao conectar no banco');
        }   
    }
}

export default Server;