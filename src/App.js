import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import classes from "./App.module.css";
import Header from "./components/header/Header";
import { CatsProvider } from "./context/cats-context";
import { BreedsProvider } from "./context/breeds-context";
import { CatDetailsProvider } from "./context/cat-details-context";
import { ToastsProvider } from "./context/toasts-context";
import Toasts from "./components/toasts/Toasts";
import { FavouritesProvider } from "./context/favourites-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldCat } from "@fortawesome/free-solid-svg-icons";

// In such a small app it might not make sense to implement Route based Lazy Loading

const CatsMainPage = React.lazy(() =>
  import("./pages/cats-landing/CatsLanding")
);
const BreedsPage = React.lazy(() => import("./pages/breeds/Breeds"));
const FavouritesPage = React.lazy(() =>
  import("./pages/favourites/Favourites")
);

const SuspenseFallback = () => {
  return (
    <div
      style={{
        height: window.innerHeight - 194,
      }}
      className={classes["suspense-fallback-container"]}
    >
      <FontAwesomeIcon
        className={classes["suspense-badge-icon"]}
        icon={faShieldCat}
        size="6x"
        beat
      />
    </div>
  );
};

function App() {
  return (
    <ToastsProvider>
      <div className="App">
        <Toasts />
        <Header></Header>
        <Suspense fallback={<SuspenseFallback />}>
          <div className={classes.container}>
            <Routes>
              <Route path="/" element={<Navigate replace to="/cats" />} />
              <Route
                path="/cats/*"
                element={
                  <CatsProvider>
                    <CatDetailsProvider>
                      <CatsMainPage />
                    </CatDetailsProvider>
                  </CatsProvider>
                }
              ></Route>
              <Route
                path="/breeds/*"
                element={
                  <BreedsProvider>
                    <CatsProvider>
                      <BreedsPage />
                    </CatsProvider>
                  </BreedsProvider>
                }
              ></Route>
              <Route
                path="/favourites"
                element={
                  <FavouritesProvider>
                    <FavouritesPage />
                  </FavouritesProvider>
                }
              ></Route>
            </Routes>
          </div>
        </Suspense>
      </div>
    </ToastsProvider>
  );
}

export default App;
