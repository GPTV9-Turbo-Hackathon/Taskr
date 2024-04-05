const firebaseFunctionsTest = require('firebase-functions-test')({
    databaseURL: 'https://taskr-46a3f-default-rtdb.asia-southeast1.firebasedatabase.app/',
    storageBucket: 'your-storage-bucket',
    projectId: 'taskr-46a3f',
  }, 'path/to/your/serviceAccountKey.json');

  const myFunctions = require('./index.js'); // Adjust the path as necessary

  // Simulate the call to the function
  const wrapped = firebaseFunctionsTest.wrap(myFunctions.MakeTasklistFromTranscript);

  // Mock request object
  const mockRequest = {
    auth: {
      uid: "user-id", // Provide a mock user ID
    },
    data: {
        transcript: "test"
    }
  };

  // Call the function
  wrapped(mockRequest).then(result => {
    console.log('Function result:', result);
  }).catch(err => {
    console.error('Error calling function:', err);
  });