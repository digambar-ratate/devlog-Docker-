const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:5000';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/logs`);
        const logs = response.data;

        let logsHtml = '';
        if (logs.length === 0) {
            logsHtml = `<div class="empty-state">No logs created yet. Add your first log above!</div>`;
        } else {
            logs.forEach(log => {
                logsHtml += `
                    <div class="log-card">
                        <div class="log-header">
                            <span class="log-title">${log.title}</span>
                            <span class="log-date">${log.created_at}</span>
                        </div>
                        <p class="log-content">${log.content}</p>
                    </div>
                `;
            });
        }

        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>DevLog Dashboard</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
                <style>
                    :root {
                        --bg-color: #0f172a;
                        --card-bg: #1e293b;
                        --border-color: #334155;
                        --text-main: #f8fafc;
                        --text-muted: #94a3b8;
                        --primary: #38bdf8;
                        --primary-hover: #0284c7;
                        --accent: #6366f1;
                    }

                    * {
                        box-sizing: border-box;
                        margin: 0;
                        padding: 0;
                    }

                    body {
                        font-family: 'Inter', system-ui, sans-serif;
                        background-color: var(--bg-color);
                        color: var(--text-main);
                        display: flex;
                        justify-content: center;
                        padding: 2rem 1rem;
                        min-height: 100vh;
                    }

                    .container {
                        width: 100%;
                        max-width: 720px;
                    }

                    .header {
                        margin-bottom: 2rem;
                        text-align: center;
                    }

                    .header h1 {
                        font-size: 2.25rem;
                        font-weight: 700;
                        background: linear-gradient(135deg, var(--primary), var(--accent));
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        margin-bottom: 0.5rem;
                    }

                    .header p {
                        color: var(--text-muted);
                        font-size: 0.95rem;
                    }

                    .form-card {
                        background-color: var(--card-bg);
                        border: 1px solid var(--border-color);
                        border-radius: 12px;
                        padding: 1.5rem;
                        margin-bottom: 2.5rem;
                        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
                    }

                    .form-group {
                        margin-bottom: 1.25rem;
                    }

                    label {
                        display: block;
                        font-size: 0.875rem;
                        font-weight: 500;
                        color: var(--text-muted);
                        margin-bottom: 0.5rem;
                    }

                    input[type="text"], textarea {
                        width: 100%;
                        background-color: #0f172a;
                        border: 1px solid var(--border-color);
                        border-radius: 8px;
                        padding: 0.75rem 1rem;
                        color: var(--text-main);
                        font-family: inherit;
                        font-size: 0.95rem;
                        transition: border-color 0.2s, box-shadow 0.2s;
                    }

                    input[type="text"]:focus, textarea:focus {
                        outline: none;
                        border-color: var(--primary);
                        box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
                    }

                    textarea {
                        min-height: 100px;
                        resize: vertical;
                    }

                    button {
                        width: 100%;
                        background-color: var(--primary);
                        color: #0f172a;
                        font-weight: 600;
                        font-size: 0.95rem;
                        padding: 0.75rem 1.5rem;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: background-color 0.2s, transform 0.1s;
                    }

                    button:hover {
                        background-color: var(--primary-hover);
                        color: #ffffff;
                    }

                    button:active {
                        transform: scale(0.99);
                    }

                    .section-title {
                        font-size: 1.25rem;
                        font-weight: 600;
                        margin-bottom: 1rem;
                        color: var(--text-main);
                    }

                    .logs-list {
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .log-card {
                        background-color: var(--card-bg);
                        border: 1px solid var(--border-color);
                        border-radius: 10px;
                        padding: 1.25rem;
                        transition: transform 0.2s, border-color 0.2s;
                    }

                    .log-card:hover {
                        border-color: #475569;
                        transform: translateY(-2px);
                    }

                    .log-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 0.5rem;
                    }

                    .log-title {
                        font-size: 1.05rem;
                        font-weight: 600;
                        color: var(--primary);
                    }

                    .log-date {
                        font-size: 0.75rem;
                        color: var(--text-muted);
                    }

                    .log-content {
                        font-size: 0.95rem;
                        line-height: 1.5;
                        color: #cbd5e1;
                    }

                    .empty-state {
                        text-align: center;
                        padding: 3rem 1rem;
                        background-color: var(--card-bg);
                        border: 1px dashed var(--border-color);
                        border-radius: 10px;
                        color: var(--text-muted);
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>DevLog Dashboard</h1>
                        <p>Track your daily coding milestones & updates</p>
                    </div>

                    <div class="form-card">
                        <form action="/add" method="POST">
                            <div class="form-group">
                                <label for="title">Log Title</label>
                                <input type="text" id="title" name="title" placeholder="e.g. Added JWT Authentication" required />
                            </div>
                            <div class="form-group">
                                <label for="content">Description</label>
                                <textarea id="content" name="content" placeholder="What did you code today?" required></textarea>
                            </div>
                            <button type="submit">Publish Log</button>
                        </form>
                    </div>

                    <h2 class="section-title">Recent Activity</h2>
                    <div class="logs-list">
                        ${logsHtml}
                    </div>
                </div>
            </body>
            </html>
        `;
        res.send(html);
    } catch (err) {
        res.send(`<h1>Error connecting to backend API</h1><p>${err.message}</p>`);
    }
});

app.post('/add', async (req, res) => {
    try {
        await axios.post(`${BACKEND_URL}/logs`, {
            title: req.body.title,
            content: req.body.content
        });
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Frontend running on port ${PORT}`);
});
