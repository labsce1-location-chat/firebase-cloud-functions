const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.deleteRoomsAfterTime = functions.database.ref('/chatrooms')
    .onWrite((change, context) => {
        const ref = change.after.ref;
        const cutoff = Date.now() - 7 * 60 * 60 * 24 * 1000;
        let old = ref.orderByChild('createdAt').endAt(cutoff);
        return old.once('value', function(snap){
            const updates = {};
            snap.forEach(child => {
                updates[child.key] = null
            })
            return ref.update(updates)
        })
    })
