const cds = require('@sap/cds');

const _postWorkFlow = async function (res, Requests) {
    try {
        // Build workflow context payload
        const workflowContext = {
            "definitionId": "us10.8d8bad88trial.erportal.eRPORTAL", //"us10.33d86b24trial.ctl.cTLProcess", 
            "context":res
        };

        console.log(`[INFO] Workflow context payload: ${JSON.stringify(workflowContext)}`);


        const wfAPI = await cds.connect.to('sbpa-destination');

        // Send the POST request to create a workflow instance
        const result = await wfAPI.send('POST', '/workflow/rest/v1/workflow-instances', workflowContext, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        //console.log("Request Headers: ",headers);
        console.log("Workflow Context: ", workflowContext);
        console.log(`[INFO] Workflow started successfully. Response: ${JSON.stringify(result)}`);
        return result;

    } catch (error) {
        console.error(`[ERROR] Failed to start workflow instance: ${error.message}`);
        console.error(`[ERROR] Error Details: ${JSON.stringify(error)}`);
        throw new Error(`Failed to start workflow instance: ${error.message}`);
    }
};
module.exports = { _postWorkFlow };