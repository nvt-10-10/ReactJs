import Image from "../Image/Image";
import "./CardSupplier.scss";
import iconFollow from "../../assets/images/icons/archive-add.svg"
import iconMessage from "../../assets/images/icons/messages.svg"
import iconVitrade from "../../assets/images/logo/logo-footer.png"
export const CardSupplier = ({ supplier }) => {
  return (
    <>
      <div className="card-supplier">
        <Image src={supplier?.avatar} className="supplier-logo"></Image>
        <div className="supplier-wrap">
          <a href={supplier?.id ?? "#"}>
            <div className="d-flex align-items-center justify-content-center gap-10">
              <Image src={supplier?.country} srcError={iconVitrade}  className="supplier-country"></Image>
              <h3 className="supplier-name clamp">{supplier?.name ?? "Hải tình coffee"}</h3>
            </div>
          </a>
          <p className="supplier-desc">{supplier?.address ?? "HTX kiểu mới - SX nông nghiệp & dịch vụ thương mại"}</p>

          <div className="supplier-action">
            <button className="btn-action">
                <Image src={iconFollow}></Image>
            </button>

            <button className="btn-action">
                <Image src={iconMessage}></Image>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
