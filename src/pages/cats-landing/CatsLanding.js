import React, { useContext, useEffect } from "react";
import CatsContext from "../../context/cats-context";
import Button from "../../components/button/Button";
import ImgTile from "../../components/img-tile/ImgTile";
import classes from "./CatsLanding.module.css";
import { Route, Routes } from "react-router-dom";
import CatDetails from "../cat-details/CatDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
function CatsLanding() {
  const catsContext = useContext(CatsContext);

  const {
    catsList: catsListData,
    loading,
    fetchCats,
    clearCatsList,
  } = catsContext;

  useEffect(() => {
    fetchCats(10);
    return () => {
      clearCatsList();
    };
  }, [fetchCats, clearCatsList]);

  const catListImgTiles = () => {
    return catsListData?.map((cat) => (
      <ImgTile key={cat.id} url={cat.url} id={cat.id} />
    ));
  };

  return (
    <React.Fragment>
      <div className={classes["top-row"]}>
        <Button click={() => fetchCats(10)}>
          {" "}
          <FontAwesomeIcon className={classes["btn-icon"]} icon={faRefresh} />
          Update Cats
        </Button>
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
