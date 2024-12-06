import express from 'express'
const app = express();
import 'dotenv/config'

import nodemailer from 'nodemailer'


app.get('/', (req, res) => {
    res.send('Olá, mundo!');
});


//EMAIL


app.post("/sendEmail", async (req, res) => {
    try {

        // Configurar o transporte do e-mail
        const transporter = nodemailer.createTransport({
            service: 'gmail', // ou outro serviço, como 'hotmail'
            auth: {
                user: process.env.Email, // seu e-mail
                pass: process.env.EmailPassword, // sua senha ou senha de aplicativo
            },
            tls: {
                rejectUnauthorized: false, // Ignorar certificados autoassinados
            },
        });

        const mailOptions = {
          from: process.env.Email, // remetente
          to: 'DESTINATÁRIO', //destinatario
          subject: 'Teste com HTML 2', //Assunto
          html: '<h1>Olá!</h1><p>Este é um e-mail de teste com HTML.</p>', //HTML
        };
    
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado: ', info.response);
        res.status(400).json({msg: "Sucesso ao enviar email"})
      } catch (error) {
        console.error('Erro ao enviar e-mail: ', error);
        res.status(400).json({msg: "Erro ao enviar email"})
      }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
