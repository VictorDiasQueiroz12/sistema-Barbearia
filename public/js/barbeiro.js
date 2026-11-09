import { iniciarCadastro } from './api.js';

iniciarCadastro({
    endereco: '/barbeiro',
    tabela: 'lista-barbeiro',
    campos: ['nome', 'cpf', 'telefone'],
    colunas: ['nome', 'cpf', 'telefone']
});
