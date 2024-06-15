import axios from 'axios';

interface SliceApiHanlderType<T> {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  url: string;
  data?: T;
}

export const SliceApiHanlder = async <T, R>({
  method,
  url,
  data,
}: SliceApiHanlderType<T>): Promise<R> => {
  try {
    const res = await axios({
      method,
      url,
      withCredentials: true,
      data,
    });

    return res.data;
  } catch (error: any) {
    throw error.response?.data.message || 'failed';
  }
};
