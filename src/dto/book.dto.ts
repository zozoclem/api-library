import { AuthorDTO } from "./author.dto";

export interface BookDTO {
  id?: number;
  title: string;
  publish_year: number;
  author?: AuthorDTO;
  isbn: string;
}
