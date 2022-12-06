// src/specs/entities/user.ts
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { User } from "../../entities/user";
import { AppDataSource } from "../../data-source";
import { QueryFailedError } from "typeorm";
chai.use(chaiAsPromised);

// Exercice 2 : Question 1 :Why should you reset the database before each test case? Give examples of issues you may meet otherwise ?
// Answer: Because we want to test the database in a clean state, so we need to reset the database before each test case.
// If we don't reset the database, we may have conflicts with the data that we have in the database.
// For instace, if we have a test case that creates a user, and we don't reset the database, the next test case may fail because the user already exists in the database.
// If we have a test case that deletes a user, and we don't reset the database, the next test case will fail because the user doesn't exist in the database.
// If we are using a test suite that runs the tests in parallel we might get errors because the tests are running at the same time and they are using the same database.

describe("User", function () {
	before(async function () {
		// TODO: initialise the datasource (database connection)
		await AppDataSource.initialize();
	});

	beforeEach(async function () {
		// TODO: drop the content of the user table between each it().
		await AppDataSource.getRepository(User).clear();
	});

	after(async function () {
		await AppDataSource.close();
	});

	describe("validations", function () {
		it("should create a new User in database", async function () {
			const user = new User();
			user.firstName = "John";
			user.lastName = "Doe";
			user.email = "johndoe@gmail.com";
			user.passwordHash = "password";

			await AppDataSource.getRepository(User).save(user);
		});

		it("should raise error if email is missing", async function () {
			// hint to check if a promise fails with chai + chai-as-promise:
			const wrongUser = new User();
			wrongUser.firstName = "John";
			wrongUser.lastName = "Doe";
			wrongUser.passwordHash = "password";

			await chai
				.expect(AppDataSource.getRepository(User).save(wrongUser))
				.to.eventually.be.rejectedWith(
					QueryFailedError,
					'null value in column "email" of relation "user" violates not-null constraint'
				);
		});
	});
});
