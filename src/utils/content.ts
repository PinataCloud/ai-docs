export async function getFilesContent() {
	const request = await fetch(
		"https://raw.githubusercontent.com/PinataCloud/pinata/refs/heads/main/ai-instructions",
	);
	const content = await request.text();
	return content;
}

export async function getIPFSContent() {
	const request = await fetch(
		"https://raw.githubusercontent.com/PinataCloud/pinata-web3/refs/heads/main/ai-instructions",
	);
	const content = await request.text();
	return content;
}
