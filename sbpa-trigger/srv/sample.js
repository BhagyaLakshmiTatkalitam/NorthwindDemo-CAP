const cds=require ("@sap/cds");
module.exports=(srv)=>{
    const {Customers}=cds.entities;
    const workflow=require('./workflow');
    srv.on('CREATE','Customers',async(req)=>{
        try {
            const { custid, name, location, description } = req.data;
            const autoid = await srv.run(SELECT.one.from(Customers).columns('max(autoid) as maxID'));
            const startingID = 100;
            const newID = (autoid.maxID >= startingID ? autoid.maxID : startingID-1) + 1;
            const newCustomer = {
            autoid: newID,
            custid,
            name,
            location,
            description
        };
            await srv.run(INSERT.into(Customers).entries(newCustomer));
            try {
                console.log(`[INFO] Initiating workflow posting for new record: ${JSON.stringify(newCustomer)}`);
                await workflow._postWorkFlow(newCustomer, Customers);
                console.log(`[INFO] Workflow posted successfully for ID: ${newID}`);
            } catch (workflowError) {
                console.error(`[ERROR] Workflow posting failed for ID: ${newID} - ${workflowError.message}`);
            }
            return newCustomer;
        } catch (error) {
            req.error(500, `Error creating customer: ${error.message}`);
        }
        

    })
    
}