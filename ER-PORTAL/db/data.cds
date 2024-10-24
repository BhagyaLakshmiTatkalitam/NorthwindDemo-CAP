namespace com.cy.erportal;

entity Requests{
    key requestId: UUID;
    materialGroup: String;
    purchaseGroup: String;
    createdBy: String;
    requestedFor: String;
    enterpriseProcurement: String;
    enterpriseProcurementOrganizationUnit: String;
    requestType: String;
    commodityType: String;
    budgetApproved: Boolean;
    projectName: String;
    typeOfFunding: String;
    estimatedProjAmount: Decimal(10,2);
    estimatedProjStartDate: Date;
    estimatedProjEndDate: Date;
    cyberRiskLevel: String;
    potentialSupplier: String;
    nercCIP: String;
    stakeFor:String;
    frmApproval: String;
    priority: String;
    edisonRep: String;
    provideProcReqDetails: String;
    comments: String;
    status: String(20) default 'new'; // Default status
    createdAt: Timestamp default CURRENT_TIMESTAMP;// Timestamp of creation
    UUID_LINK:UUID; 
}



