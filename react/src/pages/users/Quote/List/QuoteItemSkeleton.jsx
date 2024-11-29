import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const QuoteItemSkeleton = () => {
  return (
    <div className="quote-item skeleton">
      <figure>
        <Skeleton height={200} width="100%" className="quote-image" />
      </figure>
      <Skeleton
        height={20}
        width="80%"
        className="text-title clamp clamp-3 mt-10"
      />
      <div className="mt-8 d-flex gap-8 justify-content-between">
        <div className="d-flex align-items-center gap-8">
          <Skeleton
            circle={true}
            height={30}
            width={30}
            className="quote-icon"
          />
          <Skeleton height={20} width={60} className="text-title" />
        </div>
        <div className="d-flex align-items-center gap-8">
          <Skeleton
            circle={true}
            height={30}
            width={30}
            className="quote-icon"
          />
          <Skeleton height={20} width={60} className="text-title" />
        </div>
      </div>
    </div>
  );
};
