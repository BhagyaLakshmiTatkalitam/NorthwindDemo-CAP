const cds = require('@sap/cds');
module.exports = (srv) => {
    const { Requests } = cds.entities;
    const workflow = require('./helper/workflow');

    srv.on('CREATE', 'Requests', async (req) => {
        try {
            const {
                materialGroup,
                purchaseGroup,
                createdBy,
                requestedFor,
                enterpriseProcurement,
                enterpriseProcurementOrganizationUnit,
                requestType,
                commodityType,
                budgetApproved,
                projectName,
                typeOfFunding,
                estimatedProjAmount,
                estimatedProjStartDate,
                estimatedProjEndDate,
                cyberRiskLevel,
                potentialSupplier,
                nercCIP,
                stakeFor,
                frmApproval,
                priority,
                edisonRep,
                provideProcReqDetails,
                comments
            } = req.data;

            // Generate a new UUID for requestId
            const newRequestID = cds.utils.uuid();

            // Prepare the new request entry
            const newRequest = {
                requestId: newRequestID,
                materialGroup,
                purchaseGroup,
                createdBy,
                requestedFor,
                enterpriseProcurement,
                enterpriseProcurementOrganizationUnit,
                requestType,
                commodityType,
                budgetApproved,
                projectName,
                typeOfFunding,
                estimatedProjAmount,
                estimatedProjStartDate,
                estimatedProjEndDate,
                cyberRiskLevel,
                potentialSupplier,
                nercCIP,
                stakeFor,
                frmApproval,
                priority,
                edisonRep,
                provideProcReqDetails,
                comments,
                status: 'new', // Default status
                createdAt: new Date(), // Current timestamp
                UUID_LINK: null
            };

            // Insert the new record into the database
            const result = await INSERT.into(Requests).entries(newRequest);
            // Post to workflow and handle any workflow operations
            try {
                console.log(`[INFO] Initiating workflow posting for new record: ${JSON.stringify(newRequest)}`);
                await workflow._postWorkFlow(newRequest, Requests);
                console.log(`[INFO] Workflow posted successfully for ID: ${newRequestID}`);
            } catch (workflowError) {
                console.error(`[ERROR] Workflow posting failed for ID: ${newRequestID} - ${workflowError.message}`);
            }

            return result; // Return the created record

        } catch (error) {
            req.error(500, `Error creating request: ${error.message}`);
        }
    })

    srv.on('PATCH', 'Requests', async (req) => {
        try {
            console.log("[INFO] Patch Request Payload:", req.data);
            
            const { requestId, frmApproval } = req.data;
    
            // Validate input
            if (!requestId || !frmApproval) {
                req.error(400, `Missing required fields: 'requestId' or 'frmApproval'.`);
                return;
            }
    
            // Fetch existing record
            const existingRecord = await SELECT.one.from(Requests).where({ requestId });
    
            if (!existingRecord) {
                req.error(404, `Record with requestId ${requestId} not found.`);
                return;
            }
    
            // Update the record
            const updateRequest = { frmApproval };
    
            const result = await UPDATE(Requests).set(updateRequest).where({ requestId });
    
            if (result === 0) {
                req.error(500, `Failed to update record with requestId: ${requestId}`);
                return;
            }
    
            console.log("[INFO] Record updated successfully:", result);
            return { status: 'success', message: 'Request updated successfully', result };
    
        } catch (error) {
            console.error(`[ERROR] Error updating request: ${error.message}`, error);
            req.error(500, `Error updating request: ${error.message}`);
        }
    });

    srv.on('approveRequest', async (req) => {
        try {
            console.log("[INFO] Action Payload:", req.data);
            
            const { requestId, frmApproval } = req.data;

            // Validate input
            if (!requestId || !frmApproval) {
                req.error(400, `Missing required fields: 'requestId' or 'frmApproval'.`);
                return;
            }

            // Fetch existing record
            const existingRecord = await SELECT.one.from(Requests).where({ requestId });

            if (!existingRecord) {
                req.error(404, `Record with requestId ${requestId} not found.`);
                return;
            }

            // Update the record
            const updateRequest = { frmApproval };
            const result = await UPDATE(Requests).set(updateRequest).where({ requestId });

            if (result === 0) {
                req.error(500, `Failed to update record with requestId: ${requestId}`);
                return;
            }

            console.log("[INFO] Record updated successfully:", result);
            return 'success';

        } catch (error) {
            console.error(`[ERROR] Error updating request: ${error.message}`, error);
            req.error(500, `Error updating request: ${error.message}`);
        }
    });
    
    
}
