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

    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message || 'An error occurred';
    }
    throw 'An unexpected error occurred';
  }
};
