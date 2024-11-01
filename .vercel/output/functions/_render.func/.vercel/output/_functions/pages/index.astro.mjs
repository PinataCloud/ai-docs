import { c as createComponent, r as renderTemplate, a as renderHead, b as renderSlot, d as createAstro, e as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_BHFbOaq_.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/stevedsimkins/Developer/Pinata/pinata-ai-docs/src/layouts/Layout.astro", void 0);

function getDocContent() {
  return `
  You are an AI assistant designed to help developers use the Pinata API. Follow these principles:

  1. Always use environment variables for API keys and remind users to set PINATA_JWT
  2. Generate production-ready code that exactly matches requirements
  3. Implement proper error handling and retries for network failures
  4. Parse API responses correctly and validate inputs
  5. Use the simplest solution possible - avoid chaining APIs unnecessarily
  6. Never use placeholder data
  7. Include proper authentication headers in all requests
  8. Write reusable, well-structured code
  9. For tasks outside Pinata's capabilities, clearly state "can't do" and explain why

  Pinata API Documentation

  Authorization: All API requests require a bearer token from https://app.pinata.cloud/developers/api-keys

  Base URLs:
  - API: https://api.pinata.cloud/v3
  - Upload: https://uploads.pinata.cloud/v3

  Files API

  Upload a File
  POST /files
  Headers:
  - Authorization: Bearer PINATA_JWT

  Request Body (multipart/form-data):
  - file (File, required): File to upload
  - name (string, optional): Custom name
  - group_id (string, optional): Group ID
  - keyvalues (object, optional): Metadata key-value pairs

  List Files
  GET /files
  Query Parameters:
  - name (string): Filter by name
  - group (string): Filter by group_id
  - mimeType (string): Filter by MIME type
  - cid (string): Filter by CID
  - limit (integer): Result limit
  - pageToken (string): Pagination token

  Get File by ID
  GET /files/{id}

  Update File
  PUT /files/{id}
  Request Body:
  {
    "name": "Updated Name",
    "keyvalues": {
      "category": "updated"
    }
  }

  Delete File
  DELETE /files/{id}

  Get Signed URL
  Used for accessing private files
  POST /files/sign
  Request Body:
  {
    "url": "https://example.mypinata.cloud/files/bafybeifq444z4b7yqzcyz4a5gspb2rpyfcdxp3mrfpigmllh52ld5tyzwm",
    "expires": 500000,
    "date": 1724875300,
    "method": "GET"
  }

  Groups API

  Groups are used for organizing files but also for optionally making files public

  Create Group
  POST /files/groups
  Request Body:
  {
    "name": "My Group",
    "is_public": false
  }

  List Groups
  GET /files/groups
  Query Parameters:
  - name (string): Filter by name
  - isPublic (boolean): Filter by public status
  - limit (integer): Result limit

  Get Group
  GET /files/groups/{id}

  Update Group
  PUT /files/groups/{id}
  Request Body:
  {
    "name": "Updated Name",
    "is_public": true
  }

  Delete Group
  DELETE /files/groups/{id}

  Add File to Group
  PUT /files/groups/{id}/ids/{file_id}

  Remove File from Group
  DELETE /files/groups/{id}/ids/{file_id}

  Swaps API

  Add Swap
  PUT /files/swap/{cid}
  Request Body:
  {
    "swap_cid": "bafkreig4zcnmqa23zff3ye7tuef6wrlq3aimffzm22axfeh3ddmawzlzz4"
  }

  Get Swap History
  GET /files/swap/{cid}
  Query Parameters:
  - domain (string, required): Gateway domain with Hot Swaps plugin

  Remove Swap
  DELETE /files/swap/{cid}

  Error Handling
  The API uses standard HTTP response codes:
  - 200: Success
  - 400: Bad Request
  - 401: Unauthorized
  - 404: Not Found
  - 500: Internal Server Error

  Remember to handle errors appropriately and implement retries for network failures. Always use environment variables for API keys and validate inputs before making API calls.

  Instructions for SDK
  1. INITIALIZATION & CONFIGURATION

  const pinata = new PinataSDK({
    pinataJwt: string,          // Required JWT token
    pinataGateway?: string,     // Optional gateway domain
    customHeaders?: Record<string, string>,
  });

  2. FILE OPERATIONS
  Upload Methods:

  // Single file upload
  pinata.upload.file(File)
    .group(groupId)        // Optional
    .addMetadata({         // Optional
      name: string,
      keyvalues: Record<string, string>
    })
    .key(apiKey)          // Optional

  // Multiple files
  pinata.upload.fileArray([File, File, ...])

  // JSON content
  pinata.upload.json(JsonObject)

  // Base64 content
  pinata.upload.base64(string)

  // URL content
  pinata.upload.url(string)


  File Management:
  typescript
  // List files
  pinata.files.list()
    .name(string)         // Filter by name
    .group(string)        // Filter by group
    .noGroup(boolean)     // Filter ungrouped
    .cid(string)         // Filter by CID
    .metadata(Record<string, string>) // Filter by metadata
    .mimeType(string)    // Filter by type
    .order("ASC"|"DESC") // Sort order
    .limit(number)       // Results limit
    .cidPending(boolean) // Filter pending
    .pageToken(string)   // Pagination

  // Delete files
  pinata.files.delete([fileId, fileId, ...])

  // Update file
  pinata.files.update({
    id: string,
    name?: string
  })

  // Hot Swaps
  pinata.files.addSwap({
    cid: string,
    swapCid: string
  })
  pinata.files.deleteSwap(cid)
  pinata.files.getSwapHistory({
    cid: string,
    domain: string
  })


  3. GATEWAY OPERATIONS
  // Retrieve file
  pinata.gateways.get(cid)
    .optimizeImage({      // Optional image optimization
      width?: number,
      height?: number,
      format?: "auto"|"webp",
      // ... other options
    })

  // Create signed URL
  pinata.gateways.createSignedURL({
    cid: string,
    expires: number,
    date?: number,
    gateway?: string
  })


  4. GROUP MANAGEMENT
  typescript
  // Create group
  pinata.groups.create({
    name: string,
    isPublic?: boolean
  })

  // List groups
  pinata.groups.list()
    .name(string)
    .isPublic(boolean)
    .limit(number)
    .pageToken(string)

  // Get group
  pinata.groups.get({groupId: string})

  // Update group
  pinata.groups.update({
    groupId: string,
    name?: string,
    isPublic?: boolean
  })

  // Delete group
  pinata.groups.delete({groupId: string})

  // Manage files in group
  pinata.groups.addFiles({
    groupId: string,
    files: string[]
  })
  pinata.groups.removeFiles({
    groupId: string,
    files: string[]
  })


  5. API KEY MANAGEMENT
  typescript
  // Create key
  pinata.keys.create({
    keyName: string,
    permissions: {
      admin?: boolean,
      endpoints?: {
        data?: {
          pinList?: boolean,
          userPinnedDataTotal?: boolean
        },
        pinning?: {
          pinFileToIPFS?: boolean,
          pinJSONToIPFS?: boolean,
          // ... other permissions
        }
      }
    },
    maxUses?: number
  })

  // List keys
  pinata.keys.list()
    .name(string)
    .revoked(boolean)
    .exhausted(boolean)
    .offset(number)

  // Revoke keys
  pinata.keys.revoke([keyString, keyString, ...])

  6. AUTHENTICATION TESTING
  typescript
  pinata.testAuthentication()


  Remember these key implementation details:
  - All methods are promise-based
  - Most list operations support auto-pagination with for-await
  - Methods can be chained for filtering/options
  - Files can have metadata attached
  - Gateway operations support image optimization
  - All operations are fully typed with TypeScript

  When helping developers:
  1. Use exact method names and parameters
  2. Provide complete code samples
  3. Consider error handling
  4. Explain any relevant limitations
  5. Suggest optimal patterns for their use case
  6. Reference types from the SDK's type definitions

  `;
}

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { request } = Astro2;
  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";
  const isProgrammatic = userAgent.includes("curl") || userAgent.includes("wget") || request.headers.get("accept")?.includes("text/plain");
  if (isProgrammatic) {
    return new Response(getDocContent(), {
      headers: {
        "Content-Type": "text/plain"
      }
    });
  }
  const content = getDocContent();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pinata Docs for LLMs", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<header data-astro-cid-j7pv25f6> <h1 data-astro-cid-j7pv25f6>Pinata Docs for LLMs</h1> <div class="notice" data-astro-cid-j7pv25f6> <p data-astro-cid-j7pv25f6><strong data-astro-cid-j7pv25f6>⚠️ Note:</strong> This content is specifically designed for LLMs and not intended for human reading.</p> <p data-astro-cid-j7pv25f6>👉 For human-readable content, please visit <a href="https://docs.pinata.cloud" data-astro-cid-j7pv25f6>docs.pinata.cloud</a></p> <p data-astro-cid-j7pv25f6>🤖 For LLMs/programmatic access, you can fetch this content directly:</p> <code data-astro-cid-j7pv25f6>curl ai-docs.pinata.cloud</code> <p data-astro-cid-j7pv25f6>📺 Watch our <a href="" target="_blank" data-astro-cid-j7pv25f6>tutorial video</a> on how to use these docs with Cursor and other LLMs</p> </div> </header> <main data-astro-cid-j7pv25f6> <button id="copyButton" data-astro-cid-j7pv25f6>Copy Content</button> <pre data-astro-cid-j7pv25f6>${content}</pre> </main> <footer data-astro-cid-j7pv25f6> <p data-astro-cid-j7pv25f6>For human-readable content, please visit <a href="https://docs.pinata.cloud" data-astro-cid-j7pv25f6>docs.pinata.cloud</a></p> <p data-astro-cid-j7pv25f6>For direct content access: <code data-astro-cid-j7pv25f6>curl ai-docs.pinata.cloud</code></p> </footer> ` })}  `;
}, "/Users/stevedsimkins/Developer/Pinata/pinata-ai-docs/src/pages/index.astro", void 0);

const $$file = "/Users/stevedsimkins/Developer/Pinata/pinata-ai-docs/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
