import { SQLiteDatabase } from "react-native-sqlite-storage";
import { User } from "../models";
import { getDBConnection } from "./db";

export const selectUserDB = async (db: SQLiteDatabase, user: Partial<User>, role: string) => {
  const users: Partial<User>[] = []
  const query = `SELECT fullname, username FROM users WHERE role LIKE '${role}' AND username = '${user.username}' AND password = '${user.password}'`
  const queryResult = await db.executeSql(query)
  queryResult.forEach(resultSet => {
    for (let index = 0; index < resultSet.rows.length; index++) {
      users.push(resultSet.rows.item(index))
    }
  });
  return users
}

export const getUser = async (user: Partial<User>, role = 'USER') => {
  const db = await getDBConnection()
  const users = await selectUserDB(db, user, role)
  db.close()
  return users
} 