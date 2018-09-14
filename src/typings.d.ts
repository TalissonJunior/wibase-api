// Repository
interface StorageResponse {
    rows: Array<any>;
    fields: Array<any>;
}

interface AppSettings {
    ConnectionStrings: any; 
}

// Responses
interface BaseErrorResponse {
    code: string;
    message: string;
}