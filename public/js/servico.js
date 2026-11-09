import { iniciarCadastro } from './api.js';

iniciarCadastro({
    endereco: '/servico',
    tabela: 'lista-servico',
    campos: ['nome', 'preco'],
    colunas: ['nome', servico => Number(servico.preco).toLocaleString('pt-BR', {
        style: 'currency', currency: 'BRL'
    })]
});
