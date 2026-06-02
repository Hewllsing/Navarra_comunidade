const express = require('express');
const cors = require('cors');
require('dotenv').config();

const candidaturaRoutes = require('./routes/candidaturaRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/candidaturas', candidaturaRoutes);
app.get('/', (req, res) => {
    res.json({
        message: 'API Navarra Comunidade está a funcionar'
    });
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
});