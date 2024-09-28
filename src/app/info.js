import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const Info = () => {
    const handleRedirect = (url) => {
      window.open(url, '_blank');
    };
  
    return (
      <div className="d-flex justify-content-center align-items-center bg-dark text-white py-2 infoBar">
        <p className="mb-0 me-3">Find me on:</p>
        <button
          className="btn btn-outline-light border-0"
          onClick={() => handleRedirect('https://github.com/emnevi')}
        >
          <FontAwesomeIcon icon={faGithub}/>
        </button>
      </div>
    );
  };
  
  export default Info;