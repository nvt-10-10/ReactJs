import Image from "../../../../components/Image";
import { Text } from "../../../../components/Text";
import IconCloud from "../../../../assets/images/icons/cloud.svg";
import IconClose from "../../../../assets/images/icons/close.svg";
// import ImageProduct from "../../../../assets/images/image/product.jpeg";
import { useState } from "react";
export const FormMedia = ({ setValue, control }) => {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false); // Trạng thái kéo thả

  const onClickUploadFile = () => {
    const button = document.getElementById("upload-file");
    button.click();
  };

  const changeClickUploadFile = (event) => {
    const files = Array.from(event.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const newImages = files.map((file) => ({
      src: URL.createObjectURL(file),
      file: file,
      id: Date.now() + Math.random(), // Tạo id duy nhất cho mỗi hình ảnh
    }));

    setImages((prevImages) => {
      const updatedImages = [...prevImages, ...newImages];
      setValue(
        "images",
        updatedImages.map((img) => img.file),
        { shouldValidate: false }
      ); // Cập nhật giá trị trong form
      console.log("Form values after setValue:", control._defaultValues); 
      return updatedImages;
    });
  };

  const removeImage = (id) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((image) => image.id !== id);
      setValue(
        "images",
        updatedImages.map((img) => img.file), { 
          shouldValidate: true 
        }
      ); // Cập nhật lại giá trị trong form
      return updatedImages;
    });
  };

  // Xử lý các sự kiện kéo thả
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files); // Lấy danh sách file
    handleFiles(files); // Xử lý file như khi upload
  };

  return (
    <>
      <div className="wrapper-media">
        <div>
          <Text as="h2" fs="32px" className="text-title">
            Tải ảnh sản phẩm
          </Text>
          <Text
            as="p"
            fs="15px"
            lh="130%"
            color="#666"
            className="text-desc mt-10"
          >
            Tải file những hình ảnh liên quan đến sản phẩm để chúng tôi dễ dàng
            tìm nguồn hàng thích hợp với bạn
          </Text>

          <Text as="p" className="text-title" fs="14px" color="#B3B3B3">
            Định dạng tệp hợp lệ ( PNG, JPG)
          </Text>
        </div>

        <div
          className="d-flex flex-column align-items-center mt-24 wrap-upload wrapper-input-file"
          onClick={onClickUploadFile}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Image src={IconCloud} className="icon-upload"></Image>
          <Text as="p" fs="16px" fw="600" lh="150%" className="text-title">
            Tải lên từ máy tính
          </Text>

          <Text as="p" fs="13px" color="#B3B3B3" className="text-desc mt-6">
            hoặc có thể kéo và thả để tải lên
          </Text>
        </div>

        <input
          type="file"
          className="d-none"
          multiple
          accept="image/*"
          id="upload-file"
          onChange={changeClickUploadFile}
        />

        <div className="list-image">
          {images?.map((item) => (
            <div className="item-image" key={item.id}>
              <Image src={item.src} className="product-image" />
              <Image
                src={IconClose}
                className="icon-close"
                onClick={() => removeImage(item.id)} // Gọi hàm removeImage với id duy nhất
              />
              <input type="hidden" name="image" value={item.file.name} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
