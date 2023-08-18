import {SQLiteDatabase, enablePromise, openDatabase} from 'react-native-sqlite-storage'

enablePromise(true);

const DATABASE_NAME = 'users.db'

export const getDBConnection = async () => {
  return await openDatabase({name: DATABASE_NAME, location: 'default'})
}

export const createTable = async (db: SQLiteDatabase) => {
  const query = 'CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, fullname VARCHAR(100) NOT NULL, username VARCHAR(100) NOT NULL, password VARCHAR(16) NOT NULL, role VARCHAR(5) NOT NULL, UNIQUE(username))'
  return await db.executeSql(query)
}

export const initDatabase = async () => {
  const db = await getDBConnection()
  await createTable(db)
  try {
    const query = `INSERT INTO users (fullname, username, password, role) VALUES('Admin', 'admin', 'test', 'ADMIN')`
    await db.executeSql(query)
  } catch(error) {
    console.log("Admin exits");
  } finally {
    db.close()
  }
}
