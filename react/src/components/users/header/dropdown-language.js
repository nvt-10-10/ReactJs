import flag_vi from "../../../assets/images/flag/vi.jpg";
import flag_en from "../../../assets/images/flag/en.png";
import flag_lo from "../../../assets/images/flag/lo.jpg";
import flag_zhCN from "../../../assets/images/flag/zh-cn.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "../../Image/Image";
 
  const DropdownLanguage = ({label}) => {
    return (
        <>
           <Dropdown className="select-language custom-dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="d-flex align-items-center ">
                  <span>{label}</span> <Image src={flag_vi} alt="flag" className="icon-flag" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item className="d-flex align-items-center" href="#/action-1">
                    <Image src={flag_vi} alt="flag" className="icon-flag" /> Việt Nam
                  </Dropdown.Item>
                  <Dropdown.Item className="d-flex align-items-center" href="#/action-2">
                    <Image src={flag_lo} alt="flag" className="icon-flag" />
                    Lào
                  </Dropdown.Item>
                  <Dropdown.Item className="d-flex align-items-center" href="#/action-3">
                    <Image src={flag_en} alt="flag" className="icon-flag" />
                    Anh
                  </Dropdown.Item>
                  <Dropdown.Item className="d-flex align-items-center" href="#/action-3">
                    <Image src={flag_zhCN} alt="flag" className="icon-flag" />
                    Trung Quốc
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
        
        </>
    )
  }

  export default DropdownLanguage