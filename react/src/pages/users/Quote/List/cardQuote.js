import Image from "../../../../components/Image";
import { Text } from "../../../../components/Text";
import { Link } from "react-router-dom";

export const QuoteItem = (quote) => {
  return (
    <>
      <div className="quote-item">
        <figure>
          <Image className="quote-image"></Image>
          <Link to={`/quote/${quote?.slug}/${quote.code}`}>
            <Text
              className="text-title clamp clamp-3"
              fs={"14px"}
              fw={600}
              lh={"150%"}
            >
              {quote?.name || "Gia vị nhà bếp: đường, muối, bột ngọt, dầu ăn"}
            </Text>
          </Link>
        </figure>

        <div className="mt-8 d-flex gap-8 justify-content-between">
          <div className="d-flex align-items-center gap-8">
            <Image className="quote-icon"></Image>
            <Text
              as={"span"}
              className="text-title"
              fs={"14px"}
              fw={600}
              lh={"150%"}
              color={"#999"}
            >
              {quote.quantity || "48 thùng"}
            </Text>
          </div>
          <div className="d-flex align-items-center gap-8">
            <Image className="quote-icon"></Image>
            <Text
              as={"span"}
              className="text-title"
              fs={"14px"}
              fw={600}
              lh={"150%"}
              color={"#999"}
            >
              {quote?.created_at || "24/5/2024"}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};
