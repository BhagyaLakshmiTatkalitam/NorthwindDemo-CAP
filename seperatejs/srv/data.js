const cds=require('@sap/cds')

const handler1=require('./handlers/handler1');
const handler2=require('./handlers/handler2');

module.exports=cds.service.impl(async function () {
    const { Books,Authors} = cds.entities;

    this.on('CREATE', 'Books', async (req) => {
        try {
            const { ID,title ,author} = req.data;

            const newBook = {
                ID,
                title,
                author
            };

            return await this.run(INSERT.into(Books).entries(newBook));
        } catch (error) {
            req.error(500, `Error creating books: ${error.message}`);
        }
    });

    // READ handler for Phases
    this.on('READ', 'Books', async (req, next) => {
        try {
            if (req.data.ID) {
                req.query.where({ ID: req.data.ID });
            }
            if (req.data.title) {
                req.query.where({ title: req.data.title });
            }
            return await next();
        } catch (error) {
            req.error(500, `Error reading books: ${error.message}`);
        }
    });

    this.on('CREATE', 'Authors', async (req) => {
        try {
            const {ID, name} = req.data;

            const newAuthor = {
                ID,
                name
            };

            return await this.run(INSERT.into(Authors).entries(newAuthor));
        } catch (error) {
            req.error(500, `Error creating Phase: ${error.message}`);
        }
    });

    this.on('READ', 'Authors', async (req, next) => {
        try {
            if (req.data.ID) {
                req.query.where({ ID: req.data.ID });
            }
            if (req.data.name) {
                req.query.where({ name: req.data.name });
            }
            return await next();
        } catch (error) {
            req.error(500, `Error reading Phases: ${error.message}`);
        }
    });

    // Register handlers for other entities (from separate files)
    handler1.register(this);
    handler2.register(this);        
})