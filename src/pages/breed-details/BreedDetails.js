import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import ImgTile from "../../components/img-tile/ImgTile";
import classes from "./BreedDetails.module.css";
import BreedsContext from "../../context/breeds-context";
import BreedInfo from "../../components/breed-info/BreedInfo";
import TileGrid from "../../components/tile-grid/TileGrid";
import Spinner from "../../components/spinner/Spinner";
import { useCats } from "../../hooks/cats";
import CatDetailsContext from "../../context/cat-details-context";

function BreedDetails() {
  const {
    catsList,
    loading: catsLoading,
    fetchCats,
    clearCatsList,
  } = useCats();

  const { breedList } = useContext(BreedsContext);
  const { setCatDetails } = useContext(CatDetailsContext);

  const navigate = useNavigate();
  const params = useParams();
  const [selectedBreed, setSelectedBreed] = useState(null);

  useEffect(() => {
    fetchCats(9, params.id);

    return () => {
      clearCatsList();
    };
  }, [fetchCats, clearCatsList, params.id]);

  useEffect(() => {
    setSelectedBreed(breedList?.filter((breed) => breed.id === params.id)[0]);
  }, [breedList, params.id]);

  const handleImgTileClick = (cat) => {
    setCatDetails(cat);
    navigate(`/cats/${cat.id}`);
  };

  const catListImgTiles = () => {
    return catsList?.map((cat) => (
      <ImgTile
        onClick={() => {
          handleImgTileClick(cat);
        }}
        key={cat.id}
        url={cat.url}
      />
    ));
  };

  return (
    <Modal onClose={() => navigate(`/breeds`)}>
      <div className={classes.body}>
        <div className={classes.col1}>
          {catsLoading && <Spinner />}
          {!catsLoading && catsList?.length > 0 && (
            <TileGrid isSmall={true}>{catListImgTiles()}</TileGrid>
          )}
        </div>
        <div className={classes.col2}>
          {selectedBreed && <BreedInfo breed={selectedBreed} />}
        </div>
      </div>
    </Modal>
  );
}

export default BreedDetails;
