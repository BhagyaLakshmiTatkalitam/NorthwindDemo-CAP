namespace com.cy.data;

 entity Books {
   key ID          : UUID;
    title       : String;
    author      : Association to Authors;
  }

  entity Authors {
   key ID    : UUID;
    name  :  String;
  }

   entity Publishers {
    key ID    : UUID;
    name  : String;
  }

   entity Categories {
   key ID    : UUID;
    name  : String;
  }

  entity Orders {
   key ID    : UUID;
    orderDate : Date;
    customer  : Association to Customers;
  }

   entity Customers {
   key ID    : UUID;
    name  : String;
    email : String;
  }

