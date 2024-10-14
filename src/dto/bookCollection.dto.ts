import { BookDTO } from "./book.dto";

export interface BookCollectionDTO {
  id: number;
  book: BookDTO;
  available: number;
  state: number;
}
