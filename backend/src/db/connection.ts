import { Sequelize } from "sequelize";

const sequelize = new Sequelize('almacen', 'root', 'amigo2004', {
    host: 'localhost',
    dialect: 'mysql'
  });

export default sequelize;