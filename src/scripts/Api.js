import axios from "axios";

axios.defaults.baseURL =
  "https://frontend-test-assignment-api.abz.agency/api/v1";

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

export const POST_USER = async (FORM_DATA) => {
  try {
    const tokenResponse = await axios.get("/token");
    const TOKEN = tokenResponse.data.token;

    console.log(TOKEN);

    const CONFIG = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axios.post("/users", FORM_DATA, CONFIG);
    return response.data;
  } catch (error) {
    alert("Error POST users:", error.message);
    return [];
  }
};
