import UIMessages from '../../assets/uimessages';

const ExplanationSection = ({ languageDetected }) => {
    return (
<div className="d-flex justify-content-center bg-dark text-white w-100 text-center">
    <div className="col px-0 mx-0" style={{ maxWidth: 500 }}>
        <img 
            src={`/images/${languageDetected}.png`} 
            style={{ width: "70%" }} 
            className="align-self-center mx-auto mb-4"
        />
        <div className="text-white p-4" style={{ borderRadius: 6 }}>
            <h2 className="text-white fw-bold">{UIMessages[languageDetected].card1Title}</h2>
            <p style={{ textAlign: "justify" }}>{UIMessages[languageDetected].card1Text}</p>
        </div>
        <div className="text-white p-4" style={{ borderRadius: 6 }}>
            <h2 className="text-white fw-bold">{UIMessages[languageDetected].card2Title}</h2>
            <p style={{ textAlign: "justify" }}>{UIMessages[languageDetected].card2Text}</p>
        </div>

        <div className="text-white p-4" style={{ borderRadius: 6 }}>
            <h2 className="text-white fw-bold">{UIMessages[languageDetected].card3Title}</h2>
            <p style={{ textAlign: "justify" }}>{UIMessages[languageDetected].card3Text}</p>
        </div>
    </div>
</div>

    )
}

export default ExplanationSection