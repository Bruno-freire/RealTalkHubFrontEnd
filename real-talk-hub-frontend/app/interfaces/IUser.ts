export interface IUserBase {
    id: string;
    name: string;
    email: string;
    password: string;
  }
  
  export interface ICreateUser extends IUserBase {
    name: string;
    email: string;
    password: string;
  }
  
  export interface ILoginUser {
    email: string;
    password: string;
  }

