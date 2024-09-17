import { Model } from "sequelize";
import sequelize from "../config/database"; // Connexion à la base de données

export interface BookCollectionAttributes {
}

export class BookCollection
  extends Model<BookCollectionAttributes>
  implements BookCollectionAttributes
{
}

BookCollection.init(
  {},
  {
    sequelize,
    tableName: "BookCollection",
  }
);
