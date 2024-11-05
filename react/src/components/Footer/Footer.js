import Image from "../Image/Image";
import "./Footer.scss";
import iconLogo from "../../assets/images/logo/logo-footer.png";
import iconrergistered from "../../assets/images/logo/rergistered-footer.png";
import iconEmail from "../../assets/images/icons/email.svg";
import iconPhone from "../../assets/images/icons/phone-ft.svg";
import iconAdrress from "../../assets/images/icons/add.svg";

export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container-lg largeContainer">
          <div className=" row algin-item-s">
            <div className="footer-column col-12 col-sm-6 col-md-4">
              <div className="">
                <a href="#">
                  <div className="d-flex align-items-center gap-12">
                    <Image src={iconLogo} className="logo" />
                    <span className="text-heading fw-500 lh-1-2 text-white fs-xl-32">Vitrade</span>
                  </div>
                </a>

                <div className="mt-24">
                  <div className="d-flex align-items-center mt-12 gap-12 ">
                    <Image src={iconEmail} className="icon-footer" />
                    <div className="">
                      <h4 className="text fs-14 fw-600 lh-1-2 text-white">Email</h4>
                      <span>
                        <a className="d-block mt-4 text fs-14 lh-1-2 text-color-808080" href="mailto:info@vitrade.vn">
                          info@vitrade.vn
                        </a>
                      </span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center mt-12 gap-12">
                    <Image src={iconPhone} className="icon-footer" />
                    <div className="">
                      <h4 className="text fs-14 fw-600 lh-1-2 text-white">Hotline</h4>
                      <span>
                        <a className="d-block mt-4 text fs-14 lh-1-2 text-color-808080" href="tel:1900 8003">
                          1900 8003
                        </a>
                      </span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center mt-12 gap-12">
                    <Image src={iconAdrress} className="icon-footer" />
                    <div className="">
                      <h4 className="text fs-14 fw-600 lh-1-2 text-white">Địa chỉ</h4>
                      <span>
                        <a target="_blank" href="https://www.google.com/maps/search/33+Ph%C3%BA+L%E1%BB%99c+19Thanh+Kh%C3%AA+T%C3%A2y,+Li%C3%AAn+Chi%E1%BB%83u,+%C4%90%C3%A0+N%E1%BA%B5ng/@16.0748607,108.171064,17z/data=!3m1!4b1?hl=vi&entry=ttu" className="d-block mt-4 text fs-14 lh-1-2 text-color-808080">
                          33 Phú Lộc 19 - Thanh Khê - Đà Nẵng.
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-column col-12 col-sm-6 col-md-3 ml-0 mt-16 mt-sm-0">
              <h4 className="text fs-18 fw-600 lh-1-5 text-white footer-title">Thông tin</h4>
              <ul className="mt-12">
                <li className="mt-12">
                  <a href="#" className="fs-14 lh-1-5 text-color-999">
                    Giới thiệu
                  </a>
                </li>
                <li className="mt-12">
                  <a href="#" className="fs-14 lh-1-5 text-color-999">
                    Quy chế hoạt động{" "}
                  </a>
                </li>
                <li className="mt-12">
                  <a href="#" className="fs-14 lh-1-5 text-color-999">
                    Phương thức tham gia
                  </a>
                </li>
                <li className="mt-12">
                  <a href="#" className="fs-14 lh-1-5 text-color-999">
                    Chính sách bảo vệ thông tin cá nhân khách hàng
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-column col-12 col-sm-12 col-md-5 align-self-end align-self-lg-start mt-16 mt-md-0">
              <div className="ml-auto">
                <h4 className="text fs-18 fw-600 lh-1-5 text-white footer-title">Chăm sóc khách hàng</h4>
                <div className="mt-12">
                  <div className="row">
                    <ul className="col-6">
                      <li className="">
                        <a href="#" className="fs-14 lh-1-5 text-color-999">
                          Quy định đối với người mua
                        </a>
                      </li>
                      <li className="mt-12">
                        <a href="#" className="fs-14 lh-1-5 text-color-999">
                          Quy định đối với người bán
                        </a>
                      </li>
                      <li className="mt-12">
                        <a href="#" className="fs-14 lh-1-5 text-color-999">
                          Hướng dẫn mua hàng
                        </a>
                      </li>
                      <li className="mt-12">
                        <a href="#" className="fs-14 lh-1-5 text-color-999">
                          Yêu cầu báo giá
                        </a>
                      </li>
                      <li className="mt-12">
                        <a href="#" className="fs-14 lh-1-5 text-color-999">
                          Người bán đảm bảo
                        </a>
                      </li>
                    </ul>
                    <ul className="col-6">
                      <li className="">
                        <a href="#" className="fs-14 lh-1-5 text-color-999">
                          Trung tâm Hỗ trợ Khách hàng
                        </a>
                      </li>
                      <li className="mt-12">
                        <a href="#" className="fs-14 lh-1-5 text-color-999">
                          Thanh toán an toàn
                        </a>
                      </li>
                      <li className="mt-12">
                        <a href="#" className="fs-14 lh-1-5 text-color-999">
                          Hướng dẫn DN tham gia Sàn
                        </a>
                      </li>
                      <li className="mt-12">
                        <a href="#" className="fs-14 lh-1-5 text-color-999">
                          Cơ chế giải quyết tranh chấp, khiếu nại
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-56" />

        <div className="container-lg">
          <div className="row">
            <div className="col-md-12">
              <div className="copyright d-flex flex-wrap justify-content-between  align-items-center">
                <p className="text-white">Vitrade eCommerce © 2024. All Rights Reserved</p>
                <Image src={iconrergistered} alt className="ml-sm-auto rergistered-img" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
