# 🌀 Jogo da Memória do Naruto

`Concluído v1.0`
Um jogo simples e divertido de 10 cartas, contendo 5 pares de olhos que representam alguns dos dojutsus do anime Naruto!  
**Desenvolvido com Django e Python**, este projeto é apenas para fins educativos e profissionais.  
⚠️ **Não use dados reais, pois o propósito é demonstrativo!**

---
## 🛠️ Requisitos
  - Python 3.11.x
  - Django
  - VSCode (opcional, mas de preferência)
  - Navegador Google Chrome (ou outro compatível)

---
## 🚀 Como executar o projeto

1. **Clone o repositório**:  
    ```bash
    git clone https://github.com/seu-usuario/jogo-da-memoria-naruto.git
    cd jogo-da-memoria-naruto
   
2. **Crie e ative o ambiente virtual**
    ```bash
    python -m venv venv
    source venv/bin/activate  # Para Linux/Mac
    venv\Scripts\activate     # Para Windows

3. **Instale as dependências**
    ```bash
    pip instal -r requirements.txt

4. **Configure o interpretador no editor de código se necessário**

5. **Não se esqueça de executar as migrações e refleti-las no banco de dados!**
    ```bash
    python manage.py migrate
    python manage.py makemigrations
     
6. **Execute o servidor local**
    ```bash
    python manage.py runserver

Agora acesse o jogo no seu navegador em localhost:8000

---
## 🎮 Funcionalidades
**Jogo de Memória:**
  Combine as 5 duplas de dojutsus no menor tempo possível.

**Página de Administração:**
  Crie e gerencie conteúdos personalizados.

Para acessar, crie um superusuário com o comando:
    ```bash
    python manage.py createsuperuser

---
## ⚠️ Aviso Importante
  - Este projeto é apenas para **fins de demonstração**.
  - ⚠️ **Não use dados reais** ao utilizar o sistema.

## 💡 Créditos
  - Este projeto foi desenvolvido por **Yohan Mendonça** e **Kauany Maria** sob orientação do professor do IFRN Campus Santa Cruz **Marcelo Junior**.
  - Confira outros projetos no meu perfil do GitHub!

🌟 Se gostou do projeto, deixe uma estrela no repositório!
