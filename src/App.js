import React, { Suspense } from "react";
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import classes from "./App.module.css";
import Header from "./components/header/Header";
import { BreedsProvider } from "./context/breeds-context";
import { CatDetailsProvider } from "./context/cat-details-context";
import { ToastsProvider } from "./context/toasts-context";
import Toasts from "./components/toasts/Toasts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldCat } from "@fortawesome/free-solid-svg-icons";

// TODO
// Implement Responsiveness with media queries

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
      <CatDetailsProvider>
        <div className="App">
          <Toasts />
          <Header/>
          <div className={classes.container}>
            <div className={classes["routes-wrapper"]}>
              <Suspense fallback={<SuspenseFallback />}>
                <Routes>
                  <Route
                    path="*"
                    element={
                      <h1>
                        404 Page Not Found try navigating to{" "}
                        <NavLink to="cats">Cats Home Page</NavLink>
                      </h1>
                    }
                  />
                  <Route path="/" element={<Navigate replace to="/cats" />} />
                  <Route path="/cats/*" element={<CatsMainPage />}/>
                  <Route
                    path="/breeds/*"
                    element={
                      <BreedsProvider>
                        <BreedsPage />
                      </BreedsProvider>
                    }
                  />
                  <Route
                    path="/favourites"
                    element={<FavouritesPage />}
                  />
                </Routes>
              </Suspense>
            </div>
          </div>
        </div>
      </CatDetailsProvider>
    </ToastsProvider>
  );
}

export default App;
