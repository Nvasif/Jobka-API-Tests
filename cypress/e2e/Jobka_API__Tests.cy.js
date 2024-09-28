/// <reference types = "Cypress"/>

describe('Jobka API - Job Search Tests', () => {

    const baseUrl = 'http://api.jobka.net:8081/jobs';

    it('should retrieve a job by id', () => {
        cy.request(`${baseUrl}?id=631cbe04431ba4738af3c704`).then((response) => {
            // Logging the response for debugging purposes
            console.log(response);
            // Checking the status code
            expect([200, 204]).to.include(response.status);

            if (response.status === 200) {
                // Asserting that the job content is returned and matches the id
                expect(response.body).to.have.property('content');
                expect(response.body.content).to.have.length(1);
                expect(response.body.content[0].id).to.equal('631cbe04431ba4738af3c704');
            }
        });
    });

    it('should retrieve jobs by date', () => {
        cy.request(`${baseUrl}?date=2021-07-11`).then((response) => {
            // Logging the response for debugging purposes
            console.log(response);
            // Checking the status code and that jobs are returned
            expect(response.status).to.equal(200);

            expect(response.body).to.have.property('content');
            expect(response.body.content).to.have.length.greaterThan(0);
        });
    });

    it('should retrieve jobs from the company "legion"', () => {
        cy.request(`${baseUrl}?company=legion`).then((response) => {
            // Logging the response for debugging purposes
            console.log(response);
            expect(response.status).to.equal(200);

            expect(response.body).to.have.property('content');
            expect(response.body.content).to.have.length.greaterThan(0);

            expect(response.body.content[0].company).to.contain('legion');
        });
    });

    it('should retrieve jobs by location "Toronto"', () => {
        cy.request(`${baseUrl}?location=Toronto`).then((response) => {
            // Logging the response for debugging purposes
            console.log(response);
            expect([200, 204]).to.include(response.status);

            if (response.status === 200) {
                expect(response.body).to.have.property('content');
                expect(response.body.content).to.have.length.greaterThan(0);
                expect(response.body.content[0].location).to.contain('Toronto');
            } else if (response.status === 204) {
                cy.log('No jobs found for location Toronto');
            }
        });
    });

    it('should retrieve jobs by description "salary"', () => {
        cy.request(`${baseUrl}?description=salary`).then((response) => {
            // Logging the response for debugging purposes
            console.log(response);
            expect([200, 204]).to.include(response.status);

            if (response.status === 200) {
                expect(response.body).to.have.property('content');
                expect(response.body.content).to.have.length.greaterThan(0);
                expect(response.body.content[0].description).to.contain('salary');
            } else if (response.status === 204) {
                cy.log('No jobs found with description containing "salary"');
            }
        });
    });

    it('should retrieve jobs by location "Toronto" and company "Apple"', () => {
        cy.request(`${baseUrl}?location=Toronto&company=Apple`).then((response) => {
            // Logging the response for debugging purposes
            console.log(response);
            expect([200, 204]).to.include(response.status);

            if (response.status === 200) {
                expect(response.body).to.have.property('content');
                expect(response.body.content).to.have.length.greaterThan(0);

                expect(response.body.content[0].company).to.contain('Apple');
                expect(response.body.content[0].location).to.contain('Toronto');
            } else if (response.status === 204) {
                cy.log('No jobs found for company "Apple" in location "Toronto"');
            }
        });
    });

});
