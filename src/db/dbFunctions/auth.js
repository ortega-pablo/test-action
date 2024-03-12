import bcrypt from 'react-native-bcrypt';
import {dbOpenOrCreate} from '../dbConfig';
import {getUserByEmail} from './users';

// Función para verificar la contraseña
export const verifyPassword = (inputPassword, hashedPassword) => {
  return {
    status: 200,
    success: true,
    message: 'Password verification successful',
    data: bcrypt.compareSync(inputPassword, hashedPassword),
  };
};

// Función para inicio de sesión
export const login = async (email, password) => {
  // eslint-disable-next-line no-unused-vars
  const dataBase = await dbOpenOrCreate();
  try {
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    const userResponse = await getUserByEmail(email);

    if (
      !userResponse.data ||
      !verifyPassword(password, userResponse.data.pass).data
    ) {
      throw new Error('Invalid email or password.');
    }

    // Acá debería ir la lógica de JWT

    return {
      status: 200,
      success: true,
      message: 'Login successful',
      data: null,
    };
  } catch (error) {
    console.error('Error during login', error);
    return {
      status: 500,
      success: false,
      message: 'Error during login',
      data: null,
    };
  }
};
