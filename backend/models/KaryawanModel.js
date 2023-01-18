import sequelize from 'sequelize';
import db from '../config/Database.js';
import Jabatan from './JabatanModel.js';
import User from './UserModel.js';

const {DataTypes}=sequelize;

const Karyawan=db.define('karyawan',{
    uuid:{
        type:DataTypes.STRING,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    nik:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,20]
        }
    },
    nama:{
        type:DataTypes.STRING,
        allow:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },
    tgl_lahir:{
        type:DataTypes.DATE,
        allow:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },
    j_kelamin:{
        type:DataTypes.STRING,
        allow:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },
    alamat:{
        type:DataTypes.STRING,
        allow:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },
    no_kontak:{
        type:DataTypes.STRING,
        allow:false,
        validate:{
            notEmpty:true,
            len:[3,13]
            
        }
    },
    foto:{
        type:DataTypes.STRING,
        allow:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },
    url:{
        type:DataTypes.STRING,
        allow:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },
   
    status:{
        type:DataTypes.STRING,
        allow:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },
   

    jabId:{
        type:DataTypes.INTEGER,
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

//Membuat tabel relasi 
//One To Many= satu user bisa input byk employee
User.hasMany(Karyawan);
Karyawan.belongsTo(User,{foreignKey:'userId'});
Karyawan.belongsTo(Jabatan,{foreignKey:'jabId'});
// Jabatan.hasMany(Karyawan);

export default Karyawan;
