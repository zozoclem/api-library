import { AuthorDTO } from "../dto/author.dto";
import { notFound } from "../error/NotFoundError";
import { Author } from "../models/author.model";
import { Book } from "../models/book.model";
import { BookCollection } from "../models/bookCollection.model";

export class AuthorService {
  readonly includeBooksBookColections = {
    include: [
      {
        model: Book,
        as: "books",
        include: [
          {
            model: BookCollection,
            as: "collections",
          },
        ],
      },
    ],
  };

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
    const author = await Author.findByPk(id, this.includeBooksBookColections);
    if (author) {
      if (author.books.length > 0) {
        let booksId: number[] = [];
        for (let book of author.books) {
          if (book.collections.length > 0) {
            const error = new Error(
              "Deletion of author " +
                id +
                " isn't possible due to presence of his.er books in library",
            );
            (error as any).status = 412;
            throw error;
          } else {
            booksId.push(book.id);
          }
        }
        Book.destroy({ where: { id: booksId } });
      }
      author.destroy();
    } else {
      notFound("Author");
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
