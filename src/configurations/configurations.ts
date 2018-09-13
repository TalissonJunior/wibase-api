import * as appSettings from './appSettings.json';

export class Configurations {

    constructor() {

        if(!appSettings){
            throw new Error('Could not find "appsettings.json" in "configurations" folder.')
        }
    }

    GetConnectionString(connectionStringName: string): object {
        return appSettings['connectionStrings'][connectionStringName];
    }
}