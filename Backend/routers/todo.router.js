const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const {v4:uuidv4} = require("uuid");

router.get("/getAll", async (req, res)=>{ //verileri alma
    try {
        const todos = await Todo.find({}).sort({date: -1}); //find ile bulabiliyoruz. sort ile ters sıralama yapabiliriz.
        res.json(todos);
    } catch (error) {
        res.status(400).json({message: error.message });
    }
});

router.post("/add", async (req, res)=>{ //ekleme
    try {
        const name = req.body.name;
        const team = req.body.team;
        const todo = new Todo();
        todo.name = name;
        todo.team = team;
        todo.date = new Date();
        todo._id = uuidv4();

        await todo.save();
        res.json({message: "Kayıt işlemi başarılı"});
    } catch (error) {
        res.status(400).json({message: error.message });
    }
});

router.post("/removeById", async(req, res)=>{
    try {
        const _id = req.body._id;
        await Todo.findByIdAndRemove(_id);
        res.json({message: "Silme işlemi başarılı"});
    } catch (error) {
        res.status(400).json({message: error.message });
    }
});


router.post("/updateById", async(req, res)=>{
    try {
        const _id = req.body._id;
        const todo = await Todo.findById(_id); //idden kaydı bulsun
        todo.isCompleted = !todo.isCompleted;  //false ise true çevir - tam tersine çevir manasına gelir
        await Todo.findByIdAndUpdate(_id,todo);

        res.json({message: "Güncelleme işlemi başarılı"});
    } catch (error) {
        res.status(400).json({message: error.message });
    }
});

module.exports = router;