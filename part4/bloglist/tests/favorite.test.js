const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("favorite blog", () => {
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
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12000,
        __v: 0,
      },
    ];

    const result = listHelper.favoriteBlog(blogs);
    assert.strictEqual(result, blogs[2]);
  });

  test("empty list", () => {
    const blogs = [];

    assert.strictEqual(listHelper.favoriteBlog(blogs), undefined);
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

    assert.strictEqual(listHelper.favoriteBlog(blogs), blogs[0]);
  });
});
