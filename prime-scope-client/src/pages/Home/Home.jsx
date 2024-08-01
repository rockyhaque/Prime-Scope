import Banner from "../../components/Banner/Banner";
import Pricing from "../../components/Pricing/Pricing";
import Support from "../../components/Support/Support";
import TabCategories from "../../components/TabCategories/TabCategories";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TabCategories></TabCategories>
            <Pricing></Pricing>
            <Support></Support>
        </div>
    );
};

export default Home;