// Repository
interface StorageResponse {
    rows: Array<any>;
    fields: Array<any>;
}

interface AppSettings {
    ConnectionStrings: any;
}

interface StorageConnection {
    server: string,
    port: number,
    database: string,
    user: string,
    password: string,
    dialect: string
}

// Responses
interface BaseErrorResponse {
    code: string;
    message: string;
}