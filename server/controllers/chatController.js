const router = require('express').Router();
const Message = require('../models/Message');


router.post('/send', async (req, res) => {
    const { sender, receiver,about, content } = req.body;
    try {
        const message = await Message.create({ sender, receiver,about, content });
        res.status(201).json(message);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Получаване на съобщения между двама потребители
router.get('/conversation/:user1/:user2', async (req, res) => {
    const { user1, user2 } = req.params;

    try {
        const messages = await Message.find({
            $or: [
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 }
            ]
        }).sort({ timestamp: 1 });

        res.status(200).json(messages);
        console.log(messages)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Непрочетени съобщения за даден потребител
router.get('/unread/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const unreadMessages = await Message.find({ receiver: userId, read: false });
        res.status(200).json(unreadMessages);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Маркиране на съобщение като прочетено
router.patch('/mark-read/:messageId', async (req, res) => {
    const { messageId } = req.params;

    try {
        const message = await Message.findByIdAndUpdate(messageId, { read: true }, { new: true });
        res.status(200).json(message);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.get('/unread-messages/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Броим всички съобщения, които са за този потребител и не са прочетени
        const unreadCount = await Message.countDocuments({
            receiver: userId,
            read: false
        });

        res.status(200).json({ unreadCount });
    } catch (err) {
        console.error('Error fetching unread messages:', err);
        res.status(500).json({ message: 'Failed to fetch unread messages.' });
    }
});

router.put('/mark-as-read/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        await Message.updateMany(
            { receiver: userId, read: false }, // Намираме всички непрочетени съобщения
            { $set: { read: true } } // Маркираме ги като прочетени
        );

        res.status(200).json({ message: 'Messages marked as read.' });
    } catch (err) {
        console.error('Error marking messages as read:', err);
        res.status(500).json({ message: 'Failed to mark messages as read.' });
    }
});


//@@@@@@
router.get('/:userId', async (req, res) => {
    try {
        const messages = await Message.find({ receiver: req.params.userId }).populate('sender', 'name');
        const formattedMessages = messages.map(msg => ({
            senderName: msg.sender.name,
            content: msg.content
        }));
        res.json(formattedMessages);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching messages' });
    }
});
// Изпращане на съобщение
router.post('/send', async (req, res) => {
    const { receiverId, content } = req.body;

    try {
        const message = new Message({
            sender: req.user._id, // ID на текущо логнатия потребител
            receiver: receiverId,
            content
        });
        await message.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error sending message' });
    }
});



module.exports = router;