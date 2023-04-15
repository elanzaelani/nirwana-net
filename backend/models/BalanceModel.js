import sequelize from 'sequelize'
import { Sequelize } from 'sequelize'
import db from '../config/Database.js'
import Expansi from './ExpansiModel.js';
import Kas from './KasModel.js';
import User from './UserModel.js'

const { DataTypes } = sequelize;

const Balance = db.define('balance', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    kasId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    expanId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    paymentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }

}, {
    freezeTableName: true
});

//membuat relasi
//One to Many = satu User bisa input byk product
User.hasMany(Balance);
Balance.belongsTo(User, { foreignKey: 'userId' });
Balance.belongsTo(Kas,{foreignKey:'kasId'})
Balance.belongsTo(Expansi,{foreignKey:'expanId'})

export default Balance;
