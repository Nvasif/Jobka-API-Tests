it('should verify error messages or valid response for invalid requests', () => {
    const baseUrl = 'http://api.jobka.net:8081/jobs';
  
    // Test case 1: Invalid parameter
    cy.request({
      url: `${baseUrl}?invalid_param=abc`, // Using an invalid parameter
      failOnStatusCode: false // Allow test to continue even if status is not 2xx
    }).then((response) => {
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
      // Expecting status 204 if the API treats the request as valid but with no content
      expect([204, 400]).to.include(response.status);
  
      if (response.status === 204) {
        // If status is 204, it means the API processed the request but found no content
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
      // Expecting either 200 or 400
      expect([200, 400]).to.include(response.status);
  
      if (response.status === 400) {
        // If status is 400, check that an error message is present for invalid format
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.contain('Invalid date format');
      } else if (response.status === 200) {
        // If status is 200, it means the API accepted the invalid date and returned no error
        cy.log('API accepted the invalid date format and returned status 200.');
      }
    });
  });
  