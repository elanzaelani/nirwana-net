import sequelize from 'sequelize'
import { Sequelize } from 'sequelize'
import db from '../config/Database.js'
import User from './UserModel.js'

const { DataTypes } = sequelize;

const Piutang = db.define('piutang', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
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
User.hasMany(Piutang);
Piutang.belongsTo(User, { foreignKey: 'userId' });

export default Piutang;
