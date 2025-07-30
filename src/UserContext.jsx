// IMPORT

import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

// API

import { GET_USERS, GET_POSITIONS } from "./scripts/Api";

// CONTEXT

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // STATE
  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(1);
  const [contactData, setContactData] = useState([]);
  const [positions, setPositions] = useState([]);
  const [isSend, setIsSend] = useState(false);

  // QUERY

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", page, isSend],
    queryFn: () => GET_USERS(page),
    placeholderData: keepPreviousData,
  });

  // SET CONTACTS DATA

  useEffect(() => {
    if (data?.users) {
      if (page > 1) {
        setContactData((prevUsers) => [...prevUsers, ...data.users]);
      } else setContactData(data.users);
    }
  }, [data]);

  // GET / SET DATA POSITION

  useEffect(() => {
    POSITION_DATA();
  }, []);

  const POSITION_DATA = async () => {
    try {
      const positions = await GET_POSITIONS();
      setPositions(positions);
    } catch (error) {
      console.error("Failed to fetch positions", error);
    }
  };

  // PAGE

  const total_pages = data?.total_pages ?? 1;

  // LOCK BODY

  useEffect(() => {
    document.documentElement.classList.toggle("lock", showModal);
  }, [showModal]);

  // BODY

  return (
    <UserContext.Provider
      value={{
        contactData,
        positions,
        page,
        setPage,
        total_pages,
        isLoading,
        isError,
        isSend,
        setIsSend,
        showModal,
        setShowModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
