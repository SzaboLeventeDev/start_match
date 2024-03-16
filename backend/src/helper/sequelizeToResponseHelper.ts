import { Model } from "sequelize";

// Egy generikus függvény, ami átalakítja a Sequelize modellek tömbjét egy adott interfész típusú objektumok tömbjévé.
const sequelizeToResponseHelper = <T>(models: Array<Model<any, any>>): T[] => {
  return models.map((model) => model.toJSON() as T);
};

export default sequelizeToResponseHelper