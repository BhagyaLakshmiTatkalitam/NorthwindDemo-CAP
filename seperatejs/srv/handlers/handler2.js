// ordersCustomersHandler.js
const cds = require('@sap/cds'); 
module.exports = {
    register: (srv) => {
        const{Orders,Customers}= cds.entities;


        // Handle CRUD operations for Orders entity
        srv.on('READ', 'Orders', async (req, next) => {
            try {
                if (req.data.ID) {
                    req.query.where({ ID: req.data.ID });
                }
                if (req.data.name) {
                    req.query.where({ name: req.data.name });
                }
                return await next();
            } catch (error) {
                req.error(500, `Error reading order: ${error.message}`);
            }
        });

        srv.on('CREATE', 'Orders', async (req) => {
            try {
                const {ID,orderDate,customer} = req.data;
                const newOrder = {
                    ID,
                    orderDate,
                    customer
                };
    
                return await srv.run(INSERT.into(Orders).entries(newOrder));
            } catch (error) {
                req.error(500, `Error creating order: ${error.message}`);
            }
        });


        // Handle CRUD operations for Customers entity
        srv.on('READ', 'Customers', async (req, next) => {
            try {
                if (req.data.ID) {
                    req.query.where({ ID: req.data.ID });
                }
                if (req.data.name) {
                    req.query.where({ name: req.data.name });
                }
                return await next();
            } catch (error) {
                req.error(500, `Error reading customer: ${error.message}`);
            }
        });

        srv.on('CREATE', 'Customers', async (req) => {
            try {
                const {ID,name,email} = req.data;
                const newCustomer = {
                    ID,
                    name,
                    email
                };
    
                return await srv.run(INSERT.into(Customers).entries(newCustomer));
            } catch (error) {
                req.error(500, `Error creating customer: ${error.message}`);
            }
        });
    }
};
