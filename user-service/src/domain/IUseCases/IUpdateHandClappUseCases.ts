
export interface IUpdateHandClappUseCases {
  execute:( hhandClapp:number,id:string)=>Promise<string|null>
}