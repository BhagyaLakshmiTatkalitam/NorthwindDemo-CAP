using com.cy.sbpa as sbpa from '../db/sample';
service mySRV{
    entity Customers as projection on sbpa.Customers;
}