import { DatabaseErrors, ErrorResponseCode } from "../../business/enums";

export class Storage {

    constructor() { }

    /**
     * @description Creates a well formatted error message
     * @param err 
     */
    handleError(err: any): BaseErrorResponse {

        var error: BaseErrorResponse = {
            code: ErrorResponseCode.storage,
            message: DatabaseErrors[err.code].replace('$field$', err.message),
        }
        
        if (!error.message) {
            error.message = err.message;
        }

        return error;
    }
}