using com.cy.erportal as portal from '../db/data';
service portalSRV{
    entity Requests as projection on portal.Requests;
    action approveRequest(requestId: String, frmApproval: String) returns String;
}