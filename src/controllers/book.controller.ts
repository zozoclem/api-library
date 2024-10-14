import { Controller, Get, Path, Route, Tags } from "tsoa";
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
}
