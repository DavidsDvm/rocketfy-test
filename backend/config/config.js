require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'development',
    isProd: process.env.NODE_ENV === 'production',
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    jwtSecret: process.env.SECRET_JWT,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
}

module.exports = { config };
