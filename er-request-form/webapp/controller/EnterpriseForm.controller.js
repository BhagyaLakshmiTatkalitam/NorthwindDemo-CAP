

sap.ui.define([
    "sap/ui/core/mvc/Controller",
     "sap/ui/model/json/JSONModel"
],
function (Controller,JSONModel) {
    "use strict";

    return Controller.extend("errequestform.controller.EnterpriseForm", {
        onInit: function () {
                var oModel = this.getOwnerComponent().getModel("jsonData");
                this.getView().setModel(oModel,"jsonModel");
                 console.log(oModel);
        },

        // Called when a selection is made in the ComboBoxes
     onMaterialGroupSelect: function(oEvent) {
        this._checkWizardStep();
    },

    onPurGroupSelect: function(oEvent) {
        this._checkWizardStep();
    },

    // This function checks the selections and determines which control to show in the next step
    _checkWizardStep: function() {
        var oView = this.getView();
        var sMaterialGroup = oView.byId("materialgroupID").getSelectedKey();
        var sPurGroup = oView.byId("idPurchaseGroup").getSelectedKey();

        var oTable = oView.byId("stakeholderTable");
        var oForm = oView.byId("234dd");

        // Logic: Show Table if both selections are MIG_03 and PG_03, otherwise show Form
        if (sMaterialGroup === "MTG_03" && sPurGroup === "PG_03") {
            oTable.setVisible(true);
            oForm.setVisible(false);
        } else {
            oTable.setVisible(false);
            oForm.setVisible(true);
        }
    },
    onComplete: function() {
        console.log("Submit button clicked");
    
        // Gathering values from input fields
        var screatedBy = this.byId("createdByid").getValue();
        var sRequestedFor = this.byId("RequestedforID").getValue(); // Updated to use getValue()
        var sMaterialGroup = this.byId("materialgroupID").getValue(); // Updated to use getValue()
        var sPurchaseGroup = this.byId("idPurchaseGroup").getValue(); // Updated to use getValue()
        var senterprise = this.byId("enterpriseID").getValue();
    
        var sOrganizationUnit = this.byId("OrganizationUnitID").getValue(); // Updated to use getValue()
        var sRequestType = this.byId("idRequestType").getValue(); // Updated to use getValue()
        var sCommodityType = this.byId("idCommodity").getValue(); // Updated to use getValue()
        var sBudget = this.byId("idBudget").getSelectedKey() === "true"; // Ensure budgetApproved is boolean
    
        var sProjectName = this.byId("ProjectName").getValue();
        var sFunding = this.byId("idFunding").getValue(); // Updated to use getValue()
        var sProjectAmount = parseFloat(this.byId("projectAmount").getValue()); // Ensure number format
        var sDate = this.byId("Date").getDateValue(); // Returns the date object
        var sDateA = this.byId("DateA").getDateValue(); // Returns the date object
        
        // Function to format date into 'yyyy-MM-dd'
        function formatDate(date) {
            var year = date.getFullYear();
            var month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding leading zero
            var day = ('0' + date.getDate()).slice(-2); // Adding leading zero
            return year + '-' + month + '-' + day;
        }
        
        if (sDate && sDateA) {  // Check if dates are not null
            var formattedDate = formatDate(sDate);
            var formattedDateA = formatDate(sDateA);
            console.log(formattedDate, formattedDateA);
        } else {
            console.log("One of the dates is invalid");
        }


        console.log(sDate,sDateA);
    
        var sCyberrisklevel = this.byId("idCyberrisklevel").getValue(); // Updated to use getValue()
        var sPotential = this.byId("idPotential").getValue(); // Updated to use getValue()
        var sNERC = this.byId("idNERC").getValue(); // Updated to use getValue()
        var sFRMApproval = this.byId("FRMApproval").getValue();
        var sPriority = this.byId("idPriority").getValue(); // Updated to use getValue()
    
        var sEdisonRep = this.byId("EdisonRep").getValue();
        var sDetails = this.byId("Details").getValue();
        var sComments = this.byId("Comments").getValue();
    
        // Creating the payload object
        var payload = {
            materialGroup: sMaterialGroup,
            purchaseGroup: sPurchaseGroup,
            createdBy: screatedBy,
            requestedFor: sRequestedFor,
            enterpriseProcurement: senterprise,
            enterpriseProcurementOrganizationUnit: sOrganizationUnit,
            requestType: sRequestType,
            commodityType: sCommodityType,
            budgetApproved: sBudget, // Boolean value
            projectName: sProjectName,
            typeOfFunding: sFunding,
            estimatedProjAmount: sProjectAmount, // Number
           estimatedProjStartDate:formattedDate,
    estimatedProjEndDate: formattedDateA,
            cyberRiskLevel: sCyberrisklevel,
            potentialSupplier: sPotential,
            nercCIP: sNERC,
            frmApproval: "In process",
            priority: sPriority,
            edisonRep: sEdisonRep,
            provideProcReqDetails: sDetails,
            comments: sComments
        };
    
        // Logging the payload to ensure it's correct
        console.log(payload);
    
        // Creating entry in the model using the payload object
        let oModel = this.getView().getModel();
        let oBindList = oModel.bindList("/Requests");
    
        oBindList.create(payload); // Passing the payload object
    }
    

    });
});