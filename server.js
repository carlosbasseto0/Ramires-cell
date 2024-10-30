const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dudubassetorocha@gmail.com',
        pass: 'your-email-password'
    }
});

app.post('/send-email', (req, res) => {
    const mailOptions = {
        from: 'dudubassetorocha@gmail.com',
        to: 'dudubassetorocha@gmail.com',
        subject: 'Nova Compra',
        text: `
            Nome Completo: ${req.body['full-name']}
            Número para Contato: ${req.body['contact-number']}
            Cidade: ${req.body.city}
            Rua: ${req.body.street}
            Número da Casa: ${req.body['house-number']}
            Forma de Pagamento: ${req.body['payment-method']}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Erro ao enviar e-mail', error });
        }
        res.status(200).json({ message: 'E-mail enviado com sucesso' });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
