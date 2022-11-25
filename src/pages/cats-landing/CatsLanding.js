import React, { useContext, useEffect } from "react";
import CatsContext from "../../context/cats-context";
import Button from "../../components/button/Button";
import ImgTile from "../../components/img-tile/ImgTile";
import classes from "./CatsLanding.module.css";
import { Route, Routes } from "react-router-dom";
import CatDetails from "../cat-details/CatDetails";

function CatsLanding() {
  const catsContext = useContext(CatsContext);

  const {
    catsList: catsListData,
    loading,
    fetchCats,
    clearCatsList,
  } = catsContext;

  useEffect(() => {
    catsContext.fetchCats();
    return () => {
      clearCatsList();
    };
  }, []);

  const catListImgTiles = () => {
    return catsListData?.map((cat) => (
      <ImgTile key={cat.id} url={cat.url} id={cat.id} />
    ));
  };

  return (
    <React.Fragment>
      <div className={classes["top-row"]}>
        <Button click={fetchCats}>Update Cats</Button>
      </div>
      {loading && (
        <div className={classes["loading-container"]}>Loading ...</div>
      )}
      {!loading && (
        <div className={classes["tile-container"]}> {catListImgTiles()}</div>
      )}
      <Routes>
        <Route path=":id" element={<CatDetails />}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default CatsLanding;
