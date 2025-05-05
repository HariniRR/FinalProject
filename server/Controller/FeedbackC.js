const Feedback = require("../Model/FeedbackM");

exports.submitFeedback = async (req, res) => {
  const { username, feedback } = req.body;
  if (!username || !feedback) {
    return res.status(400).json({ message: "Name and feedback are required" });
  }
  try {
    const newFeedback = new Feedback({ username, feedback });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ message: "Error submitting feedback" });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find(); 
    res.status(200).json(feedbackList);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving feedback" });
  }
};

exports.deleteFeedback = async (req, res) => {
  const feedbackId = req.params.id;
  try {
      const result = await Feedback.findByIdAndDelete(feedbackId);
      if (!result) {
          return res.status(404).json({ message: 'Feedback not found' });
      }
      res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
      console.error("Error deleting feedback:", error);
      res.status(500).json({ message: 'Server error' });
  }
};