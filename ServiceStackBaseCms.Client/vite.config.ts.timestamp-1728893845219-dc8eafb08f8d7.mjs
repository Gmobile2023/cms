// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/Gmobile/ServiceStackBaseCms/ServiceStackBaseCms.Client/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Gmobile/ServiceStackBaseCms/ServiceStackBaseCms.Client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import fs from "fs";
import path from "path";
import child_process from "child_process";
import { env } from "process";
import Press from "file:///D:/Gmobile/ServiceStackBaseCms/ServiceStackBaseCms.Client/node_modules/vite-plugin-press/dist/index.mjs";
import Pages from "file:///D:/Gmobile/ServiceStackBaseCms/ServiceStackBaseCms.Client/node_modules/vite-plugin-pages/dist/index.js";
import svgr from "file:///D:/Gmobile/ServiceStackBaseCms/ServiceStackBaseCms.Client/node_modules/vite-plugin-svgr/dist/index.js";
import mdx from "file:///D:/Gmobile/ServiceStackBaseCms/ServiceStackBaseCms.Client/node_modules/@mdx-js/rollup/index.js";
import remarkFrontmatter from "file:///D:/Gmobile/ServiceStackBaseCms/ServiceStackBaseCms.Client/node_modules/remark-frontmatter/index.js";
import remarkGfm from "file:///D:/Gmobile/ServiceStackBaseCms/ServiceStackBaseCms.Client/node_modules/remark-gfm/index.js";
import remarkPrism from "file:///D:/Gmobile/ServiceStackBaseCms/ServiceStackBaseCms.Client/node_modules/remark-prism/src/index.js";
import remarkParse from "file:///D:/Gmobile/ServiceStackBaseCms/ServiceStackBaseCms.Client/node_modules/remark-parse/index.js";
import rehypeStringify from "file:///D:/Gmobile/ServiceStackBaseCms/ServiceStackBaseCms.Client/node_modules/rehype-stringify/index.js";
import remarkDirective from "file:///D:/Gmobile/ServiceStackBaseCms/ServiceStackBaseCms.Client/node_modules/remark-directive/index.js";
import rehypeRaw from "file:///D:/Gmobile/ServiceStackBaseCms/ServiceStackBaseCms.Client/node_modules/rehype-raw/index.js";

// vite.config.markdown.ts
import { h } from "file:///D:/Gmobile/ServiceStackBaseCms/ServiceStackBaseCms.Client/node_modules/hastscript/index.js";
import { visit } from "file:///D:/Gmobile/ServiceStackBaseCms/ServiceStackBaseCms.Client/node_modules/unist-util-visit/index.js";
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
var __vite_injected_original_import_meta_url = "file:///D:/Gmobile/ServiceStackBaseCms/ServiceStackBaseCms.Client/vite.config.ts";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS5jb25maWcubWFya2Rvd24udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxHbW9iaWxlXFxcXFNlcnZpY2VTdGFja0Jhc2VDbXNcXFxcU2VydmljZVN0YWNrQmFzZUNtcy5DbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEdtb2JpbGVcXFxcU2VydmljZVN0YWNrQmFzZUNtc1xcXFxTZXJ2aWNlU3RhY2tCYXNlQ21zLkNsaWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovR21vYmlsZS9TZXJ2aWNlU3RhY2tCYXNlQ21zL1NlcnZpY2VTdGFja0Jhc2VDbXMuQ2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IGNoaWxkX3Byb2Nlc3MgZnJvbSAnY2hpbGRfcHJvY2VzcydcbmltcG9ydCB7IGVudiB9IGZyb20gJ3Byb2Nlc3MnXG5pbXBvcnQgUHJlc3MgZnJvbSBcInZpdGUtcGx1Z2luLXByZXNzXCJcbmltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcydcbmltcG9ydCBzdmdyIGZyb20gJ3ZpdGUtcGx1Z2luLXN2Z3InXG5pbXBvcnQgbWR4IGZyb20gXCJAbWR4LWpzL3JvbGx1cFwiXG5pbXBvcnQgcmVtYXJrRnJvbnRtYXR0ZXIgZnJvbSAncmVtYXJrLWZyb250bWF0dGVyJyAvLyBZQU1MIGFuZCBzdWNoLlxuaW1wb3J0IHJlbWFya0dmbSBmcm9tICdyZW1hcmstZ2ZtJyAvLyBUYWJsZXMsIGZvb3Rub3Rlcywgc3RyaWtldGhyb3VnaCwgdGFzayBsaXN0cywgbGl0ZXJhbCBVUkxzLlxuaW1wb3J0IHJlbWFya1ByaXNtIGZyb20gJ3JlbWFyay1wcmlzbSdcbmltcG9ydCByZW1hcmtQYXJzZSBmcm9tIFwicmVtYXJrLXBhcnNlXCJcbmltcG9ydCByZWh5cGVTdHJpbmdpZnkgZnJvbSAncmVoeXBlLXN0cmluZ2lmeSdcbmltcG9ydCByZW1hcmtEaXJlY3RpdmUgZnJvbSAncmVtYXJrLWRpcmVjdGl2ZSdcbmltcG9ydCByZWh5cGVSYXcgZnJvbSAncmVoeXBlLXJhdydcbmltcG9ydCB7IHJlbWFya0NvbnRhaW5lcnMsIHJlbWFya0ZlbmNlZENvZGUgfSBmcm9tICcuL3ZpdGUuY29uZmlnLm1hcmtkb3duJ1xuXG5jb25zdCBiYXNlRm9sZGVyID1cbiAgICBlbnYuQVBQREFUQSAhPT0gdW5kZWZpbmVkICYmIGVudi5BUFBEQVRBICE9PSAnJ1xuICAgICAgICA/IGAke2Vudi5BUFBEQVRBfS9BU1AuTkVUL2h0dHBzYFxuICAgICAgICA6IGAke2Vudi5IT01FfS8uYXNwbmV0L2h0dHBzYDtcblxuY29uc3QgY2VydGlmaWNhdGVBcmcgPSBwcm9jZXNzLmFyZ3YubWFwKGFyZyA9PiBhcmcubWF0Y2goLy0tbmFtZT0oPzx2YWx1ZT4uKykvaSkpLmZpbHRlcihCb29sZWFuKVswXTtcbmNvbnN0IGNlcnRpZmljYXRlTmFtZSA9IGNlcnRpZmljYXRlQXJnID8gY2VydGlmaWNhdGVBcmchLmdyb3VwcyEudmFsdWUgOiBcInNlcnZpY2VzdGFja2Jhc2VjbXMuY2xpZW50XCI7XG5cbmlmICghY2VydGlmaWNhdGVOYW1lKSB7XG4gICAgY29uc29sZS5lcnJvcignSW52YWxpZCBjZXJ0aWZpY2F0ZSBuYW1lLiBSdW4gdGhpcyBzY3JpcHQgaW4gdGhlIGNvbnRleHQgb2YgYW4gbnBtL3lhcm4gc2NyaXB0IG9yIHBhc3MgLS1uYW1lPTw8YXBwPj4gZXhwbGljaXRseS4nKVxuICAgIHByb2Nlc3MuZXhpdCgtMSk7XG59XG5cbmNvbnN0IGNlcnRGaWxlUGF0aCA9IHBhdGguam9pbihiYXNlRm9sZGVyLCBgJHtjZXJ0aWZpY2F0ZU5hbWV9LnBlbWApO1xuY29uc3Qga2V5RmlsZVBhdGggPSBwYXRoLmpvaW4oYmFzZUZvbGRlciwgYCR7Y2VydGlmaWNhdGVOYW1lfS5rZXlgKTtcblxuaWYgKCFmcy5leGlzdHNTeW5jKGNlcnRGaWxlUGF0aCkgfHwgIWZzLmV4aXN0c1N5bmMoa2V5RmlsZVBhdGgpKSB7XG4gICAgaWYgKDAgIT09IGNoaWxkX3Byb2Nlc3Muc3Bhd25TeW5jKCdkb3RuZXQnLCBbXG4gICAgICAgICdkZXYtY2VydHMnLFxuICAgICAgICAnaHR0cHMnLFxuICAgICAgICAnLS1leHBvcnQtcGF0aCcsXG4gICAgICAgIGNlcnRGaWxlUGF0aCxcbiAgICAgICAgJy0tZm9ybWF0JyxcbiAgICAgICAgJ1BlbScsXG4gICAgICAgICctLW5vLXBhc3N3b3JkJyxcbiAgICBdLCB7IHN0ZGlvOiAnaW5oZXJpdCcsIH0pLnN0YXR1cykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgY3JlYXRlIGNlcnRpZmljYXRlLlwiKTtcbiAgICB9XG59XG5cbmNvbnN0IHRhcmdldCA9IGVudi5BU1BORVRDT1JFX0hUVFBTX1BPUlQgPyBgaHR0cHM6Ly9sb2NhbGhvc3Q6JHtlbnYuQVNQTkVUQ09SRV9IVFRQU19QT1JUfWAgOlxuICAgIGVudi5BU1BORVRDT1JFX1VSTFMgPyBlbnYuQVNQTkVUQ09SRV9VUkxTLnNwbGl0KCc7JylbMF0gOiAnaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMSc7XG5jb25zdCBhcGlVcmwgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyA/IHRhcmdldCA6ICcnXG5jb25zdCBiYXNlVXJsID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCdcbiAgICA/IFwiaHR0cHM6Ly9sb2NhaG9zdDo1MTczXCJcbiAgICA6IHByb2Nlc3MuZW52LkRFUExPWV9IT1NUID8gYGh0dHBzOi8vJHtwcm9jZXNzLmVudi5ERVBMT1lfSE9TVH1gIDogdW5kZWZpbmVkXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoYXN5bmMgKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGRlZmluZTogeyBBUElfVVJMOiBgXCIke2FwaVVybH1cImAgfSxcbiAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgc3ZncigpLFxuICAgICAgICAgICAgbWR4KHtcbiAgICAgICAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9tZHhqcy5jb20vYWR2YW5jZWQvcGx1Z2luc1xuICAgICAgICAgICAgICAgIHJlbWFya1BsdWdpbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgcmVtYXJrRnJvbnRtYXR0ZXIsXG4gICAgICAgICAgICAgICAgICAgIHJlbWFya0ZlbmNlZENvZGUsXG4gICAgICAgICAgICAgICAgICAgIHJlbWFya0RpcmVjdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgcmVtYXJrR2ZtLFxuICAgICAgICAgICAgICAgICAgICByZW1hcmtQYXJzZSxcbiAgICAgICAgICAgICAgICAgICAgcmVtYXJrUHJpc20gYXMgYW55LFxuICAgICAgICAgICAgICAgICAgICByZW1hcmtDb250YWluZXJzLFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcmVoeXBlUGx1Z2luczogW1xuICAgICAgICAgICAgICAgICAgICBbcmVoeXBlUmF3LCB7cGFzc1Rocm91Z2g6WydtZHhqc0VzbScsJ21keEZsb3dFeHByZXNzaW9uJywnbWR4SnN4Rmxvd0VsZW1lbnQnLCdtZHhKc3hUZXh0RWxlbWVudCcsJ21keFRleHRFeHByZXNzaW9uJ119XSxcbiAgICAgICAgICAgICAgICAgICAgcmVoeXBlU3RyaW5naWZ5LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIFBhZ2VzKHtcbiAgICAgICAgICAgICAgICBleHRlbnNpb25zOiBbJ3RzeCcsICdtZHgnXVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICByZWFjdCgpLFxuICAgICAgICAgICAgUHJlc3Moe1xuICAgICAgICAgICAgICAgIGJhc2VVcmwsXG4gICAgICAgICAgICAgICAgLy9VbmNvbW1lbnQgdG8gZ2VuZXJhdGUgbWV0YWRhdGEgKi5qc29uIFxuICAgICAgICAgICAgICAgIC8vbWV0YWRhdGFQYXRoOiAnLi9wdWJsaWMvYXBpJyxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzZXJ2ZXI6IHtcbiAgICAgICAgICAgIHByb3h5OiB7XG4gICAgICAgICAgICAgICAgJ14vYXBpJzoge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgIHNlY3VyZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9ydDogNTE3MyxcbiAgICAgICAgICAgIGh0dHBzOiB7XG4gICAgICAgICAgICAgICAga2V5OiBmcy5yZWFkRmlsZVN5bmMoa2V5RmlsZVBhdGgpLFxuICAgICAgICAgICAgICAgIGNlcnQ6IGZzLnJlYWRGaWxlU3luYyhjZXJ0RmlsZVBhdGgpLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcR21vYmlsZVxcXFxTZXJ2aWNlU3RhY2tCYXNlQ21zXFxcXFNlcnZpY2VTdGFja0Jhc2VDbXMuQ2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxHbW9iaWxlXFxcXFNlcnZpY2VTdGFja0Jhc2VDbXNcXFxcU2VydmljZVN0YWNrQmFzZUNtcy5DbGllbnRcXFxcdml0ZS5jb25maWcubWFya2Rvd24udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0dtb2JpbGUvU2VydmljZVN0YWNrQmFzZUNtcy9TZXJ2aWNlU3RhY2tCYXNlQ21zLkNsaWVudC92aXRlLmNvbmZpZy5tYXJrZG93bi50c1wiO2ltcG9ydCB7IGggfSBmcm9tICdoYXN0c2NyaXB0J1xuaW1wb3J0IHsgdmlzaXQgfSBmcm9tICd1bmlzdC11dGlsLXZpc2l0J1xuXG5jb25zdCBGZW5jZWRDb21wb25lbnRzID0gWydmaWxlcyddXG5cbi8vIENvbnZlcnQgYGBgY29tcG9uZW50YGBgIHRvIDxjb21wb25lbnQgYm9keT17Y2hpbGRyZW59IC8+XG5leHBvcnQgZnVuY3Rpb24gcmVtYXJrRmVuY2VkQ29kZShvcHRpb25zOiB7IGNvbXBvbmVudHM/OnN0cmluZ1tdIH0gPSB7fSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodHJlZTogYW55KSB7XG4gICAgICAgIHZpc2l0KHRyZWUsIChub2RlKTogYW55ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFsbENvbXBvbmVudHMgPSBbLi4uKG9wdGlvbnMuY29tcG9uZW50cyB8fCBbXSksIC4uLkZlbmNlZENvbXBvbmVudHNdXG4gICAgICAgICAgICBjb25zdCB0eXBlID0gbm9kZS50eXBlXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gbm9kZS5kYXRhIHx8IChub2RlLmRhdGEgPSB7fSlcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnY29kZScgJiYgYWxsQ29tcG9uZW50cy5pbmNsdWRlcyhub2RlLmxhbmcpKSB7XG4gICAgICAgICAgICAgICAgbm9kZS50eXBlID0gJ3BhcmFncmFwaCdcbiAgICAgICAgICAgICAgICBkYXRhLmhOYW1lID0gbm9kZS5sYW5nXG4gICAgICAgICAgICAgICAgZGF0YS5oUHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEuaFByb3BlcnRpZXMsIHsgY2xhc3NOYW1lOiBub2RlLmF0dHJpYnV0ZXM/LmNsYXNzLCBib2R5Om5vZGUudmFsdWUgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgIH0pXG4gICAgfVxufVxuXG4vLyBDb252ZXJ0IDo6OmNvbXBvbmVudHsuY2xzfTo6OiBNYXJrZG93biBDb250YWluZXJzIHRvIDxjb21wb25lbnQgY2xhc3NOYW1lPVwiY2xzXCIgLz5cbmV4cG9ydCBmdW5jdGlvbiByZW1hcmtDb250YWluZXJzKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodHJlZTogYW55KSB7XG4gICAgICAgIGxldCBpID0gMFxuICAgICAgICBsZXQgcHJldlR5cGUgPSAnJ1xuICAgICAgICB2aXNpdCh0cmVlLCAobm9kZSk6IGFueSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gbm9kZS50eXBlXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gbm9kZS5kYXRhIHx8IChub2RlLmRhdGEgPSB7fSlcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0Q2hpbGQgPSBub2RlLmNoaWxkcmVuICYmIG5vZGUuY2hpbGRyZW5bMF1cbiAgICAgICAgICAgIGNvbnN0IGxpbmUgPSBmaXJzdENoaWxkPy52YWx1ZVxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICd0ZXh0RGlyZWN0aXZlJyB8fCB0eXBlID09PSAnbGVhZkRpcmVjdGl2ZScgfHwgdHlwZSA9PT0gJ2NvbnRhaW5lckRpcmVjdGl2ZScpIHtcbiAgICAgICAgICAgICAgICBkYXRhLmhOYW1lID0gbm9kZS5uYW1lXG4gICAgICAgICAgICAgICAgZGF0YS5oUHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEuaFByb3BlcnRpZXMsIHsgY2xhc3NOYW1lOiBub2RlLmF0dHJpYnV0ZXM/LmNsYXNzIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxpbmU/LnN0YXJ0c1dpdGgoJzo6OicpICYmIHByZXZUeXBlICE9PSAnY29udGFpbmVyRGlyZWN0aXZlJyAmJiBub2RlLnRhZ05hbWUgIT0gJ2NvZGUnKSB7XG4gICAgICAgICAgICAgICAgLy8gbWF0Y2ggOjo6aW5jbHVkZSA8ZmlsZT46OjogdW5sZXNzIHdpdGhpbiA6OjpwcmUgY29udGFpbmVyIG9yIGNvZGUgYmxvY2tcbiAgICAgICAgICAgICAgICBjb25zdCBtID0gbGluZS5tYXRjaCgvOjo6KFteXFxzXSspXFxzKyhbXjpdKylcXHMqLylcbiAgICAgICAgICAgICAgICBpZiAobSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWcgPSBtWzFdXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZ0JvZHkgPSBtWzJdPy5zcGxpdCgvXFxuLylcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJnID0gdGFnQm9keVswXT8udHJpbSgpID8/ICcnXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkgPSB0YWdCb2R5WzFdPy50cmltKCkgPz8gJydcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5oTmFtZSA9IHRhZ1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcmdOYW1lID0gdGFnID09PSAnaW5jbHVkZScgPyAnc3JjJyA6ICdhcmcnXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuaFByb3BlcnRpZXMgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhLmhQcm9wZXJ0aWVzLCB7IFthcmdOYW1lXTphcmcsIGNsYXNzTmFtZTogbm9kZS5hdHRyaWJ1dGVzPy5jbGFzcyB9KVxuICAgICAgICAgICAgICAgICAgICBpZiAoYm9keSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5oQ2hpbGRyZW4gPSBbaCgncCcsYm9keSldXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2VHlwZSA9IG5vZGUudHlwZVxuICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgfSlcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCByZW1hcmtDb250YWluZXJzIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxVyxTQUFTLGVBQWUsV0FBVztBQUV4WSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxRQUFRO0FBQ2YsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sbUJBQW1CO0FBQzFCLFNBQVMsV0FBVztBQUNwQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFNBQVM7QUFDaEIsT0FBTyx1QkFBdUI7QUFDOUIsT0FBTyxlQUFlO0FBQ3RCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8scUJBQXFCO0FBQzVCLE9BQU8scUJBQXFCO0FBQzVCLE9BQU8sZUFBZTs7O0FDbEJpVyxTQUFTLFNBQVM7QUFDelksU0FBUyxhQUFhO0FBRXRCLElBQU0sbUJBQW1CLENBQUMsT0FBTztBQUcxQixTQUFTLGlCQUFpQixVQUFvQyxDQUFDLEdBQUc7QUFDckUsU0FBTyxTQUFVLE1BQVc7QUFDeEIsVUFBTSxNQUFNLENBQUMsU0FBYztBQUN2QixZQUFNLGdCQUFnQixDQUFDLEdBQUksUUFBUSxjQUFjLENBQUMsR0FBSSxHQUFHLGdCQUFnQjtBQUN6RSxZQUFNLE9BQU8sS0FBSztBQUNsQixZQUFNLE9BQU8sS0FBSyxTQUFTLEtBQUssT0FBTyxDQUFDO0FBQ3hDLFVBQUksU0FBUyxVQUFVLGNBQWMsU0FBUyxLQUFLLElBQUksR0FBRztBQUN0RCxhQUFLLE9BQU87QUFDWixhQUFLLFFBQVEsS0FBSztBQUNs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
