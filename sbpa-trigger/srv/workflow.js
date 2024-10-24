const cds = require('@sap/cds');

const _postWorkFlow = async function (newCustomer,Customers) {

    const workflowContext = {
        "definitionId": "us10.8d8bad88trial.sbpatrigger.sbpaprocess",
        "context": newCustomer
    }
    const wfAPI = await cds.connect.to('sbpa-destination');
    const result = await wfAPI.send('POST', '/workflow/rest/v1/workflow-instances', workflowContext, { "Content-Type": "application/json" });

    await UPDATE(Customers).set({ autoid: result.autoid }).where({ autoid: newCustomer.autoid});

    return result.autoid;

}

module.exports={_postWorkFlow};