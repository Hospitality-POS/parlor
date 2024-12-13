const Modifiers = require("../../models/Products/modifiers");
const Addons = require("../../models/Products/Add-ons");

module.exports = {
  createModifiers: async (req, res) => {
    try {
      const newModifier = new Modifiers(req.body);
      await newModifier.save();
      res.status(201).json(newModifier);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  createAddons: async (req, res) => {
    try {
      const { name, modifier: modifierId } = req.body;

      const newAddon = new Addons(req.body);

      const savedAddon = await newAddon.save();
      await Modifiers.findByIdAndUpdate(
        modifierId,
        { $push: { addons: savedAddon._id } },
        { new: true, useFindAndModify: false }
      );

      res.status(201).json(savedAddon);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  editModifier: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedModifier = await Modifiers.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedModifier)
        return res.status(404).json({ message: "Modifier not found" });
      res.status(200).json(updatedModifier);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  editAddons: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedAddon = await Addons.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedAddon)
        return res.status(404).json({ message: "Addon not found" });
      res.status(200).json(updatedAddon);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAllModifiers: async (req, res) => {
    try {
      const { name } = req.query;
      const query = {};
      if (name) query.name = new RegExp(name, "i");
      const modifiers = await Modifiers.find(query)
        .populate("addons")
        .populate("createdBy", "fullname");
      res.status(200).json(modifiers);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getAllAddons: async (req, res) => {
    try {
      const addons = await Addons.find().populate("modifier");

      res.status(200).json(addons);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getOneModifier: async (req, res) => {
    try {
      const { id } = req.params;
      const modifier = await Modifiers.findById(id).populate("addons");
      if (!modifier) return res.status(404).json({ message: "Modifier not found" });
      
      res.status(200).json(modifier);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getOneAddon: async (req, res) => {
    try {
      const { id } = req.params;
      const addon = await Addons.findById(id);
      if (!addon) return res.status(404).json({ message: "Addon not found" });
      res.status(200).json(addon);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteOneModifier: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedModifier = await Modifiers.findByIdAndDelete(id);
      if (!deletedModifier)
        return res.status(404).json({ message: "Modifier not found" });
      res.status(200).json({ message: "Modifier deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteOneAddon: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedAddon = await Addons.findByIdAndDelete(id);
      if (!deletedAddon)
        return res.status(404).json({ message: "Addon not found" });
      res.status(200).json({ message: "Addon deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
