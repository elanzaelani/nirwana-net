import sequelize from 'sequelize'
import {Sequelize} from 'sequelize'
import db from '../config/Database.js'
import User from './UserModel.js'  
import Produk from './ProdukModel.js'

const {DataTypes}= sequelize;

const Paket = db.define('paket',{
    uuid:{
        type:DataTypes.STRING,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
        }
     },
     nama_paket:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,100] // min 3 karakter max 100 karakter
        }
     },
     speed_durasi:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,100] // min 3 karakter max 100 karakter
        }
     },
    
    
    produkId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    harga:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
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

User.hasMany(Paket)
Paket.belongsTo(User,{foreignKey:'userId'})
Paket.belongsTo(Produk,{foreignKey:'produkId'})
export default Paket;


