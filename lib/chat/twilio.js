import { Client as ConversationsClient } from '@twilio/conversations';

/**
 *
 * @param token User's token
 * @param conversationSid conversation Sid
 * @returns the list of messages
 */
export async function getChatMessages(token, conversationSid) {
	const client = await ConversationsClient.create(token);
	const stageAConversation = await client.getConversationBySid(conversationSid);

	let messages = await stageAConversation.getMessages().catch((err) => {
		console.log(err);
	});

	return messages;
}

/**
 *
 * @param token user's token
 * @param conversationSid conversation Sid
 * @returns ???
 */
export async function addUserToConversation(token, conversationSid) {
	let client = await ConversationsClient.create(token);

	const conv = await client.getConversationBySid(conversationSid);
	conv.join();

	// Temporary
	// FIXME: update with real value
	return true;
}

/**
 *
 * @param token User's token
 * @param conversationSid conversation Sid
 * @param message the message to be sent
 * @returns Message's index in the Conversation's messages list
 */
export async function sendMessages(token, conversationSid, message) {
	let client = await ConversationsClient.create(token);
	const conv = await client.getConversationBySid(conversationSid);

	// Message's index in the Conversation's messages list
	return await conv.sendMessage(message);
}
