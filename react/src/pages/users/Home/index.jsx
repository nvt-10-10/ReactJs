import { useEffect } from "react";
import { BusinessNewsSection } from "./BusinessNewsSection/index.jsx";
import { GlobalMarketplaceSection } from "./GlobalMarketplaceSection/index.jsx";
import { GlobalPartnersSection } from "./GlobalPartnersSection/index.jsx";
import { Slider } from "./Slider/index.jsx";
import { SupplierSelectionSection } from "./SupplierSelectionSection/index.jsx";
import { WholesaleSupplierSection } from "./WholesaleSupplierSection/index.jsx";
import { GlobalTradeConnectionSection } from "./GlobalTradeConnectionSection/index.jsx";
import { DistributorAndAgentSection } from "./DistributorAndAgentSection/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { categoryThunk } from "../../../redux-slice/categories/thunk/index.js";
import { productThunk } from "../../../redux-slice/products/thunk/product.thunk.js";
import { userThunk } from "../../../redux-slice/user/thunk/index.js";
import { Helmet } from "react-helmet";
export const Home = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { top6Products } = useSelector((state) => state.product);
  const { top4Supplier } = useSelector((state) => state.user);
  
  useEffect(() => {
    const fetchDataPromises = [];
    if (categories?.length === 0 || !categories) {
      fetchDataPromises.push(dispatch(categoryThunk.getAllCategories()));
    }

    if (top6Products?.length === 0 || !top6Products) {
      fetchDataPromises.push(dispatch(productThunk.getTop6Products()));
    }

    if (top4Supplier?.length === 0 || !top4Supplier) {
      fetchDataPromises.push(dispatch(userThunk.getTop4Suppliers()));
    }

    if ((fetchDataPromises?.length > 0) | fetchDataPromises) {
      Promise.all(fetchDataPromises);
    }
  }, [dispatch]);
  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <main>
        <Slider></Slider>
        <GlobalPartnersSection></GlobalPartnersSection>
        <SupplierSelectionSection></SupplierSelectionSection>
        <GlobalMarketplaceSection></GlobalMarketplaceSection>
        <WholesaleSupplierSection></WholesaleSupplierSection>
        <DistributorAndAgentSection></DistributorAndAgentSection>
        <BusinessNewsSection></BusinessNewsSection>
        <GlobalTradeConnectionSection></GlobalTradeConnectionSection>
      </main>
    </>
  );
};
