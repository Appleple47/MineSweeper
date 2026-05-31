import * as dotenv from "dotenv";
import express from 'express';
import { Pool } from "pg";
import cors from 'cors';
dotenv.config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.query(`
    CREATE TABLE IF NOT EXISTS scores (
        id SERIAL PRIMARY KEY,
        player_name VARCHAR(100) NOT NULL,
        time_taken INTEGER NOT NULL,
        blocks INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`).catch(error => {
    console.error('Table initialization error:', error);
    process.exit(1);
});

const app = express();
const corsOptions = {
    origin: process.env.CORS_URL,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/scores', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT player_name, time_taken, blocks, created_at FROM scores ORDER BY time_taken ASC LIMIT 10;`
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('DB Select Error:', error);
        res.status(500).send('Database error');
    }
});

app.post('/api/score', async (req, res) => {
    const { player_name, time_taken, blocks } = req.body;
    if (typeof time_taken !== 'number' || !player_name) {
        return res.status(400).send('Invalid data');
    }
    try {
        await pool.query(
            `INSERT INTO scores(player_name, time_taken, blocks) VALUES($1, $2, $3);`,
            [player_name, time_taken, blocks]
        );
        res.status(201).send({ message: 'Score saved successfully' });
    } catch (error) {
        console.error('DB Insert Error:', error);
        res.status(500).send('Database error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

