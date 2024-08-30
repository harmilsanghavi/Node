import { UserAttributes } from "../model/user.interface";

export interface QueryParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sort?: "asc" | "desc";
    search?: string;
    instituteId?: number;
}
export interface PaginatedResponse {
    responseData: [];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            tokenData: TokenDataInterface;
        }
    }
}

export type TokenDataInterface = {
    user: UserAttributes;
};
