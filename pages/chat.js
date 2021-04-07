import { useEffect, useState, useRef, useContext } from 'react';
import { getTwilioToken } from '@/lib/chat/getToken';
import * as twilioChat from '@/lib/chat/twilio';

const { DateTime } = require('luxon');

import { ChatContext } from '@/components/ChatContext';

export default function Chat({ chatToken }) {
	const [messages, setMessages] = useState();
	const [chatState, dispatch] = useContext(ChatContext);

	const messageTypeRef = useRef(null);
	const messageRef = useRef(null);

	console.log(chatState);

	useEffect(() => {
		(async function anyNameFunction() {
			let messages = await twilioChat.getChatMessages(
				chatToken,
				'CH8df3e689c71b4a87aa47f8b64ea2b9f5'
			);

			setMessages(messages);
		})();
	}, [chatToken]);

	// Send the message to Twilio
	const submitMessageHandler = (event) => {
		event.preventDefault();

		twilioChat.sendMessages(
			chatToken,
			'CH8df3e689c71b4a87aa47f8b64ea2b9f5',
			messageRef.current.value
		);

		// Clear out the message
		messageRef.current.value = '';
	};

	// Handle loging here.
	// after authorizing the user, store the user in the context.
	// The context provides a way to pass data through the component
	// tree without having to pass props down manually at every level.
	// https://reactjs.org/docs/context.html
	const handleLogin = () => {
		dispatch({
			type: 'setUser',
			payload: {
				email: 'name@example.com',
				name: 'Claudio F.'
			}
		});
	};

	// Handle log-out here
	const handleLogOut = () => {
		dispatch({
			type: 'setUser',
			payload: null
		});
	};

	return (
		<>
			<h1 className="text-5xl font-extrabold text-indigo-600">Merlin Chat</h1>
			{!chatState.user ? (
				<button
					className="text-white border border-white px-5 py-2 my-10"
					onClick={() => {
						handleLogin();
					}}>
					Login
				</button>
			) : (
				<button
					onClick={() => {
						handleLogOut();
					}}
					className="text-white mt-2 mb-10">
					Log Out
				</button>
			)}

			<div className="flex flex-col flex-1 items-start px-4 w-96">
				<div className="flex flex-row mb-2.5 text-xs">
					<button className="bg-gray-400 rounded-full px-1.5 text-black">
						<span>Newest</span>
					</button>
					<button className="px-1.5">
						<span>Top Likes</span>
					</button>
					<button className="flex items-center px-0.5 text-gray-500">
						<svg
							className="h-4"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
							/>
						</svg>
						<span className="text-white">2</span>
					</button>
					<button className="flex items-center px-0.5 text-gray-500">
						<svg
							className="h-4"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path
								fillRule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="text-white">3</span>
					</button>
					<button className="flex items-center">
						<svg
							className="h-4"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path
								fillRule="evenodd"
								d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="text-white">78</span>
					</button>
					<button className="flex items-center text-gray-500">
						<svg
							className="h-4"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path
								fillRule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="text-white">4/10</span>
					</button>
				</div>

				{/* Chat container */}
				<div className="text-xs flex-1 flex flex-col mt-4 space-y-7">
					{/* Chat message */}
					{messages &&
						messages.items.map((message) => (
							<div key={message.index} className="flex flex-row items-start">
								<div className="h-8 w-8 bg-indigo-700 rounded-full flex-shrink-0 mr-2"></div>
								<div className="">
									<div className="flex items-baseline mb-1">
										<h4 className="text-gray-200">{message.state.author}</h4>
										<time className="text-gray-500 pl-1">
											&bull;{' '}
											{DateTime.fromJSDate(
												message.state.timestamp
											).toLocaleString(DateTime.DATETIME_MED)}
										</time>
									</div>
									<span className="bg-indigo-700 px-2 rounded-full">
										Instructor
									</span>
									<p className="mt-2 text-gray-400">{message.state.body}</p>
								</div>
							</div>
						))}
				</div>

				{chatState.user && (
					<div className="space-y-2 mb-2">
						{/* Select the question type */}
						<select
							id="location"
							name="location"
							defaultValue="Message"
							ref={messageTypeRef}
							className="text-white mt-1 w-full pl-3 pr-10 py-2 bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs rounded-md">
							<option>Message</option>
							<option>Question</option>
						</select>

						{/* Chat text area */}
						<textarea
							id="chat"
							name="chat"
							rows={3}
							ref={messageRef}
							placeholder="Message all participants"
							className="text-white shadow-xs w-full focus:ring-indigo-500 focus:border-indigo-500 text-xs rounded-md bg-gray-700 py-1 px-3"></textarea>
						<button
							onClick={submitMessageHandler}
							className="bg-indigo-600 text-sm py-1 px-3 rounded-md">
							Send Message
						</button>
					</div>
				)}
			</div>
		</>
	);
}

/**
 * Next.js specific
 */
export async function getServerSideProps(context) {
	const chatToken = await getTwilioToken('claudio@monogram.io');

	return { props: { chatToken } };
}
