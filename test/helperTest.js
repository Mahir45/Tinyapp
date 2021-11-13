const { assert } = require("chai");

const { emailChecker } = require("../helper.js");

const testUsers = {
  userRandomID: {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur",
  },
  user2RandomID: {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk",
  },
};

describe("emailChecker", function () {
  it("should return a user with a valid email", function () {
    const user = emailChecker("user@example.com", testUsers);
    const expectedUserID = "userRandomID";
    assert.equal(user.id, expectedUserID);
  });
  it("should return an undefined value if invalid email", function () {
    const user = emailChecker("as", testUsers);
    assert.isUndefined(user);
  });
});