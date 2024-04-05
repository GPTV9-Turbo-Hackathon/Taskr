const OpenAI = require("openai");
const {onRequest} = require("firebase-functions/v2/https");
const {onCall} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const {defineSecret} = require("firebase-functions/params");
const {setGlobalOptions} = require("firebase-functions/v2");



const apiKeyObject = defineSecret("OPENAI_API_KEY");
setGlobalOptions({memory: "4GiB", timeoutSeconds: 200, maxInstances: 3});
let client


async function createMessageAndRun(promptText) {
    const assistantid = "asst_EHb74mn2NwLYeMO75BE4EwDf";

    const run = await client.beta.threads.createAndRun({
        assistant_id: assistantid,
        thread: {
          messages: [
            {role: "user",
              content: `output tasks as json: ${promptText}`,
            },
          ],
        },
      });

    // finally return run id for checking
    return {runid: run.id, threadid: run.thread_id};
}

async function getRunResult(threadid, runid) {
    let attempts = 0;
    const maxAttempts = 5;
    let delay = 2000; // Initial delay in milliseconds

    while (attempts < maxAttempts) {
        // Retrieve the results of the run
        const results = await client.beta.threads.runs.retrieve(threadid, runid);

        console.log("result status is: ", results.status);
        if (results.status === "completed") {
            // now just get the messages automatically
            const messages = await client.beta.threads.messages.list(threadid);
            return { results, messages };
        } else if (results.status === "in_progress") {
            // Wait for a bit before retrying
            await new Promise(resolve => setTimeout(resolve, delay));
            // Increment attempts and increase delay for next retry
            attempts++;
            delay *= 2;
        } else {
            // If status is neither 'completed' nor 'in_progress', break and return results
            return { results, messages: [] };
        }
    }
    throw new Error("Max attempts reached. The operation is still in progress.");
}


exports.MakeTasklistFromTranscript = onCall({secrets: [apiKeyObject]}, async (request) => {
    
    const apiKey = apiKeyObject.value();
    client = new OpenAI({apiKey: apiKey});
    
    if (!request.auth || !request.auth.uid) {
      throw new Error("Unauthorized");
    }

    const transcript = request.data.transcript;
    if (!transcript) {
        throw new Error("Transcript not provided");
    }

    try {
        // Pass the transcript to the consultOpenAI function
        const currentrun = await createMessageAndRun(transcript);
        const runresult = await getRunResult(currentrun.threadid, currentrun.runid);
        console.log(runresult.messages.body.data[0].content)
        return { response: runresult.messages.body.data[0].content };
    } catch (error) {
        logger.error("Error processing transcript", error);
        throw new functions.https.HttpsError('internal', 'Error processing transcript');
    }
});
