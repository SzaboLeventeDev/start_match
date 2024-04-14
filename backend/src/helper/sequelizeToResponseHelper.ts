import { Model } from "sequelize";

// Egy generikus függvény, ami átalakítja a Sequelize modellek tömbjét egy adott interfész típusú objektumok tömbjévé.
export const sequelizeToResponseArrayHelper = <T>(models: Array<Model<any, any>>): T[] => {
  return models.map((model) => model.toJSON() as T);
};

/**
 * @function sequelizeToResponseHelper
 * Generic function to transform Sequelize model to model T
 * @param {T} model Generic type
 * @returns {T} Generated object from Sequelize model
 */
export const sequelizeToResponseHelper = <T>(model: Model<any, any>): T => model.toJSON() as T;
