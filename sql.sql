CREATE TABLE if not exists usuario(
id serial primary key,
nome varchar(100) not null,
email varchar(100) not null unique, 
senha varchar(100) not null
);

CREATE TABLE if not exists barbeiro(
id serial primary key,
nome varchar(100) not null,
cpf varchar(100) not null unique,
telefone varchar(100) not null unique 
);

CREATE TABLE if not exists cliente(
id serial primary key,
nome varchar(100) not null,
cpf varchar(100) not null unique,
telefone varchar(100) not null unique
);

CREATE TABLE if not exists servico(
id serial primary key, 
nome varchar(100),
preco int
);

CREATE TABLE if not exists agendamento(
id serial primary key,
data_agendamento date not null,
id_serviço int not null,
id_cliente int not null,
id_barbeiro int not null,
foreign key (id_servico) references servico(id),
foreign key (id_cliente) references cliente(id),
foreign key (id_barbeiro) references barbeiro(id)
);
