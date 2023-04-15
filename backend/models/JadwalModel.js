import sequelize from 'sequelize'
import {Sequelize} from 'sequelize'
import db from '../config/Database.js'
import User from './UserModel.js'  

const {DataTypes}= sequelize;

const Jadwal = db.define('jadwal',{
    uuid:{
        type:DataTypes.STRING,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
        }
     },
     nama_jadwal:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,100] // min 3 karakter max 100 karakter
        }
     },
     tgl_jadwal:{
        type:DataTypes.DATE,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,100] // min 3 karakter max 100 karakter
        }
     },
     pelangganId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    uraian:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    status_jadwal:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    tgl_selesai:{
        type:DataTypes.DATE,
        allowNull:false,
        validate:{
            notEmpty:true,
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

//membuat relasi
//One to Many = satu User bisa input byk product
User.hasMany(Jadwal);
Jadwal.belongsTo(User,{foreignKey:'userId'});

export default Jadwal;
