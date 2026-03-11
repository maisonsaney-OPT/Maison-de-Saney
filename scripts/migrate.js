import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase Connection String
const PASSWORD = encodeURIComponent('MaisondeSaney@34');
const PROJECT_ID = 'ubmjgpmfrfkrhmnykqzj';

// FINAL ATTEMPT: Direct Hostname (db.[project-id].supabase.co)
// This usually works if the network allows outbound to port 5432.
// "Tenant or user not found" on pooler often means the pooler username format is wrong or region specific.
// Standard direct connection string:
const HOST = `db.${PROJECT_ID}.supabase.co`;
const PORT = 5432;
const DB_NAME = 'postgres';
const USER = 'postgres'; // Standard postgres user for direct connection

const connectionString = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}`;

console.log(`🔌 Connecting to ${HOST} (Port ${PORT}) as ${USER}...`);

// Use a shorter timeout to fail fast if blocked
const sql = postgres(connectionString, {
  ssl: { rejectUnauthorized: false }, 
  max: 1,
  connect_timeout: 10
});

async function runMigration() {
  const schemaPath = path.join(__dirname, '..', 'supabase_schema.sql');
  const keepAlivePath = path.join(__dirname, '..', 'supabase_keep_alive.sql');

  try {
    // 1. Run Schema
    if (fs.existsSync(schemaPath)) {
      console.log('📖 Reading schema file...');
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      console.log('🚀 Executing schema migration...');
      await sql.unsafe(schemaSql);
      console.log('✅ Schema migration completed successfully!');
    }

    // 2. Run Keep Alive
    if (fs.existsSync(keepAlivePath)) {
      console.log('📖 Reading keep-alive file...');
      const keepAliveSql = fs.readFileSync(keepAlivePath, 'utf8');
      console.log('🚀 Executing keep-alive setup...');
      await sql.unsafe(keepAliveSql);
      console.log('✅ Keep-alive setup completed successfully!');
    }

  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await sql.end();
    console.log('👋 Connection closed.');
  }
}

runMigration();
