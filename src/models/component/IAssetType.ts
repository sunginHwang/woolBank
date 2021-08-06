export interface IAssetType<T = string> {
  id?: number;
  type: T | string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
