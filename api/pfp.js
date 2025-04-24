const axios = require('axios');

module.exports = async (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.status(400).json({ success: false, message: 'Username is required' });
  }

  try {
    // Fetch Instagram page data
    const { data } = await axios.get(`https://www.instagram.com/${username}/?__a=1`, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    // Extract the profile picture URL from the returned data
    const profilePicUrl = data.graphql.user.profile_pic_url_hd;

    if (profilePicUrl) {
      return res.status(200).json({ success: true, url: profilePicUrl });
    } else {
      return res.status(404).json({ success: false, message: 'Profile picture not found' });
    }

  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error fetching profile' });
  }
};
