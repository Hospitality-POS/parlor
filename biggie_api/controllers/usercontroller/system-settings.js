const SystemSettings = require("../../models/user/system-settings");
const paymentDetail = require("../../models/Payment/payment-details");

module.exports = {
  createSystemSettings: async (req, res) => {
    try {
      const settings = await SystemSettings.create(req.body);
      res.status(201).json(settings);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  },

  getAllSystemSettings: async (req, res) => {
    try {
      const settings = await SystemSettings.find();
      res.status(200).json(settings);
    } catch (error) {
      console.error("Error fetching system settings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getSystemSettingsById: async (req, res) => {
    try {

      const setting = await SystemSettings.findById(req.params.id).lean();
      setting.paymentDetails = await paymentDetail.findById(setting.paymentDetailId).lean();

      if (!setting) {
        return res.status(404).json({ error: "System setting not found" });
      }
      res.json(setting);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateSystemSettingById: async (req, res) => {
    try {
      const updatedSetting = await SystemSettings.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedSetting) {
        return res.status(404).json({
          error: "System setting not found",
        });
      }
      res.json(updatedSetting);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  },

  deleteSystemSettingById: async (req, res) => {
    try {
      const deletedSetting = await SystemSettings.findByIdAndDelete(
        req.params.id
      );
      if (!deletedSetting) {
        return res.status(404).json({ error: "System setting not found" });
      }
      res.json(deletedSetting);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
