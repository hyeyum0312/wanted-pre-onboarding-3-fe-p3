import { User } from '../types/user'
import { BASE_URL } from './const'

type LoginResult = 'success' | 'fail'

export interface LoginRequest {
  username: string
  password: string
}

export const login = async (args: LoginRequest): Promise<LoginResult> => {
  // TODO: POST, '/auth/login' 호출
  // body에는 { username, password }가 들어가야 함
  // 사용하는 기술에 맞추어 적절히 withCredential 설정하기
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    credentials:'include', // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include'
    },
    body: JSON.stringify(args)
  })
  const loginResJson = await loginRes.json()
  console.log('loginResJson>>>',loginResJson)
  return loginRes.ok ? 'success' : 'fail'
}

export const getCurrentUserInfo = async (): Promise<User | null> => {
  // TODO: GET, '/profile' 호출
  // 호출 성공시 유저 정보 반환
  console.log('TODO: GET profile 호출');
  try {
    const userInfoRes = await fetch(`${ BASE_URL }/profile`, {
      method: 'GET',
      credentials:'include',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
        Accept: "application/json",
      }
    });
    console.log('userInfoRes profile',userInfoRes);
    const userInfoResJson = await userInfoRes.json();
    console.log('userInfoResJson',userInfoResJson);
    return userInfoRes.ok ? userInfoResJson : null
  } catch (e) {
    console.error(e)
    return null
  }
}
