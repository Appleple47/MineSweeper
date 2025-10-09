import * as dotenv from "dotenv";
import express from 'express';
import { Pool} from "pg";
import cors from 'cors';
dotenv.config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
pool.connect()

const app = express();
const corsOptions = {
    origin: process.env.CORS_URL, 
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json()); 
app.post('/api/score', async (req, res) => {
    const { player_name, time_taken } = req.body; 
    if (typeof time_taken !== 'number' || !player_name) {
        return res.status(400).send('Invalid data');
    }
    try {
        await pool.query(
            `INSERT INTO users(player_name, time_taken) VALUES($1, $2);`,
            [player_name, time_taken]
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

