import Produk from '../models/ProdukModel.js';
import User from '../models/UserModel.js';
import {Op} from 'sequelize';


export const totalCount=async(req,res)=>{
    // const page=parseInt(req.query.page)||0;
    // const limit=parseInt(req.query.limit)||10;
    // const search=req.query.search_query||"";
    // const offset=limit*page;
    const totalRows =await Produk.count();
    const result =await Produk.findAll()
    res.json({
        totalRows:totalRows
    })
}

export const getProduks=async(req,res)=>{
    try {
        let response;
        if(req.role === "admin"||"user"){
            response = await Produk.findAll({
                attributes:['id','uuid','nama_produk','satuan'],
                include:[{
                    model:User,
                    attributes:['name','email']
                }]
            }) ;
        }else{
            response = await Produk.findAll({
                attributes:['id','uuid','nama_produk','satuan'],
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
    } catch (e) {
        res.status(500).json({msg:e.message})
    } 
}

export const getProdukById= async(req,res)=>{
    try {
        const produk = await Produk.findOne({
            where: {
                uuid : req.params.id
            }
        });
        if(!produk)return res.status(404).json({msg:"Data Produk tidak ditemukan.."})
        let response;
        if(req.role === "admin"||"user"){
            response = await Produk.findOne({
                attributes:['uuid','nama_produk','satuan'],
                where:{
                    id:produk.id
                },
                include:[{
                    model:User,
                    attributes:['name','email']
                }]
            }) ;
        }else{
            response = await Produk.findOne({
                attributes:['uuid','nama_produk','satuan'],
                where:{
                    [Op.and]:[{id:produk.id},
                        {userId:req.userId}]
                    
                },
                include:[{
                    model:User,
                    attributes:['name','email']
                }]
            }) ;
        }
        res.status(200).json(response,)
    } catch (e) {
        res.status(500).json({msg:e.message})
    } 
}

export const updateProduk=async(req,res)=>{
    try {
        const produk= await Produk.findOne({
            where:{
                uuid:req.params.id
            }
        });
        if(!produk)return res.status(404).json({msg:"data tidak ditemukan"});
        const {nama_produk,satuan}=req.body;
        if(req.role === "admin"){
            await Produk.update({
                nama_produk:nama_produk,
            satuan:satuan},{
                where: {
                    id:produk.id
                }
            })
        }else{
            if(req.userId !== produk.userId)return res.status(403).json({msg:"Akses terlarang"})
            await Produk.update({nama_produk,satuan},{
                    where:{
                        [Op.and]:[{id:produk.id},
                            {userId:req.userId}] 
                    }
            });
        }
        res.status(200).json({msg:"Data Produk Berhasil DiUpdate"})
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }

}

export const createProduk=async(req,res)=>{
    const {nama_produk,satuan}=req.body;
    try {
        await Produk.create({
            nama_produk:nama_produk,
            satuan:satuan,
            userId:req.userId


        });
        res.status(201).json({msg:" Mantap .. Data Produk Berhasil ditambahkan"});
    } catch (error) {
        res.status(500).json({msg:error.message});
        
    }
}

export const deleteProduk=async(req,res)=>{
    try {
        const produk= await Produk.findOne({
            where:{
                uuid:req.params.id
            }
        });
        if(!produk)return res.status(404).json({msg:"data Produk tidak ditemukan"});
        if(req.role === "admin"){
            await Produk.destroy({
                where: {
                    id:produk.id
                }
            })
        }else{
            if(req.userId !== produk.userId)return res.status(403).json({msg:"Akses terlarang"})
            await Produk.destroy({
                    where:{
                        [Op.and]:[{id:produk.id},
                            {userId:req.userId}] 
                    }
            });
        }
        res.status(200).json({msg:"Data Produk Berhasil dihapus"})
    } catch (error) {
        res.status(500).json({msg:error.message})
        
    }

}
