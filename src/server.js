import express from "express"
import cors from "cors"
import pool from "../db.js"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"

const app = express()

const JWT_SECRET = "uiiPapaiCuidaaaa"

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.static('public'))

const PORT = 3000

const SALT = await bcrypt.genSalt(10)

function autentificarToken(req, res, next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message: "Acesso negado."})
    }

    try{
        const usuarioJWT = jwt.verify(token, JWT_SECRET)
        req.usuarioJWT = usuarioJWT
        next()
    }catch(erro){
        return res.status(403).json({message: "Token inválido."})
    }
}

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

    const token = jwt.sign(
        //usando variavel que é o resultado
        {id: usuario.id, email: usuario.email},
        JWT_SECRET, 
        {expiresIn: "1h"}
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: false, //pra testar localmente
        sameSite: "lax",
        maxAge: 3600000
    })

    return res.status(200).json({
        message: "Login realizado com sucesso!",
        user: {
            "nome": usuario.nome
        }
    })
})

//ROTAS BARBEIROS
app.get('/barbeiro', async (req, res) => {
    try{
    const barbeiros = await pool.query('SELECT id, nome, cpf, telefone FROM barbeiro')
    res.json(barbeiros.rows)
    }catch(erro){
        res.json({message: "Erro ao consultar clientes."})
    }
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
        res.json({message: "Erro ao consultar clientes!"})
    }
})

app.post('/cliente', async (req, res) => {
    const {nome, cpf, telefone} = req.body
    try{
        const cpfHash = await bcrypt.hash(cpf, SALT)
        const telefoneHash = await bcrypt.hash(telefone, SALT)

        const novoCliente = await pool.query('INSERT INTO cliente (nome, cpf, telefone) VALUES ($1, $2, $3) RETURNING *', [nome, cpfHash, telefoneHash])
        res.json(novoCliente.rows[0])
    }catch(erro){
        res.json({message: "Erro ao postar cliente!"})
    }
})

app.put('/cliente/:id', async (req, res) => {
    const {id} = req.params
    const {nome, cpf, telefone} = req.body
    try{
        const cpfHash = await bcrypt.hash(cpf, SALT)
        const telefoneHash = await bcrypt.hash(telefone, SALT)

        const atualizarCliente = await pool.query('UPDATE cliente SET nome = $1, cpf = $2, telefone = $3 WHERE id = $4 RETURNING *', [nome, cpfHash, telefoneHash, id])
        res.json(atualizarCliente.rows[0])
    }catch(erro){
        res.json({message: "Erro ao atualizar cliente!"})
    }
})

app.delete('cliente/:id', async (req, res) => {
    const {id} = req.params
    try{
        const deletarCliente = await pool.query('DELETE FROM cliente WHERE id = $1 RETURNING *', [id])
        res.json(deletarCliente.rows[0])
    }catch(erro){
        res.json({message: "Erro ao deletar cliente!"})
    }
})

//ROTAS AGENDAMENTO
app.get('agendamento', async (req, res) => {
    try{
        const servicos = await pool.query(`
            SELECT
                agendamento.id,
                TO_CHAR(agendamento.data_agendamento, 'YYYY-MM-DD') AS data_agendamento,
                agendamento.id_servico,
                servico.nome AS servico,
                servico.preco,
                agendamento.id_cliente,
                cliente.nome AS cliente,
                agendamento.id_barbeiro,
                barbeiro.nome AS barbeiro
            FROM agendamento
            JOIN servico ON servico.id = agendamento.id_servico
            JOIN cliente ON cliente.id = agendamento.id_cliente
            JOIN barbeiro ON barbeiro.id = agendamento.id_barbeiro
            ORDER BY agendamento.data_agendamento
        `)
        res.json(servicos.rows)
    }catch(erro){
        res.status(500).json({message: "Erro ao consultar agendamentos!"})
    }
})

app.post('/agendamento', async (req, res) => {
    const {data_agendamento, id_servico, id_cliente, id_barbeiro} = req.body
    try{
        const novoAgendamento = await pool.query('INSERT INTO agendamento (data_agendamento, id_servico, id_cliente, id_barbeiro) VALUES ($1, $2, $3, $4) RETURNING *', [data_agendamento, id_servico, id_cliente, id_barbeiro])
        res.json(novoAgendamento.rows[0])
    }catch(erro){
        res.json({message: "Erro ao postar agendamento!"})
    }
})

app.put('/agendamento/:id', async (req, res) => {
    const {id} = req.params
    const {data_agendamento, id_servico, id_cliente, id_barbeiro} = req.body

    try{
        const atualizarAgendamento = await pool.query('UPDATE agendamento SET data_agendamento = $1, id_servico= $2, id_cliente = $3, id_barbeiro = $4 WHERE id = $5 RETURNING', [data_agendamento, id_servico, id_cliente, id_barbeiro, id])
        res.json(atualizarAgendamento.rows[0])
    }catch(erro){
        res.json({message: "Erro ao atualizar agendamento!"})
    }
})

app.delete('/agendamento/:id', async (req, res) => {
    const {id} = req.params
    try{
        const deletarAgendamento = await pool.query('DELETE FROM agendamento WHERE id = $1 RETURNING *', [id])
        res.json(deletarAgendamento.rows[0])
    }catch(erro){
        res.json({message: "Erro ao deletar agendamento!"})
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})