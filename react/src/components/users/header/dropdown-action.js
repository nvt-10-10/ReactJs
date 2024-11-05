import Dropdown from 'react-bootstrap/Dropdown';
import iconUser from "../../../assets/images/icons/user.svg";
import iconDashboard from "../../../assets/images/icons/dashboard.svg";
import iconOrder from "../../../assets/images/icons/order.svg";
import iconProduct from "../../../assets/images/icons/product.svg";
import iconLogout from "../../../assets/images/icons/logout.svg";
import Image from '../../Image/Image';

function DropdownAction() {
  return (
    <Dropdown className="custom-dropdown dropdown-action">
      <Dropdown.Toggle variant="success" className=" d-flex align-items-center" id="dropdown-basic">
        <Image src={iconUser}/>
      </Dropdown.Toggle>

      <Dropdown.Menu className="">
        <Dropdown.Item className="d-flex gap-10 align-items-center" href="#/action-1"><Image src={iconDashboard}/> Dashboard  </Dropdown.Item>
        <Dropdown.Item className="d-flex gap-10 align-items-center" href="#/action-2"><Image src={iconOrder}/> Đơn hàng </Dropdown.Item>
        <Dropdown.Item className="d-flex gap-10 align-items-center" href="#/action-3"><Image src={iconProduct}/> Sản phẩm</Dropdown.Item>
        <Dropdown.Item className="d-flex gap-10 align-items-center" href="#/action-3"><Image src={iconLogout}/> Chuyển đổi tài khoản </Dropdown.Item>

        <Dropdown.Item className="btn" href="#/action-3">NÂNG CẤP gian hàng</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownAction;