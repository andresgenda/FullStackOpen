const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length > 0) {
    let favorite = blogs[0];
    let i = 1;
    while (i < blogs.length) {
      if (blogs[i].likes > favorite.likes) {
        favorite = blogs[i];
      }
      i++;
    }
    return favorite;
  }
  return undefined;
};

module.exports = { dummy, totalLikes, favoriteBlog };
