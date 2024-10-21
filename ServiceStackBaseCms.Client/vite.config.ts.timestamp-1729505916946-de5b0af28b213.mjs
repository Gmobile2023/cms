// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/Backend/Gmobile/gmobile-cms/ServiceStackBaseCms.Client/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Backend/Gmobile/gmobile-cms/ServiceStackBaseCms.Client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import { env } from "process";
import Press from "file:///D:/Backend/Gmobile/gmobile-cms/ServiceStackBaseCms.Client/node_modules/vite-plugin-press/dist/index.mjs";
import Pages from "file:///D:/Backend/Gmobile/gmobile-cms/ServiceStackBaseCms.Client/node_modules/vite-plugin-pages/dist/index.js";
import svgr from "file:///D:/Backend/Gmobile/gmobile-cms/ServiceStackBaseCms.Client/node_modules/vite-plugin-svgr/dist/index.js";
import mdx from "file:///D:/Backend/Gmobile/gmobile-cms/ServiceStackBaseCms.Client/node_modules/@mdx-js/rollup/index.js";
import remarkFrontmatter from "file:///D:/Backend/Gmobile/gmobile-cms/ServiceStackBaseCms.Client/node_modules/remark-frontmatter/index.js";
import remarkGfm from "file:///D:/Backend/Gmobile/gmobile-cms/ServiceStackBaseCms.Client/node_modules/remark-gfm/index.js";
import remarkPrism from "file:///D:/Backend/Gmobile/gmobile-cms/ServiceStackBaseCms.Client/node_modules/remark-prism/src/index.js";
import remarkParse from "file:///D:/Backend/Gmobile/gmobile-cms/ServiceStackBaseCms.Client/node_modules/remark-parse/index.js";
import rehypeStringify from "file:///D:/Backend/Gmobile/gmobile-cms/ServiceStackBaseCms.Client/node_modules/rehype-stringify/index.js";
import remarkDirective from "file:///D:/Backend/Gmobile/gmobile-cms/ServiceStackBaseCms.Client/node_modules/remark-directive/index.js";
import rehypeRaw from "file:///D:/Backend/Gmobile/gmobile-cms/ServiceStackBaseCms.Client/node_modules/rehype-raw/index.js";

// vite.config.markdown.ts
import { h } from "file:///D:/Backend/Gmobile/gmobile-cms/ServiceStackBaseCms.Client/node_modules/hastscript/index.js";
import { visit } from "file:///D:/Backend/Gmobile/gmobile-cms/ServiceStackBaseCms.Client/node_modules/unist-util-visit/index.js";
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
var __vite_injected_original_import_meta_url = "file:///D:/Backend/Gmobile/gmobile-cms/ServiceStackBaseCms.Client/vite.config.ts";
var baseFolder = env.APPDATA !== void 0 && env.APPDATA !== "" ? `${env.APPDATA}/ASP.NET/https` : `${env.HOME}/.aspnet/https`;
var certificateArg = process.argv.map((arg) => arg.match(/--name=(?<value>.+)/i)).filter(Boolean)[0];
var certificateName = certificateArg ? certificateArg.groups.value : "servicestackbasecms.client";
if (!certificateName) {
  console.error(
    "Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly."
  );
  process.exit(-1);
}
var certFilePath = path.join(baseFolder, `${certificateName}.pem`);
var keyFilePath = path.join(baseFolder, `${certificateName}.key`);
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
          [
            rehypeRaw,
            {
              passThrough: [
                "mdxjsEsm",
                "mdxFlowExpression",
                "mdxJsxFlowElement",
                "mdxJsxTextElement",
                "mdxTextExpression"
              ]
            }
          ],
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
      port: 5173
      // https: {
      //     key: fs.readFileSync(keyFilePath),
      //     cert: fs.readFileSync(certFilePath),
      // },
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS5jb25maWcubWFya2Rvd24udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxCYWNrZW5kXFxcXEdtb2JpbGVcXFxcZ21vYmlsZS1jbXNcXFxcU2VydmljZVN0YWNrQmFzZUNtcy5DbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEJhY2tlbmRcXFxcR21vYmlsZVxcXFxnbW9iaWxlLWNtc1xcXFxTZXJ2aWNlU3RhY2tCYXNlQ21zLkNsaWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQmFja2VuZC9HbW9iaWxlL2dtb2JpbGUtY21zL1NlcnZpY2VTdGFja0Jhc2VDbXMuQ2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XHJcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IGNoaWxkX3Byb2Nlc3MgZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcclxuaW1wb3J0IHsgZW52IH0gZnJvbSBcInByb2Nlc3NcIjtcclxuaW1wb3J0IFByZXNzIGZyb20gXCJ2aXRlLXBsdWdpbi1wcmVzc1wiO1xyXG5pbXBvcnQgUGFnZXMgZnJvbSBcInZpdGUtcGx1Z2luLXBhZ2VzXCI7XHJcbmltcG9ydCBzdmdyIGZyb20gXCJ2aXRlLXBsdWdpbi1zdmdyXCI7XHJcbmltcG9ydCBtZHggZnJvbSBcIkBtZHgtanMvcm9sbHVwXCI7XHJcbmltcG9ydCByZW1hcmtGcm9udG1hdHRlciBmcm9tIFwicmVtYXJrLWZyb250bWF0dGVyXCI7IC8vIFlBTUwgYW5kIHN1Y2guXHJcbmltcG9ydCByZW1hcmtHZm0gZnJvbSBcInJlbWFyay1nZm1cIjsgLy8gVGFibGVzLCBmb290bm90ZXMsIHN0cmlrZXRocm91Z2gsIHRhc2sgbGlzdHMsIGxpdGVyYWwgVVJMcy5cclxuaW1wb3J0IHJlbWFya1ByaXNtIGZyb20gXCJyZW1hcmstcHJpc21cIjtcclxuaW1wb3J0IHJlbWFya1BhcnNlIGZyb20gXCJyZW1hcmstcGFyc2VcIjtcclxuaW1wb3J0IHJlaHlwZVN0cmluZ2lmeSBmcm9tIFwicmVoeXBlLXN0cmluZ2lmeVwiO1xyXG5pbXBvcnQgcmVtYXJrRGlyZWN0aXZlIGZyb20gXCJyZW1hcmstZGlyZWN0aXZlXCI7XHJcbmltcG9ydCByZWh5cGVSYXcgZnJvbSBcInJlaHlwZS1yYXdcIjtcclxuaW1wb3J0IHsgcmVtYXJrQ29udGFpbmVycywgcmVtYXJrRmVuY2VkQ29kZSB9IGZyb20gXCIuL3ZpdGUuY29uZmlnLm1hcmtkb3duXCI7XHJcblxyXG5jb25zdCBiYXNlRm9sZGVyID1cclxuICAgIGVudi5BUFBEQVRBICE9PSB1bmRlZmluZWQgJiYgZW52LkFQUERBVEEgIT09IFwiXCJcclxuICAgICAgICA/IGAke2Vudi5BUFBEQVRBfS9BU1AuTkVUL2h0dHBzYFxyXG4gICAgICAgIDogYCR7ZW52LkhPTUV9Ly5hc3BuZXQvaHR0cHNgO1xyXG5cclxuY29uc3QgY2VydGlmaWNhdGVBcmcgPSBwcm9jZXNzLmFyZ3ZcclxuICAgIC5tYXAoKGFyZykgPT4gYXJnLm1hdGNoKC8tLW5hbWU9KD88dmFsdWU+LispL2kpKVxyXG4gICAgLmZpbHRlcihCb29sZWFuKVswXTtcclxuY29uc3QgY2VydGlmaWNhdGVOYW1lID0gY2VydGlmaWNhdGVBcmdcclxuICAgID8gY2VydGlmaWNhdGVBcmchLmdyb3VwcyEudmFsdWVcclxuICAgIDogXCJzZXJ2aWNlc3RhY2tiYXNlY21zLmNsaWVudFwiO1xyXG5cclxuaWYgKCFjZXJ0aWZpY2F0ZU5hbWUpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgICAgXCJJbnZhbGlkIGNlcnRpZmljYXRlIG5hbWUuIFJ1biB0aGlzIHNjcmlwdCBpbiB0aGUgY29udGV4dCBvZiBhbiBucG0veWFybiBzY3JpcHQgb3IgcGFzcyAtLW5hbWU9PDxhcHA+PiBleHBsaWNpdGx5LlwiXHJcbiAgICApO1xyXG4gICAgcHJvY2Vzcy5leGl0KC0xKTtcclxufVxyXG5cclxuY29uc3QgY2VydEZpbGVQYXRoID0gcGF0aC5qb2luKGJhc2VGb2xkZXIsIGAke2NlcnRpZmljYXRlTmFtZX0ucGVtYCk7XHJcbmNvbnN0IGtleUZpbGVQYXRoID0gcGF0aC5qb2luKGJhc2VGb2xkZXIsIGAke2NlcnRpZmljYXRlTmFtZX0ua2V5YCk7XHJcblxyXG4vLyBpZiAoIWZzLmV4aXN0c1N5bmMoY2VydEZpbGVQYXRoKSB8fCAhZnMuZXhpc3RzU3luYyhrZXlGaWxlUGF0aCkpIHtcclxuLy8gICAgIGlmICgwICE9PSBjaGlsZF9wcm9jZXNzLnNwYXduU3luYygnZG90bmV0JywgW1xyXG4vLyAgICAgICAgICdkZXYtY2VydHMnLFxyXG4vLyAgICAgICAgICdodHRwcycsXHJcbi8vICAgICAgICAgJy0tZXhwb3J0LXBhdGgnLFxyXG4vLyAgICAgICAgIGNlcnRGaWxlUGF0aCxcclxuLy8gICAgICAgICAnLS1mb3JtYXQnLFxyXG4vLyAgICAgICAgICdQZW0nLFxyXG4vLyAgICAgICAgICctLW5vLXBhc3N3b3JkJyxcclxuLy8gICAgIF0sIHsgc3RkaW86ICdpbmhlcml0JywgfSkuc3RhdHVzKSB7XHJcbi8vICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGNyZWF0ZSBjZXJ0aWZpY2F0ZS5cIik7XHJcbi8vICAgICB9XHJcbi8vIH1cclxuXHJcbmNvbnN0IHRhcmdldCA9IGVudi5BU1BORVRDT1JFX0hUVFBTX1BPUlRcclxuICAgID8gYGh0dHBzOi8vbG9jYWxob3N0OiR7ZW52LkFTUE5FVENPUkVfSFRUUFNfUE9SVH1gXHJcbiAgICA6IGVudi5BU1BORVRDT1JFX1VSTFNcclxuICAgID8gZW52LkFTUE5FVENPUkVfVVJMUy5zcGxpdChcIjtcIilbMF1cclxuICAgIDogXCJodHRwczovL2xvY2FsaG9zdDo1MDAxXCI7XHJcbmNvbnN0IGFwaVVybCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcImRldmVsb3BtZW50XCIgPyB0YXJnZXQgOiBcIlwiO1xyXG5jb25zdCBiYXNlVXJsID1cclxuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcImRldmVsb3BtZW50XCJcclxuICAgICAgICA/IFwiaHR0cHM6Ly9sb2NhaG9zdDo1MTczXCJcclxuICAgICAgICA6IHByb2Nlc3MuZW52LkRFUExPWV9IT1NUXHJcbiAgICAgICAgPyBgaHR0cHM6Ly8ke3Byb2Nlc3MuZW52LkRFUExPWV9IT1NUfWBcclxuICAgICAgICA6IHVuZGVmaW5lZDtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyhhc3luYyAoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRlZmluZTogeyBBUElfVVJMOiBgXCIke2FwaVVybH1cImAgfSxcclxuICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICAgIHN2Z3IoKSxcclxuICAgICAgICAgICAgbWR4KHtcclxuICAgICAgICAgICAgICAgIC8vIFNlZSBodHRwczovL21keGpzLmNvbS9hZHZhbmNlZC9wbHVnaW5zXHJcbiAgICAgICAgICAgICAgICByZW1hcmtQbHVnaW5zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgcmVtYXJrRnJvbnRtYXR0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVtYXJrRmVuY2VkQ29kZSxcclxuICAgICAgICAgICAgICAgICAgICByZW1hcmtEaXJlY3RpdmUsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVtYXJrR2ZtLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbWFya1BhcnNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbWFya1ByaXNtIGFzIGFueSxcclxuICAgICAgICAgICAgICAgICAgICByZW1hcmtDb250YWluZXJzLFxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIHJlaHlwZVBsdWdpbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlaHlwZVJhdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzc1Rocm91Z2g6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1keGpzRXNtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZHhGbG93RXhwcmVzc2lvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWR4SnN4Rmxvd0VsZW1lbnRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1keEpzeFRleHRFbGVtZW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZHhUZXh0RXhwcmVzc2lvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlaHlwZVN0cmluZ2lmeSxcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBQYWdlcyh7XHJcbiAgICAgICAgICAgICAgICBleHRlbnNpb25zOiBbXCJ0c3hcIiwgXCJtZHhcIl0sXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICByZWFjdCgpLFxyXG4gICAgICAgICAgICBQcmVzcyh7XHJcbiAgICAgICAgICAgICAgICBiYXNlVXJsLFxyXG4gICAgICAgICAgICAgICAgLy9VbmNvbW1lbnQgdG8gZ2VuZXJhdGUgbWV0YWRhdGEgKi5qc29uXHJcbiAgICAgICAgICAgICAgICAvL21ldGFkYXRhUGF0aDogJy4vcHVibGljL2FwaScsXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICBhbGlhczoge1xyXG4gICAgICAgICAgICAgICAgXCJAXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjXCIsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VydmVyOiB7XHJcbiAgICAgICAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgICAgICAgICBcIl4vYXBpXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VjdXJlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBvcnQ6IDUxNzMsXHJcbiAgICAgICAgICAgIC8vIGh0dHBzOiB7XHJcbiAgICAgICAgICAgIC8vICAgICBrZXk6IGZzLnJlYWRGaWxlU3luYyhrZXlGaWxlUGF0aCksXHJcbiAgICAgICAgICAgIC8vICAgICBjZXJ0OiBmcy5yZWFkRmlsZVN5bmMoY2VydEZpbGVQYXRoKSxcclxuICAgICAgICAgICAgLy8gfSxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxufSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcQmFja2VuZFxcXFxHbW9iaWxlXFxcXGdtb2JpbGUtY21zXFxcXFNlcnZpY2VTdGFja0Jhc2VDbXMuQ2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxCYWNrZW5kXFxcXEdtb2JpbGVcXFxcZ21vYmlsZS1jbXNcXFxcU2VydmljZVN0YWNrQmFzZUNtcy5DbGllbnRcXFxcdml0ZS5jb25maWcubWFya2Rvd24udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0JhY2tlbmQvR21vYmlsZS9nbW9iaWxlLWNtcy9TZXJ2aWNlU3RhY2tCYXNlQ21zLkNsaWVudC92aXRlLmNvbmZpZy5tYXJrZG93bi50c1wiO2ltcG9ydCB7IGggfSBmcm9tICdoYXN0c2NyaXB0J1xyXG5pbXBvcnQgeyB2aXNpdCB9IGZyb20gJ3VuaXN0LXV0aWwtdmlzaXQnXHJcblxyXG5jb25zdCBGZW5jZWRDb21wb25lbnRzID0gWydmaWxlcyddXHJcblxyXG4vLyBDb252ZXJ0IGBgYGNvbXBvbmVudGBgYCB0byA8Y29tcG9uZW50IGJvZHk9e2NoaWxkcmVufSAvPlxyXG5leHBvcnQgZnVuY3Rpb24gcmVtYXJrRmVuY2VkQ29kZShvcHRpb25zOiB7IGNvbXBvbmVudHM/OnN0cmluZ1tdIH0gPSB7fSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0cmVlOiBhbnkpIHtcclxuICAgICAgICB2aXNpdCh0cmVlLCAobm9kZSk6IGFueSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFsbENvbXBvbmVudHMgPSBbLi4uKG9wdGlvbnMuY29tcG9uZW50cyB8fCBbXSksIC4uLkZlbmNlZENvbXBvbmVudHNdXHJcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBub2RlLnR5cGVcclxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IG5vZGUuZGF0YSB8fCAobm9kZS5kYXRhID0ge30pXHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnY29kZScgJiYgYWxsQ29tcG9uZW50cy5pbmNsdWRlcyhub2RlLmxhbmcpKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnR5cGUgPSAncGFyYWdyYXBoJ1xyXG4gICAgICAgICAgICAgICAgZGF0YS5oTmFtZSA9IG5vZGUubGFuZ1xyXG4gICAgICAgICAgICAgICAgZGF0YS5oUHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEuaFByb3BlcnRpZXMsIHsgY2xhc3NOYW1lOiBub2RlLmF0dHJpYnV0ZXM/LmNsYXNzLCBib2R5Om5vZGUudmFsdWUgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIENvbnZlcnQgOjo6Y29tcG9uZW50ey5jbHN9Ojo6IE1hcmtkb3duIENvbnRhaW5lcnMgdG8gPGNvbXBvbmVudCBjbGFzc05hbWU9XCJjbHNcIiAvPlxyXG5leHBvcnQgZnVuY3Rpb24gcmVtYXJrQ29udGFpbmVycygpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodHJlZTogYW55KSB7XHJcbiAgICAgICAgbGV0IGkgPSAwXHJcbiAgICAgICAgbGV0IHByZXZUeXBlID0gJydcclxuICAgICAgICB2aXNpdCh0cmVlLCAobm9kZSk6IGFueSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBub2RlLnR5cGVcclxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IG5vZGUuZGF0YSB8fCAobm9kZS5kYXRhID0ge30pXHJcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0Q2hpbGQgPSBub2RlLmNoaWxkcmVuICYmIG5vZGUuY2hpbGRyZW5bMF1cclxuICAgICAgICAgICAgY29uc3QgbGluZSA9IGZpcnN0Q2hpbGQ/LnZhbHVlXHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAndGV4dERpcmVjdGl2ZScgfHwgdHlwZSA9PT0gJ2xlYWZEaXJlY3RpdmUnIHx8IHR5cGUgPT09ICdjb250YWluZXJEaXJlY3RpdmUnKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmhOYW1lID0gbm9kZS5uYW1lXHJcbiAgICAgICAgICAgICAgICBkYXRhLmhQcm9wZXJ0aWVzID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YS5oUHJvcGVydGllcywgeyBjbGFzc05hbWU6IG5vZGUuYXR0cmlidXRlcz8uY2xhc3MgfSlcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsaW5lPy5zdGFydHNXaXRoKCc6OjonKSAmJiBwcmV2VHlwZSAhPT0gJ2NvbnRhaW5lckRpcmVjdGl2ZScgJiYgbm9kZS50YWdOYW1lICE9ICdjb2RlJykge1xyXG4gICAgICAgICAgICAgICAgLy8gbWF0Y2ggOjo6aW5jbHVkZSA8ZmlsZT46OjogdW5sZXNzIHdpdGhpbiA6OjpwcmUgY29udGFpbmVyIG9yIGNvZGUgYmxvY2tcclxuICAgICAgICAgICAgICAgIGNvbnN0IG0gPSBsaW5lLm1hdGNoKC86OjooW15cXHNdKylcXHMrKFteOl0rKVxccyovKVxyXG4gICAgICAgICAgICAgICAgaWYgKG0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWcgPSBtWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFnQm9keSA9IG1bMl0/LnNwbGl0KC9cXG4vKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyZyA9IHRhZ0JvZHlbMF0/LnRyaW0oKSA/PyAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkgPSB0YWdCb2R5WzFdPy50cmltKCkgPz8gJydcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmhOYW1lID0gdGFnXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJnTmFtZSA9IHRhZyA9PT0gJ2luY2x1ZGUnID8gJ3NyYycgOiAnYXJnJ1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuaFByb3BlcnRpZXMgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhLmhQcm9wZXJ0aWVzLCB7IFthcmdOYW1lXTphcmcsIGNsYXNzTmFtZTogbm9kZS5hdHRyaWJ1dGVzPy5jbGFzcyB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChib2R5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuaENoaWxkcmVuID0gW2goJ3AnLGJvZHkpXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcmV2VHlwZSA9IG5vZGUudHlwZVxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgcmVtYXJrQ29udGFpbmVycyJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVcsU0FBUyxlQUFlLFdBQVc7QUFFMVksU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBRWxCLE9BQU8sVUFBVTtBQUVqQixTQUFTLFdBQVc7QUFDcEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sdUJBQXVCO0FBQzlCLE9BQU8sZUFBZTtBQUN0QixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLHFCQUFxQjtBQUM1QixPQUFPLHFCQUFxQjtBQUM1QixPQUFPLGVBQWU7OztBQ2xCbVcsU0FBUyxTQUFTO0FBQzNZLFNBQVMsYUFBYTtBQUV0QixJQUFNLG1CQUFtQixDQUFDLE9BQU87QUFHMUIsU0FBUyxpQkFBaUIsVUFBb0MsQ0FBQyxHQUFHO0FBQ3JFLFNBQU8sU0FBVSxNQUFXO0FBQ3hCLFVBQU0sTUFBTSxDQUFDLFNBQWM7QUFDdkIsWUFBTSxnQkFBZ0IsQ0FBQyxHQUFJLFFBQVEsY0FBYyxDQUFDLEdBQUksR0FBRyxnQkFBZ0I7QUFDekUsWUFBTSxPQUFPLEtBQUs7QUFDbEIsWUFBTSxPQUFPLEtBQUssU0FBUyxLQUFLLE9BQU8sQ0FBQztBQUN4QyxVQUFJLFNBQVMsVUFBVSxjQUFjLFNBQVMsS0FBSyxJQUFJLEdBQUc7QUFDdEQsYUFBSyxPQUFPO0FB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
