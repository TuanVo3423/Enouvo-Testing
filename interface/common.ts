export interface IMatrix {
  id : string;
  alias: string | '';
  feature: ApprovalMatrixType | undefined;
  minimum: number | undefined;
  maximum: number | undefined;
  number_of_approval: number | undefined;
}
export enum ApprovalMatrixType {
  Default = "Default",
  TransferOnline = "Transfer Online",
}

export enum InputType {
  Text = "text",
  Number = "number",
}
