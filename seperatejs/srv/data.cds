using com.cy.data as cy from '../db/data';

service MyService {

    entity Books as projection on cy.Books;
    entity Authors as projection on cy.Authors;
    entity Publishers as projection on cy.Publishers;
    entity Categories as projection on cy.Categories;
    entity Orders as projection on cy.Orders;
    entity Customers as projection on cy.Customers;
}
