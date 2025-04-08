const express=require('express')
const app = express();
require('dotenv').config()

const cors = require("cors");

const bcrypt = require('bcryptjs');

const jwt = require("jsonwebtoken")
const SECRET = process.env.JWT_SECRET // essa variavel está no env

const events = require('./routes/events.js')

app.use(cors());
app.use(express.json());

app.use('/events', events);

const mysql = require("mysql2")
const db = require('./db/connection.js');

const userController = require('./controllers/userController.js');




app.get('/test', (req,res)=>{
    console.log('arrived')
})

app.post('/register', (req,res)=>{
    const {login, password} = req.body;

    db.query(`select id from TB_USERS where login=?`, [login], (e,r)=>{
        if (r){
            if (r.length>0){
                res.status(500).json({msg: 'this login is unavailable. Try with other login', type: 'error'});
            }else{
                bcrypt.hash(password, 10, function(err, hash) {
                    db.query(`insert into TB_USERS (login, password) values (?,?)`, [login, hash], (error, result)=>{
                        if (error) res.status(500).json({msg: 'Error in insert new user', type: 'error'});
                        if (result) res.status(200).json({msg: 'user inserted successfull', type: 'success'});
                    });
                });
                
            }
        }
        if (e) {
            res.status(500).json({msg: 'Error in find user with the same login', type: 'error'});
        }

    })

})

app.post('/login', async (req,res)=>{
    const { login, password } = req.body;
    try{
        const user = await userController.getUserByLogin(login);
        if (!user){
            res.status(404).json({msg: 'User not found', type:'error'});
        }
        const passwordMatch = await bcrypt.compare(password, user[0].password);

        if (!passwordMatch){
            res.status(401).json({msg: 'Invalid password', type:'error'});
        }

        const token = jwt.sign({ id: user[0].id }, SECRET, { expiresIn: '1d' });
        res.json({ msg: 'User authenticated', type: 'success', token });
    }catch(e){
        console.log(e)
        res.status(500).json({msg: 'Error in login', type:'error'});
    }

})




app.listen(process.env.PORT, ()=>{
    console.log(`Server runnig in ${process.env.PORT} port`)
})

module.exports = app;