import { chamandoServer, iniciarCadastro } from './api.js';

async function carregarOpcoes() {
    const listas = await Promise.all([
        chamandoServer('/cliente'),
        chamandoServer('/barbeiro'),
        chamandoServer('/servico')
    ]);
    ['id_cliente', 'id_barbeiro', 'id_servico'].forEach((campo, indice) => {
        const select = document.getElementById(campo);
        if (!Array.isArray(listas[indice])) throw new Error('Não foi possível carregar as opções.');
        // Mantém a opção inicial do HTML e remove opções de carregamentos anteriores.
        select.length = 1;
        for (const registro of listas[indice]) {
            select.add(new Option(registro.nome, registro.id));
        }
    });
}
iniciarCadastro({
    endereco: '/agendamento',
    tabela: 'lista-agendamento',
    campos: ['data_agendamento', 'id_cliente', 'id_barbeiro', 'id_servico'],
    colunas: [
        registro => registro.data_agendamento.split('-').reverse().join('/'),
        'cliente', 'barbeiro', 'servico'
    ],
    preparar: carregarOpcoes
});
