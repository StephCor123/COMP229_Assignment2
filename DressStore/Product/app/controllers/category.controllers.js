const db = require("../models");
const Categories = db.categories;

// Create and Save a new Category
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const category = new Categories({
    name: req.body.name,
  });

  category
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the category.",
      });
    });
};

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Categories.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving categories.",
      });
    });
};

// Find a single Category by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Categories.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Category with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Category with id=" + id });
    });
};

// Update a Category by id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Categories.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Category with id=${id}. Maybe Category was not found!`,
        });
      } else res.send({ message: "Category was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Category with id=" + id,
      });
    });
};

// Delete a Category by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Categories.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`,
        });
      } else {
        res.send({
          message: "Category was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id,
      });
    });
};

// Delete all Categories from the database
exports.deleteAll = (req, res) => {
  Categories.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Categories were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all categories.",
      });
    });
};

// Find all published Categories
exports.findAllPublished = (req, res) => {
  Categories.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories.",
      });
    });
};
