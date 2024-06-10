import axios from 'axios';

export const AuthReqApiHandler = async <T, R>(
  endPoint: string,
  data: T,
): Promise<R | undefined> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/${endPoint}`,
      data,
      { withCredentials: true },
    );

    if (res.status !== 200) {
      throw new Error(res.data.message || 'Unknown error occurred');
    }

    return res.data;
  } catch (error: any) {
    throw error.response?.data.message || 'failed';
  }
};
