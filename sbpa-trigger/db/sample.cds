namespace com.cy.sbpa;
entity Customers {
    key autoid      : Integer;
        custid      : String(10);
        name        : String(20);
        location    : String(20);
        description : String(100);
}