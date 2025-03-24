const nodemailer = require("nodemailer");         

const transporter = nodemailer.createTransport({
    host: "mail.compactainforma.com.br", // Substitua pelo servidor SMTP do seu provedor
    port: 587, // Porta comum para SMTP com STARTTLS
    secure: false, // Use 'false' para STARTTLS e 'true' para SSL/TLS
    auth: {
        user: "noreply@compactainforma.com.br", // Seu e-mail
        pass: "1p23FIGnfvw", // A senha do seu e-mail
    },
});

const sendEmail = async (to, subject, body) => {
    const mailOptions = {
        from: '"Compacta Schedule" <noreply@compactainforma.com.br>', // Remetente
        to, // Destinatário
        subject, // Assunto
        text: body, // Corpo do e-mail
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("E-mail enviado com sucesso:", info.response);
    } catch (err) {
        console.error("Erro ao enviar e-mail:", err);
    }
};

module.exports = sendEmail;
// Test
//sendEmail("destinatario@exemplo.com", "Assunto de Teste", "Corpo do e-mail");
