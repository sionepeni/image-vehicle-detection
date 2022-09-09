const express = require("express");
const app = express();

const projectId = "turners-recognition-prototype";
const location = "us-central1";
const modelId = "ICN3766857567528026112";
const filePath = "./test-pics/7.jpg";

// Imports the Google Cloud AutoML library
const { PredictionServiceClient } = require("@google-cloud/automl").v1;
const fs = require("fs");

// Instantiates a client
const client = new PredictionServiceClient({
    keyFilename: "../../making-api/vision-private-key.json",
});

app.get(`https://localhost:3000/upload${imageUrl}`, (res, req) => {
    console.log(`result`, res);
});
const imageURL = req.body.imageURL;
// Read the file content for translation.
const content = fs.readFileSync(filePath);

async function predict() {
    // Construct request
    // params is additional domain-specific parameters.
    // score_threshold is used to filter the result
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
        console.log(carType);
    }
}

predict();
