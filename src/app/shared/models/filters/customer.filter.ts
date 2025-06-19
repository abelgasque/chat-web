import { PaginationDTO } from "../DTO/pagination.dto";

export interface CustomerFilter extends PaginationDTO{
    id: string;
    creationDateStart: string;
    creationDateEnd: string;
    updateDateStart: string;
    updateDateEnd: string;
    firstName: string;
    lastName: string;
    mail: string;
    active: boolean;
    block: boolean;
}