// Test MongoDB connection and create database
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') })

const MONGODB_URI = process.env.MONGODB_URI

async function testConnection() {
  try {
    console.log('Connecting to MongoDB...')
    console.log('URI:', MONGODB_URI?.replace(/\/\/.*@/, '//***:***@')) // Hide credentials
    
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Successfully connected to MongoDB!')
    
    // List all databases
    const adminDb = mongoose.connection.db.admin()
    const { databases } = await adminDb.listDatabases()
    
    console.log('\n📊 Available databases:')
    databases.forEach(db => {
      console.log(`  - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`)
    })
    
    // Check if photosphere exists
    const photosphereExists = databases.some(db => db.name === 'photosphere')
    
    if (photosphereExists) {
      console.log('\n✅ photosphere database exists!')
    } else {
      console.log('\n⚠️  photosphere database does not exist yet.')
      console.log('   It will be created when you sign up your first user.')
    }
    
    await mongoose.disconnect()
    console.log('\n✅ Connection closed.')
  } catch (error) {
    console.error('❌ Connection error:', error.message)
    process.exit(1)
  }
}

testConnection()

