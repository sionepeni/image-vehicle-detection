import "./App.css";
import axios from "axios";
import { PickerOverlay } from "filestack-react-18";
import CarList from "./components/carList";
import { useEffect, useState } from "react";
import { data } from "./components/data";
import Content from "./components/content";

function App() {
    const [isPickerOverlayVisible, setIsPickerOverlayVisible] = useState(false);
    const [imageURL, setImageURL] = useState("");
    const [vehicle, setVehicle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [useTrigger, setUseTrigger] = useState(false);
    const [make, setMake] = useState(null);
    const [model, setModel] = useState("");
    const [ooo, setOoo] = useState([]);

    useEffect(() => {
        if (imageURL.length) {
            console.log(imageURL);
            axios
                .get(`http://localhost:4000`, {
                    params: {
                        url: imageURL,
                    },
                })
                .then((res) => setVehicle(res.data))
                .catch((err) => console.log(err.data));
        }
        objSet();
        setLoading(false);
    }, [loading]);

    const objSet = () => {
        const site = Object.values(vehicle);
        setOoo(site);
    };

    console.log(`vehle`, ooo);

    let one = ooo;
    let two = ooo[1];

    console.log(`this is ${one} and ${two}`);
    const test = () => {
        setLoading(!loading);
        Object.values(vehicle).map((i) => {
            return i.displayName;
        });
        test2();
    };

    const test2 = () => {
        setMake(vehicle[0].displayName);
        setModel(vehicle[1].displayName);
    };

    const handleFileUploadSuccess = (result) => {
        setImageURL(result.filesUploaded[0].url);
        setIsPickerOverlayVisible(false);
        setLoading(true);
        setUseTrigger(true);
    };

    const handleClick = () => {
        setIsPickerOverlayVisible(!isPickerOverlayVisible);
    };

    return (
        <>
            <div className="app-container">
                <div className="top-app">
                    {imageURL === "" ? (
                        <h1 className="top-h1">
                            Welcome, upload a picture of your vehicle to see
                            similar results
                        </h1>
                    ) : (
                        <img className="uploaded" src={imageURL} width={500} />
                    )}
                    <button onClick={handleClick}>Upload Image</button>
                    {isPickerOverlayVisible && (
                        <PickerOverlay
                            apikey={"ADqBlGdVdSMyIwL46ODL9z"}
                            onSuccess={(result) => {
                                handleFileUploadSuccess(result);
                            }}
                        />
                    )}
                </div>
                <div className="middle-app">
                    {useTrigger === false ? (
                        <button>Match Vehicles</button>
                    ) : (
                        <button onClick={test}>Match Vehicles</button>
                    )}
                    <h2>{make !== null ? `Here are our ${make}'s` : ""}</h2>
                </div>
                <div className="bottom-app">
                    {make === null
                        ? data.map((item, index) => (
                              <Content key={index} item={item} />
                          ))
                        : data
                              .filter((i) => i.make === make || i.type === make)
                              .map((item, index) => (
                                  <Content key={index} item={item} />
                              ))}
                </div>
            </div>
        </>
    );
}

export default App;
