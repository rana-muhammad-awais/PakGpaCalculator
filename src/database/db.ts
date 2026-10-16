import * as SQLite from 'expo-sqlite';
import { institutions, schemas, temporal_rules, conversions, absolute_brackets } from './seedData';

let db: SQLite.SQLiteDatabase | null = null;

export const getDb = () => {
  if (!db) {
    db = SQLite.openDatabaseSync('pakgpa.db');
  }
  return db;
};

export const initDb = () => {
  const database = getDb();
  
  // Enable foreign keys
  database.execSync('PRAGMA foreign_keys = ON;');

  // Create tables
  database.execSync(`
    CREATE TABLE IF NOT EXISTS institutions (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      sector TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS schemas (
      id TEXT PRIMARY KEY,
      uni_id TEXT,
      program TEXT,
      is_absolute INTEGER,
      is_relative INTEGER,
      is_continuous INTEGER,
      FOREIGN KEY (uni_id) REFERENCES institutions (id)
    );

    CREATE TABLE IF NOT EXISTS temporal_rules (
      schema_id TEXT,
      batch_start INTEGER,
      batch_end INTEGER,
      FOREIGN KEY (schema_id) REFERENCES schemas (id)
    );

    CREATE TABLE IF NOT EXISTS conversions (
      uni_id TEXT,
      m REAL,
      c REAL,
      FOREIGN KEY (uni_id) REFERENCES institutions (id)
    );

    CREATE TABLE IF NOT EXISTS absolute_brackets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      schema_id TEXT,
      grade TEXT,
      min REAL,
      max REAL,
      gpa REAL,
      FOREIGN KEY (schema_id) REFERENCES schemas (id)
    );

    CREATE TABLE IF NOT EXISTS user_transcripts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uni_id TEXT,
      program TEXT,
      batch INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user_semesters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      transcript_id INTEGER,
      semester_num INTEGER,
      FOREIGN KEY (transcript_id) REFERENCES user_transcripts (id)
    );

    CREATE TABLE IF NOT EXISTS user_courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      semester_id INTEGER,
      name TEXT,
      credits REAL,
      grade TEXT,
      points REAL,
      is_transferred INTEGER DEFAULT 0,
      FOREIGN KEY (semester_id) REFERENCES user_semesters (id)
    );
  `);

  // Check if seed data exists
  const countResult = database.getFirstSync<{ count: number }>('SELECT COUNT(*) as count FROM institutions');
  
  if (countResult && countResult.count === 0) {
    seedDatabase(database);
  }
};

const seedDatabase = (database: SQLite.SQLiteDatabase) => {
  database.withTransactionSync(() => {
    // Insert Institutions
    const insertInst = database.prepareSync('INSERT INTO institutions (id, name, sector) VALUES (?, ?, ?)');
    for (const inst of institutions) {
      insertInst.executeSync([inst.id, inst.name, inst.sector]);
    }
    insertInst.finalizeSync();

    // Insert Schemas
    const insertSchema = database.prepareSync('INSERT INTO schemas (id, uni_id, program, is_absolute, is_relative, is_continuous) VALUES (?, ?, ?, ?, ?, ?)');
    for (const s of schemas) {
      insertSchema.executeSync([s.id, s.uni_id, s.program, s.is_absolute, s.is_relative, s.is_continuous]);
    }
    insertSchema.finalizeSync();

    // Insert Temporal Rules
    const insertTemp = database.prepareSync('INSERT INTO temporal_rules (schema_id, batch_start, batch_end) VALUES (?, ?, ?)');
    for (const t of temporal_rules) {
      insertTemp.executeSync([t.schema_id, t.batch_start, t.batch_end]);
    }
    insertTemp.finalizeSync();

    // Insert Conversions
    const insertConv = database.prepareSync('INSERT INTO conversions (uni_id, m, c) VALUES (?, ?, ?)');
    for (const c of conversions) {
      insertConv.executeSync([c.uni_id, c.m, c.c]);
    }
    insertConv.finalizeSync();

    // Insert Absolute Brackets
    const insertBrackets = database.prepareSync('INSERT INTO absolute_brackets (schema_id, grade, min, max, gpa) VALUES (?, ?, ?, ?, ?)');
    for (const b of absolute_brackets) {
      insertBrackets.executeSync([b.schema_id, b.grade, b.min, b.max, b.gpa]);
    }
    insertBrackets.finalizeSync();
  });
};
