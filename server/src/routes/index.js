const express = require('express');

const router = express.Router();

const userRouter = require('./user.routes');
const authRouter = require('./auth.routes');
const counselRouter = require('./counsel.routes');
const commentRouter = require('./comment.routes');
const forwardRouter = require('./forward.routes');
const requestRouter = require('./request.routes');
const roomRouter = require('./room.routes');
const chatRouter = require('./chat.routes');

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/counsel', counselRouter);
router.use('/comment', commentRouter);
router.use('/forward', forwardRouter);
router.use('/request', requestRouter);
router.use('/room', roomRouter);
router.use('/chat', chatRouter);

module.exports = router;