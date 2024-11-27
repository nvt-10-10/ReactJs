import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./CardSupplier.scss"; // Nếu cần thiết kế riêng cho Skeleton

export const CardSupplierSkeleton = () => {
  return (
    <div className="card-supplier skeleton">
      <Skeleton circle={true} className="supplier-logo" />
      <div className="supplier-wrap">
        <div className="d-flex align-items-center justify-content-center gap-10">
          <Skeleton circle={true} className="supplier-country" />
          <Skeleton height={20} width={120} className="supplier-name" />
        </div>
        <Skeleton
          count={2}
          height={15}
          width="100%"
          style={{ marginTop: "0.5rem" }}
          className="supplier-desc"
        />
        <div className="supplier-action">
          <Skeleton
            circle={true}
            height={30}
            width={30}
            className="btn-action"
          />
          <Skeleton
            circle={true}
            height={30}
            width={30}
            className="btn-action"
          />
        </div>
      </div>
    </div>
  );
};
