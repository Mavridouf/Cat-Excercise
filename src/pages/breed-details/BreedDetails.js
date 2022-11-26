import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import ImgTile from "../../components/img-tile/ImgTile";
import CatsContext from "../../context/cats-context";
import classes from "./BreedDetails.module.css";
import BreedsContext from "../../context/breeds-context";
import BreedInfo from "../../components/breed-info/BreedInfo";

function BreedDetails() {
  const catsContext = useContext(CatsContext);
  const breedsContext = useContext(BreedsContext);

  const navigate = useNavigate();
  const params = useParams();
  const [selectedBreed, setSelectedBreed] = useState(null);

  const {
    catsList,
    loading: catsLoading,
    fetchCats,
    clearCatsList,
  } = catsContext;

  const { breedList } = breedsContext;

  useEffect(() => {
    fetchCats(9, params.id);

    return () => {
      clearCatsList();
    };
  }, [fetchCats, clearCatsList, params.id]);

  useEffect(() => {
    setSelectedBreed(breedList?.filter((breed) => breed.id === params.id)[0]);
  }, [breedList, params.id]);

  const catListImgTiles = () => {
    return catsList?.map((cat) => (
      <div key={cat.id} className={classes["tile"]}>
        <ImgTile isSmall={true} url={cat.url} id={cat.id} />
      </div>
    ));
  };

  return (
    <Modal onClose={() => navigate(`/breeds`)}>
      <div className={classes.body}>
        <div className={classes.col1}>
          {catsLoading && (
            <div className={classes["loading-container"]}>Loading ...</div>
          )}
          {!catsLoading && catsList?.length > 0 && (
            <div className={classes["tile-container"]}>{catListImgTiles()}</div>
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
