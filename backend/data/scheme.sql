CREATE DATABASE IF NOT EXISTS navarra_comunidade
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE navarra_comunidade;

CREATE TABLE candidaturas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero_candidatura VARCHAR(50) UNIQUE NOT NULL,
    nome_organizacao VARCHAR(255) NOT NULL,
    tipo_entidade VARCHAR(100) NOT NULL,
    area_atuacao VARCHAR(100) NOT NULL,
    nome_contacto VARCHAR(150) NOT NULL,
    email_contacto VARCHAR(150) NOT NULL,
    telefone_contacto VARCHAR(50),
    nome_projeto VARCHAR(255) NOT NULL,
    descricao_projeto TEXT NOT NULL,
    tipo_apoio VARCHAR(100) NOT NULL,
    numero_beneficiarios INT,
    estado ENUM(
        'Recebido',
        'Em análise',
        'Informação pendente',
        'Aprovado',
        'Não aprovado',
        'Elegível mas não apoiado'
    ) DEFAULT 'Recebido',
    consentimento_rgpd BOOLEAN NOT NULL DEFAULT 0,
    data_submissao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);