package com.moedaquest.backend;

import com.moedaquest.backend.model.Usuario;
import com.moedaquest.backend.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    // Código de teste para verificar a integração com o banco ao iniciar
    @Bean
    CommandLineRunner testarConexaoEEntidade(UsuarioRepository usuarioRepository) {
        return args -> {
            // 1. Cria um objeto Usuario
            Usuario novoUsuario = new Usuario("Criança Exemplo");

            // 2. Salva no banco de dados via JPA
            usuarioRepository.save(novoUsuario);

            System.out.println(">>> SUCESSO! Usuário salvo com o ID: " + novoUsuario.getId());

            // 3. Busca todos os registros para confirmar
            System.out.println(">>> Lista de usuários cadastrados no banco:");
            usuarioRepository.findAll().forEach(u -> 
                System.out.println("- ID: " + u.getId() + " | Nome: " + u.getNome())
            );
        };
    }
}