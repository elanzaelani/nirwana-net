import Pelanggan from '../models/PelangganModel.js';
import User from '../models/UserModel.js';
import {Op} from 'sequelize';
import Paket from '../models/PaketModel.js';


export const totalCount=async(req,res)=>{
    // const page=parseInt(req.query.page)||0;
    // const limit=parseInt(req.query.limit)||10;
    // const search=req.query.search_query||"";
    // const offset=limit*page;
    const totalRows =await Pelanggan.count();
    const result =await Pelanggan.findAll()
    res.json({
        totalRows:totalRows
    })
}

export const createPelanggan=async(req,res)=>{
    const {nik,nama,tgl_lahir,j_kelamin,alamat,no_kontak,email,pekerjaan,tipe_koneksi,ip_address,tgl_koneksi,status_koneksi,paketId}=req.body;
    try {
        await Pelanggan.create({
            nik:nik,
            nama:nama,
            tgl_lahir:tgl_lahir,
            j_kelamin:j_kelamin,
            alamat:alamat,
            no_kontak:no_kontak,
            email:email,
            pekerjaan:pekerjaan,
            tipe_koneksi:tipe_koneksi,
            ip_address:ip_address,
            tgl_koneksi:tgl_koneksi,
            status_koneksi:status_koneksi,
            paketId:paketId,
            userId:req.userId

        });
        res.status(201).json({msg:"Data Pelanggan Berhasil ditambahkan"});
    } catch (error) {
        res.status(500).json({msg:error.message});
        
    }
}

export const getPelanggans= async(req,res)=>{
    try {
        let response;
        if(req.role === "admin"){
            response =await Pelanggan.findAll({
                attributes:['uuid','nik','nama','tgl_lahir','j_kelamin','alamat','no_kontak','email','pekerjaan','tipe_koneksi','ip_address','tgl_koneksi','status_koneksi'],
                include:[{
                    model:Paket,
                    attributes:['nama_paket']
                },
                {
                    model:User,
                    attributes:['name','email']
                }]
            });

        }else{
            response = await Pelanggan.findAll({
                attributes:['uuid','nik','nama','tgl_lahir','j_kelamin','alamat','no_kontak','email','pekerjaan','tipe_koneksi','ip_address','tgl_koneksi','status_koneksi'],
                where:{
                    userId:req.userId
                },
                include:[{
                    model:Paket,
                    attributes:['nama_paket']
                },
                {
                    model:User,
                    attributes:['name','email']
                    }
                
            ]
            }) ;
        }
        res.status(200).json(response)
        
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }
}

export const getPelangganByIid= async(req,res)=>{
    try {
        const pelanggan = await Pelanggan.findOne({
            where: {
                uuid : req.params.id
            }
        });
        if(!pelanggan)return res.status(404).json({msg:"Data Pelangan tidak ditemukan.."})
        let response;
        if(req.role === "admin"){
            response = await Pelanggan.findOne({
                attributes:['uuid','nik','nama','tgl_lahir','j_kelamin','alamat','no_kontak','email','pekerjaan','tipe_koneksi','ip_address','tgl_koneksi','status_koneksi'],
                where:{
                    id:pelanggan.id
                },
                include:[{
                    model:Paket,
                    attributes:['nama_paket']
                },
                {
                    model:User,
                    attributes:['name','email']
                }]
            }) ;
        }else{
            response = await Pelanggan.findOne({
                attributes:['uuid','nik','nama','tgl_lahir','j_kelamin','alamat','no_kontak','email','pekerjaan','tipe_koneksi','ip_address','tgl_koneksi','status_koneksi'],
                where:{
                    [Op.and]:[{id:pelanggan.id},
                        {userId:req.userId}]
                    
                },
                include:[{
                    model:Paket,
                    attributes:['nama_paket']
                },
                {
                    model:User,
                    attributes:['name','email']
                }]
            }) ;
        }
        res.status(200).json(response)
    } catch (e) {
        res.status(500).json({msg:e.message})
    } 
}
export const updatePelanggan=async(req,res)=>{
    try {
        const pelanggan= await Pelanggan.findOne({
            where:{
                uuid:req.params.id
            }
        });
        if(!pelanggan)return res.status(404).json({msg:"data tidak ditemukan"});
        const  {nik,nama,tgl_lahir,j_kelamin,alamat,no_kontak,email,pekerjaan,tipe_koneksi,ip_address,tgl_koneksi,status_koneksi,paketId}=req.body;
        if(req.role === "admin"){
            await Pelanggan.update( {nik,nama,tgl_lahir,j_kelamin,alamat,no_kontak,email,pekerjaan,tipe_koneksi,ip_address,tgl_koneksi,status_koneksi,paketId},{
                where: {
                    id:pelanggan.id
                }
            })
        }else{
            if(req.userId !== pelanggan.userId)return res.status(403).json({msg:"Akses terlarang"})
            await Pelanggan.update( {nik,nama,tgl_lahir,j_kelamin,alamat,no_kontak,email,pekerjaan,tipe_koneksi,ip_address,tgl_koneksi,status_koneksi,paketId},{
                    where:{
                        [Op.and]:[{id:pelanggan.id},
                            {userId:req.userId}] 
                    }
            });
        }
        res.status(200).json({msg:" Mantap data Pelanggan berhasil di update "})
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }

}

export const deletePelanggan=async(req,res)=>{
    try {
        const pelanggan= await Pelanggan.findOne({
            where:{
                uuid:req.params.id
            }
        });
        if(!pelanggan)return res.status(404).json({msg:"data pelanggan tidak ditemukan"});
        if(req.role === "admin"){
            await Pelanggan.destroy({
                where: {
                    id:pelanggan.id
                }
            })
        }else{
            if(req.userId !== pelanggan.userId)return res.status(403).json({msg:"Akses terlarang"})
            await Pelanggan.destroy({
                    where:{
                        [Op.and]:[{id:pelanggan.id},
                            {userId:req.userId}] 
                    }
            });
        }
        res.status(200).json({msg:"Data Pelanggan telah berhasil dihapus"})
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }

}



