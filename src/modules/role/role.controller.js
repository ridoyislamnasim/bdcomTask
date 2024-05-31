import bcrypt from "bcryptjs";
import { userRegschema } from "../../models/auth/user.js";
import { newsschema } from "../../models/news/news.js";
import { roleschema } from "../../models/role/role.js";

class newsController {

  getRolePage = async (req, res, next) => {
    console.log("req.user", req.user)
    console.log("req.role", req.role)
    const roles = await roleschema.find();
    res.render("role/role", {
      roles: roles,
      role: req.role,
    })
  };

  createRole = async (req, res, next) => {
    try {
      console.log(req.body);
      const { role } = req.body;
      if (!role ) {
        return res.status(400).json({ message: 'Role must be required.', error: true });
      }

      let roleObj = new roleschema({
        role: role,
      });

      const createdRole = await roleObj.save();

      res.status(201).json({ message: 'Role created successfully.', });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while creating the Role.', error: true });
    }
  };

  updateRole = async (req, res, next) => {
    try {
      const { id } = req.params;
      let { role} = req.body;
      const updateObj = {
        role: role,
      }

      const updatedRole = await roleschema.findByIdAndUpdate(id, updateObj, { new: true });

      if (!updatedRole) {
        return res.status(404).json({ message: 'Role not found.' });
      }

      res.status(200).json({ message: 'Role updated successfully.',});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the Role.', error: error.message });
    }
  };


  deleteRole = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'Role ID is required.' });
      }
      const deleted = await roleschema.findByIdAndDelete(id);

      if (!deleted) {
        return res.status(404).json({ message: 'Role not found.' });
      }

      res.status(200).json({ message: 'Role deleted successfully.', });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'An error occurred while deleting the Role.', error: error.message });
    }
  };



}

export default new newsController();
