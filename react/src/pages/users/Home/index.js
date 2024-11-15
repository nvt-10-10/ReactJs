import { useEffect } from "react";
import { BusinessNewsSection } from "./BusinessNewsSection";
import { GlobalMarketplaceSection } from "./GlobalMarketplaceSection";
import { GlobalPartnersSection } from "./GlobalPartnersSection";
import { Slider } from "./Slider";
import { SupplierSelectionSection } from "./SupplierSelectionSection";
import { WholesaleSupplierSection } from "./WholesaleSupplierSection";
import { GlobalTradeConnectionSection } from "./GlobalTradeConnectionSection";
import { DistributorAndAgentSection } from "./DistributorAndAgentSection";
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
