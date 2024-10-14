import { BookCollectionDTO } from "../dto/bookCollection.dto";
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
}

export const bookCollectionService = new BookCollectionService();