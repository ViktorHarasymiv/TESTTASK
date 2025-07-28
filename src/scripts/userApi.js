import axios from "axios";

axios.defaults.baseURL =
  "https://frontend-test-assignment-api.abz.agency/api/v1";

const TOKEN =
  "eyJpdiI6ImxTZWwrZnpBZmljR1p3bWJZbTBsV1E9PSIsInZhbHVlIjoiNWJqWFFveDk1K2tUVEk2bWdOR0NtTU1EdjRcL2F4NHVMUjBOUHlwMmdNUVwvZ3VySG5EdXFTb2hSUk9rQmpYR3RQUnRBaUxJbkpPRkFTVkhjd1RhQzZ4Zz09IiwibWFjIjoiOTExNDc1YjQ3NzQ4MTVjNmM2ZDYwNmJmMDZjNGVlZGY0YjQ4MjM0YmM0M2U2NmJkMjgwMWY1MTc4ZGJkMjVlMCJ9";
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
