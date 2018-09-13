import * as os from 'os';

export class Network {
    interfaces = os.networkInterfaces();

    constructor() { }

    getIPAddresses(): Array<string> {
        var addresses = [];
        
        for (var k in this.interfaces) {
            for (var k2 in this.interfaces[k]) {
                var address = this.interfaces[k][k2];
                if (address.family === 'IPv4' && !address.internal) {
                    addresses.push(address.address);
                }
            }
        }

        return addresses;
    }

}
