import dotenv from 'dotenv'
dotenv.config({path: ".env"})

export const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017'
export const DB_NAME = process.env.DB_NAME || 'backend_test_zb'
export const DB_URL_TEST = process.env.DB_URL_TEST || 'mongodb://localhost:27017'
export const DB_NAME_TEST = process.env.DB_NAME_TEST || 'backend_test_zb_test'
