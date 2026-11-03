<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Serviços | Barbearia</title>
  <!-- TODO: crie css/styles.css e adicione o link da folha de estilos aqui. -->
</head>
<body>
  <header>
    <h1>Barbearia</h1>
    <nav aria-label="Navegação principal">
      <a href="/cliente.html">Clientes</a>
      <a href="/barbeiros.html">Barbeiros</a>
      <a href="/servicos.html">Serviços</a>
      <a href="/agendamentos.html">Agendamentos</a>
    </nav>
    <!-- TODO: implemente logout no back-end antes de adicionar o botão Sair. -->
  </header>
  <main>
    <h2>Serviços</h2>
    <section aria-labelledby="titulo-formulario">
      <h3 id="titulo-formulario">Novo cadastro</h3>
      <!-- EXERCÍCIO: conecte submit com preventDefault() e POST /servico; depois habilite Salvar. -->
      <form id="form-servico" method="post" action="/servico">
        <label for="nome">Nome</label>
        <input id="nome" name="nome" type="text" maxlength="100" required>
        <!-- O banco atual usa inteiro para preco. Defina a unidade antes de aceitar centavos. -->
        <label for="preco">Preço (reais inteiros no modelo atual)</label>
        <input id="preco" name="preco" type="number" min="0" step="1" required>
        <button type="submit" disabled>Salvar</button>
      </form>
    </section>
    <p id="mensagem" role="status" aria-live="polite"></p>
    <section aria-labelledby="titulo-lista">
      <h3 id="titulo-lista">Cadastros</h3>
      <!-- EXERCÍCIO: faça GET /servico e crie as linhas com createElement e textContent. -->
      <table>
        <caption>Lista de serviços</caption>
        <thead>
          <tr><th scope="col">Nome</th><th scope="col">Preço</th><th scope="col">Ações</th></tr>
        </thead>
        <tbody id="lista-servico">
          <tr><td colspan="3">Listagem ainda não conectada à API.</td></tr>
        </tbody>
      </table>
      <!-- TODO: implemente edição e exclusão após listar e cadastrar.
           O back-end ainda não possui PUT e DELETE de serviços. -->
    </section>
  </main>
  <script type="module" src="/js/servico.js"></script>
</body>
</html>


<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login | Barbearia</title>
  <!-- TODO: crie css/styles.css e adicione o link da folha de estilos aqui. -->
</head>
<body>
  <main>
    <h1>Entrar na barbearia</h1>
    <!-- EXERCÍCIO: em login.js, escute submit, use preventDefault() e envie JSON para POST /login.
         Habilite o botão depois de conectar o evento. Não leia o cookie httpOnly pelo JS. -->
    <form id="form-login" method="post" action="/login">
      <label for="email">E-mail</label>
      <input id="email" name="email" type="email" autocomplete="username" required>
      <label for="senha">Senha</label>
      <input id="senha" name="senha" type="password" autocomplete="current-password" required>
      <button type="submit" disabled>Entrar</button>
    </form>
    <p id="mensagem" role="status" aria-live="polite"></p>
    <p><a href="/cadastro.html">Criar uma conta</a></p>
  </main>
  <script type="module" src="/js/login.js"></script>
</body>
</html>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Clientes | Barbearia</title>
  <!-- TODO: crie css/styles.css e adicione o link da folha de estilos aqui. -->
</head>
<body>
  <header>
    <h1>Barbearia</h1>
    <nav aria-label="Navegação principal">
      <a href="/cliente.html">Clientes</a>
      <a href="/barbeiros.html">Barbeiros</a>
      <a href="/servicos.html">Serviços</a>
      <a href="/agendamentos.html">Agendamentos</a>
    </nav>
    <!-- TODO: implemente logout no back-end antes de adicionar o botão Sair. -->
  </header>
  <main>
    <h2>Clientes</h2>
    <section aria-labelledby="titulo-formulario">
      <h3 id="titulo-formulario">Novo cadastro</h3>
      <!-- EXERCÍCIO: conecte submit com preventDefault() e POST /cliente; depois habilite Salvar. -->
      <form id="form-cliente" method="post" action="/cliente">
        <label for="nome">Nome</label>
        <input id="nome" name="nome" type="text" maxlength="100" required>
        <!-- Bcrypt no back-end impede recuperar CPF e telefone: ajuste antes da edição. -->
        <label for="cpf">CPF</label>
        <input id="cpf" name="cpf" type="text" inputmode="numeric" required>
        <label for="telefone">Telefone</label>
        <input id="telefone" name="telefone" type="tel" required>
        <button type="submit" disabled>Salvar</button>
      </form>
    </section>
    <p id="mensagem" role="status" aria-live="polite"></p>
    <section aria-labelledby="titulo-lista">
      <h3 id="titulo-lista">Cadastros</h3>
      <!-- EXERCÍCIO: faça GET /cliente e crie as linhas com createElement e textContent. -->
      <table>
        <caption>Lista de clientes</caption>
        <thead>
          <tr><th scope="col">Nome</th><th scope="col">CPF</th><th scope="col">Telefone</th><th scope="col">Ações</th></tr>
        </thead>
        <tbody id="lista-cliente">
          <tr><td colspan="4">Listagem ainda não conectada à API.</td></tr>
        </tbody>
      </table>
      <!-- TODO: implemente edição e exclusão após listar e cadastrar.
           Guarde o id de cada registro para chamar PUT e DELETE /cliente/:id. -->
    </section>
  </main>
  <script type="module" src="/js/cliente.js"></script>
</body>
</html>


<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cadastro | Barbearia</title>
  <!-- TODO: crie css/styles.css e adicione o link da folha de estilos aqui. -->
</head>
<body>
  <main>
    <h1>Criar conta</h1>
    <!-- EXERCÍCIO: crie js/cadastro.js, conecte-o no fim deste HTML e envie JSON para POST /registro.
         Use preventDefault() no submit antes de habilitar o botão. -->
    <form id="form-cadastro" method="post" action="/registro">
      <label for="nome">Nome</label>
      <input id="nome" name="nome" type="text" autocomplete="name" maxlength="100" required>
      <label for="email">E-mail</label>
      <input id="email" name="email" type="email" autocomplete="username" maxlength="100" required>
      <label for="senha">Senha</label>
      <input id="senha" name="senha" type="password" autocomplete="new-password" required>
      <button type="submit" disabled>Cadastrar</button>
    </form>
    <p id="mensagem" role="status" aria-live="polite"></p>
    <a href="/">Voltar ao login</a>
  </main>
  <!-- TODO: adicione aqui o script type="module" de cadastro.js quando criar o arquivo. -->
</body>
</html>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Barbeiros | Barbearia</title>
  <!-- TODO: crie css/styles.css e adicione o link da folha de estilos aqui. -->
</head>
<body>
  <header>
    <h1>Barbearia</h1>
    <nav aria-label="Navegação principal">
      <a href="/cliente.html">Clientes</a>
      <a href="/barbeiros.html">Barbeiros</a>
      <a href="/servicos.html">Serviços</a>
      <a href="/agendamentos.html">Agendamentos</a>
    </nav>
    <!-- TODO: implemente logout no back-end antes de adicionar o botão Sair. -->
  </header>
  <main>
    <h2>Barbeiros</h2>
    <section aria-labelledby="titulo-formulario">
      <h3 id="titulo-formulario">Novo cadastro</h3>
      <!-- EXERCÍCIO: conecte submit com preventDefault() e POST /barbeiro; depois habilite Salvar. -->
      <form id="form-barbeiro" method="post" action="/barbeiro">
        <label for="nome">Nome</label>
        <input id="nome" name="nome" type="text" maxlength="100" required>
        <!-- Bcrypt no back-end impede recuperar CPF e telefone: ajuste antes da edição. -->
        <label for="cpf">CPF</label>
        <input id="cpf" name="cpf" type="text" inputmode="numeric" required>
        <label for="telefone">Telefone</label>
        <input id="telefone" name="telefone" type="tel" required>
        <button type="submit" disabled>Salvar</button>
      </form>
    </section>
    <p id="mensagem" role="status" aria-live="polite"></p>
    <section aria-labelledby="titulo-lista">
      <h3 id="titulo-lista">Cadastros</h3>
      <!-- EXERCÍCIO: faça GET /barbeiro e crie as linhas com createElement e textContent. -->
      <table>
        <caption>Lista de barbeiros</caption>
        <thead>
          <tr><th scope="col">Nome</th><th scope="col">CPF</th><th scope="col">Telefone</th><th scope="col">Ações</th></tr>
        </thead>
        <tbody id="lista-barbeiro">
          <tr><td colspan="4">Listagem ainda não conectada à API.</td></tr>
        </tbody>
      </table>
      <!-- TODO: implemente edição e exclusão após listar e cadastrar.
           Guarde o id de cada registro para chamar PUT e DELETE /barbeiro/:id. -->
    </section>
  </main>
  <script type="module" src="/js/barbeiro.js"></script>
</body>
</html>


<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Agendamentos | Barbearia</title>
  <!-- TODO: crie css/styles.css e adicione o link da folha de estilos aqui. -->
</head>
<body>
  <header>
    <h1>Barbearia</h1>
    <nav aria-label="Navegação principal">
      <a href="/cliente.html">Clientes</a>
      <a href="/barbeiros.html">Barbeiros</a>
      <a href="/servicos.html">Serviços</a>
      <a href="/agendamentos.html">Agendamentos</a>
    </nav>
    <!-- TODO: implemente logout no back-end antes de adicionar o botão Sair. -->
  </header>
  <main>
    <h2>Agendamentos</h2>
    <!-- EXERCÍCIO: carregue as opções com GET /cliente, /barbeiro e /servico.
         Use o id como value e o nome como texto de cada option. -->
    <form id="form-agendamento" method="post" action="/agendamento">
      <label for="data_agendamento">Data</label>
      <input id="data_agendamento" name="data_agendamento" type="date" required>
      <!-- O banco só armazena data. Adicione horário apenas depois de atualizar a API e o banco. -->
      <label for="id_cliente">Cliente</label>
      <select id="id_cliente" name="id_cliente" required>
        <option value="">Selecione um cliente</option>
      </select>
      <label for="id_barbeiro">Barbeiro</label>
      <select id="id_barbeiro" name="id_barbeiro" required>
        <option value="">Selecione um barbeiro</option>
      </select>
      <label for="id_servico">Serviço</label>
      <select id="id_servico" name="id_servico" required>
        <option value="">Selecione um serviço</option>
      </select>
      <!-- TODO: conecte submit com preventDefault(), envie JSON e então habilite o botão. -->
      <button type="submit" disabled>Agendar</button>
    </form>
    <p id="mensagem" role="status" aria-live="polite"></p>
    <table>
      <caption>Agenda da barbearia</caption>
      <thead>
        <tr><th scope="col">Data</th><th scope="col">Cliente</th><th scope="col">Barbeiro</th><th scope="col">Serviço</th><th scope="col">Preço</th><th scope="col">Ações</th></tr>
      </thead>
      <tbody id="lista-agendamento">
        <tr><td colspan="6">Agenda ainda não conectada à API.</td></tr>
      </tbody>
    </table>
    <!-- EXERCÍCIO: GET /agendamento já retorna cliente, barbeiro, servico e preco.
         Use esses campos na tabela; envie os campos id_* no cadastro. -->
  </main>
  <script type="module" src="/js/agendamento.js"></script>
</body>
</html>



