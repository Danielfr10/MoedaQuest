// frontend/src/services/api.js

const API_URL = 'http://localhost:8080/api/usuarios';

// Função separada para Cadastrar
api.js
export async function cadastrarUsuario(dados) {
  try {
    const resposta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    if (resposta.ok) {
      return await resposta.json();
    }
    throw new Error('Erro ao cadastrar no banco.');
  } catch (erro) {
    console.error('Erro no serviço de cadastro:', erro);
    throw erro;
  }
}

// Função separada para Login (Valida se existe no banco)
export async function fazerLogin(credenciais) {
  try {
    const resposta = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credenciais),
    });

    if (resposta.ok) {
      return await resposta.json(); // Retorna os dados se o usuário existir no banco
    }
    
    // Se o banco não encontrar ou a senha estiver incorreta
    return null; 
  } catch (erro) {
    console.error('Erro no serviço de login:', erro);
    return null;
  }
}