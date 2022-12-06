# school-secure-coding

# Question 2

## Question 1 :Why should you reset the database before each test case? Give examples of issues you may meet otherwise ?
- Because we want to test the database in a clean state, so we need to reset the database before each test case.
- If we don't reset the database, we may have conflicts with the data that we have in the database.
- For instace, if we have a test case that creates a user, and we don't reset the database, the next test case may fail because the user already exists in the database.
- If we have a test case that deletes a user, and we don't reset the database, the next test case will fail because the user doesn't exist in the database.
- If we are using a test suite that runs the tests in parallel we might get errors because the tests are running at the same time and they are using the same database.
