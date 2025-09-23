const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const testHelper = require("./test_helper");
const Blog = require("../models/blog");
const app = require("../app");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(testHelper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(testHelper.initialBlogs[1]);
  await blogObject.save();
});

describe("api requests", () => {
  test.only("blogs are returned as json", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, testHelper.initialBlogs.length);
  });

  test.only("correct blog post id name", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual("id" in response.body[0], true);
  });
});

after(async () => {
  await mongoose.connection.close();
});
