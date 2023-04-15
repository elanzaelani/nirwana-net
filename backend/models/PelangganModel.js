import sequelize from 'sequelize';
import db from '../config/Database.js';
import User from './UserModel.js';
import Paket from './PaketModel.js';
import Server from './ServerModel.js';

const {DataTypes}=sequelize;

const Pelanggan =db.define('pelanggan',{
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
            len:[3,16]
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
            len:[3,100]
        }
    },
    email:{
        type:DataTypes.STRING,
        allow:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },
    pekerjaan:{
        type:DataTypes.STRING,
        allow:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },
    tipe_koneksi:{
        type:DataTypes.STRING,
        allow:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },
    ip_address:{
        type:DataTypes.STRING,
        allow:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },
    tgl_koneksi:{
        type:DataTypes.DATE,
        allow:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },
    status_koneksi:{
        type:DataTypes.STRING,
        allow:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },
   
    paketId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    serverId:{
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

//Membuat tabel relasi 
//One To Many= satu user bisa input byk employee
User.hasMany(Pelanggan);
Pelanggan.belongsTo(User,{foreignKey:'userId'});
Pelanggan.belongsTo(Paket,{foreignKey:'paketId'});
Pelanggan.belongsTo(Server,{foreignKey:'serverId'});


export default Pelanggan;
