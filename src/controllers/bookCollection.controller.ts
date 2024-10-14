import { Controller, Get, Route, Tags } from "tsoa";
import { BookCollectionDTO } from "../dto/bookCollection.dto";
import { bookCollectionService } from "../services/bookCollection.service";

@Route("bookCollections")
@Tags("BookCollections")
export class BookCollectionController extends Controller {
  @Get("/")
  public async getAllBooksCollection(): Promise<BookCollectionDTO[]> {
    return bookCollectionService.getAllBookCollections();
  }
}
