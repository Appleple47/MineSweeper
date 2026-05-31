import { Pool } from "pg";

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
    ssl: { rejectUnauthorized: false }
});

async function initializeTable(): Promise<void> {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS scores (
            id SERIAL PRIMARY KEY,
            player_name VARCHAR(100) NOT NULL,
            time_taken INTEGER NOT NULL,
            blocks INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
}

const tableInitPromise = initializeTable().catch(error => {
    console.error('Table initialization error:', error);
    process.exit(1);
});

interface LambdaEvent {
    httpMethod: string;
    body: string | null;
}

interface LambdaResponse {
    statusCode: number;
    headers: Record<string, string>;
    body: string;
}

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Content-Type': 'application/json'
};

export const handler = async (event: LambdaEvent): Promise<LambdaResponse> => {
    await tableInitPromise;

    const method = event.httpMethod?.toUpperCase() ?? null;

    if (method === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (method === 'GET') {
        try {
            const result = await pool.query(
                `SELECT player_name, time_taken, blocks, created_at FROM scores ORDER BY time_taken ASC LIMIT 10;`
            );
            return { statusCode: 200, headers, body: JSON.stringify(result.rows) };
        } catch (error) {
            console.error('DB Select Error:', error);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ message: 'Failed to retrieve scores (DB Error)' })
            };
        }
    }

    if (method === 'POST') {
        try {
            const body = JSON.parse(event.body ?? '');
            const { player_name, time_taken, blocks } = body;

            if (typeof time_taken !== 'number' || !player_name) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ message: 'Invalid data' })
                };
            }

            await pool.query(
                `INSERT INTO scores(player_name, time_taken, blocks) VALUES($1, $2, $3);`,
                [player_name, time_taken, blocks]
            );

            return {
                statusCode: 201,
                headers,
                body: JSON.stringify({ message: 'Score saved successfully' })
            };
        } catch (error) {
            console.error('DB Insert Error:', error);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ message: 'Database error' })
            };
        }
    }

    return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ message: 'Not Found' })
    };
};
