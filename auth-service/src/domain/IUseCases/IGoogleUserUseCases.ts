import { constant } from "../../_lib/common/constant";

export interface IGoogleUserUseCase{
    execute(data:constant):Promise<constant>
}