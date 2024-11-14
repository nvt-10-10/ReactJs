import ButtonPrimary from "../../../../components/Button";
import { Text } from "../../../../components/Text";

export const Header = () => {
  return (
    <>
      <div className="d-flex flex-column gap-16 align-items-center ">
        <Text
          as={"h2"}
          fs="32px"
          fw="400"
          maxWidth={"1040px"}
          className="text-heading text-center"
        >
          Gửi 1 yêu cầu, nhận nhiều lượt báo giá từ 60.000+ nhà cung cấp
        </Text>

        <ButtonPrimary
          text={"Gửi yêu cầu báo giá miễn phí"}
          href="/quote/create"
        >
          {" "}
        </ButtonPrimary>
      </div>
    </>
  );
};
