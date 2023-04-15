import sequelize from 'sequelize'
import {Sequelize} from 'sequelize'
import db from '../config/Database.js'
import User from './UserModel.js'  

const {DataTypes}= sequelize;

const Payment = db.define('payment',{
    uuid:{
        type:DataTypes.STRING,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
        }
     },
     invoiceId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
     paymentDate:{
        type:DataTypes.DATE,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
     },
     paymentDate:{
        type:DataTypes.DATE,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
     },
     paymentMethod:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,100] // min 3 karakter max 100 karakter
        }
     },
     paymentAmount:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
     },
     paymentStatus:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
     },
     notes:{
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
User.hasMany(Payment);
Payment.belongsTo(User,{foreignKey:'userId'});

export default Payment;
