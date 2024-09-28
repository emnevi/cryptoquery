import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Info = () => {
    const handleRedirect = (url) => {
      window.open(url, '_blank');
    };
  
    return (
      <div className="d-flex justify-content-start align-items-center bg-dark text-white p-2 infoBar border border " style={{borderRadius: 5}}>
        <p className="mb-0" style={{fontSize: 11}}><FontAwesomeIcon className="me-3" icon={faEnvelope}/>nevikhun@gmail.com</p>
      </div>
    );
  };
  
  export default Info;