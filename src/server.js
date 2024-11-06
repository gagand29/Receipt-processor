//Name - GAGAN DODDANNA
//EMAIL - gagandoddanna@gmail.com

const app = require('./app');

const PORT = process.env.PORT || 3000;

/**
 * Starts the server and listens on the specified port.
 * If no environment variable for the port is provided, it defaults to 3000.
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
