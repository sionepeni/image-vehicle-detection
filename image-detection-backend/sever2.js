const express = require("express");
const server = express();
const fs = require("fs");
const encode = require("node-base64-image").encode;
const decode = require("node-base64-image").decode;
const { PredictionServiceClient } = require("@google-cloud/automl").v1;
server.use(express.json());

const client = new PredictionServiceClient({
    keyFilename: "./v2-key.json",
});

const projectId = "turners-recognition-prototype";
const location = "us-central1";
const modelId = "ICN3766857567528026112";
const filePath = "./car.png";

server.use("/", function (req, res) {
    const imageURL = req.query.url;
    // res.send(imageURL);
    res.send(global.payload);
    // res.send(global.car);
    //     console.log(`url`, `"${imageURL}"`);
    //     dbConnection.query(`update uploads
    // set Image = "${imageURL}"
    // where UserID = 1;`);

    predict(imageURL);

    async function predict() {
        const options = {
            string: true,
            headers: {
                "User-Agent": "my-app",
            },
        };

        const image = await encode(imageURL, options);

        await decode(image, { fname: "car", ext: "png" });

        fs.writeFileSync("imageURL.txt", image);

        const content = fs.readFileSync(filePath);
        const request = {
            name: client.modelPath(projectId, location, modelId),
            payload: {
                image: {
                    imageBytes: content,
                },
            },
        };

        const [response] = await client.predict(request);

        for (const annotationPayload of response.payload) {
            console.log(`type of vehicle: ${annotationPayload.displayName}`);
            const carType = annotationPayload.displayName;
            // console.log(carType);
            console.log(`consoling carType`, annotationPayload.displayName);
            global.payload = response.payload;
            global.car = annotationPayload.displayName;
            global.car1 = annotationPayload.displayName;
        }
        // setTimeout(reset, 10000);
    }
});

// function reset() {
//     global.array = [];
//     console.log(`printing`);
// }

const PORT = 4000;

server.listen(PORT, function () {
    console.log("listening to port", PORT);
});
