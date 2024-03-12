/* eslint-disable quotes */ import {
  dbOpenOrCreate,
  executeSql,
  existsInTable,
} from '../dbConfig';

// Función para insertar un condition en la tabla 'condition' si no existe
export const insertCondition = async (condition, dataBase) => {
  const conditionExists = await existsInTable(
    'condition',
    'name',
    condition.name,
    dataBase,
  );
  if (conditionExists) {
    console.log('Condition already exists. Skipping insertion.');
    return null;
  }

  return new Promise((resolve, reject) => {
    dataBase.transaction(tx => {
      tx.executeSql(
        `insert into condition (name, description, mode, conditionTIme, hits, robots, shooters) values (?, ?, ?, ?, ?, ?, ?);`,
        [
          condition.name,
          condition.description,
          condition.mode,
          condition.conditionTime,
          condition.hits,
          condition.robots,
          condition.shooters,
        ],
        (_, resultSet) => {
          console.log('Condition successfully created');
          resolve(resultSet);
        },
        (_, error) => {
          console.log('Error inserting condition');
          reject(error);
        },
      );
    });
  });
};

// Función para obtener todos los conditions de la tabla 'condition'
export const getConditions = async (id = null) => {
  const dataBase = await dbOpenOrCreate();
  try {
    let query;
    if (id) {
      query = `SELECT * FROM condition WHERE id=${id};`;
    } else {
      query = `SELECT * FROM condition;`;
    }
    const resultSet = await executeSql(dataBase, query, []);
    return {
      status: 200,
      success: true,
      message: 'Conditions retrieved successfully',
      data: resultSet.rows.raw(),
    };
  } catch (error) {
    console.error('Error getting conditions', error);
    return {
      status: 500,
      success: false,
      message: 'Error getting conditions',
      data: null,
    };
  }
};

// Función para crear un tirador
export const createCondition = async condition => {
  const dataBase = await dbOpenOrCreate();
  try {
    // Validaciones de datos
    if (!condition.name) {
      throw new Error('Name is required for creating a condition.');
    }

    return {
      status: 200,
      success: true,
      message: 'Condition created successfully',
      data: await insertCondition(condition, dataBase),
    };
  } catch (error) {
    console.error('Error creating condition', error);
    return {
      status: 500,
      success: false,
      message: 'Error creating condition',
      data: null,
    };
  }
};

// Función para actualizar tirador
export const updateCondition = async (conditionId, updatedConditionData) => {
  const dataBase = await dbOpenOrCreate();
  try {
    // Validaciones de datos
    if (!conditionId) {
      throw new Error('Condition ID is required for updating.');
    }

    await dataBase.transaction(async tx => {
      await tx.executeSql(
        `UPDATE condition SET name=?, description=?, mode=?, conditionTime=?, hits=?, robots=?, shooters=? WHERE id=?;`,
        [
          updatedConditionData.name,
          updatedConditionData.description,
          updatedConditionData.mode,
          updatedConditionData.conditionTime,
          updatedConditionData.hits,
          updatedConditionData.robots,
          updatedConditionData.shooters,
          conditionId,
        ],
      );
    });

    return {
      status: 200,
      success: true,
      message: 'Condition updated successfully',
      data: null,
    };
  } catch (error) {
    console.error('Error updating condition', error);
    return {
      status: 500,
      success: false,
      message: 'Error updating condition',
      data: null,
    };
  }
};

// Función para eliminar un tirador
export const deleteCondition = async conditionId => {
  const dataBase = await dbOpenOrCreate();
  try {
    // Validaciones de datos
    if (!conditionId) {
      throw new Error('Condition ID is required for deletion.');
    }

    await executeSql(dataBase, `DELETE FROM condition WHERE id=?;`, [
      conditionId,
    ]);

    return {
      status: 200,
      success: true,
      message: 'Condition deleted successfully',
      data: null,
    };
  } catch (error) {
    console.error('Error deleting condition', error);
    return {
      status: 500,
      success: false,
      message: 'Error deleting condition',
      data: null,
    };
  }
};
