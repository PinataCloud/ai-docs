interface RequestHeaders {
  get(name: string): string | null;
}

export interface RequestLike {
  headers: RequestHeaders;
}

export function isProgrammaticRequest(request: RequestLike): boolean {
  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";
  const acceptHeader = request.headers.get("accept")?.toLowerCase() || "";

  console.log(userAgent)
  console.log(acceptHeader)

  const programmaticIndicators = {
    commandLineTools: [
      "curl",
      "wget",
      "postman",
      "insomnia",
      "python",
      "node",
      "axios",
      "got",
      "fetch",
      "apache",
      "bot",
    ],

    bots: ["googlebot", "bingbot", "baiduspider", "yandexbot", "duckduckbot"],

    browsers: ["mozilla", "chrome", "safari", "firefox", "edge", "opera"],
  };

  const isCommandLineTool = programmaticIndicators.commandLineTools.some(
    (tool) => userAgent.includes(tool),
  );

  const isBot = programmaticIndicators.bots.some((bot) =>
    userAgent.includes(bot),
  );

  const isBrowser = programmaticIndicators.browsers.some((browser) =>
    userAgent.includes(browser),
  );

  const isAcceptPlainText =
    acceptHeader.includes("text/plain") || acceptHeader === "*/*";

  const isProgrammaticHeaders =
    request.headers.get("sec-fetch-mode") === "programmatic" ||
    request.headers.get("x-requested-with") === "XMLHttpRequest";

  return (
    isCommandLineTool ||
    isBot ||
    (!isBrowser && isAcceptPlainText) ||
    isProgrammaticHeaders
  );
}
