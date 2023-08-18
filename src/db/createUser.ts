import { SQLiteDatabase } from "react-native-sqlite-storage"
import { User } from "../models"
import { getDBConnection } from "./db"

export const insertUserDB = async (db: SQLiteDatabase, user: User) => {
  const query = `INSERT INTO users (fullname, username, password, role) VALUES('${user.fullname}', '${user.username}', '${user.password}', '${user.role}')`
  return await db.executeSql(query)
}

export const createUser = async (user: User) => {
  const db = await getDBConnection()
  await insertUserDB(db, user)
  db.close()
}