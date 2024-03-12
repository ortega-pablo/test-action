/* eslint-disable quotes */ import {
  dbOpenOrCreate,
  executeSql,
  existsInTable,
} from '../dbConfig';

// Función para eliminar todos los registros de la tabla 'shooter'
export const clearShooterTable = async dataBase => {
  return new Promise((resolve, reject) => {
    dataBase.transaction(tx => {
      tx.executeSql(
        `delete from shooter;`,
        [],
        (_, resultSet) => {
          console.log('All records in shooter table deleted');
          resolve(resultSet);
        },
        (_, error) => {
          console.log('Error deleting records from shooter table');
          reject(error);
        },
      );
    });
  });
};

// Función para insertar un shooter en la tabla 'shooter' si no existe
export const insertShooter = async (shooter, dataBase) => {
  const shooterExists = await existsInTable(
    'shooter',
    'email',
    shooter.email,
    dataBase,
  );
  if (shooterExists) {
    console.log('Shooter already exists. Skipping insertion.');
    return null;
  }

  return new Promise((resolve, reject) => {
    dataBase.transaction(tx => {
      tx.executeSql(
        `insert into shooter (name, lastName, email, birth, phone, country, city, address) values (?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          shooter.name,
          shooter.lastName,
          shooter.email,
          shooter.birth,
          shooter.phone,
          shooter.country,
          shooter.city,
          shooter.address,
        ],
        (_, resultSet) => {
          console.log('Shooter successfully created');
          resolve(resultSet);
        },
        (_, error) => {
          console.log('Error inserting shooter');
          reject(error);
        },
      );
    });
  });
};

// Función para obtener todos los shooters de la tabla 'shooter'
export const getShooters = async () => {
  const dataBase = await dbOpenOrCreate();
  try {
    const query = `SELECT * FROM shooter;`;
    const resultSet = await executeSql(dataBase, query, []);
    return {
      status: 200,
      success: true,
      message: 'Shooters retrieved successfully',
      data: resultSet.rows.raw(),
    };
  } catch (error) {
    console.error('Error getting shooters', error);
    return {
      status: 500,
      success: false,
      message: 'Error getting shooters',
      data: null,
    };
  }
};

// Función buscar tirador por email
export const getShooterByEmail = async email => {
  const dataBase = await dbOpenOrCreate();
  try {
    const query = `SELECT * FROM shooter WHERE email = ?;`;
    const resultSet = await executeSql(dataBase, query, [email]);
    const shooter = resultSet.rows.length > 0 ? resultSet.rows.item(0) : null;
    return {
      status: 200,
      success: true,
      message: shooter ? 'Shooter found successfully' : 'Shooter not found',
      data: shooter,
    };
  } catch (error) {
    console.error('Error getting shooter by email', error);
    return {
      status: 500,
      success: false,
      message: 'Error getting shooter by email',
      data: null,
    };
  }
};

// Función para crear un tirador
export const createShooter = async shooter => {
  const dataBase = await dbOpenOrCreate();
  try {
    // Validaciones de datos
    if (!shooter.name || !shooter.email) {
      throw new Error('Name and email are required for creating a shooter.');
    }

    return {
      status: 200,
      success: true,
      message: 'Shooter created successfully',
      data: await insertShooter(shooter, dataBase),
    };
  } catch (error) {
    console.error('Error creating shooter', error);
    return {
      status: 500,
      success: false,
      message: 'Error creating shooter',
      data: null,
    };
  }
};

// Función para actualizar tirador
export const updateShooter = async (shooterId, updatedShooterData) => {
  const dataBase = await dbOpenOrCreate();
  try {
    // Validaciones de datos
    if (!shooterId) {
      throw new Error('Shooter ID is required for updating.');
    }

    await dataBase.transaction(async tx => {
      await tx.executeSql(
        `UPDATE shooter SET name=?, lastName=?, email=?, birth=?, phone=?, country=?, city=?, address=? WHERE id=?;`,
        [
          updatedShooterData.name,
          updatedShooterData.lastName,
          updatedShooterData.email,
          updatedShooterData.birth,
          updatedShooterData.phone,
          updatedShooterData.country,
          updatedShooterData.city,
          updatedShooterData.address,
          shooterId,
        ],
      );
    });

    return {
      status: 200,
      success: true,
      message: 'Shooter updated successfully',
      data: null,
    };
  } catch (error) {
    console.error('Error updating shooter', error);
    return {
      status: 500,
      success: false,
      message: 'Error updating shooter',
      data: null,
    };
  }
};

// Función para eliminar un tirador
export const deleteShooter = async shooterId => {
  const dataBase = await dbOpenOrCreate();
  try {
    // Validaciones de datos
    if (!shooterId) {
      throw new Error('Shooter ID is required for deletion.');
    }

    await executeSql(dataBase, `DELETE FROM shooter WHERE id=?;`, [shooterId]);

    return {
      status: 200,
      success: true,
      message: 'Shooter deleted successfully',
      data: null,
    };
  } catch (error) {
    console.error('Error deleting shooter', error);
    return {
      status: 500,
      success: false,
      message: 'Error deleting shooter',
      data: null,
    };
  }
};
