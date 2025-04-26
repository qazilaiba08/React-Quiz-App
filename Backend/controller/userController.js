export const login = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await user.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Email" });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });
  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  
    res.status(200).json({
      token,
      isAdmin: user.isAdmin,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
    });
  };