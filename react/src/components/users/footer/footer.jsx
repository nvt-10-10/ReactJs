import React from "react";
import Image from "../../Image/Image";
import "./footer"
import { Link } from "react-router-dom";
export const Footer = React.memo( () => {
  return (
    <>
      <footer className="footer">
        <div className="container-lg largeContainer">
          <div className="row align-items-start">
            <div className="footer-column col-12 col-sm-6 col-md-4">
              <div>
                <Link to="">
                  <div className="d-flex align-items-center gap-12">
                    <Image src="../assets/images/logo-footer.png" alt="Vitrade logo" className="logo" />
                    <span className="text-heading fw-500 lh-1-2 text-white fs-xl-32">Vitrade</span>
                  </div>
                </Link>

                <div className="mt-24">
                  <div className="d-flex align-items-center mt-12 gap-12">
                    <Image src="../assets/images/icons/email.svg" alt="Email icon" className="icon-footer" />
                    <div>
                      <h4 className="text fs-14 fw-600 lh-1-2 text-white">Email</h4>
                      <span>
                        <Link className="d-block mt-4 text fs-14 lh-1-2 text-color-808080" to="mailto:info@vitrade.vn">
                          info@vitrade.vn
                        </Link>
                      </span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center mt-12 gap-12">
                    <Image src="../assets/images/icons/phone-ft.svg" alt="Phone icon" className="icon-footer" />
                    <div>
                      <h4 className="text fs-14 fw-600 lh-1-2 text-white">Hotline</h4>
                      <span>
                        <Link className="d-block mt-4 text fs-14 lh-1-2 text-color-808080" to="tel:19008003">
                          1900 8003
                        </Link>
                      </span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center mt-12 gap-12">
                    <Image src="../assets/images/icons/add.svg" alt="Address icon" className="icon-footer" />
                    <div>
                      <h4 className="text fs-14 fw-600 lh-1-2 text-white">Địa chỉ</h4>
                      <span>
                        <Link target="_blank" rel="noopener noreferrer" to="https://www.google.com/maps/search/33+Phú+Lộc+19+Thanh+Khê,+Đà+Nẵng" className="d-block mt-4 text fs-14 lh-1-2 text-color-808080">
                          33 Phú Lộc 19 - Thanh Khê - Đà Nẵng.
                        </Link>
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
                  <Link to="" className="fs-14 lh-1-5 text-color-999">
                    Giới thiệu
                  </Link>
                </li>
                <li className="mt-12">
                  <Link to="" className="fs-14 lh-1-5 text-color-999">
                    Quy chế hoạt động
                  </Link>
                </li>
                <li className="mt-12">
                  <Link to="" className="fs-14 lh-1-5 text-color-999">
                    Phương thức tham gia
                  </Link>
                </li>
                <li className="mt-12">
                  <Link to="" className="fs-14 lh-1-5 text-color-999">
                    Chính sách bảo vệ thông tin cá nhân khách hàng
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-column col-12 col-sm-12 col-md-5 align-self-end align-self-lg-start mt-16 mt-md-0">
              <div className="ml-auto">
                <h4 className="text fs-18 fw-600 lh-1-5 text-white footer-title">Chăm sóc khách hàng</h4>
                <div className="mt-12">
                  <div className="row">
                    <ul className="col-6">
                      <li>
                        <Link to="" className="fs-14 lh-1-5 text-color-999">
                          Quy định đối với người mua
                        </Link>
                      </li>
                      <li className="mt-12">
                        <Link to="" className="fs-14 lh-1-5 text-color-999">
                          Quy định đối với người bán
                        </Link>
                      </li>
                      <li className="mt-12">
                        <Link to="" className="fs-14 lh-1-5 text-color-999">
                          Hướng dẫn mua hàng
                        </Link>
                      </li>
                      <li className="mt-12">
                        <Link to="" className="fs-14 lh-1-5 text-color-999">
                          Yêu cầu báo giá
                        </Link>
                      </li>
                      <li className="mt-12">
                        <Link to="" className="fs-14 lh-1-5 text-color-999">
                          Người bán đảm bảo
                        </Link>
                      </li>
                    </ul>
                    <ul className="col-6">
                      <li>
                        <Link to="" className="fs-14 lh-1-5 text-color-999">
                          Trung tâm Hỗ trợ Khách hàng
                        </Link>
                      </li>
                      <li className="mt-12">
                        <Link to="" className="fs-14 lh-1-5 text-color-999">
                          Thanh toán an toàn
                        </Link>
                      </li>
                      <li className="mt-12">
                        <Link to="" className="fs-14 lh-1-5 text-color-999">
                          Hướng dẫn DN tham gia Sàn
                        </Link>
                      </li>
                      <li className="mt-12">
                        <Link to="" className="fs-14 lh-1-5 text-color-999">
                          Cơ chế giải quyết tranh chấp, khiếu nại
                        </Link>
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
              <div className="copyright d-flex flex-wrap justify-content-center align-items-center">
                <p>Vitrade eCommerce © 2024. All Rights Reserved</p>
                <Image src="../assets/images/rergistered-footer.png" alt="Registered" className="ml-sm-auto rergistered-Image" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
})
