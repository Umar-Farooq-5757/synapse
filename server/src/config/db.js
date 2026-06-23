import Sequelize from 'sequelize'
require('dotenv').config();

// Initialize Sequelize using your Aiven connection URI
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  logging: false, // Set to console.log if you want to see raw SQL in logs
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true, // Crucial for Aiven's secure connection
    }
  }
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to Aiven MySQL has been established successfully via Sequelize.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testConnection();

export default sequelize