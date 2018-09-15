
/**
 * @description@description Create an 'update date' and 'create_date' field 
 * in the object and its children arguments, 
 * that that this decorator is being applied
 */
export function CreateAtUpdateAtDateField(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        // pre
        args.forEach((arg) => {
            if (arg instanceof Object) {
                arg.create_date = new Date().toLocaleString();
                arg.update_date = new Date().toLocaleString();
                _handleTableCreateAtUpdateAtChildFields(arg);
            }
        });

        // run and store result
        const result = originalMethod.apply(this, args);

        // post
        return result;
    };

    return descriptor;
}


/**
 * @description Create an 'update date' field in the object and its children arguments, 
 * that that this decorator is being applied.
 */
export function UpdateAtDateField(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        // pre
        args.forEach((arg) => {
            if (arg instanceof Object) {
                arg.update_date = new Date().toLocaleString();
                _handleTableUpdateAtChildFields(arg);
            }
        });

        // run and store result
        const result = originalMethod.apply(this, args);

        // post
        return result;
    };

    return descriptor;
}


/**
 * @description  Create an 'create_date' and 'update_date' field 
 * to the object childs that have '$table' property on it.
 * @param object 
 */
function _handleTableCreateAtUpdateAtChildFields(object: Object) {

    for (var prop in object) {

        // Childs table must have the property '$table' in order to create 'created_date' and 'update_date' fields.
        if (object['$table'] && (!object['create_date'] && !object['update_date'])) {
            object['create_date'] = new Date().toLocaleString();
            object['update_date'] = new Date().toLocaleString();
        }

        if (object[prop] instanceof Object) {
            object['$insert_mode'] = 'transaction'; // This will tell the storage to insert as a transaction because of its dependencies
            _handleTableCreateAtUpdateAtChildFields(object[prop]);
        }
    }
}

/**
 * @description Create an 'update_date' field to the object childs 
 * that have '$table' property on it;
 * @param object 
 */
function _handleTableUpdateAtChildFields(object: Object) {

    for (var prop in object) {

        // Childs table must have the property '$table' in order to create 'update_date' field;
        if (object['$table'] && !object['update_date']) {
            object['update_date'] = new Date().toLocaleString();
        }

        if (object[prop] instanceof Object) {
            object['$update_mode'] = 'transaction'; // This will tell the storage to insert as a transaction because of its dependencies
            _handleTableUpdateAtChildFields(object[prop]);
        }
    }
}