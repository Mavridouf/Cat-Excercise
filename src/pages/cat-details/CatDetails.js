import React, { Fragment, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Modal from "../../components/modal/Modal";
import Button from "../../components/button/Button";
import CatDetailsContext from "../../context/cat-details-context";
import classes from "./CatDetails.module.css";
import BreedInfo from "../../components/breed-info/BreedInfo";
import ToastsContext, { toastTypes } from "../../context/toasts-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faHeart } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../components/spinner/Spinner";
import { useFavourites } from "../../hooks/favourites";

function CatDetails() {
  const catDetailsContext = useContext(CatDetailsContext);
  const { addToast } = useContext(ToastsContext);

  const { addToFavourites } = useFavourites();
  const params = useParams();
  const navigate = useNavigate();

  const { fetchCatDetails, clearDetails, catDetails, loading } =
    catDetailsContext;

  useEffect(() => {
    if (catDetails) return;
    fetchCatDetails(params.id);

    return () => {
      clearDetails();
    };
  }, [fetchCatDetails, clearDetails, params.id]);

  const copyImgUrl = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => addToast(toastTypes.Info, "Copied Modal URL"))
      .catch(() => addToast(toastTypes.Error, "Failed to Copy Modal URL"));
  };

  return (
    <Modal onClose={() => navigate(`/cats`)}>
      <div className={classes["body"]}>
        {loading && <Spinner />}
        {!loading && catDetails && (
          <Fragment>
            <div className={classes.col1}>
              <img src={catDetails.url}/>
            </div>
            <div className={classes.col2}>
              {catDetails.breeds && catDetails.breeds.length > 0 && (
                <div className={classes["breed-info-container"]}>
                  <BreedInfo breed={catDetails.breeds[0]} />
                </div>
              )}
              {(!catDetails.breeds || catDetails.breeds.length === 0) && (
                <div className={classes["no-details-container"]}>
                  No Details found
                </div>
              )}
              <div className={classes["footer"]}>
                <Button click={() => addToFavourites(catDetails.id)}>
                  <FontAwesomeIcon
                    className={classes["btn-icon"]}
                    icon={faHeart}
                  />
                  Fav it
                </Button>
                <Button click={copyImgUrl}>
                  <FontAwesomeIcon
                    className={classes["btn-icon"]}
                    icon={faCopy}
                  />
                  Copy Link
                </Button>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Modal>
  );
}

export default CatDetails;
