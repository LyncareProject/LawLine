require('dotenv').config()

const app = require('./src/app');
// const server = require('./websocket');

const { PORT, WSPORT } = require('./src/common');

const { connectToDatabase } = require('./src/mongo');

connectToDatabase()  
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Main Server is listening at PORT : ${PORT}`);
        }) 
        // server.listen(WSPORT, () => {
        //     consoe.log(`WebSocket lServer is listening at http://localhost:${ WSPORT }`);
        // });
    })
    .catch(error => {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    });

