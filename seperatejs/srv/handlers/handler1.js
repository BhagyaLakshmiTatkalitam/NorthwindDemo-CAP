// publishersCategoriesHandler.js
const cds = require('@sap/cds'); 
module.exports = {
    register: (srv) => {
        const { Publishers,Categories } = cds.entities;
        
        // Handle CRUD operations for Publishers entity
        srv.on('READ', 'Publishers', async (req, next) => {
            try {
                if (req.data.ID) {
                    req.query.where({ ID: req.data.ID });
                }
                if (req.data.name) {
                    req.query.where({ name: req.data.name });
                }
                return await next();
            } catch (error) {
                req.error(500, `Error reading Publisher: ${error.message}`);
            }
        });

        srv.on('CREATE', 'Publishers', async (req) => {
            try {
                const {ID,name} = req.data;
    
                const newPublisher = {
                    ID,
                    name
                };
    
                return await srv.run(INSERT.into(Publishers).entries(newPublisher));
            } catch (error) {
                req.error(500, `Error creating Publisher: ${error.message}`);
            }
        });

        srv.on('UPDATE', 'Publishers', async (req) => {
            try {
                const { ID,name } = req.data;
                return await srv.run(UPDATE(Publishers).set({ ID,name }).where({ ID }));
            } catch (error) {
                req.error(500, `Error updating publisher: ${error.message}`);
            }
        });



        srv.on('READ', 'Categories', async (req, next) => {
            try {
                if (req.data.ID) {
                    req.query.where({ ID: req.data.ID });
                }
                if (req.data.name) {
                    req.query.where({ name: req.data.name });
                }
                return await next();
            } catch (error) {
                req.error(500, `Error reading category: ${error.message}`);
            }
        });


        srv.on('CREATE', 'Categories', async (req) => {
            try {
                const {ID,name} = req.data;
                const newCategory = {
                    ID,
                    name
                };
    
                return await srv.run(INSERT.into(Categories).entries(newCategory));
            } catch (error) {
                req.error(500, `Error creating category: ${error.message}`);
            }
        });
    }
};
