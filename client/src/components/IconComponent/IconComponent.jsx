import iconHamburger from '../../assets/images/IconHamburger.png'
import iconLogin from '../../assets/images/IconLogin.png'
import iconLogout from '../../assets/images/IconLogout.png'
import iconPhone from '../../assets/images/IconPhone.png'

const IconComponent = (props) => {
  const handleIcon = () => {
    if (props.icon === "iconHamburger") {
      return iconHamburger
    }
    if (props.icon === "iconLogin") {
      return iconLogin
    }
    if (props.icon === "iconLogout") {
      return iconLogout
    }
    if (props.icon === "iconPhone") {
      return iconPhone
    }
  };
  return <img onClick={props.onClick} src={handleIcon()} alt="Icon" style={{ width: props.width || "50px" }} />;
};
export default IconComponent;
