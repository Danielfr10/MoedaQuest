# MoedaQuest
MoedaQuest é uma aplicação mobile que visa ser utilizado para o ensinamento de financeiro para crianças, utilizando um ambiente gameficado para tornar uma experiência agradável e divertida parar as crianças.

MoedaQuest - Backend (Spring Boot)

Este diretório contém a API REST e as regras de negócio da plataforma MoedaQuest (Educação Financeira Gamificada para Crianças), desenvolvida com Java e Spring Boot.

A aplicação gerencia a autenticação, persistência de usuários, missões e o progresso do cofrinho virtual integrando-se à base de dados PostgreSQL.

🛠️ Tecnologias Utilizadas

Linguagem: Java 17 ou 21

Framework: Spring Boot 3.x

Persistência & ORM: Spring Data JPA / Hibernate

Driver de Banco: PostgreSQL Driver

Gerenciador de Dependências: Apache Maven (via Maven Wrapper mvnw)

📋 Pré-requisitos

Antes de compilar e executar o backend, certifique-se de ter configurado na sua máquina:

JDK 17 ou JDK 21 instalado.

Variável de ambiente JAVA_HOME apontando para a pasta do JDK e PATH contendo o diretório bin.

Container do PostgreSQL ativo (instruções na pasta database/).

⚙️ Configuração da Conexão com o Banco de Dados

As credenciais de conexão com o PostgreSQL são gerenciadas através do arquivo backend/src/main/resources/application.properties:

# Configuração do PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/moedaquest
spring.datasource.username=postgres
spring.datasource.password=senha123

# Configuração do JPA / Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true


Nota: Certifique-se de que o container Docker do banco (moedaquest_db) esteja rodando na porta 5432 antes de iniciar a aplicação.

💻 Comandos Utilitários (Maven Wrapper)

Todos os comandos devem ser executados a partir do diretório backend/.

1. Limpar e Compilar o Projeto

# No Windows (PowerShell / CMD)
.\mvnw.cmd clean compile

# No Linux / macOS
./mvnw clean compile


2. Executar a Aplicação (Spring Boot)

# No Windows (PowerShell / CMD)
.\mvnw.cmd spring-boot:run

# No Linux / macOS
./mvnw spring-boot:run


Com verificação detalhada de erros (stack trace):

.\mvnw.cmd spring-boot:run -e


📂 Estrutura de Pacotes

A arquitetura do backend segue a divisão em camadas padrão do Spring Boot:

backend/src/main/java/com/moedaquest/backend/
├── controller/     # Endpoints da API REST (respostas para o React Native)
├── model/          # Entidades mapeadas com o JPA (ex: Usuario.java -> tb_usuario)
├── repository/     # Interfaces de comunicação com a base de dados (Spring Data JPA)
├── service/        # Regras de negócio e lógica de aplicação
└── BackendApplication.java # Classe principal de inicialização
