import { TextWrapper } from "../../../../components/Text";
import iconVi from "../../../../assets/images/flag/vi.jpg";
import iconZhCn from "../../../../assets/images/flag/zh-cn.jpg";
import iconKo from "../../../../assets/images/flag/ko.jpg";
import iconLo from "../../../../assets/images/flag/lo.jpg";
import Image from "../../../../components/Image";
import React from "react";
export const Header = React.memo(() => {
  console.log("loadding header");

  return (
    <div className="header-wrapper">
      <TextWrapper
        text="Thị trường"
        strong="Đa Quốc Gia"
        position="right"
      ></TextWrapper>
      <div className="country-list">
        <div className="country">
          <Image src={iconVi} className="icon-flag"></Image>
          <span className="country-name">Việt Nam</span>
        </div>
        <div className="country">
          <Image src={iconKo} className="icon-flag"></Image>
          <span className="country-name">Hàn Quốc</span>
        </div>
        <div className="country">
          <Image src={iconLo} className="icon-flag"></Image>
          <span className="country-name">Lào</span>
        </div>
        <div className="country">
          <Image src={iconZhCn} className="icon-flag"></Image>
          <span className="country-name">Trung Quốc</span>
        </div>
      </div>
    </div>
  );
});
