/* eslint-disable no-shadow */
import SQLite from 'react-native-sqlite-storage';
import {clearUserTable, insertUser} from './dbFunctions/users';
import {clearShooterTable, insertShooter} from './dbFunctions/shooters';
import {conditionsSeeder, shootersSeed, usersSeed} from './dbSeeder';
import {insertCondition} from './dbFunctions/conditions';

// Función para abrir o crear la base de datos
export const dbOpenOrCreate = async () => {
  try {
    const db = await SQLite.openDatabase({
      name: 'veco.db',
      location: 'default',
    });
    console.log('Database successfully created or opened');
    return db;
  } catch (error) {
    console.log('A problem occurred while creating or opening database', error);
  }
};

// Función para crear las tablas 'usuario' y 'shooter' si no existen
const tablesCreate = async db => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `create table if not exists user (
            id integer primary key not null,
            name text,
            lastName text,
            email text,
            birth text,
            phone text,
            country text,
            city text,
            address text,
            role text,
            pass text
          );`,
        [],
        (_, resultSet) => {
          console.log('User table created correctly');
          tx.executeSql(
            `create table if not exists shooter (
                id integer primary key not null,
                name text,
                lastName text,
                email text,
                birth text,
                phone text,
                country text,
                city text,
                address text
              );`,
            [],
            (_, resultSet) => {
              console.log('Shooter table created correctly');
              tx.executeSql(
                `create table if not exists condition (
                    id integer primary key not null,
                    name text,
                    description text,
                    mode boolean,
                    conditionTime text,
                    hits integer,
                    robots integer,
                    shooters integer
                  );`,
                [],
                (_, resultSet) => {
                  console.log('Conditions table created correctly');
                  resolve(resultSet);
                },
                (_, error) => {
                  console.log('Error creating conditions table');
                  reject(error);
                },
              );
            },
            (_, error) => {
              console.log('Error creating shooter table');
              reject(error);
            },
          );
        },
        (_, error) => {
          console.log('Error creating user table');
          reject(error);
        },
      );
    });
  });
};

// Función para verificar si un valor existe en una columna de una tabla
export const existsInTable = async (tableName, columnName, value, dataBase) => {
  const query = `select * from ${tableName} where ${columnName} = ?;`;
  return new Promise((resolve, reject) => {
    dataBase.transaction(tx => {
      tx.executeSql(
        query,
        [value],
        (_, resultSet) => {
          const rowCount = resultSet.rows.length;
          resolve(rowCount > 0);
        },
        (_, error) => {
          console.log(`Error checking existence in ${tableName}`);
          reject(error);
        },
      );
    });
  });
};

// Función para popular la base de datos
export const populateDatabase = async dataBase => {
  for (let condition of conditionsSeeder) {
    await insertCondition(condition, dataBase);
  }
  for (let user of usersSeed) {
    await insertUser(user, dataBase);
  }
  for (let shooter of shootersSeed) {
    await insertShooter(shooter, dataBase);
  }
};

// Función para inicializar la base de datos en la aplicación
export const setupDatabase = async () => {
  try {
    const dataBase = await dbOpenOrCreate();
    //await clearDatabase(dataBase);
    await tablesCreate(dataBase);
    console.log('Database OK');
    await populateDatabase(dataBase);
  } catch (error) {
    console.error(error);
  }
};

// Función para eliminar todos los registros de la base de datos
export const clearDatabase = async dataBase => {
  try {
    await clearUserTable(dataBase);
    await clearShooterTable(dataBase);
    console.log('All records in the database deleted');
  } catch (error) {
    console.error('Error clearing the database', error);
  }
};

// Función para ejecutar consultas
export const executeSql = async (dataBase, query, params = []) => {
  return new Promise((resolve, reject) => {
    dataBase.transaction(tx => {
      tx.executeSql(
        query,
        params,
        (_, resultSet) => {
          resolve(resultSet);
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });
};
