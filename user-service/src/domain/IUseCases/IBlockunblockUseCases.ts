import { UserEntities } from "../entities";

export interface IBlockUnblockUseCases {
  execute: (id: string, isBlocked: boolean) => Promise<UserEntities | null>;
}