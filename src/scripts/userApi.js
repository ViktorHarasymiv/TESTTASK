import axios from "axios";

axios.defaults.baseURL =
  "https://frontend-test-assignment-api.abz.agency/api/v1";

const TOKEN =
  "eyJpdiI6ImZVaTV3UnpZXC9paWZzNUs0TGlndkRBPT0iLCJ2YWx1ZSI6IitIRFl5SDNKWTNuaVVibWlcL2ZIT0x5VTR6WkhQbExuTjRzMFZwQzNPQnV0czQwUEhOVFwvSVBqakhUYWM5bjRya3Y0ait3OVc0K2FGYnIyOElBMExPTVE9PSIsIm1hYyI6IjllMWJmMGExY2NjMjA0ZTAxY2RkMmE4MjlhYTFjMWE0YTljZTVhODIxZGFjMWE0NDMzYTBlMTZlNDQ4NThhYWMifQ==";

// GET

export const GET_USERS = async (page, count = 6) => {
  const params = {
    params: {
      page,
      count,
    },
  };
  try {
    const response = await axios.get("/users", params);

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// GET (POSITION VALUE)

export const GET_POSITIONS = async () => {
  try {
    const response = await axios.get("/positions");
    const positions = response.data.positions;
    return positions;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// POST

export const POST_TOKEN = async () => {
  try {
    const response = await axios.post("/token");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const POST_USER = async (FORM_DATA) => {
  const CONFIG = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response = await axios.post("/users", CONFIG, FORM_DATA);
    return response.data;
  } catch (error) {
    console.error("Error POST users:", error);
    return [];
  }
};
