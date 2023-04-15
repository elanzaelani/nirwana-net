import express from 'express'
import cors from 'cors'
import session from 'express-session'   
import SequelizeStore from 'connect-session-sequelize'
import dotenv from 'dotenv' 
import fileUpload from 'express-fileupload';

import db from './config/Database.js'
import UserRoute from './routes/UserRoute.js'
import JabatanRoute from './routes/JabatanRoute.js'
import ProdukRoute from './routes/ProdukRoute.js'
import PaketRoute from './routes/PaketRoute.js'
// import ProductRoute from './routes/ProductRoute.js'
import AuthRoute from './routes/AuthRoute.js';
import KaryawanRoute from './routes/KaryawanRoute.js';
import PelangganRoute from './routes/PelangganRoute.js';

import Karyawan from './models/KaryawanModel.js';
import Pelanggan from './models/PelangganModel.js'
import Produk from './models/ProdukModel.js';
import Jabatan from './models/JabatanModel.js'
import Paket from './models/PaketModel.js'
import Pendapatan from './models/PendapatanModel.js';
import Piutang from './models/PiutangModel.js';
import Balance from './models/BalanceModel.js'
import Expansi from './models/ExpansiModel.js'
import ExpansiType from './models/ExpansiTypeModel.js'
import Kas from './models/KasModel.js'
import Jadwal from './models/JadwalModel.js'

dotenv.config()

const app= express();
//utk menyimpan session ketika login
const sessionStore= SequelizeStore(session.Store)
const store= new sessionStore({
    db:db
});

// utk mengenerate table
(async()=>{
    await db.sync()
})()


app.use(session({
    secret:process.env.SESS_SECRET,
    resave:false,
    saveUninitialized:true,
    store: store,
    cookie:{
        secure:'auto',


    }
}))

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))

app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(KaryawanRoute);
app.use(UserRoute);
app.use(JabatanRoute);
app.use(PelangganRoute);
app.use(ProdukRoute)
app.use(PaketRoute)
// app.use(ProductRoute);
app.use(AuthRoute);

store.sync();


app.listen(process.env.APP_PORT,()=>{
    console.log(`Server up running`);
})