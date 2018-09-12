import { Colors } from "../enums/colors";

export class Log {

    constructor(){}

    static success(message: string){
        console.log(Colors.Cyan, message);
    }

    static error(message: string){
        console.log(Colors.Red, message);
    }
    
    static info(message: string){
        console.log(Colors.Yellow, message);
    }

    static log(message: string){
        console.log(Colors.White, message);
    }
    
}