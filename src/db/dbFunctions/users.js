/* eslint-disable quotes */
import bcrypt from 'react-native-bcrypt';
import {dbOpenOrCreate, executeSql, existsInTable} from '../dbConfig';

// Función para eliminar todos los registros de la tabla 'user'
export const clearUserTable = async dataBase => {
  return new Promise((resolve, reject) => {
    dataBase.transaction(tx => {
      tx.executeSql(
        `delete from user;`,
        [],
        (_, resultSet) => {
          console.log('All records in user table deleted');
          resolve(resultSet);
        },
        (_, error) => {
          console.log('Error deleting records from user table');
          reject(error);
        },
      );
    });
  });
};

// Función para insertar un usuario en la tabla 'user' si no existe
export const insertUser = async (user, dataBase) => {
  try {
    const hashedPassword = bcrypt.hashSync(user.pass, 5);

    const userExists = await existsInTable(
      'user',
      'email',
      user.email,
      dataBase,
    );
    if (userExists) {
      throw new Error('User already exists');
    }

    await dataBase.transaction(async tx => {
      await tx.executeSql(
        `INSERT INTO user (name, lastName, email, birth, phone, country, city, address, role, pass) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          user.name,
          user.lastName,
          user.email,
          user.birth,
          user.phone,
          user.country,
          user.city,
          user.address,
          user.role,
          hashedPassword,
        ],
      );
    });

    console.log('User successfully created');
  } catch (error) {
    // console.error('Error inserting user', error);
    console.log('Error inserting user: ' + error.message);
  }
};

// Función para obtener todos los usuarios de la tabla 'usuario'
export const getUsers = async () => {
  const dataBase = await dbOpenOrCreate();
  try {
    const query = `SELECT * FROM user;`;
    const resultSet = await executeSql(dataBase, query, []);
    return {
      status: 200,
      success: true,
      message: 'Users retrieved successfully',
      data: resultSet.rows.raw(),
    };
  } catch (error) {
    console.error('Error getting users', error);
    return {
      status: 500,
      success: false,
      message: 'Error getting users',
      data: null,
    };
  }
};

// Función buscar usuario por email
export const getUserByEmail = async email => {
  const dataBase = await dbOpenOrCreate();
  try {
    const query = `SELECT * FROM user WHERE email = ?;`;
    const resultSet = await executeSql(dataBase, query, [email]);
    const user = resultSet.rows.length > 0 ? resultSet.rows.item(0) : null;
    return {
      status: 200,
      success: true,
      message: user ? 'User found successfully' : 'User not found',
      data: user,
    };
  } catch (error) {
    console.error('Error getting user by email', error);
    return {
      status: 500,
      success: false,
      message: 'Error getting user by email',
      data: null,
    };
  }
};

// Función para crear un suaurio
export const createUser = async user => {
  const dataBase = await dbOpenOrCreate();
  try {
    // Validaciones de datos
    if (!user.name || !user.email || !user.pass) {
      throw new Error('Name, email, and password are required.');
    }

    return {
      status: 200,
      success: true,
      message: 'User created successfully',
      data: await insertUser(user, dataBase),
    };
  } catch (error) {
    console.error('Error creating user', error);
    return {
      status: 500,
      success: false,
      message: 'Error creating user' + error.message,
      data: null,
    };
  }
};

// Función para actualizar usuario
export const updateUser = async (email, updatedUserData) => {
  const dataBase = await dbOpenOrCreate();
  try {
    // Validaciones de datos
    if (!email) {
      throw new Error('User ID is required for updating.');
    }

    const query = await dataBase.transaction(async tx => {
      console.log('El email es: ', email);
      console.log('El elemento a cambiar es: ', updatedUserData);
      await tx.executeSql(
        `UPDATE user SET name=?, lastName=?, email=?, birth=?, phone=?, country=?, city=?, address=?, role=?, pass=? WHERE email=?;`,
        [
          updatedUserData.name,
          updatedUserData.lastName,
          updatedUserData.email,
          updatedUserData.birth,
          updatedUserData.phone,
          updatedUserData.country,
          updatedUserData.city,
          updatedUserData.address,
          updatedUserData.role,
          updatedUserData.pass,
          email,
        ],
      );
    });

    return {
      status: 200,
      success: true,
      message: 'User updated successfully',
      data: null,
      query,
    };
  } catch (error) {
    console.error('Error updating user', error);
    return {
      status: 500,
      success: false,
      message: 'Error updating user',
      data: null,
    };
  }
};

// Función para eliminar usuario
export const deleteUser = async userId => {
  const dataBase = await dbOpenOrCreate();
  try {
    // Validaciones de datos
    if (!userId) {
      throw new Error('User ID is required for deletion.');
    }

    await executeSql(dataBase, `DELETE FROM user WHERE id=?;`, [userId]);
    return {
      status: 200,
      success: true,
      message: 'User deleted successfully',
      data: null,
    };
  } catch (error) {
    console.error('Error deleting user', error);
    return {
      status: 500,
      success: false,
      message: 'Error deleting user',
      data: null,
    };
  }
};
