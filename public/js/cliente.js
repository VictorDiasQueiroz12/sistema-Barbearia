import { iniciarCadastro } from './api.js';

iniciarCadastro({
    endereco: '/cliente',
    tabela: 'lista-clientes',
    campos: ['nome', 'cpf', 'telefone'],
    colunas: ['nome', 'cpf', 'telefone']
});
