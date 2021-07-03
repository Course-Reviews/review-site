import axios from 'axios';

export const getHeaders = () => {
  const token = localStorage.getItem('token');

  if (!token) return null;
  const headers = { Authorization: `Bearer ${token}` };

  return headers;
};

// NOTE: PUT YOUR IP ADDRESS HERE
export const getData = async (url, data) => {
  // console.log(process.env.NEXT_PUBLIC_HOST);
  const response = await axios
    .get(
      `${process.env.NEXT_PUBLIC_HOST}/${url}`,
      {
        headers: getHeaders(),
        ...(data && { params: data }),
      }
    )
    .then((response) => response)

    .catch((error) => {
      // console.log(error);
      if (!error?.response) {
        // in case the server goes down or something, instead of saying undefined give this error
        throw new Error('Sorry the server is currently sleeping, come back later');
      }
      throw new Error(`${error.response.status}: ${error.response.data.message}`);
    });
  return response;
};

export const getDataServerside = async (url, data) => {
  // console.log(process.env.NEXT_PUBLIC_HOST);
  const response = await axios
    .get(
      `${process.env.NEXT_PUBLIC_HOST}/${url}`,

      {
        ...(data && { params: data }),
      }
    )
    .then((response) => response)

    .catch((error) => {
      // console.log(error);
      if (!error?.response) {
        // in case the server goes down or something, instead of saying undefined give this error
        throw new Error('Sorry the server is currently sleeping, come back later');
      }
      throw new Error(`${error.response.status}: ${error.response.data.message}`);
    });
  return response;
};


export const postData = async (url, data = {}) => {
  const response = await axios
    .post(`${process.env.NEXT_PUBLIC_HOST}/${url}`, data, {
      headers: getHeaders(),
    })
    .then((response) => response)
    .catch((error) => {
      if (!error?.response) {
        throw new Error('Sorry the server is currently sleeping, come back later');
      }
      throw new Error(`${error.response.status}: ${error.response.data.message}`);
    });
  return response;
};

export const patchData = async (url, data = {}) => {
  console.log(`${process.env.NEXT_PUBLIC_HOST}/${url}`);
  const response = await axios
    .patch(`${process.env.NEXT_PUBLIC_HOST}/${url}`, data, {
      headers: getHeaders(),
    })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
      if (!error?.response) {
        throw new Error('Sorry the server is currently sleeping, come back later');
      }
      throw new Error(`${error.response.status}: ${error.response.data.message}`);
    });
  return response;
};
