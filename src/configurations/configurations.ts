import { AppSettings } from "./appsettings";

export class Configurations {

    constructor() {}

    GetConnectionString(connectionStringName: string): StorageConnection {
        return AppSettings.ConnectionStrings[connectionStringName];
    }
}