import NavBar from "../Components/NavBar";
import SearchResults from "../Components/SearchResults";
import DisplayItems from "../Components/DisplayItems";
import ChainRestaurant from "../Components/ChainRestaurant";
import FirmCollections from "../Components/FirmCollections";

import useSearch from "../hooks/useSearch";
import Footer from "../Components/Footer";

const LandingPage = () => {
  const { searchTerm, setSearchTerm, firms, products, loading, searchHandler } =
    useSearch();

  return (
    <div>
      <NavBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchHandler={searchHandler}
      />

      <SearchResults
        searchTerm={searchTerm}
        firms={firms}
        products={products}
        loading={loading}
      />

      <div className="landingSection">
        <DisplayItems />

        <ChainRestaurant />

        <FirmCollections />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
