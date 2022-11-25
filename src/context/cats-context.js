import React from "react";
import { useCats } from "../hooks/cats";

const CatsContext = React.createContext({
  catsList: null,
  loading: false,
  error: false,
  fetchCats: null,
  clearCatsList: null,
});

export default CatsContext;

export const CatsProvider = (props) => {
  const { catsList, loading, error, fetchCats, clearCatsList } = useCats();

  return (
    <CatsContext.Provider
      value={{
        catsList: catsList,
        loading: loading,
        error: error,
        fetchCats: fetchCats,
        clearCatsList: clearCatsList,
      }}
    >
      {props.children}
    </CatsContext.Provider>
  );
};
