import React, { useContext, useEffect } from "react";
import Button from "../../components/button/Button";
import ImgTile from "../../components/img-tile/ImgTile";
import classes from "./CatsLanding.module.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import CatDetails from "../cat-details/CatDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import TileGrid from "../../components/tile-grid/TileGrid";
import Spinner from "../../components/spinner/Spinner";
import { useCats } from "../../hooks/cats";
import CatDetailsContext from "../../context/cat-details-context";

function CatsLanding() {
  const navigate = useNavigate();

  const {
    catsList: catsListData,
    loading,
    fetchCats,
    clearCatsList,
  } = useCats();

  const { setCatDetails } = useContext(CatDetailsContext);

  useEffect(() => {
    fetchCats(10);
    return () => {
      clearCatsList();
    };
  }, [fetchCats, clearCatsList]);

  const handleImgTileClick = (cat) => {
    setCatDetails(cat);
    navigate(cat.id);
  };

  const catListImgTiles = () => {
    return catsListData?.map((cat) => (
      <ImgTile
        onClick={() => handleImgTileClick(cat)}
        key={cat.id}
        url={cat.url}
      />
    ));
  };

  return (
    <React.Fragment>
      <div className={classes["top-row"]}>
        <Button click={() => fetchCats(10)}>
          <FontAwesomeIcon className={classes["btn-icon"]} icon={faRefresh} />
          Update Cats
        </Button>
      </div>
      {loading && <Spinner />}
      {!loading && <TileGrid>{catListImgTiles()}</TileGrid>}
      <Routes>
        <Route path=":id" element={<CatDetails />}/>
      </Routes>
    </React.Fragment>
  );
}

export default CatsLanding;
