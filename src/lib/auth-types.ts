export interface SignUpData {
  email: string;
  password: string;
  nickname: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface KakaoSignUpData {
  code: string;
  nickname: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    createdAt: string;
    email: string;
    id: number;
    nickname: string;
    profileImageUrl: string;
    updatedAt: string;
  };
}
