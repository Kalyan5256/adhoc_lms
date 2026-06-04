const { sequelize } = require('./models/associations');

async function syncDatabase() {
  try {
    console.log('--- DATABASE SYNC SCRIPT (DIRECT SQL ALTER) ---');
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    console.log('Altering tickets table (adding moduleId)...');
    
    // 1. Try to add moduleId column to tickets table
    try {
      await sequelize.query('ALTER TABLE tickets ADD COLUMN moduleId INT NULL;');
      console.log('Added moduleId column successfully.');
    } catch (err) {
      if (err.parent && (err.parent.code === 'ER_DUP_FIELDNAME' || err.parent.errno === 1060)) {
        console.log('moduleId column already exists.');
      } else {
        throw err;
      }
    }
    
    // 2. Try to add foreign key constraint for moduleId
    try {
      await sequelize.query('ALTER TABLE tickets ADD CONSTRAINT fk_tickets_moduleId FOREIGN KEY (moduleId) REFERENCES modules(id) ON DELETE SET NULL ON UPDATE CASCADE;');
      console.log('Added foreign key constraint fk_tickets_moduleId successfully.');
    } catch (err) {
      if (err.parent && (err.parent.code === 'ER_DUP_KEY' || err.parent.code === 'ER_FK_DUP_NAME' || err.parent.errno === 1022 || err.parent.errno === 1211)) {
        console.log('Foreign key constraint fk_tickets_moduleId already exists.');
      } else {
        throw err;
      }
    }

    console.log('SUCCESS: Database schema has been updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('ERROR: Database schema update failed:', error);
    process.exit(1);
  }
}

syncDatabase();
