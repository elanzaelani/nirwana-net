import sequelize from 'sequelize'
import { Sequelize } from 'sequelize'
import db from '../config/Database.js'
import User from './UserModel.js'

const { DataTypes } = sequelize;

const Kas = db.define('kas', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    type_kas: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len:[3,100]
        }
    },
    deskripsi: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len:[3,100]
        }
    },
    nominal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    tgl_kas: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
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
User.hasMany(Kas);
Kas.belongsTo(User, { foreignKey: 'userId' });

export default Kas;
