# Color Stripper

Takes an url to an image you supply, generates a color palette from it, and then takes the top 4 and colors the sample box.

Will not work if the origin site does not have their CORS policy properly configured to allow access-control-allow-origin. Have tested with the following:

### Works
- [Lorem Picsum](https://picsum.photos/)
- [Pexels](https://www.pexels.com/)
- [Unsplash](https://unsplash.com/) :: Not using 'share' link
- [Wikipedia](https://en.wikipedia.org/wiki/Main_Page) / [Wikimedia](https://commons.wikimedia.org/wiki/Main_Page)

### Access Denied
- iStock
- Pixabay
- Unsplash 'Share' link