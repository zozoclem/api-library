import { Author } from "../models/author.model";
import { Book } from "../models/book.model";

export class BookService {
  public async getAllBooks(): Promise<Book[]> {
    return Book.findAll({
      include: [
        {
          model: Author,
          as: "author",
        },
      ],
    });
  }
}

export const bookService = new BookService();
