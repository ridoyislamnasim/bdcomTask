import bcrypt from "bcryptjs";
import { userRegschema } from "../../models/auth/user.js";

class userController {
  
  getUser = async (req, res, next) => {
    const users = await userRegschema.find();
    res.render("user/user", {
      users : users,
      return_value: '',
  })
    // const payload = {
		// 	room_number: req.body?.room_number,
		// 	department_name: req.body?.department_name,
		// 	rows_number: req.body?.rows_number,
		// 	columns_name: req.body?.columns_name,
    //   room_type: req.body?.room_type,
		// };

		// const feature = await RoomService.createRoom(payload);
    // const resDoc = responseHandler(201, 'Room Created successfully', feature);
    // res.status(resDoc.statusCode).json(resDoc);
	};
  createUser = async (req, res, next) => {
    try {
      console.log(req.body);
      const { name, password, email } = req.body;
      if (!name || !password || !email) {
        return res.status(400).json({ message: 'Name Email and Password must be required.', error: true });
      }
      if (password.length < 5) {
        return res.status(400).json({ message: 'Password must be geter than 5.', error: true });
      }
      const existingUser = await userRegschema.findOne({ email: email });
      if (existingUser) {
          return res.status(400).json({ message: 'This email is already in use.', error: true });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      let newUser = new userRegschema({
          name: name,
          email: email,
          password: hashedPassword,
      });

      const createdUser = await newUser.save();
      
      res.status(201).json({ message: 'User created successfully.', user: createdUser });
  } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'An error occurred while creating the user.', error: true });
  }
};

 deleteUser = async (req, res) => {
  try {
      const { id } = req.params;
      if (!id) {
          return res.status(400).json({ message: 'User ID is required.' });
      }
      const deletedUser = await userRegschema.findByIdAndDelete(id);

      if (!deletedUser) {
          return res.status(404).json({ message: 'User not found.' });
      }

      res.status(200).json({ message: 'User deleted successfully.', user: deletedUser });
  } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ message: 'An error occurred while deleting the user.', error: error.message });
  }
};


 
}

export default new userController();
