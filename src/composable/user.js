import axios from "axios";

const roleName = {
  superAdmin: "Super Admin",
  admin: "Admin",
};

const convertRoleName = (results) => {
  try {
    const newResult = [];
    results.forEach((result) => {
      result.role = roleName[result.role];
      newResult.push(result);
    });
    return newResult;
  } catch (err) {
    throw err;
  }
};

export const getList = async (cookies) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_ADDRESS}/api/v1/user/all`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      }
    );
    if (response && response.status == 200) {
      return convertRoleName(response.data.data);
    }
  } catch (err) {
    throw err;
  }
};

export const checkUsernameExists = async (username, cookies) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_ADDRESS}/api/v1/user/check-username`,
      { username: username },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      }
    );
    if (response && response.status === 200) {
      return !response.data.data;
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
};

export const getDetail = async (id, cookies) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_ADDRESS}/api/v1/user/show?id=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      }
    );
    if (response && response.status === 200) {
      return response.data.data;
    }
  } catch (err) {
    throw err;
  }
};

export const store = async (username, password, cookies) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_ADDRESS}/api/v1/user/store`,
      { username: username, password: password, role: "admin" },
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

export const update = async (id, username, password, cookies) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_ADDRESS}/api/v1/user/update`,
      { id: id, username: username, password: password, role: "admin" },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      }
    );
    if (response && response.status == 200) {
      return response.data;
    }
  } catch (err) {
    throw err;
  }
};

export const drop = async (id, cookies) => {
  try {
    return await axios.delete(
      `${import.meta.env.VITE_API_ADDRESS}/api/v1/user/delete?id=${id}`,
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
