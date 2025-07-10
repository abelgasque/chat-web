import { PaginationDTO } from "../DTO/pagination.dto";

export interface UserFilter extends PaginationDTO{
    id: string;
    createdAtStart: string;
    createdAtEnd: string;
    updatedAtStart: string;
    updatedAtEnd: string;
    name: string;
    email: string;
    activeAtStart: string;
    activeAtEnd: string;
}