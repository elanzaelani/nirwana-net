import {Sequelize} from 'sequelize'

const db= new Sequelize('nirwana_db','root','',{
    host:'localhost',
    dialect:'mysql'
});

export default db