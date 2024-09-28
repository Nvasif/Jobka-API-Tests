/// <reference types = "Cypress"/>

describe('Jobka API - Test error messages and invalid requests', () => {
    const baseUrl = 'http://api.jobka.net:8081/jobs';
  
    it('should verify error messages or valid response for invalid requests', () => {
      
      // Test case 1: Invalid parameter
      cy.request({
        url: `${baseUrl}?invalid_param=abc`, // Using an invalid parameter
        failOnStatusCode: false // Allow the test to continue even if the status is not 2xx
      }).then((response) => {
        // Log the response for debugging purposes
        console.log(response);
  
        // Expect either status 200 (if API ignores the invalid parameter) or 400 (if API returns an error)
        expect([200, 400]).to.include(response.status);
  
        if (response.status === 400) {
          // If status is 400, check that an error message is present and contains the right message
          expect(response.body).to.have.property('error');
          expect(response.body.error).to.contain('Invalid parameter');
        } else if (response.status === 200) {
          // If status is 200, log that the invalid parameter was ignored
          cy.log('API ignored the invalid parameter and returned status 200.');
        }
      });
  
      // Test case 2: Missing required parameter (example: empty id)
      cy.request({
        url: `${baseUrl}?id=`, // Sending an empty required parameter (id)
        failOnStatusCode: false
      }).then((response) => {
        // Log the response for debugging purposes
        console.log(response);
  
        // Expecting status 204 if the API treats the request as valid but with no content
        expect([204, 400]).to.include(response.status);
  
        if (response.status === 204) {
          // If status is 204, log that no content was found
          cy.log('API returned 204 for missing id, meaning no content was found.');
        } else if (response.status === 400) {
          // If status is 400, check for the error message
          expect(response.body).to.have.property('error');
          expect(response.body.error).to.contain('Missing required parameter');
        }
      });
  
      // Test case 3: Invalid data format (example: invalid date format)
      cy.request({
        url: `${baseUrl}?date=invalid-date`, // Sending an invalid date format
        failOnStatusCode: false
      }).then((response) => {
        // Log the response for debugging purposes
        console.log(response);
  
        // Expecting either status 200 or 400
        expect([200, 400]).to.include(response.status);
  
        if (response.status === 400) {
          // If status is 400, check that an error message is present for invalid format
          expect(response.body).to.have.property('error');
          expect(response.body.error).to.contain('Invalid date format');
        } else if (response.status === 200) {
          // If status is 200, log that the API accepted the invalid date format
          cy.log('API accepted the invalid date format and returned status 200.');
        }
      });
    });
  });
  