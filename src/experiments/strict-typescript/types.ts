export type User = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
};

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  message: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
