const { Firestore } = require('@google-cloud/firestore');

exports.writeSubscriber = async (message, context) => {
    const incomingMessage = Buffer.from(message.data, 'base64').toString('utf-8');

    const parsedMessage = JSON.parse(incomingMessage);

    const subscriberData = {
        email_address: parsedMessage.email_address,
        watch_regions: parsedMessage.watch_region
    };

    await writeToFireStorm(subscriberData);
};

async function writeToFireStorm(dataObject) {
    const firestore = new Firestore({
        projectId: "sp24-412-ajveteto-traveldeals"
    });

    console.log(dataObject);

    try {
        const collectionRef = firestore.collection('Subscribers');
        const documentRef = await collectionRef.add(dataObject);

        console.log(`Document created: ${documentRef.id}`);
    } catch (err) {
        console.log(err);
    }
}