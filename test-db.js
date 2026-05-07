import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const DB_PATH = path.resolve(process.cwd(), 'server', 'db')

function loadMockDb(name) {
  try {
    const filePath = path.join(DB_PATH, `${name}.json`)
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      return new Map(Object.entries(data))
    }
  } catch (e) {
    console.error(`Error loading ${name} DB:`, e.message)
  }
  return new Map()
}

function saveMockDb(name, map) {
  try {
    const filePath = path.join(DB_PATH, `${name}.json`)
    const data = Object.fromEntries(map)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  } catch (e) {
    console.warn(`⚠️ Cannot save ${name} DB:`, e.message)
  }
}

const usersDb = loadMockDb('users')
console.log('Loaded users:', Array.from(usersDb.keys()))

const testUser = {
  id: crypto.randomUUID(),
  email: 'test@example.com',
  password_hash: '123456'
}

usersDb.set(testUser.id, testUser)
saveMockDb('users', usersDb)

const usersDb2 = loadMockDb('users')
console.log('Reloaded users:', Array.from(usersDb2.keys()))
