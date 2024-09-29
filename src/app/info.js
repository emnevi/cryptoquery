import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Info = () => {
  const handleRedirect = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="d-flex justify-content-start align-items-center bg-dark text-white p-2 infoBar border border " style={{ borderRadius: 5 }}>
      <a href="https://twitter.com/e7r1us" className="mb-0 mx-2 text-decoration-none text-white" style={{ fontSize: 11 }}><FontAwesomeIcon className="me-2" icon={faTwitter} />@e7r1us</a>
      <p className="mb-0 mx-2" style={{ fontSize: 11 }}><FontAwesomeIcon className="me-2" icon={faEnvelope} />nevikhun@gmail.com</p>
    </div>
  );
};

export default Info;