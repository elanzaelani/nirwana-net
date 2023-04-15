import Karyawan from '../models/KaryawanModel.js';
import User from '../models/UserModel.js';
import {Op} from 'sequelize';
import Jabatan from '../models/JabatanModel.js';
import path from 'path';
import fs from "fs";

export const createKaryawan=async(req,res)=>{
    if(req.files === null) return res.status(400).json({msg:"Tidak ada file yang di Upload"});
    // const nama= req.body.nama;
    const file = req.files.foto;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName =file.md5 + ext;
    const url= `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType =['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase()))return response.status(422).json({mag:"Invalid images"});
    if(fileSize > 5000000)return res.status(422).json({msg:"Gambar harus kurang dari 5Mb"});

    file.mv(`./public/images/${fileName}`,async(err)=>{
        if(err) return res.status(500).json({msg:err.message});
        const {nik,nama,j_kelamin,tgl_lahir,alamat,no_kontak ,status,jabId}=req.body;
        try {
            await Karyawan.create({
                nik:nik,
                nama:nama,
                j_kelamin:j_kelamin,
                tgl_lahir:tgl_lahir,
                alamat:alamat,
                no_kontak:no_kontak,
                foto:fileName,
                url:url,
                status:status,
                jabId:jabId,
                userId:req.userId
    
            });
            res.status(201).json({msg:"Data Karyawan Berhasil ditambahkan"});
        } catch (error) {
            res.status(500).json({msg:error.message});
            
        }
    })


    
}

export const getAllKaryawan= async(req,res)=>{
    try {
        let response;
        if(req.role === "admin"){
            response =await Karyawan.findAll({
                attributes:['uuid','nik','nama','tgl_lahir','j_kelamin','alamat','no_kontak','foto','status'],
                include:[{
                    model:Jabatan,
                    attributes:['nama_jab']
                },
                {
                    model:User,
                    attributes:['name','email']
                }]
            });

        }else{
            response = await Karyawan.findAll({
                attributes:['uuid','nik','nama','tgl_lahir','j_kelamin','alamat','no_kontak','foto','status'],
                where:{
                    userId:req.userId
                },
                include:[{
                    model:User,
                    attributes:['name','email']
                }]
            }) ;
        }
        res.status(200).json(response)
        
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }
}

export const getKaryawanById= async(req,res)=>{
    try {
        const karyawan = await Karyawan.findOne({
            where: {
                uuid : req.params.id
            }
        });
        if(!karyawan)return res.status(404).json({msg:"Data Karyawan tidak ditemukan.."})
        let response;
        if(req.role === "admin"){
            response = await Karyawan.findOne({
                attributes:['uuid','nik','nama','tgl_lahir','j_kelamin','alamat','no_kontak','foto','status'],
                where:{
                    id:karyawan.id
                },
                include:[{
                    model:User,
                    attributes:['name','email']
                }]
            }) ;
        }else{
            response = await Karyawan.findOne({
                attributes:['uuid','nik','nama','tgl_lahir','j_kelamin','alamat','no_kontak','foto','status'],
                where:{
                    [Op.and]:[{id:karyawan.id},
                        {userId:req.userId}]
                    
                },
                include:[{
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
export const updateKaryawan=async(req,res)=>{
    try {
        const karyawan= await Karyawan.findOne({
            where:{
                uuid:req.params.id
            }
        });
        
        if(!karyawan)return res.status(404).json({msg:"data tidak ditemukan"});
        let fileName="";
        if(req.files === null){
            fileName=Karyawan.foto;
        }else{
            const file = req.files.foto;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            fileName = file.md5 + ext;
            const allowedType = ['.png','.jpg','.jpeg'];

            if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
            if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});
           
            const filepath=`./public/images/${karyawan.foto}`;
            fs.unlinkSync(filepath);
            
            file.mv(`./public/images/${fileName}`, (err)=>{
                if(err) return res.status(500).json({msg: err.message});
            });
        }
        const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
        const {nik,nama,j_kelamin,tgl_lahir,alamat,no_kontak,foto,status,jabId}=req.body;
        if(req.role === "admin"){
            await Karyawan.update({ 
                nik:nik,
                nama:nama,
                j_kelamin:j_kelamin,
                tgl_lahir:tgl_lahir,
                alamat:alamat,
                no_kontak:no_kontak,
                foto:fileName,
                url:url,
                status:status,
                jabId:jabId,
    },{
                where: {
                    id:karyawan.id
                }
            })
        }else{
            if(req.userId !== karyawan.userId)return res.status(403).json({msg:"Akses terlarang"})
            await Karyawan.update({nik,nama,j_kelamin,tgl_lahir,alamat,no_kontak,foto,url,status,jabId},{
                    where:{
                        [Op.and]:[{id:karyawan.id},
                            {userId:req.userId}] 
                    }
            });
        }
        res.status(200).json({msg:"Karyawan berhasil di update yeaahh..."})
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }

}

export const deleteKaryawan=async(req,res)=>{
    try {
        const karyawan= await Karyawan.findOne({
            where:{
                uuid:req.params.id
            }
        });
        if(!karyawan)return res.status(404).json({msg:"data tidak ditemukan"});

        
        if(req.role === "admin"){
            const filepath=`./public/images/${karyawan.foto}`;
            fs.unlinkSync(filepath);
            await Karyawan.destroy({
                where: {
                    id:karyawan.id
                }
            })
        }else{
            if(req.userId !== karyawan.userId)return res.status(403).json({msg:"Akses terlarang"})
            await Karyawan.destroy({
                    where:{
                        [Op.and]:[{id:karyawan.id},
                            {userId:req.userId}] 
                    }
            });
        }
        res.status(200).json({msg:"Data Karyawan telah berhasil dihapus"})
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }

}

