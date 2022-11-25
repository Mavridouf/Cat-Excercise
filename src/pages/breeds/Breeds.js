import { Fragment, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import BreedItem from "../../components/breed-item/BreedItem";
import BreedsContext from "../../context/breeds-context";
import BreedDetails from "../breed-details/BreedDetails";
import classes from "./Breeds.module.css";

function Breeds() {
  const breedsContext = useContext(BreedsContext);

  const { breedList, loading, fetchBreeds, clearBreedList } = breedsContext;

  useEffect(() => {
    fetchBreeds();

    return () => clearBreedList();
  }, []);

  const breedListItems = () => {
    return breedList?.map((breed) => (
      <BreedItem key={breed.id} id={breed.id} name={breed.name} />
    ));
  };

  return (
    <Fragment>
      {loading && (
        <div className={classes["loading-container"]}>Loading ...</div>
      )}
      {!loading && breedList?.length > 0 && (
        <div className={classes["breeds-container"]}>{breedListItems()}</div>
      )}
      <Routes>
        <Route path=":id" element={<BreedDetails />}></Route>
      </Routes>
    </Fragment>
  );
}

export default Breeds;
