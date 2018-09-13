import { MysqlError } from "mysql";
import { DatabaseErrors, ErrorResponseCode } from "../../enums";

export class Database {

    constructor() {}

    /**
     * @description Creates the right message for the 'err' provide 
     * @param err 
     */
    handleError(err: MysqlError): BaseErrorResponse {

        var error: BaseErrorResponse = {
            code: ErrorResponseCode.storage,
            message: DatabaseErrors[err.code],
        }

        if (!error.message) {
            error.message = err.message;
        }

        return error;
    }
}