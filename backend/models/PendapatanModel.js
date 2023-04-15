import sequelize from 'sequelize'
import db from '../config/Database.js'
import User from './UserModel.js'  

const {DataTypes}= sequelize;

const Pendapatan = db.define('pendapatan',{
    uuid:{
        type:DataTypes.STRING,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
        }
     },
     nama_Pendapatan:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,100] // min 3 karakter max 100 karakter
        }
     },
     uraian:{
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
User.hasMany(Pendapatan);
Pendapatan.belongsTo(User,{foreignKey:'userId'});



export default Pendapatan;

// (async()=>{
//     await db.sync(Pendapatan)
// })()

