import { Controller, Get, Path, Route, Tags } from "tsoa";
import { BookCollectionDTO } from "../dto/bookCollection.dto";
import { bookCollectionService } from "../services/bookCollection.service";

@Route("bookCollections")
@Tags("BookCollections")
export class BookCollectionController extends Controller {
  @Get("/")
  public async getAllBooksCollection(): Promise<BookCollectionDTO[]> {
    return bookCollectionService.getAllBookCollections();
  }

  @Get("{id}")
  public async getBookCollection(
    @Path("id") id: number,
  ): Promise<BookCollectionDTO> {
    return bookCollectionService.getBookCollectionById(id);
  }
}
