const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
  // Before a READ operation, log the user details
  this.before('READ', '*', (req) => {
    console.log("handler triggered!:");  
    const user = req.user;
    console.log("Logged-in User Details:", user);  
    console.log("User ID:", user.id);  
    console.log("User email:", user.email);  
    console.log("User roles:", user.roles);  
  });

  
  this.on('getUserDetails', async (req) => {
    const user = req.user;  // Access logged-in user information
    
    return {
      id: user.id,  
      email: user.email,  
      roles: user.roles  
    };
  });
});
