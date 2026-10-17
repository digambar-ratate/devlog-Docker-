import os
import time
import psycopg2

DB_HOST = os.environ.get("DB_HOST", "localhost")
DB_NAME = os.environ.get("DB_NAME", "devlog_db")
DB_USER = os.environ.get("DB_USER", "postgres")
DB_PASSWORD = os.environ.get("DB_PASSWORD", "secret")
REPORT_DIR = "/app/reports"

def generate_report():
    if not os.path.exists(REPORT_DIR):
        os.makedirs(REPORT_DIR)
        
    try:
        conn = psycopg2.connect(host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASSWORD)
        cur = conn.cursor()
        cur.execute("SELECT COUNT(*) FROM logs;")
        count = cur.fetchone()[0]
        
        report_path = os.path.join(REPORT_DIR, "summary.txt")
        with open(report_path, "w") as f:
            f.write(f"--- DevLog Analytics Report ---\n")
            f.write(f"Total Logs Recorded: {count}\n")
            f.write(f"Generated at: {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
            
        print(f"Report generated successfully. Total logs: {count}")
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Database not ready yet... retrying. Error: {e}")

if __name__ == "__main__":
    print("Worker started. Waiting for database...")
    time.sleep(5) # Give DB time to start
    while True:
        generate_report()
        time.sleep(30) # Run every 30 seconds
