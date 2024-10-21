// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/Gmobile/GmobileCms/ServiceStackBaseCms.Client/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Gmobile/GmobileCms/ServiceStackBaseCms.Client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import fs from "fs";
import path from "path";
import child_process from "child_process";
import { env } from "process";
import Press from "file:///D:/Gmobile/GmobileCms/ServiceStackBaseCms.Client/node_modules/vite-plugin-press/dist/index.mjs";
import Pages from "file:///D:/Gmobile/GmobileCms/ServiceStackBaseCms.Client/node_modules/vite-plugin-pages/dist/index.js";
import svgr from "file:///D:/Gmobile/GmobileCms/ServiceStackBaseCms.Client/node_modules/vite-plugin-svgr/dist/index.js";
import mdx from "file:///D:/Gmobile/GmobileCms/ServiceStackBaseCms.Client/node_modules/@mdx-js/rollup/index.js";
import remarkFrontmatter from "file:///D:/Gmobile/GmobileCms/ServiceStackBaseCms.Client/node_modules/remark-frontmatter/index.js";
import remarkGfm from "file:///D:/Gmobile/GmobileCms/ServiceStackBaseCms.Client/node_modules/remark-gfm/index.js";
import remarkPrism from "file:///D:/Gmobile/GmobileCms/ServiceStackBaseCms.Client/node_modules/remark-prism/src/index.js";
import remarkParse from "file:///D:/Gmobile/GmobileCms/ServiceStackBaseCms.Client/node_modules/remark-parse/index.js";
import rehypeStringify from "file:///D:/Gmobile/GmobileCms/ServiceStackBaseCms.Client/node_modules/rehype-stringify/index.js";
import remarkDirective from "file:///D:/Gmobile/GmobileCms/ServiceStackBaseCms.Client/node_modules/remark-directive/index.js";
import rehypeRaw from "file:///D:/Gmobile/GmobileCms/ServiceStackBaseCms.Client/node_modules/rehype-raw/index.js";

// vite.config.markdown.ts
import { h } from "file:///D:/Gmobile/GmobileCms/ServiceStackBaseCms.Client/node_modules/hastscript/index.js";
import { visit } from "file:///D:/Gmobile/GmobileCms/ServiceStackBaseCms.Client/node_modules/unist-util-visit/index.js";
var FencedComponents = ["files"];
function remarkFencedCode(options = {}) {
  return function(tree) {
    visit(tree, (node) => {
      const allComponents = [...options.components || [], ...FencedComponents];
      const type = node.type;
      const data = node.data || (node.data = {});
      if (type === "code" && allComponents.includes(node.lang)) {
        node.type = "paragraph";
        data.hName = node.lang;
        data.hProperties = Object.assign({}, data.hProperties, { className: node.attributes?.class, body: node.value });
      }
      return node;
    });
  };
}
function remarkContainers() {
  return function(tree) {
    let i = 0;
    let prevType = "";
    visit(tree, (node) => {
      const type = node.type;
      const data = node.data || (node.data = {});
      const firstChild = node.children && node.children[0];
      const line = firstChild?.value;
      if (type === "textDirective" || type === "leafDirective" || type === "containerDirective") {
        data.hName = node.name;
        data.hProperties = Object.assign({}, data.hProperties, { className: node.attributes?.class });
      } else if (line?.startsWith(":::") && prevType !== "containerDirective" && node.tagName != "code") {
        const m = line.match(/:::([^\s]+)\s+([^:]+)\s*/);
        if (m) {
          const tag = m[1];
          const tagBody = m[2]?.split(/\n/);
          const arg = tagBody[0]?.trim() ?? "";
          const body = tagBody[1]?.trim() ?? "";
          data.hName = tag;
          const argName = tag === "include" ? "src" : "arg";
          data.hProperties = Object.assign({}, data.hProperties, { [argName]: arg, className: node.attributes?.class });
          if (body) {
            data.hChildren = [h("p", body)];
          }
        }
      }
      prevType = node.type;
      return node;
    });
  };
}

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///D:/Gmobile/GmobileCms/ServiceStackBaseCms.Client/vite.config.ts";
var baseFolder = env.APPDATA !== void 0 && env.APPDATA !== "" ? `${env.APPDATA}/ASP.NET/https` : `${env.HOME}/.aspnet/https`;
var certificateArg = process.argv.map((arg) => arg.match(/--name=(?<value>.+)/i)).filter(Boolean)[0];
var certificateName = certificateArg ? certificateArg.groups.value : "servicestackbasecms.client";
if (!certificateName) {
  console.error("Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly.");
  process.exit(-1);
}
var certFilePath = path.join(baseFolder, `${certificateName}.pem`);
var keyFilePath = path.join(baseFolder, `${certificateName}.key`);
if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
  if (0 !== child_process.spawnSync("dotnet", [
    "dev-certs",
    "https",
    "--export-path",
    certFilePath,
    "--format",
    "Pem",
    "--no-password"
  ], { stdio: "inherit" }).status) {
    throw new Error("Could not create certificate.");
  }
}
var target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` : env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(";")[0] : "https://localhost:5001";
var apiUrl = process.env.NODE_ENV === "development" ? target : "";
var baseUrl = process.env.NODE_ENV === "development" ? "https://locahost:5173" : process.env.DEPLOY_HOST ? `https://${process.env.DEPLOY_HOST}` : void 0;
var vite_config_default = defineConfig(async () => {
  return {
    define: { API_URL: `"${apiUrl}"` },
    plugins: [
      svgr(),
      mdx({
        // See https://mdxjs.com/advanced/plugins
        remarkPlugins: [
          remarkFrontmatter,
          remarkFencedCode,
          remarkDirective,
          remarkGfm,
          remarkParse,
          remarkPrism,
          remarkContainers
        ],
        rehypePlugins: [
          [rehypeRaw, { passThrough: ["mdxjsEsm", "mdxFlowExpression", "mdxJsxFlowElement", "mdxJsxTextElement", "mdxTextExpression"] }],
          rehypeStringify
        ]
      }),
      Pages({
        extensions: ["tsx", "mdx"]
      }),
      react(),
      Press({
        baseUrl
        //Uncomment to generate metadata *.json 
        //metadataPath: './public/api',
      })
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    server: {
      proxy: {
        "^/api": {
          target,
          secure: false
        }
      },
      port: 5173,
      https: {
        key: fs.readFileSync(keyFilePath),
        cert: fs.readFileSync(certFilePath)
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS5jb25maWcubWFya2Rvd24udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxHbW9iaWxlXFxcXEdtb2JpbGVDbXNcXFxcU2VydmljZVN0YWNrQmFzZUNtcy5DbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEdtb2JpbGVcXFxcR21vYmlsZUNtc1xcXFxTZXJ2aWNlU3RhY2tCYXNlQ21zLkNsaWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovR21vYmlsZS9HbW9iaWxlQ21zL1NlcnZpY2VTdGFja0Jhc2VDbXMuQ2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXHJcbmltcG9ydCBmcyBmcm9tICdmcydcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IGNoaWxkX3Byb2Nlc3MgZnJvbSAnY2hpbGRfcHJvY2VzcydcclxuaW1wb3J0IHsgZW52IH0gZnJvbSAncHJvY2VzcydcclxuaW1wb3J0IFByZXNzIGZyb20gXCJ2aXRlLXBsdWdpbi1wcmVzc1wiXHJcbmltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcydcclxuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3ZncidcclxuaW1wb3J0IG1keCBmcm9tIFwiQG1keC1qcy9yb2xsdXBcIlxyXG5pbXBvcnQgcmVtYXJrRnJvbnRtYXR0ZXIgZnJvbSAncmVtYXJrLWZyb250bWF0dGVyJyAvLyBZQU1MIGFuZCBzdWNoLlxyXG5pbXBvcnQgcmVtYXJrR2ZtIGZyb20gJ3JlbWFyay1nZm0nIC8vIFRhYmxlcywgZm9vdG5vdGVzLCBzdHJpa2V0aHJvdWdoLCB0YXNrIGxpc3RzLCBsaXRlcmFsIFVSTHMuXHJcbmltcG9ydCByZW1hcmtQcmlzbSBmcm9tICdyZW1hcmstcHJpc20nXHJcbmltcG9ydCByZW1hcmtQYXJzZSBmcm9tIFwicmVtYXJrLXBhcnNlXCJcclxuaW1wb3J0IHJlaHlwZVN0cmluZ2lmeSBmcm9tICdyZWh5cGUtc3RyaW5naWZ5J1xyXG5pbXBvcnQgcmVtYXJrRGlyZWN0aXZlIGZyb20gJ3JlbWFyay1kaXJlY3RpdmUnXHJcbmltcG9ydCByZWh5cGVSYXcgZnJvbSAncmVoeXBlLXJhdydcclxuaW1wb3J0IHsgcmVtYXJrQ29udGFpbmVycywgcmVtYXJrRmVuY2VkQ29kZSB9IGZyb20gJy4vdml0ZS5jb25maWcubWFya2Rvd24nXHJcblxyXG5jb25zdCBiYXNlRm9sZGVyID1cclxuICAgIGVudi5BUFBEQVRBICE9PSB1bmRlZmluZWQgJiYgZW52LkFQUERBVEEgIT09ICcnXHJcbiAgICAgICAgPyBgJHtlbnYuQVBQREFUQX0vQVNQLk5FVC9odHRwc2BcclxuICAgICAgICA6IGAke2Vudi5IT01FfS8uYXNwbmV0L2h0dHBzYDtcclxuXHJcbmNvbnN0IGNlcnRpZmljYXRlQXJnID0gcHJvY2Vzcy5hcmd2Lm1hcChhcmcgPT4gYXJnLm1hdGNoKC8tLW5hbWU9KD88dmFsdWU+LispL2kpKS5maWx0ZXIoQm9vbGVhbilbMF07XHJcbmNvbnN0IGNlcnRpZmljYXRlTmFtZSA9IGNlcnRpZmljYXRlQXJnID8gY2VydGlmaWNhdGVBcmchLmdyb3VwcyEudmFsdWUgOiBcInNlcnZpY2VzdGFja2Jhc2VjbXMuY2xpZW50XCI7XHJcblxyXG5pZiAoIWNlcnRpZmljYXRlTmFtZSkge1xyXG4gICAgY29uc29sZS5lcnJvcignSW52YWxpZCBjZXJ0aWZpY2F0ZSBuYW1lLiBSdW4gdGhpcyBzY3JpcHQgaW4gdGhlIGNvbnRleHQgb2YgYW4gbnBtL3lhcm4gc2NyaXB0IG9yIHBhc3MgLS1uYW1lPTw8YXBwPj4gZXhwbGljaXRseS4nKVxyXG4gICAgcHJvY2Vzcy5leGl0KC0xKTtcclxufVxyXG5cclxuY29uc3QgY2VydEZpbGVQYXRoID0gcGF0aC5qb2luKGJhc2VGb2xkZXIsIGAke2NlcnRpZmljYXRlTmFtZX0ucGVtYCk7XHJcbmNvbnN0IGtleUZpbGVQYXRoID0gcGF0aC5qb2luKGJhc2VGb2xkZXIsIGAke2NlcnRpZmljYXRlTmFtZX0ua2V5YCk7XHJcblxyXG5pZiAoIWZzLmV4aXN0c1N5bmMoY2VydEZpbGVQYXRoKSB8fCAhZnMuZXhpc3RzU3luYyhrZXlGaWxlUGF0aCkpIHtcclxuICAgIGlmICgwICE9PSBjaGlsZF9wcm9jZXNzLnNwYXduU3luYygnZG90bmV0JywgW1xyXG4gICAgICAgICdkZXYtY2VydHMnLFxyXG4gICAgICAgICdodHRwcycsXHJcbiAgICAgICAgJy0tZXhwb3J0LXBhdGgnLFxyXG4gICAgICAgIGNlcnRGaWxlUGF0aCxcclxuICAgICAgICAnLS1mb3JtYXQnLFxyXG4gICAgICAgICdQZW0nLFxyXG4gICAgICAgICctLW5vLXBhc3N3b3JkJyxcclxuICAgIF0sIHsgc3RkaW86ICdpbmhlcml0JywgfSkuc3RhdHVzKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGNyZWF0ZSBjZXJ0aWZpY2F0ZS5cIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHRhcmdldCA9IGVudi5BU1BORVRDT1JFX0hUVFBTX1BPUlQgPyBgaHR0cHM6Ly9sb2NhbGhvc3Q6JHtlbnYuQVNQTkVUQ09SRV9IVFRQU19QT1JUfWAgOlxyXG4gICAgZW52LkFTUE5FVENPUkVfVVJMUyA/IGVudi5BU1BORVRDT1JFX1VSTFMuc3BsaXQoJzsnKVswXSA6ICdodHRwczovL2xvY2FsaG9zdDo1MDAxJztcclxuY29uc3QgYXBpVXJsID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgPyB0YXJnZXQgOiAnJ1xyXG5jb25zdCBiYXNlVXJsID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCdcclxuICAgID8gXCJodHRwczovL2xvY2Fob3N0OjUxNzNcIlxyXG4gICAgOiBwcm9jZXNzLmVudi5ERVBMT1lfSE9TVCA/IGBodHRwczovLyR7cHJvY2Vzcy5lbnYuREVQTE9ZX0hPU1R9YCA6IHVuZGVmaW5lZFxyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKGFzeW5jICgpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZGVmaW5lOiB7IEFQSV9VUkw6IGBcIiR7YXBpVXJsfVwiYCB9LFxyXG4gICAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICAgICAgc3ZncigpLFxyXG4gICAgICAgICAgICBtZHgoe1xyXG4gICAgICAgICAgICAgICAgLy8gU2VlIGh0dHBzOi8vbWR4anMuY29tL2FkdmFuY2VkL3BsdWdpbnNcclxuICAgICAgICAgICAgICAgIHJlbWFya1BsdWdpbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICByZW1hcmtGcm9udG1hdHRlcixcclxuICAgICAgICAgICAgICAgICAgICByZW1hcmtGZW5jZWRDb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbWFya0RpcmVjdGl2ZSxcclxuICAgICAgICAgICAgICAgICAgICByZW1hcmtHZm0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVtYXJrUGFyc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVtYXJrUHJpc20gYXMgYW55LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbWFya0NvbnRhaW5lcnMsXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgcmVoeXBlUGx1Z2luczogW1xyXG4gICAgICAgICAgICAgICAgICAgIFtyZWh5cGVSYXcsIHtwYXNzVGhyb3VnaDpbJ21keGpzRXNtJywnbWR4Rmxvd0V4cHJlc3Npb24nLCdtZHhKc3hGbG93RWxlbWVudCcsJ21keEpzeFRleHRFbGVtZW50JywnbWR4VGV4dEV4cHJlc3Npb24nXX1dLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlaHlwZVN0cmluZ2lmeSxcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBQYWdlcyh7XHJcbiAgICAgICAgICAgICAgICBleHRlbnNpb25zOiBbJ3RzeCcsICdtZHgnXVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgcmVhY3QoKSxcclxuICAgICAgICAgICAgUHJlc3Moe1xyXG4gICAgICAgICAgICAgICAgYmFzZVVybCxcclxuICAgICAgICAgICAgICAgIC8vVW5jb21tZW50IHRvIGdlbmVyYXRlIG1ldGFkYXRhICouanNvbiBcclxuICAgICAgICAgICAgICAgIC8vbWV0YWRhdGFQYXRoOiAnLi9wdWJsaWMvYXBpJyxcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgXSxcclxuICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VydmVyOiB7XHJcbiAgICAgICAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgICAgICAgICAnXi9hcGknOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlY3VyZTogZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcG9ydDogNTE3MyxcclxuICAgICAgICAgICAgaHR0cHM6IHtcclxuICAgICAgICAgICAgICAgIGtleTogZnMucmVhZEZpbGVTeW5jKGtleUZpbGVQYXRoKSxcclxuICAgICAgICAgICAgICAgIGNlcnQ6IGZzLnJlYWRGaWxlU3luYyhjZXJ0RmlsZVBhdGgpLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXEdtb2JpbGVcXFxcR21vYmlsZUNtc1xcXFxTZXJ2aWNlU3RhY2tCYXNlQ21zLkNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcR21vYmlsZVxcXFxHbW9iaWxlQ21zXFxcXFNlcnZpY2VTdGFja0Jhc2VDbXMuQ2xpZW50XFxcXHZpdGUuY29uZmlnLm1hcmtkb3duLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9HbW9iaWxlL0dtb2JpbGVDbXMvU2VydmljZVN0YWNrQmFzZUNtcy5DbGllbnQvdml0ZS5jb25maWcubWFya2Rvd24udHNcIjtpbXBvcnQgeyBoIH0gZnJvbSAnaGFzdHNjcmlwdCdcclxuaW1wb3J0IHsgdmlzaXQgfSBmcm9tICd1bmlzdC11dGlsLXZpc2l0J1xyXG5cclxuY29uc3QgRmVuY2VkQ29tcG9uZW50cyA9IFsnZmlsZXMnXVxyXG5cclxuLy8gQ29udmVydCBgYGBjb21wb25lbnRgYGAgdG8gPGNvbXBvbmVudCBib2R5PXtjaGlsZHJlbn0gLz5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbWFya0ZlbmNlZENvZGUob3B0aW9uczogeyBjb21wb25lbnRzPzpzdHJpbmdbXSB9ID0ge30pIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodHJlZTogYW55KSB7XHJcbiAgICAgICAgdmlzaXQodHJlZSwgKG5vZGUpOiBhbnkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBhbGxDb21wb25lbnRzID0gWy4uLihvcHRpb25zLmNvbXBvbmVudHMgfHwgW10pLCAuLi5GZW5jZWRDb21wb25lbnRzXVxyXG4gICAgICAgICAgICBjb25zdCB0eXBlID0gbm9kZS50eXBlXHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBub2RlLmRhdGEgfHwgKG5vZGUuZGF0YSA9IHt9KVxyXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2NvZGUnICYmIGFsbENvbXBvbmVudHMuaW5jbHVkZXMobm9kZS5sYW5nKSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS50eXBlID0gJ3BhcmFncmFwaCdcclxuICAgICAgICAgICAgICAgIGRhdGEuaE5hbWUgPSBub2RlLmxhbmdcclxuICAgICAgICAgICAgICAgIGRhdGEuaFByb3BlcnRpZXMgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhLmhQcm9wZXJ0aWVzLCB7IGNsYXNzTmFtZTogbm9kZS5hdHRyaWJ1dGVzPy5jbGFzcywgYm9keTpub2RlLnZhbHVlIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBDb252ZXJ0IDo6OmNvbXBvbmVudHsuY2xzfTo6OiBNYXJrZG93biBDb250YWluZXJzIHRvIDxjb21wb25lbnQgY2xhc3NOYW1lPVwiY2xzXCIgLz5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbWFya0NvbnRhaW5lcnMoKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRyZWU6IGFueSkge1xyXG4gICAgICAgIGxldCBpID0gMFxyXG4gICAgICAgIGxldCBwcmV2VHlwZSA9ICcnXHJcbiAgICAgICAgdmlzaXQodHJlZSwgKG5vZGUpOiBhbnkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0eXBlID0gbm9kZS50eXBlXHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBub2RlLmRhdGEgfHwgKG5vZGUuZGF0YSA9IHt9KVxyXG4gICAgICAgICAgICBjb25zdCBmaXJzdENoaWxkID0gbm9kZS5jaGlsZHJlbiAmJiBub2RlLmNoaWxkcmVuWzBdXHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmUgPSBmaXJzdENoaWxkPy52YWx1ZVxyXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3RleHREaXJlY3RpdmUnIHx8IHR5cGUgPT09ICdsZWFmRGlyZWN0aXZlJyB8fCB0eXBlID09PSAnY29udGFpbmVyRGlyZWN0aXZlJykge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5oTmFtZSA9IG5vZGUubmFtZVxyXG4gICAgICAgICAgICAgICAgZGF0YS5oUHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEuaFByb3BlcnRpZXMsIHsgY2xhc3NOYW1lOiBub2RlLmF0dHJpYnV0ZXM/LmNsYXNzIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluZT8uc3RhcnRzV2l0aCgnOjo6JykgJiYgcHJldlR5cGUgIT09ICdjb250YWluZXJEaXJlY3RpdmUnICYmIG5vZGUudGFnTmFtZSAhPSAnY29kZScpIHtcclxuICAgICAgICAgICAgICAgIC8vIG1hdGNoIDo6OmluY2x1ZGUgPGZpbGU+Ojo6IHVubGVzcyB3aXRoaW4gOjo6cHJlIGNvbnRhaW5lciBvciBjb2RlIGJsb2NrXHJcbiAgICAgICAgICAgICAgICBjb25zdCBtID0gbGluZS5tYXRjaCgvOjo6KFteXFxzXSspXFxzKyhbXjpdKylcXHMqLylcclxuICAgICAgICAgICAgICAgIGlmIChtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFnID0gbVsxXVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZ0JvZHkgPSBtWzJdPy5zcGxpdCgvXFxuLylcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcmcgPSB0YWdCb2R5WzBdPy50cmltKCkgPz8gJydcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBib2R5ID0gdGFnQm9keVsxXT8udHJpbSgpID8/ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5oTmFtZSA9IHRhZ1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyZ05hbWUgPSB0YWcgPT09ICdpbmNsdWRlJyA/ICdzcmMnIDogJ2FyZydcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmhQcm9wZXJ0aWVzID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YS5oUHJvcGVydGllcywgeyBbYXJnTmFtZV06YXJnLCBjbGFzc05hbWU6IG5vZGUuYXR0cmlidXRlcz8uY2xhc3MgfSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYm9keSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmhDaGlsZHJlbiA9IFtoKCdwJyxib2R5KV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJldlR5cGUgPSBub2RlLnR5cGVcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHJlbWFya0NvbnRhaW5lcnMiXSwKICAibWFwcGluZ3MiOiAiO0FBQTBVLFNBQVMsZUFBZSxXQUFXO0FBRTdXLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixPQUFPLFFBQVE7QUFDZixPQUFPLFVBQVU7QUFDakIsT0FBTyxtQkFBbUI7QUFDMUIsU0FBUyxXQUFXO0FBQ3BCLE9BQU8sV0FBVztBQUNsQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sU0FBUztBQUNoQixPQUFPLHVCQUF1QjtBQUM5QixPQUFPLGVBQWU7QUFDdEIsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxxQkFBcUI7QUFDNUIsT0FBTyxxQkFBcUI7QUFDNUIsT0FBTyxlQUFlOzs7QUNsQnNVLFNBQVMsU0FBUztBQUM5VyxTQUFTLGFBQWE7QUFFdEIsSUFBTSxtQkFBbUIsQ0FBQyxPQUFPO0FBRzFCLFNBQVMs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
