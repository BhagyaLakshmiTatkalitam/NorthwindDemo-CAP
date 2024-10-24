sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "er/workflowuimodule/model/models",
    "sap/ushell/services/CrossApplicationNavigation"
  ],
  function (UIComponent, Device, models, CrossApplicationNavigation) {
    "use strict";

    return UIComponent.extend(
      "er.workflowuimodule.Component",
      {
        metadata: {
        manifest: "json",
        },

        /**
        * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
        * @public
        * @override
        */
        init: function () {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);

        // enable routing
        this.getRouter().initialize();

        // set the device model
        this.setModel(models.createDeviceModel(), "device");

        this.setTaskModels();

        const rejectOutcomeId = "reject";
        this.getInboxAPI().addAction(
            {
            action: rejectOutcomeId,
            label: "Reject",
            type: "reject",
            },
            function () {
            this.completeTask(false, rejectOutcomeId);
            },
            this
        );
        const approveOutcomeId = "approve";
        this.getInboxAPI().addAction(
            {
            action: approveOutcomeId,
            label: "Approve",
            type: "accept",
            },
            function () {
            this.completeTask(true, approveOutcomeId);
            },
            
            this
        );
        this.bAtLeastOneSelected = false;
        },
      

        setTaskModels: function () {
            var oModel = new sap.ui.model.json.JSONModel({
                index: 0
            })
            this.setModel(oModel, 'contextData');
        // set the task model
        var startupParameters = this.getComponentData().startupParameters;
        this.setModel(startupParameters.taskModel, "task");

        // set the task context model
        var taskContextModel = new sap.ui.model.json.JSONModel(
            this._getTaskInstancesBaseURL() + "/context"
        );
        this.setModel(taskContextModel, "context");
        },

        _getTaskInstancesBaseURL: function () {
        return (
            this._getWorkflowRuntimeBaseURL() +
            "/task-instances/" +
            this.getTaskInstanceID()
        );
        },

        _getWorkflowRuntimeBaseURL: function () {  
          var ui5CloudService = this.getManifestEntry("/sap.cloud/service").replaceAll(".", "");  
          var ui5ApplicationName = this.getManifestEntry("/sap.app/id").replaceAll(".", "");  
          var appPath = `${ui5CloudService}.${ui5ApplicationName}`;
          return `/${appPath}/api/public/workflow/rest/v1`

        },

        getTaskInstanceID: function () {
        return this.getModel("task").getData().InstanceID;
        },

        getInboxAPI: function () {
        var startupParameters = this.getComponentData().startupParameters;
        return startupParameters.inboxAPI;
        },

        completeTask: function (approvalStatus, outcomeId) {
        this.getModel("context").setProperty("/approved", approvalStatus);
        this._patchTaskInstance(outcomeId);
        },
        onSelectionChange: function(oEvent) {
            var oTable = oEvent.getSource();
            var aSelectedItems = oTable.getSelectedItems();

            this.aSelectedData = {};
            this.bAtLeastOneSelected = aSelectedItems.length > 0;

            aSelectedItems.forEach((oSelectedItem, index) => {
                var oBindingContext = oSelectedItem.getBindingContext("context");
                var oCandidateData = oBindingContext.getObject();
                var key = "s" + (index + 1); // Generate a unique key for each selected item
                this.aSelectedData[key] = {
                    candidateName: oCandidateData.candidateName,
                    email: oCandidateData.email,
                    position: oCandidateData.position,
                    yOE: oCandidateData.yOE
                };
            });
        
            // Do something with the selected data
            console.log("Selected Data:", this.aSelectedData);
        },
        

        _patchTaskInstance: function (outcomeId) {
            const context = this.getModel("context").getData();
            const contextData = this.getModel("contextData").getData();
            var technology, selectedallCandidateDatas;
        
            var approvalStatus = (outcomeId === "approve") ? true : false; // Define approvalStatus
            
            if (contextData.index == 0) {
                technology = "SAP BTP";
            } else {
                technology = "SAP CAP";
            }
        
            if (this.bAtLeastOneSelected) {
                selectedallCandidateDatas = this.aSelectedData;
            } else {
                selectedallCandidateDatas = {};
            }
        
            var data = {
                status: "COMPLETED",
                context: {
                    estimatedProjAmount: context.estimatedProjAmount,
                    frmApproval: context.frmApproval,
                    materialGroup: context.materialGroup,
                    approved: approvalStatus, // Define approvalStatus here
                    technology: technology || '',
                    reportingManager: contextData.reportingManager || '',
                    yearOfExperience: contextData.yearOfExperience || '',
                    joiningDate: contextData.joiningDate || '',
                    comments: contextData.Comments || '', // Lowercase "comments" as required by the backend
                    selectedTableRowData: this.bAtLeastOneSelected,
                    selectedCandidateData: selectedallCandidateDatas
                },
                decision: outcomeId
            };
        
            jQuery.ajax({
                url: `${this._getTaskInstancesBaseURL()}`,
                method: "PATCH",
                contentType: "application/json",
                async: true,
                data: JSON.stringify(data),
                headers: {
                    "X-CSRF-Token": this._fetchToken(),
                },
            }).done(() => {
                this._refreshTaskList();
            }).fail((jqXHR, textStatus, errorThrown) => {
                console.error("Request failed:", textStatus, errorThrown);
                console.error("Response:", jqXHR.responseText);
            });
        },
        
  
      
      

        _fetchToken: function () {
        var fetchedToken;

        jQuery.ajax({
            url: this._getWorkflowRuntimeBaseURL() + "/xsrf-token",
            method: "GET",
            async: false,
            headers: {
            "X-CSRF-Token": "Fetch",
            },
            success(result, xhr, data) {
            fetchedToken = data.getResponseHeader("X-CSRF-Token");
            },
        });
        return fetchedToken;
        },

        _refreshTaskList: function () {
        this.getInboxAPI().updateTask("NA", this.getTaskInstanceID());
        },
    }
    );
}
);




// sap.ui.define(
//   [
//     "sap/ui/core/UIComponent",
//     "sap/ui/Device",
//     "er/workflowuimodule/model/models",
//   ],
//   function (UIComponent, Device, models) {
//     "use strict";

//     return UIComponent.extend(
//       "er.workflowuimodule.Component",
//       {
//         metadata: {
//           manifest: "json",
//         },

//         /**
//          * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
//          * @public
//          * @override
//          */
//         init: function () {
//           // call the base component's init function
//           UIComponent.prototype.init.apply(this, arguments);

//           // enable routing
//           this.getRouter().initialize();

//           // set the device model
//           this.setModel(models.createDeviceModel(), "device");

//           this.setTaskModels();

//           this.getInboxAPI().addAction(
//             {
//               action: "APPROVE",
//               label: "Approve",
//               type: "accept", // (Optional property) Define for positive appearance
//             },
//             function () {
//               this.completeTask(true);
//             },
//             this
//           );

//           this.getInboxAPI().addAction(
//             {
//               action: "REJECT",
//               label: "Reject",
//               type: "reject", // (Optional property) Define for negative appearance
//             },
//             function () {
//               this.completeTask(false);
//             },
//             this
//           );
//         },

//         setTaskModels: function () {
//           // set the task model
//           var startupParameters = this.getComponentData().startupParameters;
//           this.setModel(startupParameters.taskModel, "task");

//           // set the task context model
//           var taskContextModel = new sap.ui.model.json.JSONModel(
//             this._getTaskInstancesBaseURL() + "/context"
//           );
//           this.setModel(taskContextModel, "context");
//         },

//         _getTaskInstancesBaseURL: function () {
//           return (
//             this._getWorkflowRuntimeBaseURL() +
//             "/task-instances/" +
//             this.getTaskInstanceID()
//           );
//         },

//         _getWorkflowRuntimeBaseURL: function () {  
//           var ui5CloudService = this.getManifestEntry("/sap.cloud/service").replaceAll(".", "");  
//           var ui5ApplicationName = this.getManifestEntry("/sap.app/id").replaceAll(".", "");  
//           var appPath = `${ui5CloudService}.${ui5ApplicationName}`;
//           return `/${appPath}/api/public/workflow/rest/v1`

//         },

//         getTaskInstanceID: function () {
//           return this.getModel("task").getData().InstanceID;
//         },

//         getInboxAPI: function () {
//           var startupParameters = this.getComponentData().startupParameters;
//           return startupParameters.inboxAPI;
//         },

//         completeTask: function (approvalStatus) {
//           this.getModel("context").setProperty("/approved", approvalStatus);
//           this._patchTaskInstance();
//           this._refreshTaskList();
//         },

        
//         // _patchTaskInstance: function (outcomeId) {
//         //   const context = this.getModel("context").getData();
//         //   const contextData = this.getModel("contextData").getData();
//         //   var technology,selectedallCandidateDatas;
//         //   if(contextData.index == 0){
//         //       technology = "SAP BTP";
//         //   } else {
//         //       technology = "SAP CAP"
//         //   }
//         //   if(this.bAtLeastOneSelected) {
//         //       selectedallCandidateDatas = this.aSelectedData;
//         //   } else {
//         //       selectedallCandidateDatas = {};
//         //   }
//         //   var data = {
//         //       status: "COMPLETED",
//         //       context: {...context, technology: technology || '',
//         //                           reportingManager: contextData.reportingManager || '',
//         //                           yearOfExperience: contextData.yearOfExperience || '',
//         //                           joiningDate: contextData.joiningDate || '',
//         //                           Comments: contextData.Comments || '',
//         //                           selectedTableRowData: this.bAtLeastOneSelected,
//         //                           selectedCandidateData: selectedallCandidateDatas},
//         //       decision: outcomeId
//         //   };
  
//         //   jQuery.ajax({
//         //       url: `${this._getTaskInstancesBaseURL()}`,
//         //       method: "PATCH",
//         //       contentType: "application/json",
//         //       async: true,
//         //       data: JSON.stringify(data),
//         //       headers: {
//         //       "X-CSRF-Token": this._fetchToken(),
//         //       },
//         //   }).done(() => {
//         //       this._refreshTaskList();
//         //   })
//         //   },

//         _patchTaskInstance: function () {
//           var data = {
//             status: "COMPLETED",
//             context: this.getModel("context").getData(),
//             decision: outcome
//           };

//           jQuery.ajax({
//             url: this._getTaskInstancesBaseURL(),
//             method: "PATCH",
//             contentType: "application/json",
//             async: false,
//             data: JSON.stringify(data),
//             headers: {
//               "X-CSRF-Token": this._fetchToken(),
//             },
//           });
//         },

//         _fetchToken: function () {
//           var fetchedToken;

//           jQuery.ajax({
//             url: this._getWorkflowRuntimeBaseURL() + "/xsrf-token",
//             method: "GET",
//             async: false,
//             headers: {
//               "X-CSRF-Token": "Fetch",
//             },
//             success(result, xhr, data) {
//               fetchedToken = data.getResponseHeader("X-CSRF-Token");
//             },
//           });
//           return fetchedToken;
//         },

//         _refreshTaskList: function () {
//           this.getInboxAPI().updateTask("NA", this.getTaskInstanceID());
//         },
//       }
//     );
//   }
// );
