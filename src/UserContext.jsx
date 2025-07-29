// IMPORT

import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

// API

import { GET_USERS, GET_POSITIONS, POST_TOKEN } from "./scripts/Api";

// CONTEXT

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // STATE

  const [page, setPage] = useState(1);
  const [positions, setPositions] = useState([]);
  const [isSend, setIsSend] = useState(false);

  // QUERY

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["user", page],
    queryFn: () => GET_USERS(page),
    placeholderData: keepPreviousData,
  });

  // CONSTANT

  const usersData = data;
  const total_pages = data?.total_pages ?? 1;

  const fetchPositions = async () => {
    const positions = await GET_POSITIONS();
    setPositions(positions);
  };

  // EFFECT

  // SCROLL TO TOP

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 80);

    return () => clearTimeout(timer);
  }, []);

  // FETCH

  useEffect(() => {
    fetchPositions();
  }, []);

  // BODY

  return (
    <UserContext.Provider
      value={{
        usersData,
        page,
        total_pages,
        setPage,
        isLoading,
        error,
        positions,
        isSend,
        setIsSend,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
