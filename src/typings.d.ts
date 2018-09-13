// Repository
interface DatabaseResponse {
    rows: Array<any>;
    fields: Array<any>;
}


// Responses
interface BaseErrorResponse {
    code: string;
    message: string;
}