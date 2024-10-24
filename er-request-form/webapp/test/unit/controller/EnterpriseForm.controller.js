/*global QUnit*/

sap.ui.define([
	"er-request-form/controller/EnterpriseForm.controller"
], function (Controller) {
	"use strict";

	QUnit.module("EnterpriseForm Controller");

	QUnit.test("I should test the EnterpriseForm controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
