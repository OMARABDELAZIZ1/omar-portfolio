const mysql2 = require('mysql2/promise');
const bcrypt = require('bcryptjs');

// ─── In-Memory Store (fallback when MySQL is unavailable) ───────────────────
const inMemory = {
  projects: [
    { id: 1, title: 'Harafi Platform', category: 'Web', description: 'Platform connecting users with craftsmen (electricians, mechanics, carpenters)', tech_stack: 'React, Node.js, MySQL, JWT', live_url: '', github_url: 'https://github.com/OMARABDELAZIZ1', featured: 1, created_at: new Date().toISOString() },
    { id: 2, title: 'Tourism in Egypt', category: 'Web', description: 'Electronic tourism platform promoting Egyptian tourist attractions', tech_stack: 'HTML, CSS, JavaScript, PHP, MySQL', live_url: '', github_url: 'https://github.com/OMARABDELAZIZ1', featured: 1, created_at: new Date().toISOString() },
    { id: 3, title: 'Quiz Tournament System', category: 'Web', description: 'Event-based quiz competition system with scoring and leaderboard', tech_stack: 'PHP, MySQL, JavaScript', live_url: '', github_url: 'https://github.com/OMARABDELAZIZ1', featured: 0, created_at: new Date().toISOString() },
    { id: 4, title: 'Smart Voting System', category: 'Embedded', description: 'Secure voting system using fingerprint authentication', tech_stack: 'Arduino, Sensors, Web Dashboard', live_url: '', github_url: 'https://github.com/OMARABDELAZIZ1', featured: 1, created_at: new Date().toISOString() },
    { id: 5, title: 'Product Management System', category: 'Web', description: 'Full CRUD dashboard for product management', tech_stack: 'React, Node.js, MySQL', live_url: '', github_url: 'https://github.com/OMARABDELAZIZ1', featured: 0, created_at: new Date().toISOString() },
    { id: 6, title: 'Developer Portfolio', category: 'Web', description: 'Personal advanced portfolio with analytics and admin dashboard', tech_stack: 'React, Node.js, Express', live_url: 'https://frontend-steps--stevaabdelaziz.replit.app', github_url: 'https://github.com/OMARABDELAZIZ1', featured: 1, created_at: new Date().toISOString() }
  ],
  contacts: [],
  analytics: { visitors: 142, project_views: 389, cv_downloads: 27, cv_views: 12 },
  nextProjectId: 7,
  nextContactId: 1
};

// ─── MySQL Pool ──────────────────────────────────────────────────────────────
let pool = null;
let usingMemory = false;

async function initDB() {
  if (!process.env.DB_HOST || !process.env.DB_USER) {
    console.log('⚠  No DB config — using in-memory store');
    usingMemory = true;
    return;
  }

  try {
    pool = mysql2.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    await pool.query('SELECT 1');
    console.log('✅ MySQL connected');
    await createTables();
    await seedAdmin();
  } catch (err) {
    console.warn('⚠  MySQL unavailable, falling back to in-memory store:', err.message);
    usingMemory = true;
    pool = null;
  }
}

async function createTables() {
  const conn = await pool.getConnection();
  try {
    await conn.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        description TEXT,
        tech_stack VARCHAR(500),
        live_url VARCHAR(500),
        github_url VARCHAR(500),
        featured TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        read_status TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS analytics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        event_type VARCHAR(100) NOT NULL,
        metadata JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Tables ready');
  } finally {
    conn.release();
  }
}

async function seedAdmin() {
  const [[existing]] = await pool.query('SELECT id FROM admins WHERE email = ?', [process.env.ADMIN_EMAIL]);
  if (!existing) {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    await pool.query('INSERT INTO admins (email, password) VALUES (?, ?)', [process.env.ADMIN_EMAIL, hash]);
    console.log('✅ Admin seeded');
  }
}

// ─── DB Abstraction ──────────────────────────────────────────────────────────
const db = {
  isMemory: () => usingMemory,

  // Admin
  async findAdmin(email) {
    if (usingMemory) {
      if (email !== process.env.ADMIN_EMAIL) return null;
      const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
      return { id: 1, email, password: hash };
    }
    const [[row]] = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
    return row || null;
  },

  // Projects
  async getProjects(category) {
    if (usingMemory) {
      return category ? inMemory.projects.filter(p => p.category === category) : inMemory.projects;
    }
    if (category) {
      const [rows] = await pool.query('SELECT * FROM projects WHERE category = ? ORDER BY created_at DESC', [category]);
      return rows;
    }
    const [rows] = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    return rows;
  },

  async createProject(data) {
    if (usingMemory) {
      const project = { id: inMemory.nextProjectId++, ...data, created_at: new Date().toISOString() };
      inMemory.projects.push(project);
      return project;
    }
    const [result] = await pool.query(
      'INSERT INTO projects (title, category, description, tech_stack, live_url, github_url, featured) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [data.title, data.category, data.description, data.tech_stack, data.live_url, data.github_url, data.featured || 0]
    );
    const [[row]] = await pool.query('SELECT * FROM projects WHERE id = ?', [result.insertId]);
    return row;
  },

  async updateProject(id, data) {
    if (usingMemory) {
      const idx = inMemory.projects.findIndex(p => p.id === +id);
      if (idx === -1) return null;
      inMemory.projects[idx] = { ...inMemory.projects[idx], ...data };
      return inMemory.projects[idx];
    }
    await pool.query(
      'UPDATE projects SET title=?, category=?, description=?, tech_stack=?, live_url=?, github_url=?, featured=? WHERE id=?',
      [data.title, data.category, data.description, data.tech_stack, data.live_url, data.github_url, data.featured || 0, id]
    );
    const [[row]] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
    return row;
  },

  async deleteProject(id) {
    if (usingMemory) {
      const idx = inMemory.projects.findIndex(p => p.id === +id);
      if (idx === -1) return false;
      inMemory.projects.splice(idx, 1);
      return true;
    }
    const [result] = await pool.query('DELETE FROM projects WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  // Contacts
  async createContact(data) {
    if (usingMemory) {
      const contact = { id: inMemory.nextContactId++, ...data, read_status: 0, created_at: new Date().toISOString() };
      inMemory.contacts.push(contact);
      return contact;
    }
    const [result] = await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      [data.name, data.email, data.message]
    );
    return { id: result.insertId, ...data };
  },

  async getContacts() {
    if (usingMemory) return inMemory.contacts;
    const [rows] = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    return rows;
  },

  // Analytics
  async getStats() {
    if (usingMemory) {
      return {
        visitors: inMemory.analytics.visitors,
        project_views: inMemory.analytics.project_views,
        cv_downloads: inMemory.analytics.cv_downloads,
        cv_views: inMemory.analytics.cv_views || 0,
        total_projects: inMemory.projects.length,
        total_contacts: inMemory.contacts.length
      };
    }
    const [[{ visitors }]] = await pool.query("SELECT COUNT(*) as visitors FROM analytics WHERE event_type='page_view'");
    const [[{ project_views }]] = await pool.query("SELECT COUNT(*) as project_views FROM analytics WHERE event_type='project_view'");
    const [[{ cv_downloads }]] = await pool.query("SELECT COUNT(*) as cv_downloads FROM analytics WHERE event_type='cv_download'");
    const [[{ cv_views }]] = await pool.query("SELECT COUNT(*) as cv_views FROM analytics WHERE event_type='cv_view'");
    const [[{ total_projects }]] = await pool.query('SELECT COUNT(*) as total_projects FROM projects');
    const [[{ total_contacts }]] = await pool.query('SELECT COUNT(*) as total_contacts FROM contacts');
    return { visitors, project_views, cv_downloads, cv_views, total_projects, total_contacts };
  },

  async trackEvent(type, metadata) {
    if (usingMemory) {
      if (type === 'page_view') inMemory.analytics.visitors++;
      if (type === 'project_view') inMemory.analytics.project_views++;
      if (type === 'cv_download') inMemory.analytics.cv_downloads++;
      if (type === 'cv_view') inMemory.analytics.cv_views = (inMemory.analytics.cv_views || 0) + 1;
      return;
    }
    await pool.query('INSERT INTO analytics (event_type, metadata) VALUES (?, ?)', [type, JSON.stringify(metadata || {})]);
  }
};

module.exports = { initDB, db };
