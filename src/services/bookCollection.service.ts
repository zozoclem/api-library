import { BookCollectionDTO } from "../dto/bookCollection.dto";
import { notFound } from "../error/NotFoundError";
import { Author } from "../models/author.model";
import { Book } from "../models/book.model";
import { BookCollection } from "../models/bookCollection.model";

export class BookCollectionService {
  readonly includeBookAndAuthor = {
    include: [
      {
        model: Book,
        as: "book",
        include: [
          {
            model: Author,
            as: "author",
          },
        ],
      },
    ],
  };
  public async getAllBookCollections(): Promise<BookCollectionDTO[]> {
    let bookCollectionList = await BookCollection.findAll(
      this.includeBookAndAuthor,
    );

    return bookCollectionList;
  }

  public async getBookCollectionById(id: number): Promise<BookCollectionDTO> {
    let bookCollection = await BookCollection.findByPk(
      id,
      this.includeBookAndAuthor,
    );
    if (bookCollection) {
      return bookCollection;
    } else {
      notFound("Book Collection");
    }
  }

  public async createBookCollection(
    bookId: number,
    available: number,
    state: number,
  ): Promise<BookCollectionDTO> {
    let bookCollection = await BookCollection.create({
      book_id: bookId,
      available: available,
      state: state,
    });
    return bookCollection;
  }

  public async updateBookCollection(
    id: number,
    bookId?: number,
    available?: number,
    state?: number,
  ): Promise<BookCollectionDTO> {
    const bookCollection = await BookCollection.findByPk(id);
    if (bookCollection) {
      if (bookId !== undefined) bookCollection.book_id = bookId;
      if (available !== undefined) bookCollection.available = available;
      if (state !== undefined) bookCollection.state = state;
      return await bookCollection.save();
    } else {
      notFound("Book Collection");
    }
  }
}

export const bookCollectionService = new BookCollectionService();
