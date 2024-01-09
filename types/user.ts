export default interface IUser {
  id: string;
  username: string;
  oldPassword?: string;
  password?: string;
  role: string;
}