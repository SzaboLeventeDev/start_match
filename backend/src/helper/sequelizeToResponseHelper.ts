import { Model } from "sequelize";

// Egy generikus függvény, ami átalakítja a Sequelize modellek tömbjét egy adott interfész típusú objektumok tömbjévé.
export const sequelizeToResponseArrayHelper = <T>(models: Array<Model<any, any>>): T[] => {
  return models.map((model) => model.toJSON() as T);
};

/**
 * @function sequelizeToResponseHelper
 * @description Generic function to transform a Sequelize model instance into a specified type T.
 * This function extracts only the specified fields from the model, ensuring that the output strictly contains the fields necessary for type T.
 * @param {Model<any, any>} model - The Sequelize model instance from which data will be extracted.
 * @param {Array<keyof T>} fields - The list of fields from type T that should be included in the transformed object.
 * @returns {T} - An object of type T containing only the fields specified in the 'fields' parameter, extracted from the Sequelize model.
 */
export const sequelizeToResponseHelper = <T extends Record<string, any>>(
  model: Model<any, any>,
  fields: Array<keyof T>
): T => {
  const jsonModel = model.toJSON();

  const filteredModel = fields.reduce((acc: Partial<T>, field) => {
    if (field in jsonModel) {
      acc[field] = jsonModel[field];
    }
    return acc;
  }, {} as Partial<T>);

  return filteredModel as T;
};
