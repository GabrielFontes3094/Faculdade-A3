import { DataTypes } from 'sequelize'
import db from '../db/connection';

const User = db.define('User', {
    userName: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    access: {
        type: DataTypes.STRING,
        defaultValue: 'usuario'
    }
}, {
    createdAt: false,
    updatedAt: false
});

export default User;