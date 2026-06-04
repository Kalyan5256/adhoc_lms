const { sequelize } = require('./models/associations');

async function syncDatabase() {
  try {
    console.log('--- DATABASE SYNC SCRIPT (ALTER: TRUE) ---');
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    console.log('Synchronizing database (adding missing columns, updating schema)...');
    await sequelize.sync({ alter: true });
    console.log('SUCCESS: Database schema has been synchronized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('ERROR: Database synchronization failed:', error);
    process.exit(1);
  }
}

syncDatabase();
