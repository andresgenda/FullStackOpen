const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("Total Likes", () => {
  test("populated list", () => {
    const blogs = [
      {
        _id: "68ad104f43fd96760b3f108e",
        title: "Tomato Soup Recipe",
        author: "Andres Genda",
        url: "https://mywebpage.com/",
        likes: 10000,
        __v: 0,
      },
      {
        _id: "68ad18a81cb4af87ffbd2ca3",
        title: "Broccoli Soup Recipe",
        author: "Andres Genda",
        url: "https://mywebpage.com/broccolisoup",
        likes: 5000,
        __v: 0,
      },
    ];

    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 15000);
  });

  test("empty list", () => {
    const blogs = [];

    assert.strictEqual(listHelper.totalLikes(blogs), 0);
  });

  test("list with one blog", () => {
    const blogs = [
      {
        _id: "68ad18a81cb4af87ffbd2ca3",
        title: "Broccoli Soup Recipe",
        author: "Andres Genda",
        url: "https://mywebpage.com/broccolisoup",
        likes: 30,
        __v: 0,
      },
    ];

    assert.strictEqual(listHelper.totalLikes(blogs), 30);
  });
});
