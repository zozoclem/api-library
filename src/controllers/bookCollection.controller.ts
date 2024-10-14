import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Route,
  Tags,
} from "tsoa";
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

  @Post("/")
  public async postBookCollection(
    @Body() requestBody: BookCollectionDTO,
  ): Promise<BookCollectionDTO> {
    return bookCollectionService.createBookCollection(
      requestBody.book?.id!,
      requestBody.available,
      requestBody.state,
    );
  }

  @Patch("{id}")
  public async patchBookCollection(
    @Path("id") id: number,
    @Body() requestBody: BookCollectionDTO,
  ): Promise<BookCollectionDTO> {
    return bookCollectionService.updateBookCollection(
      id,
      requestBody.book.id,
      requestBody.available,
      requestBody.state,
    );
  }

  @Delete("{id}")
  public async deleteBookCollection(@Path("id") id: number): Promise<void> {
    await bookCollectionService.deleteBookCollection(id);
  }
}
