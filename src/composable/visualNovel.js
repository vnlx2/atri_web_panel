import axios from "axios";

export const getList = async (cookies, page = 1, keyword="") => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_ADDRESS
      }/api/v1/visualnovel/list?page=${(page == 'undefined' ? 1 : page)}&keyword=${keyword}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      }
    );
    if (response && response.status == 200) {
      return response.data.data;
    }
  } catch (err) {
    throw err.response.data;
  }
};

export const getDetail = async (code, cookies) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_ADDRESS
      }/api/v1/visualnovel/detail?code=${code}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const getTitle = async (code, cookies) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_ADDRESS
      }/api/v1/visualnovel/title?code=${code}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      }
    );
    if (response && response.status == 200) {
      return response.data.data;
    }
  } catch (err) {
    throw err.response.data;
  }
};

export const store = async (code, downloadUrls, cookies) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_ADDRESS}/api/v1/visualnovel/store`,
      { code: code, downloadUrl: downloadUrls },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      }
    );
    if (response && response.status == 201) {
      return response.data;
    }
  } catch (err) {
    throw err;
  }
};

export const update = async (code, downloadUrls, cookies) => {
  try {
    return await axios.put(
      `${import.meta.env.VITE_API_ADDRESS}/api/v1/visualnovel/update`,
      { code: code, downloadUrl: downloadUrls },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      }
    );
  } catch (err) {
    throw err;
  }
};

export const drop = async (code, cookies) => {
  try {
    return await axios.delete(
      `${
        import.meta.env.VITE_API_ADDRESS
      }/api/v1/visualnovel/delete?code=${code}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      }
    );
  } catch (err) {
    throw err;
  }
};
