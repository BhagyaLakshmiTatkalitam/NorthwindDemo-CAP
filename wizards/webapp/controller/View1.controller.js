sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
function (Controller,MessageToast) {
    "use strict";

    return Controller.extend("com.cy.wizards.controller.View1", {
            //     onInit: function() {
            //         // Sample data for combo boxes
            //         var oModel = new sap.ui.model.json.JSONModel({
            //             materialGroups: [
            //                 { id: "MIG_01", name: "Material Group 1" },
            //                 { id: "MIG_02", name: "Material Group 2" },
            //                 { id: "MIG_03", name: "Material Group 3" }
            //             ],
            //             purGroups: [
            //                 { id: "PG_01", name: "Purchasing Group 1" },
            //                 { id: "PG_02", name: "Purchasing Group 2" },
            //                 { id: "PG_03", name: "Purchasing Group 3" }
            //             ]
            //         });
            //         this.getView().setModel(oModel);
            //     },
        
            //     // Called when a selection is made in the ComboBoxes
            //     onMaterialGroupSelect: function(oEvent) {
            //         this._checkWizardStep();
            //     },
        
            //     onPurGroupSelect: function(oEvent) {
            //         this._checkWizardStep();
            //     },
        
            //     // This function checks the selections and determines which control to show in the next step
            //     _checkWizardStep: function() {
            //         var oView = this.getView();
            //         var sMaterialGroup = oView.byId("comboMaterialGroup").getSelectedKey();
            //         var sPurGroup = oView.byId("comboPurGroup").getSelectedKey();
        
            //         var oTable = oView.byId("myTable");
            //         var oForm = oView.byId("myForm");
        
            //         // Logic: Show Table if both selections are MIG_03 and PG_03, otherwise show Form
            //         if (sMaterialGroup === "MIG_03" && sPurGroup === "PG_03") {
            //             oTable.setVisible(true);
            //             oForm.setVisible(false);
            //         } else {
            //             oTable.setVisible(false);
            //             oForm.setVisible(true);
            //         }
            //     }
            // });
                    onInit: function() {
                        // The model is already defined in the manifest.json, so we can just access it
                        var oModel = this.getView().getModel();
            
                        // Set the model to the view if needed (though it's already available globally)
                        this.getView().setModel(oModel);
                    },
            
                    onMaterialGroupSelect: function(oEvent) {
                        this._checkWizardStep();
                    },
            
                    onPurGroupSelect: function(oEvent) {
                        this._checkWizardStep();
                    },
            
                    _checkWizardStep: function() {
                        var oView = this.getView();
                        var sMaterialGroup = oView.byId("comboMaterialGroup").getSelectedKey();
                        var sPurGroup = oView.byId("comboPurGroup").getSelectedKey();
            
                        var oTable = oView.byId("myTable");
                        var oForm = oView.byId("myForm");
            
                        if (sMaterialGroup === "MIG_03" && sPurGroup === "PG_03") {
                            oTable.setVisible(true);
                            oForm.setVisible(false);
                        } else {
                            oTable.setVisible(false);
                            oForm.setVisible(true);
                        }
                    }
                });
            });
            
        
    