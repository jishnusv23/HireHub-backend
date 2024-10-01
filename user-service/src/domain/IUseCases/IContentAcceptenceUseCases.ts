import { contentEntities } from "../entities";

export interface IContentAcceptenceUseCases {
  execute: (id: string, AdminAccept: boolean) => Promise<contentEntities | null>;
} 
