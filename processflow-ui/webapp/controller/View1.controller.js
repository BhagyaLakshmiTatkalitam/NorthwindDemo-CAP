// sap.ui.define([
//     'sap/ui/core/mvc/Controller',
//     'sap/suite/ui/commons/library',
//      'sap/ui/model/json/JSONModel', 
//      'sap/m/MessageToast' 
// ],
// function (Controller,SuiteLibrary, JSONModel, MessageToast) {
//     "use strict";

//     return Controller.extend("com.cy.processflowui.controller.View1", {
//         onInit: function () {
//             var oView = this.getView();
// 			this.oProcessFlow1 = oView.byId("processflow1");
// 			this.oProcessFlow2 = oView.byId("processflow2");

// 			var sDataPath = sap.ui.require.toUrl("com/cy/processflowui/model/ProcessFlowLanesAndNodes.json");
// 			var oModelPf1 = new JSONModel(sDataPath);
// 			oView.setModel(oModelPf1);
// 			oModelPf1.attachRequestCompleted(this.oProcessFlow1.updateModel.bind(this.oProcessFlow1));

// 			sDataPath = sap.ui.require.toUrl("com/cy/processflowui/model/ProcessFlowLanesOnly.json");
// 			var oModelPf2 = new JSONModel(sDataPath);
// 			oView.setModel(oModelPf2, "pf2");
// 			oModelPf2.attachRequestCompleted(this.oProcessFlow2.updateModel.bind(this.oProcessFlow2));
//         },
//         onOnError: function(event) {
// 			MessageToast.show("Exception occurred: " + event.getParameters().text);
// 		},

// 		onHeaderPress: function(event) {
// 			var sDataPath = sap.ui.require.toUrl("com/cy/processflowui/model/ProcessFlowNodes.json");
// 			this.getView().getModel("pf2").loadData(sDataPath);
// 		},

// 		onNodePress: function(event) {
// 			MessageToast.show("Node " + event.getParameters().getNodeId() + " has been clicked.");
// 		},

// 		onZoomIn: function () {
// 			this.oProcessFlow1.zoomIn();

// 			MessageToast.show("Zoom level changed to: " + this.oProcessFlow1.getZoomLevel());
// 		},

// 		onZoomOut: function () {
// 			this.oProcessFlow1.zoomOut();

// 			MessageToast.show("Zoom level changed to: " + this.oProcessFlow1.getZoomLevel());
// 		},

// 		onHighlightPath: function() {
// 			var sDataPath = sap.ui.require.toUrl("com/cy/processflowui/model/ProcessFlowNodesHighlightedNodes.json");
// 			this.getView().getModel().loadData(sDataPath);

// 			MessageToast.show("Path has been highlighted");
// 		},

// 		onUpdateModel: function() {
// 			var sDataPath = sap.ui.require.toUrl("com/cy/processflowui/model/ProcessFlowUpdateModel.json");

// 			this.getView().getModel().loadData(sDataPath);
// 			MessageToast.show("Model has been updated");
// 		}
//     });
// });

sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/suite/ui/commons/library',
    'sap/ui/model/json/JSONModel', 
    'sap/m/MessageToast' 
],
function (Controller, SuiteLibrary, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("com.cy.processflowui.controller.View1", {
        onInit: function () {
            var oView = this.getView();
            this.oProcessFlow1 = oView.byId("processflow1");
            this.oProcessFlow2 = oView.byId("processflow2");

            var sDataPath = sap.ui.require.toUrl("com/cy/processflowui/model/ProcessFlowLanesAndNodes.json");
            var oModelPf1 = new JSONModel(sDataPath);
            oView.setModel(oModelPf1, "pf1"); // Added model name for clarity
            oModelPf1.attachRequestCompleted(function() {
                this.oProcessFlow1.updateModel(); 
                this.oProcessFlow1.rerender();  // Force UI to re-render
            }.bind(this));

            sDataPath = sap.ui.require.toUrl("com/cy/processflowui/model/ProcessFlowLanesOnly.json");
            var oModelPf2 = new JSONModel(sDataPath);
            oView.setModel(oModelPf2, "pf2");
            oModelPf2.attachRequestCompleted(function() {
                this.oProcessFlow2.updateModel();
                this.oProcessFlow2.rerender();  // Force UI to re-render
            }.bind(this));
        },
        onHeaderPress: function(event) {
            MessageToast.show("Lane header pressed!");
            var sDataPath = sap.ui.require.toUrl("com/cy/processflowui/model/ProcessFlowNodes.json");
            this.getView().getModel("pf2").loadData(sDataPath);
        },
        onNodePress: function(event) {
            var nodeId = event.getParameters().getNodeId();
            MessageToast.show("Node with ID " + nodeId + " was pressed.");
        },
                

        onZoomIn: function () {
            // var oProcessFlow = this.getView().byId("processflow1");  // Access process flow directly
            this.oProcessFlow1.zoomIn();
            MessageToast.show("Zoom level changed to: " + this.oProcessFlow1.getZoomLevel());
            oProcessFlow.rerender();  // Force the control to re-render
        },

        onZoomOut: function () {
            var oProcessFlow = this.getView().byId("processflow1");  // Access process flow directly
            oProcessFlow.zoomOut();
            MessageToast.show("Zoom level changed to: " + oProcessFlow.getZoomLevel());
            oProcessFlow.rerender();  // Force the control to re-render
        },

        onHighlightPath: function() {
            var sDataPath = sap.ui.require.toUrl("com/cy/processflowui/model/ProcessFlowNodesHighlightedNodes.json");
            this.getView().getModel("pf1").loadData(sDataPath);  // Ensure correct model reference
            MessageToast.show("Path has been highlighted");
        },

        onUpdateModel: function() {
            var sDataPath = sap.ui.require.toUrl("com/cy/processflowui/model/ProcessFlowUpdateModel.json");
            this.getView().getModel("pf1").loadData(sDataPath);  // Ensure correct model reference
            MessageToast.show("Model has been updated");
        }
    });
});
