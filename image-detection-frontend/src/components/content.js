import "../App.css";

export default function Content({ item: { name, img, type } }) {
    return (
        <>
            <div className="content-container">
                <figure className="content-figure">
                    <img src={img} alt={name} />
                    <h2 className="figure-text">{name}</h2>
                    <p className="figure-p">{type}</p>
                </figure>
            </div>
        </>
    );
}
