export interface UserAttributes {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    created_at: Date | string;
    updated_at: Date | string;
    deleted_at?: Date | string;
}
