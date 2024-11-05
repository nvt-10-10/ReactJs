import "react-select2-wrapper/css/select2.css";
import Select2 from "react-select2-wrapper";
import logoHeader from "../../../assets/images/logo/logo-header.png";
import iconSearch from "../../../assets/images/icons/search.svg";
import iconCategory from "../../../assets/images/icons/category.svg";
import iconArrowUp from "../../../assets/images/icons/arrow-up.svg";
import iconApple from "../../../assets/images/icons/apple.svg";
import iconHeart from "../../../assets/images/icons/heart.svg";
import iconCart from "../../../assets/images/icons/cart.svg";
import { useEffect, useState } from "react";
import DropdownAction from "./dropdown-action";
import "../../../assets/scss/common/custom-dropdown.scss";
import "./header.scss";
import DropdownLanguage from "./dropdown-language";
import Image from "../../Image/Image";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { categoryThunk } from "../../../redux-slice/categories/thunk/category.thunk";
export const Header = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const [retryCount, setRetryCount] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const isLogin = useSelector((state) => state.auth.isLogin);

  const navs = [
    { name: "Nhà cung cấp", link: "/supplier" },
    { name: "Yêu cầu báo giá", link: "#" },
    { name: "Tìm nhà phân phối", link: "#" },
    { name: "Kết nối giao thương", link: "#" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(categoryThunk.getAllCategories());
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        if (retryCount < 2) {
          setRetryCount((prevCount) => prevCount + 1);
        }
      }
    };

    if (!categories || categories.length === 0) {
      fetchData();
    }
  }, [dispatch, retryCount]);

  // Log khi categories cập nhật
  useEffect(() => {
    console.log("Categories updated:", categories);
  }, [categories]);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("headerSticky");
      const headerTop = header.offsetTop;
      if (window.scrollY > headerTop && !isSticky) {
        setIsSticky(true);
      } else if (window.scrollY <= headerTop && isSticky) {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClickCategory = () => {
    setShowCategory(!showCategory);
  };
  return (
    <>
      <header id="header">
        <div className="container">
          <div className="header-top d-flex flex-wrap align-items-center justify-content-between ">
            <a href="javaScript:void((0)">Chào mừng đến với Vitrade - Kết nối tạo giá trị</a>
            <div className="d-flex align-items-center">
              <div className="d-flex gap-8">
                <DropdownLanguage label="Quốc gia"></DropdownLanguage>
                <DropdownLanguage label="Ngôn ngữ"></DropdownLanguage>
              </div>
              {!isLogin && (
                <div className="d-flex gap-8 action-auth">
                  <Link className="auth-link" to="/auth/register">
                    Đăng kí
                  </Link>
                  <Link className="auth-link" to="/auth/login">
                    Đăng nhập
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="header-mid d-flex align-items-center justify-content-between">
            <Image src={logoHeader} className="logo" />
            <div className="d-none d-sm-flex  align-items-center">
              <form className="form-search">
                <div className="d-flex align-content-center wrap">
                  <Image src={iconSearch} />
                  <input className=" input-search" type="text" name="search" placeholder="Tìm kiếm hơn 1.8K sản phẩm & đối tác. Nhấn Enter..." />
                  {console.log(categories)}
                  {categories && categories.length > 0 && (
                    <Select2
                      data={categories
                        .filter((item) => item.id !== undefined) // Bỏ qua các mục không có id
                        .map((item, index) => ({
                          text: item.name || "Không có tên", // Nếu không có tên, gán mặc định
                          value: item.id || `option-${index}`, // Sử dụng index để tạo giá trị tạm thời duy nhất
                        }))}
                      options={{
                        placeholder: "Chọn danh mục",
                        allowClear: true,
                        minimumResultsForSearch: Infinity,
                      }}
                      style={{ width: "100%" }} // optional styling
                    />
                  )}
                </div>
              </form>

              <div className="d-flex align-items-center gap-10 ml-12 ">
                <Image src={iconHeart} />
                <Image src={iconCart} />
                <DropdownAction></DropdownAction>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={`header-bottom   ${isSticky ? "isSticky" : ""}`} id="headerSticky">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="category-wrap position-relative">
              <div className="all-categories-dropdown" onClick={() => handleClickCategory()}>
                <Image src={iconCategory} alt="icon" className="icon" /> <span>Doanh Mục</span>
                <Image src={iconArrowUp} className="icon-dropdown" />
              </div>
              <div className={`categorie-list ${showCategory ? "show" : ""}`}>
                <ul>
                  {categories?.map((category) => (
                    <li key={category?.id}>
                      <a href="#" className="category-item">
                        <Image src={iconApple} /> <span>{category.name}</span>
                        <span className="total">0 items</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a href="#" className="more">
                  Xem thêm +
                </a>
              </div>
            </div>

            <ul className="nav-list">
              {navs.map((navItem, index) => (
                <li key={index}>
                  {navItem.link.startsWith("/") ? (
                    <Link to={navItem.link} className="nav-link">
                      {navItem.name}
                    </Link>
                  ) : (
                    <a href={navItem.link} className="nav-link">
                      {navItem.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
