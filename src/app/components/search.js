import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBitcoin, faEthereum } from "@fortawesome/free-brands-svg-icons"
import AdaIcon from "../assets/cardano-ada-logo.svg"
import Spinner from "./useful/spinner"
import UIMessages from "../assets/uimessages"


const Search = ({ handleSubmit, setWallet, error, wallet, loading, languageDetected }) => {

    if (!languageDetected) return

    return (
        <div className="d-flex flex-column px-3">
            <h1 className="text-primary mb-1">{UIMessages[languageDetected].title}</h1>
            <small className="text-muted mb-3">{UIMessages[languageDetected].subtitle}</small>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    placeholder={UIMessages[languageDetected].inputPlaceholer}
                    className="form-control p-2 mb-3"
                />
                {error && <p className="text-danger">{error}</p>}
                <button style={{ height: 38, maxHeight: 38, minHeight: 38 }} type="submit" className="btn btn-primary w-100 d-flex align-items-center justify-content-center" disabled={loading}>
                    {!loading && UIMessages[languageDetected].actionButton}
                    {loading && <Spinner height={25} color="text-white" />}
                </button>
            </form>
            <span className="mb-2">{UIMessages[languageDetected].addresses}</span>
            <div className="d-flex justify-content-center align-items-center">
                <FontAwesomeIcon className="mx-1" size="xl" icon={faBitcoin} />
                <FontAwesomeIcon className="mx-1" size="xl" icon={faEthereum} />
                <div>
                    <AdaIcon className="ada-logo mx-1" width={23.25} height={23.25}></AdaIcon>
                </div>
            </div>
        </div>
    )
}


export default Search