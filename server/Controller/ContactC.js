const Contact = require('../Model/ContactM');

exports.submitContact= async (req, res) => {
    const { name, email, message, termsAccepted } = req.body;

    try {
        const newContact = new Contact({ name, email, message, termsAccepted });
        await newContact.save();
        res.status(201).json({ message: 'Contact form submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting contact form', error });
    }
};

exports.getContact = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving contact submissions', error });
    }
};

exports.deleteContact = async (req, res) => {
    try {
      const contact = await Contact.findByIdAndDelete(req.params.id);
      if (!contact) {
        return res.status(404).json({ message: "Contact response not found" });
      }
      res.json({ message: "Contact response deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };