import os
from flask import Flask, jsonify, request
import psycopg2

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(
        host=os.environ.get("DB_HOST", "localhost"),
        database=os.environ.get("DB_NAME", "devlog_db"),
        user=os.environ.get("DB_USER", "digambar"),
        password=os.environ.get("DB_PASSWORD", "redhat")
    )
    return conn

def init_db():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS logs (
            id SERIAL PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    ''')
    conn.commit()
    cur.close()
    conn.close()

@app.route('/logs', methods=['GET'])
def get_logs():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT title, content, created_at FROM logs ORDER BY created_at DESC;")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    
    logs = [{"title": r[0], "content": r[1], "created_at": str(r[2])} for r in rows]
    return jsonify(logs)

@app.route('/logs', methods=['POST'])
def add_log():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO logs (title, content) VALUES (%s, %s);", (title, content))
    conn.commit()
    cur.close()
    conn.close()
    
    return jsonify({"status": "success"}), 201

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000)
