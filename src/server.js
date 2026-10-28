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

const SALT = await bcrypt.genSalt(10)

//LOGIN ROTAS

app.post('/registro', async (req, res) => {
    const {nome, email, senha} = req.body
    try{
        if(!nome || !email || !senha){
            return res.status(400).json({
                erro: "Todos os campos são obrigatórios!"
            })
        }
        
        const senhaHash = await bcrypt.hash(senha, SALT)
        const novoUsuario = await pool.query("INSERT INTO usuario (nome, email, senha) VALUE ($1, $2, $3) RETURNING id, nome, login", [nome, login, senhaHash])

        res.json(novoUsuario.rows[0])
        }catch(erro){
            res.json({message: "erro"})
        }
    }
)

app.post('login', async (req, res) => {
    const {email, senha} = req.body
    const resultado = await pool.query("SELECT * FROM usuario WHERE email = $1", [email])

    if(resultado.rows.length === 0){
        return res.status(401).json({
            erro: "Email e senha inválidos!"
        })
    }

    const usuario = resultado.rows[0]

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

    if(!senhaCorreta){
        return res.status(401).json({
            erro: "Email e senha inválidos!"
        })
    }

    return res.status(200).json({
        message: "Login realizado com sucesso!",
        user: {
            "nome": usuario.nome
        }
    })
})

//ROTAS BARBEIROS

app.get('/barbeiro', async (req, res) => {
    const barbeiros = await pool.query('SELECT id, nome, cpf, telefone FROM barbeiro')
    res.json(barbeiros.rows)
})

app.post('/barbeiro', async (req, res) => {
    const {nome, cpf, telefone} = req.body
    try{
        const cpfHash = await bcrypt.hash(cpf, SALT)
        const telefoneHash = await bcrypt.hash(telefone, SALT)

        const novoBarbeiro = await pool.query('INSERT INTO barbeiro (nome, cpf, telefone) VALUES ($1, $2, $3) RETURNING *', [nome, cpfHash, telefoneHash])

        res.json(novoBarbeiro.rows[0])
    }catch(erro){
            res.json({message: "Erro ao cadastrar barbeiro!"})
        }
})

app.put('/barbeiro/:id',async (req, res) => {
    const {id} = req.params
    const {nome, cpf, telefone} = req.body
    
    try{
    const cpfHash = await bcrypt.hash(cpf, SALT)
    const telefoneHash = await bcrypt.hash(telefone, SALT)

    const atualizarBarbeiro = await pool.query('UPDATE barbeiro SET nome = $1, cpf = $2, telefone = $3 WHERE id = $4 RETURNING *', [nome, cpfHash, telefoneHash, id])

    res.json(atualizarBarbeiro.rows[0])
    }catch(erro){
            res.json({message: "Erro ao atualizar o barbeiro!"})
        }
})

app.delete('/barbeiro/:id', async (req, res) => {
    const {id} = req.params

    try{
    const deletarBarbeiro = await pool.query('DELETE FROM barbeiro WHERE id = $1 RETURNING *', [id])
    res.json(deletarBarbeiro.rows[0])
    }catch(erro){
            res.json({message: "Erro ao deletar barbeiro!"})
        }
})

//ROTA CLIENTES
app.get('/cliente', async (req, res) => {
    try{
    const clientes = await pool.query('SELECT id, nome, cpf, telefone FROM cliente')
    res.json(clientes.rows)
    }catch(erro){
        res.json({message: "Erro ao consultar clientes."})
    }
})


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})