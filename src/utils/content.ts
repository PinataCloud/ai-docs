export async function getDocContent() {
	const request = await fetch(
		"https://raw.githubusercontent.com/PinataCloud/pinata/refs/heads/main/ai-instructions",
	);
	const content = await request.text();
	return content;
}
