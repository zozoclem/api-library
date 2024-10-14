import { BookDTO } from "../dto/book.dto";
import { notFound } from "../error/NotFoundError";
import { Author } from "../models/author.model";
import { Book } from "../models/book.model";
import { BookCollection } from "../models/bookCollection.model";

export class BookService {
  readonly includeAuthor = {
    include: [
      {
        model: Author,
        as: "author",
      },
    ],
  };

  public async getAllBooks(): Promise<Book[]> {
    return Book.findAll(this.includeAuthor);
  }

  public async getBookById(id: number): Promise<BookDTO> {
    let book = await Book.findByPk(id, this.includeAuthor);

    if (book) {
      return book;
    } else {
      notFound("Book");
    }
  }

  public async createBook(
    title: string,
    publishYear: number,
    authorId: number,
    isbn: string,
  ): Promise<BookDTO> {
    let book = await Book.create({
      title: title,
      publish_year: publishYear,
      isbn: isbn,
      author_id: authorId,
    });

    return book;
  }

  public async updateBook(
    id: number,
    title?: string,
    publishYear?: number,
    authorId?: number,
    isbn?: string,
  ): Promise<BookDTO> {
    const book = await Book.findByPk(id);
    if (book) {
      if (title !== undefined) book.title = title;
      if (publishYear != undefined) book.publish_year = publishYear;
      if (authorId !== undefined) book.author_id = authorId;
      if (isbn !== undefined) book.isbn = isbn;

      await book.save();
      return book;
    } else {
      notFound("Book");
    }
  }

  public async deleteBook(id: number): Promise<void> {
    const book = await Book.findByPk(id, {
      include: [
        {
          model: BookCollection,
          as: "collections",
        },
      ],
    });
    if (book) {
      if (book.collections.length > 0) {
        const error = new Error(
          "Deletion of book " +
            id +
            " isn't possible due to presence of his.er books in library",
        );
        (error as any).status = 412;
        throw error;
      } else {
        book.destroy();
      }
    } else {
      notFound("Book");
    }
  }
}

export const bookService = new BookService();
