import express from "express"
import cors from "cors"
import pool from "../db.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

const PORT = 3000

//LOGIN ROTAS

app.post('/registro', async (req, res) => {
    const {nome, email, senha} = req.body
    try{
        if(!nome || !email || !senha){
            return res.status(400).json({
                erro: "Todos os campos são obrigatórios!"
            })
        }
        
        const salt = await bcrypt.genSalt(10)
        const senhaHash = await bcrypt.hash(senha, salt)
        const novoUsuario = await pool.query("INSERT INTO usuario (nome, email, senha) VALUE ($1, $2, $3) RETURNING id, nome, login", [nome, login, senhaHash])

        res.json(novoUsuario.rows[0])
        }catch(erro){
            res.json({message: "erro"})
        }
    }
)



app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})