export type UserData = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

type User = {
  name: string;
  email: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
}

export type LoginData = {
  email: string;
  password: string;
}

export type UpdateData = {
  name: string;
  email: string;
  token: string;
}



