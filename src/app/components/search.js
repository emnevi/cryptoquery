import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBitcoin, faEthereum } from "@fortawesome/free-brands-svg-icons"
import AdaIcon from "../assets/cardano-ada-logo.svg"
import Spinner from "./useful/spinner"
import UIMessages from "../assets/uimessages"


const Search = ({ handleSubmit, setWallet, error, wallet, loading, languageDetected }) => {

    if (!languageDetected) return

    return (
        <div className="d-flex flex-column px-3">
            <h1 className="text-light mb-1 fw-bold" style={{ paddingBottom: 8 }}>{UIMessages[languageDetected].title}</h1>
            <span className="text-muted mb-3" style={{ paddingBottom: 30 }}>{UIMessages[languageDetected].subtitle}</span>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="d-flex justify-content-start align-items-center mb-3">
                    <FontAwesomeIcon className="mx-1" size="xl" icon={faBitcoin} />
                    <FontAwesomeIcon className="mx-1" size="xl" icon={faEthereum} />
                    <div>
                        <AdaIcon className="ada-logo mx-1" width={23.25} height={23.25}></AdaIcon>
                    </div>
                </div>
                <input
                    type="text"
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    placeholder={UIMessages[languageDetected].inputPlaceholer}
                    className="form-control p-2 border-primary"
                />

                {error && <p className="text-danger">{error}</p>}
                <div className="d-flex w-100 justify-content-center">
                    <button style={{ height: 38, maxHeight: 38, minHeight: 38, marginTop: 50, borderRadius: 20 }} type="submit" className="btn text-white btn-primary w-50 d-flex align-items-center justify-content-center" disabled={loading}>
                        {!loading && UIMessages[languageDetected].actionButton}
                        {loading && <Spinner height={25} color="text-white" />}
                    </button>
                </div>
            </form>


        </div>
    )
}


export default Search