import '@/styles/tailwind.css';
import '@/styles/global.scss';

import { ChatProvider } from '@/components/ChatContext';

export default function App({ Component, pageProps }) {
	return (
		<ChatProvider>
			<main className="container mx-auto mt-8">
				<Component {...pageProps} />
			</main>
		</ChatProvider>
	);
}
