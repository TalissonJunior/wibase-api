
declare module "*.json" {
    const value: any;
    export default value;
}

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