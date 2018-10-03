import { WibaseRepository } from '../../repository/repositories/wibase.repository';
import { BaseBusiness } from './base.business';

export class WibaseBusiness extends BaseBusiness<WibaseRepository> {

    constructor(repository: WibaseRepository){
        super(repository);
     }
}