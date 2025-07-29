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
const tokenResponse = await axios.post("/token");

const TOKEN = tokenResponse.data.token;

console.log(TOKEN);

export const POST_USER = async (FORM_DATA) => {
  try {
    const response = await axios.post("/users", FORM_DATA, {
      headers: {
        "accept": "application/json",
        "Token": TOKEN,
        ...FORM_DATA.getHeaders?.()
      },
    });
    return response.data;
  } catch (error) {
    console.log(
      "Error POST users:",
      error.response?.status,
      error.response?.data
    );
    return [];
  }
};
