import { Dialect } from "../business/enums/dialect.enum";

export const AppSettings: AppSettings = {
    ConnectionStrings: {
        DefaultConnection:{
            server: "localhost",
            port: "27017",
            database: "wibase",
            user: "",
            password: "",
            dialect: Dialect.MONGODB
        }
    }
}