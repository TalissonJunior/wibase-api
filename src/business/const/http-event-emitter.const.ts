import { EventEmitter } from "events";

/**
 * This constant is used to detect when a user has used any route
 * from the 'WibaseController' and then notify webservice to send some data;
 */
export const httpEventEmitter = new EventEmitter();