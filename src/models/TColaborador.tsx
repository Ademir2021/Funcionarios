export type TColaborador = {
  id: number | string;
  nome: string;
  email: string;
  departamento: string;
  status:boolean
}

export enum TScreen {
    firstScreen,
    secondScreen,
    EndScreen
}

// export enum TDepartamento {
//   Desing = "Desing",
//   TI = "TI",
//   Marketing = "Marketing",
//   Produto = "Produto"
// }