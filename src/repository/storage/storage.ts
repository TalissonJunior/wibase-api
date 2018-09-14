import { MysqlError } from "mysql";
import { DatabaseErrors, ErrorResponseCode } from "../../business/enums";

export class Storage {

    constructor() { }

    /**
     * @description Creates the right message for the 'err' provide 
     * @param err 
     */
    handleError(err: MysqlError): BaseErrorResponse {

        var mentionedField = this._getErrorMessageFieldName(err.message);

        var error: BaseErrorResponse = {
            code: ErrorResponseCode.storage,
            message: DatabaseErrors[err.code].replace('$field$', mentionedField),
        }
        
        if (!error.message) {
            error.message = err.message;
        }

        return error;
    }

    /**
     * This method will try to find the name of field that is mentioned on error message
     * @param message the error message string
     */
    _getErrorMessageFieldName(message: string): string {

        var searchString = message.toLowerCase();
        var fieldStartWordMatch = "field '";

        var index = searchString.indexOf(fieldStartWordMatch) + fieldStartWordMatch.length;

        if (index) {
            searchString = searchString.substr(index);

            return searchString.substring(0, searchString.indexOf("'"));
        }
    }
}