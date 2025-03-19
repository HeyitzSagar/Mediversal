const express = require('express')
const dotenv = require('dotenv')
const cors = require("cors");
const helmet = require("helmet");
dotenv.config()
const http = require("http");
const app = express()
const port = process.env.PORT;
const connectDB = require('./db/db');
const patientRouter = require('./routes/patientRoutes');
const notificationRouter = require('./routes/notificationRoutes');
const limiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');
const notificationService = require('./services/notificationService')
const server = http.createServer(app);


notificationService.init(server)

connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(logger);
app.use(limiter);

app.use('/api/patients', patientRouter);
app.use("/notifications", notificationRouter);
app.use(errorHandler);
app.get('/', (req, res) => res.send('Hello World!'))

server.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`📡 WebSocket listening on ws://localhost:${port}`);
});