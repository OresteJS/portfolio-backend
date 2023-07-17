const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

// Eigene CORS-Konfiguration
const allowCrossOrigin = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
};

// CORS-Middleware anwenden
app.use(allowCrossOrigin);

// Endpunkt für Kontaktanfragen
app.post('/contact', (req, res) => {
    console.log(req.body);
    const { name, email, message, phone } = req.body;

    // Konfiguriere den Transporter für Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'oresteccc@gmail.com',
            pass: 'qrtbkmxflsdlvskb'
        }
    });

    // E-Mail-Einstellungen
    const mailOptions = {
        from: 'oresteccc@gmail.com', // Hier deine E-Mail-Adresse eintragen
        to: email, // Hier deine E-Mail-Adresse eintragen
        subject: 'Neue Kontaktanfrage',
        text: `
            Name: ${name}
            E-Mail: ${email}
            Telefonnummer: ${phone}
            Nachricht: ${message}
        `
    };

    // E-Mail senden
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Beim Versenden der E-Mail ist ein Fehler aufgetreten.');
        } else {
            console.log('Die E-Mail wurde erfolgreich versendet.');
            res.send('Die E-Mail wurde erfolgreich versendet.');
        }
    });
});

// Starte den Server
const port = 3000;
app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});