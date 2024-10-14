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
import { BookDTO } from "../dto/book.dto";
import { bookService } from "../services/book.service";

@Route("books")
@Tags("Books")
export class BookController extends Controller {
  @Get("/")
  public async getAllBooks(): Promise<BookDTO[]> {
    return bookService.getAllBooks();
  }

  @Get("{id}")
  public async getBook(@Path("id") id: number): Promise<BookDTO> {
    return await bookService.getBookById(id);
  }

  @Post("/")
  public async postBooks(@Body() requestBody: BookDTO): Promise<BookDTO> {
    return bookService.createBook(
      requestBody.title,
      requestBody.publish_year,
      requestBody.author?.id!,
      requestBody.isbn,
    );
  }

  @Patch("{id}")
  public async patchBook(
    @Path("id") id: number,
    @Body() requestBody: BookDTO,
  ): Promise<BookDTO> {
    return bookService.updateBook(
      id,
      requestBody.title,
      requestBody.publish_year,
      requestBody.author?.id,
      requestBody.isbn,
    );
  }

  @Delete("{id}")
  public async deleteBook(@Path("id") id: number): Promise<void> {
    await bookService.deleteBook(id);
  }
}
