
export function CreateUpdateDate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value; // save a reference to the original method

    // NOTE: Do not use arrow syntax here. Use a function expression in 
    // order to use the correct value of `this` in this method (see notes below)
    descriptor.value = function(...args: any[]) {
        // pre, this code will before the method being called
        args.forEach((arg) => {
            if(typeof(arg) === 'object'){
                arg.create_date = new Date();
                arg.update_date = new Date();
            }
        });

        // run and store result, this will trigger the method to run
        const result = originalMethod.apply(this, args);

        // post, this code will run after the method being called
        // return the result of the original method (or modify it before returning)
        return result;
    };

    return descriptor;
}