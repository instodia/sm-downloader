const axios = require('axios');

module.exports = async (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.status(400).json({ success: false, message: 'Username is required' });
  }

  try {
    const { data } = await axios.get(`https://www.instagram.com/${username}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const match = data.match(/"profile_pic_url_hd":"([^"]+)"/);
    if (match && match[1]) {
      const picUrl = match[1].replace(/\\u0026/g, '&');
      return res.status(200).json({ success: true, url: picUrl });
    } else {
      return res.status(404).json({ success: false, message: 'Profile picture not found' });
    }

  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error fetching profile' });
  }
};
