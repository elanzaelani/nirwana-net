import sequelize from 'sequelize';
import db from '../config/Database.js';
import User from './UserModel.js';

const {DataTypes}=sequelize;
const Jabatan= db.define('jabatan',{

    uuid:{
        type:DataTypes.STRING,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    nama_jab:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    }

},{
    freezeTableName:true
});

User.hasMany(Jabatan);
Jabatan.belongsTo(User,{foreignKey:'userId'});


export default Jabatan;