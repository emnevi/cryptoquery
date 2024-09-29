import UIMessages from '../../assets/uimessages';

const ExplanationSection = ({ languageDetected }) => {
    return (
        <div className="d-flex justify-content-center bg-light text-dark row w-100 text-center">

            <div className="col px-0 mx-0" style={{maxWidth: 500}}>
                <div className="text-dark p-4" style={{ borderRadius: 6 }}>
                    <h2 className="text-dark fw-bold">{UIMessages[languageDetected].card1Title}</h2>
                    <p style={{ textAlign: "justify" }}>{UIMessages[languageDetected].card1Text}</p>
                </div>
                <div className="text-dark p-4" style={{ borderRadius: 6 }}>
                    <h2 className="text-dark fw-bold">{UIMessages[languageDetected].card2Title}</h2>
                    <p style={{ textAlign: "justify" }}>{UIMessages[languageDetected].card2Text}</p>
                </div>

                <div className="text-dark p-4" style={{ borderRadius: 6 }}>
                    <h2 className="text-dark fw-bold">{UIMessages[languageDetected].card3Title}</h2>
                    <p style={{ textAlign: "justify" }}>{UIMessages[languageDetected].card3Text}</p>
                </div>
            </div>
        </div>
    )
}

export default ExplanationSection