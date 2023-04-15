import sequelize from 'sequelize'
import {Sequelize} from 'sequelize'
import db from '../config/Database.js'
import User from './UserModel.js'  

const {DataTypes}= sequelize;

const Produk = db.define('produk',{
    uuid:{
        type:DataTypes.STRING,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
        }
     },
     nama_produk:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,100] // min 3 karakter max 100 karakter
        }
     },
    
     satuan:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,100] // min 3 karakter max 100 karakter
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
User.hasMany(Produk);
Produk.belongsTo(User,{foreignKey:'userId'});

export default Produk;
