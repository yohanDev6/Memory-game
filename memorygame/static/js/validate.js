document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
    const errorMessagesDiv = document.getElementById("errorMessages");

    form.addEventListener("submit", (event) => {
        errorMessagesDiv.textContent = "";

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        let errors = [];

        // Validação do nome de usuário
        if (username.length < 3) {
            errors.push("O nome de usuário deve ter pelo menos 3 caracteres.");
        }

        // Validação de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push("Insira um e-mail válido.");
        }

        // Validação de senha
        if (password.length < 6) {
            errors.push("A senha deve ter pelo menos 6 caracteres.");
        }

        // Validação de confirmação de senha
        if (password !== confirmPassword) {
            errors.push("As senhas não coincidem.");
        }

        // Exibe erros e impede envio
        if (errors.length > 0) {
            event.preventDefault(); // Impede o envio do formulário
            errorMessagesDiv.innerHTML = errors.join("<br>");
        }
    });
});
