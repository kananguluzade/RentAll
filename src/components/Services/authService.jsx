import bcrypt from "bcryptjs";

export const loginUser = async (email, password) => {
  const response = await fetch(`http://localhost:3000/users?email=${email}`);
  const data = await response.json();

  if (data.length > 0) {
    const user = data[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password); // Compare plain password with hashed password

    if (isPasswordValid) {
      return user; // Return user data if password is valid
    }
  }
  throw new Error("Invalid email or password");
};
