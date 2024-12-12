import { useState, useEffect } from "react";
import styles from "./App.module.css";

const brandsCollection = [
  { id: "a1", brand: "Bmw" },
  { id: "a2", brand: "Mercedes" },
  { id: "a3", brand: "Audi" },
  { id: "a4", brand: "VW" },
  { id: "a5", brand: "Opel" },
  { id: "a6", brand: "Ford" },
  { id: "a7", brand: "Porsche" },
  { id: "a8", brand: "Chevrolet" },
  { id: "a9", brand: "Dodge" },
];

function App() {
  const [brands, setBrands] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [pages, setPages] = useState(0);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const sortedBrands = brandsCollection
      .sort((a, b) => a.brand.localeCompare(b.brand))
      .slice(skip, skip + limit);
    setPages(Math.ceil(brandsCollection.length / limit));
    setBrands(sortedBrands);
  }, [skip, limit]);

  function prevPageHandler() {
    setPage((state) => state - 1);
    setSkip((state) => state - limit);
  }

  function nextPageHandler() {
    setPage((state) => state + 1);
    setSkip((state) => state + limit);
  }

  return (
    <main className={styles.main}>
      <h1>Brands</h1>
      <div className={styles["items-container"]}>
        {brands.length !== 0 &&
          brands.map((e) => (
            <div className={styles.item} key={e.id}>
              {e.brand}
            </div>
          ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={prevPageHandler} disabled={page === 1}>
          prev
        </button>
        <p>
          {page} of {pages}
        </p>
        <button onClick={nextPageHandler} disabled={page === pages}>
          next
        </button>
      </div>
    </main>
  );
}

export default App;
