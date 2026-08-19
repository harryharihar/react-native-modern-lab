import type {ApiResponse, User} from './types';

const mockUser: User = {
  id: 1,
  name: 'Harihar',
  email: 'harihar@example.com',
  role: 'admin',
};

export async function fetchUser(): Promise<ApiResponse<User>> {
  await new Promise<void>(resolve => {
    setTimeout(resolve, 500);
  });

  return {
    success: true,
    data: mockUser,
  };
}
