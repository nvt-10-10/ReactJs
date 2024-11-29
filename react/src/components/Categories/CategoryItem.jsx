import Image from "../Image";
import iconApple from "../../assets/images/icons/apple.svg";

export const CategoryItem = ({ category, active }) => {
  const base_url = process.env.REACT_APP_API_IMAGE;
  return (
    <div className="d-flex flex-column justify-content-center align-items-center category-item">
      <figure>
        <Image
          className="icon"
          src={`${base_url}${category.image}`}
          srcError={iconApple}
        />
      </figure>
      <h5 className={`name ${active ? "active" : ""}`}>{category.name} </h5>
    </div>
  );
};
