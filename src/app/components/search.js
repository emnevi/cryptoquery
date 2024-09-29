import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBitcoin, faEthereum } from "@fortawesome/free-brands-svg-icons"
import AdaIcon from "../assets/cardano-ada-logo.svg"
import Spinner from "./useful/spinner"
import UIMessages from "../assets/uimessages"


const Search = ({ handleSubmit, setWallet, error, wallet, loading, languageDetected }) => {

    if (!languageDetected) return

    return (
        <div className="d-flex flex-column px-3 align-items-center">
            <img src="./images/Spanish.png" style={{width: "70%"}}></img>

            <h1 className="text-light mb-1 fw-bold mt-4" style={{ paddingBottom: 8 }}>{UIMessages[languageDetected].title}</h1>
            <span className="text-muted mb-3" style={{ paddingBottom: 30 }}>{UIMessages[languageDetected].subtitle}</span>


            <form onSubmit={handleSubmit} className="mb-4 w-100">
                <div className="form-floating mb-3">
                    <input
                        className="form-control border-primary"
                        value={wallet}
                        onChange={(e) => setWallet(e.target.value)}
                        id="floatingInput"
                        placeholder={UIMessages[languageDetected].inputPlaceholer}
                    />
                    <label for="floatingInput">{UIMessages[languageDetected].inputPlaceholer}</label>
                </div>
                <div className="d-flex justify-content-start align-items-center mb-3">
                    <FontAwesomeIcon className="mx-1" size="xl" icon={faBitcoin} />
                    <FontAwesomeIcon className="mx-1" size="xl" icon={faEthereum} />
                    <div>
                        <AdaIcon className="ada-logo mx-1" width={23.25} height={23.25}></AdaIcon>
                    </div>
                </div>

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