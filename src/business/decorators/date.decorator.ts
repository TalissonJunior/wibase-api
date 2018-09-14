
/**
 * @description This decorator creates a 'create_date' and 'update_date' fields, on the method object passed;
 */
export function CreateAtUpdateAtDateField(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        // pre
        args.forEach((arg) => {
            if (arg instanceof Object) {
                arg.create_date = new Date().toLocaleString();
                arg.update_date = new Date().toLocaleString();
                handleTableCreateAtUpdateAtChildFields(arg);
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
 * @description This decorator creates the 'update_date' fields, on the method object passed
 */
export function UpdateAtDateField(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        // pre
        args.forEach((arg) => {
            if (arg instanceof Object) {
                arg.update_date = new Date().toLocaleString();
                handleTableUpdateAtChildFields(arg);
            }
        });

        // run and store result
        const result = originalMethod.apply(this, args);

        // post
        return result;
    };

    return descriptor;
}


function handleTableCreateAtUpdateAtChildFields(object: Object) {

    for (var prop in object) {

        // Childs table must have the property '$table' in order to add 'created_date' and 'update_date' fields;
        if (object['$table'] && (!object['create_date'] && !object['update_date'])) {
            object['create_date'] = new Date().toLocaleString();
            object['update_date'] = new Date().toLocaleString();
        }

        if (object[prop] instanceof Object) {
            object['$insert_mode'] = 'transaction'; // This will tell the storage to insert as a transaction because of its dependencies
            handleTableCreateAtUpdateAtChildFields(object[prop]);
        }
    }
}

function handleTableUpdateAtChildFields(object: Object) {

    for (var prop in object) {

        // Childs table must have the property '$table' in order to add 'update_date' field;
        if (object['$table'] && !object['update_date']) {
            object['update_date'] = new Date().toLocaleString();
        }

        if (object[prop] instanceof Object) {
            object['$update_mode'] = 'transaction'; // This will tell the storage to insert as a transaction because of its dependencies
            handleTableUpdateAtChildFields(object[prop]);
        }
    }
}