import { useEffect } from "react";
import { BusinessNewsSection } from "./BusinessNewsSection/BusinessNewsSection";
import { GlobalMarketplaceSection } from "./GlobalMarketplaceSection/GlobalMarketplaceSection";
import { GlobalPartnersSection } from "./GlobalPartnersSection/GlobalPartnersSection";
import { GlobalTradeConnectionSection } from "./GlobalTradeConnectionSection/GlobalTradeConnectionSection";
import { Slider } from "./Slider/Slider";
import { SupplierSelectionSection } from "./SupplierSelectionSection/SupplierSelectionSection";
import { WholesaleSupplierSection } from "./WholesaleSupplierSection/WholesaleSupplierSection.js";
import { DistributorAndAgentSection } from "./DistributorAndAgentSection/DistributorAndAgentSection.js";
import { useDispatch, useSelector } from "react-redux";
import { categoryThunk } from "../../../redux-slice/categories/thunk";
import { productThunk } from "../../../redux-slice/products/thunk/product.thunk.js";
import { userThunk } from "../../../redux-slice/user/thunk";
export const Home = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { top6Products } = useSelector((state) => state.product);
  const { top4Supplier } = useSelector((state) => state.user);
  useEffect(() => {
    document.title = "Trang chủ";
    const fetchDataPromises = [];

    if (categories.length === 0) {
      fetchDataPromises.push(dispatch(categoryThunk.getAllCategories()));
    }

    if (top6Products.length === 0) {
      fetchDataPromises.push(dispatch(productThunk.getTop6Products()));
    }

    if (top4Supplier.length === 0) {
      fetchDataPromises.push(dispatch(userThunk.getTop4Suppliers()));
    }

    if (fetchDataPromises.length > 0) {
      Promise.all(fetchDataPromises);
    }
  }, [dispatch, categories.length, top6Products.length, top4Supplier.length]);
  return (
    <>
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
