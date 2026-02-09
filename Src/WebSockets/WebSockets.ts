import { Server, Socket } from 'socket.io';
import ChatRoomRepo from '../Repositories/ChatRepo';

export const setupMessageHandlers = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('User connected:', socket.id);

        // Join a room
        socket.on('join-room', ({ userId, businessId }) => {
            const roomId = `${businessId}-${userId}`;
            socket.join(roomId);
            console.log(`Socket ${socket.id} joined room: ${roomId}`);
        });

        // Send a message
        socket.on('send-message', async (data) => {
            const { userId, businessId, message, senderName } = data;

            // Save message in DB
            const chatRoom = await ChatRoomRepo.create({
                businessId,
                userId,
                message,
                senderName,
            });
            const lastMsg = chatRoom.messages[chatRoom.messages.length - 1];
            const roomId = `${businessId}-${userId}`;

            // Emit message only to this room
            // io.to(roomId).emit('receive_message', {
            //     chatId: chatRoom._id,
            //     messageId: lastMsg._id,
            //     senderName,
            // });
            socket.broadcast.to(roomId).emit('receive_message', {
                chatId: chatRoom._id,
                messageId: lastMsg._id,
                senderName,
                message: lastMsg.content,
            });
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};
