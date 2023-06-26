const db = require("../models");

const { Blog } = db;

module.exports = {
  async createBlog(req, res) {
    if (!req.body.title) {
      return res.status(400).send({
        error: "Title is required",
      });
    }

    if (!req.body.content) {
      return res.status(400).send({
        error: "Content is required",
      });
    }

    try {
      const blog = await Blog.create(req.body);
      res.send(blog);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to create the blog",
      });
    }
  },

  async getBlog(req, res) {
    // sample url http://localhost:8081/api/blog/1

    console.log(Blog);

    try {
      const blogId = parseInt(req.params.id, 10);
      const blog = await Blog.findByPk(blogId);

      if (!blog) {
        return res.status(404).send({
          error: "Blog not found",
        });
      }

      res.send(blog);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to fetch the blog",
      });
    }
  },

  async getAllBlog(req, res) {
    // const pagination = {
    //   pageNumber: Number(req.query.pageNumber) || 1,
    //   perPage: Number(req.query.perPage) || 2,
    //   search: String(req.query.search) || undefined,
    //   sortBy: req.query.sortBy,
    // };

    try {
      // const where = {};
      // where.title = {
      //   [db.Sequelize.Op.like]: `%${pagination.search}%`,
      // };
      // const order = []
      // for (const sort in pagination.sortBy) {
      //   order.push([sort, pagination.sortBy[sort]])
      // }
      // const result = await db.Blog.findAll({
      //   where,
      //   limit: pagination.perPage,
      //   offset: (pagination.pageNumber - 1) * pagination.perPage,
      //   order, 
      // });

      // const totalUser = await db.User.count({ where });
      res.send({
        message: "success get all blogs",
        // data: result,
        // totalData: totalUser,
        // search: [],
      });
    } catch (error) {
      res.status(500).send({ message: "error on server", error });
    }
  },
};
