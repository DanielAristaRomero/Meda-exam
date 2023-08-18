import { SQLiteDatabase } from "react-native-sqlite-storage";
import { User } from "../models";
import { getDBConnection } from "./db";

export const selectUsersDB = async (db: SQLiteDatabase) => {
  const users: Partial<User>[] = []
  const query = `SELECT fullname, username, password FROM users WHERE role LIKE 'USER'`
  const queryResult = await db.executeSql(query)
  queryResult.forEach(resultSet => {
    for (let index = 0; index < resultSet.rows.length; index++) {
      users.push(resultSet.rows.item(index))
    }
  });
  return users
}

export const getUsers = async () => {
  const db = await getDBConnection()
  const users = await selectUsersDB(db)
  db.close()
  return users
} 