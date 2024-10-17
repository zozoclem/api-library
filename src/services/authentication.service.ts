import { User } from "../models/user.model"; // Modèle Sequelize
import jwt from "jsonwebtoken"; // Pour générer le JWT
import { Buffer } from "buffer"; // Pour décoder Base64
import { notFound } from "../error/NotFoundError";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key"; // Clé secrète pour signer le token

type Role = 'admin' | 'gerant' | 'utilisateur';

const getRightsByRole = (role: Role): string[] => {
  const rights: Record<Role, string[]> = {
    admin: [
      'book:read', 'book:write', 'book:update', 'book:delete',
      'bookCollection:read', 'bookCollection:write', 'bookCollection:update', 'bookCollection:delete',
      'author:read', 'author:write', 'author:update', 'author:delete',
      'user:read', 'user:write', 'user:update', 'user:delete'
    ],
    gerant: [
      'book:read', 'book:write', 'book:update',
      'bookCollection:read', 'bookCollection:write', 'book:update', 'bookCollection:delete',
      'author:read', 'author:write', 'book:update',
      'user:read', 'user:write', 'user:update',
    ],
    utilisateur: [
      'book:read', 'book:write',
      'bookCollection:read',
      'author:read',
      'user:read'
    ],
  };

  return rights[role] || [];
};

export class AuthenticationService {
  public async authenticate(
    username: string,
    password: string
  ): Promise<string> {
    // Recherche l'utilisateur dans la base de données
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw notFound("User");
    }

    // Décoder le mot de passe stocké en base de données
    const decodedPassword = Buffer.from(user.password, "base64").toString("utf-8");

    // Vérifie si le mot de passe est correct
    if (password === decodedPassword) {
      // Récupérer les droits basés sur le rôle de l'utilisateur
      const rights = getRightsByRole(user.username as Role);

      // Générer le token JWT avec les droits
      const token = jwt.sign({ username: user.username, scopes: rights }, JWT_SECRET, {
        expiresIn: "1h",
      });
      return token;
    } else {
      let error = new Error("Wrong password");
      (error as any).status = 403;
      throw error;
    }
  }
}

export const authService = new AuthenticationService();