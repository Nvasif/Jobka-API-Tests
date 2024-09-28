describe('Jobka API - Test job search by id', () => {

    const baseUrl = 'http://api.jobka.net:8081/jobs';

    it('should get the job by id', () => {
        cy.request(`${baseUrl}?id=631cbe04431ba4738af3c704`).then((response) => {
            expect([200, 204]).to.include(response.status);

            if (response.status === 200) {
                expect(response.body).to.have.property('content');
                expect(response.body.content).to.have.length(1);
                expect(response.body.content[0].id).to.equal('631cbe04431ba4738af3c704');
            }
        });
    });

    it('should get the jobs by date', () => {
        cy.request(`${baseUrl}?date=2021-07-11`).then((response) => {
            expect(response.status).to.equal(200);

            expect(response.body).to.have.property('content');
            expect(response.body.content).to.have.length.greaterThan(0);
        });
    });


    it('should get the jobs from the company', () => {
        cy.request(`${baseUrl}?company=legion`).then((response) => {
            expect(response.status).to.eq(200);

            expect(response.body).to.have.property('content');
            expect(response.body.content).to.have.length.greaterThan(0);

            expect(response.body.content[0].company).to.contain('legion');
        });
    });

    it('should handle the case where jobs are found for the location "Toronto"', () => {
        cy.request({
            url: `${baseUrl}?location=Toronto`,
        }).then((response) => {
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

    it('should handle the case where jobs are found by description "salary"', () => {
        cy.request({
            url: `${baseUrl}?description=salary`,
        }).then((response) => {
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

    it('should handle the case where jobs are found for location "Toronto" and company "Apple"', () => {
        cy.request({
            url: `${baseUrl}?location=Toronto&company=Apple`,
        }).then((response) => {
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
