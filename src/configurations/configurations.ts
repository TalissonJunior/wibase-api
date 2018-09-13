import { AppSettings } from "./appsettings";


export class Configurations {

    constructor() {}

    GetConnectionString(connectionStringName: string): object {
        return AppSettings.connectionStrings[connectionStringName];
    }
}