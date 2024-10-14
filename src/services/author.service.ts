import { AuthorDTO } from "../dto/author.dto";
import { notFound } from "../error/NotFoundError";
import { Author } from "../models/author.model";

export class AuthorService {
  // Récupère tous les auteurs
  public async getAllAuthors(): Promise<AuthorDTO[]> {
    return await Author.findAll();
  }

  // Récupère un auteur par ID
  public async getAuthorById(id: number): Promise<AuthorDTO> {
    let author = await Author.findByPk(id);
    if (author) {
      return author;
    } else {
      notFound("Author");
    }
  }

  // Crée un nouvel auteur
  public async createAuthor(
    firstName: string,
    lastName: string,
  ): Promise<AuthorDTO> {
    return await Author.create({ first_name: firstName, last_name: lastName });
  }

  // Supprime un auteur par ID
  public async deleteAuthor(id: number): Promise<void> {
    const author = await Author.findByPk(id);
    if (author) {
      await author.destroy();
    }
  }

  // Met à jour un auteur
  public async updateAuthor(
    id: number,
    firstName?: string,
    lastName?: string,
  ): Promise<AuthorDTO> {
    const author = await Author.findByPk(id);
    if (author) {
      if (firstName) author.first_name = firstName;
      if (lastName) author.last_name = lastName;
      return await author.save();
    } else {
      notFound("Author");
    }
  }
}

export const authorService = new AuthorService();
