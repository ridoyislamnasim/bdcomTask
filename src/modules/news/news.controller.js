import bcrypt from "bcryptjs";
import { userRegschema } from "../../models/auth/user.js";
import { newsschema } from "../../models/news/news.js";

class newsController {

  getNewsPage = async (req, res, next) => {
    console.log("req.user", req.user)
    console.log("req.role", req.role)
    const news = await newsschema.find();
    res.render("news/news", {
      news: news,
      role: req.role,
    })
  };
  createNews = async (req, res, next) => {
    try {
      console.log(req.body);
      const { title, body } = req.body;
      if (!title || !body ) {
        return res.status(400).json({ message: 'Title and body must be required.', error: true });
      }

      let newsObj = new newsschema({
        title: title,
        body: body,
      });

      const createdNews = await newsObj.save();

      res.status(201).json({ message: 'News created successfully.', news: createdNews });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while creating the News.', error: true });
    }
  };

  updateNews = async (req, res, next) => {
    try {
      const { id } = req.params;
      let { title, body } = req.body;
      const updateObj = {
        title: title,
        body: body,
      }

      const updatedNews = await newsschema.findByIdAndUpdate(id, updateObj, { new: true });

      if (!updatedNews) {
        return res.status(404).json({ message: 'News not found.' });
      }

      res.status(200).json({ message: 'News updated successfully.', News: updatedNews });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the News.', error: error.message });
    }
  };


  deleteNews = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'News ID is required.' });
      }
      const deletedUser = await newsschema.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json({ message: 'News not found.' });
      }

      res.status(200).json({ message: 'News deleted successfully.', });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'An error occurred while deleting the news.', error: error.message });
    }
  };



}

export default new newsController();
