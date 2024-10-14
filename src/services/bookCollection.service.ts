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
}

export const bookCollectionService = new BookCollectionService();
