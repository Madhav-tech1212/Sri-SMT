import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import { join, relative, basename } from "path";
import ignore from "ignore";

const ROOT = process.cwd();

// initialize ignore
const ig = ignore();

// load .gitignore
if (existsSync(".gitignore")) {
  const gitignore = readFileSync(".gitignore", "utf8")
    .split("\n")
    .filter(Boolean);

  ig.add(gitignore);
}

function generateTree(dir, prefix = "") {
  let files = readdirSync(dir);

  // remove ignored files
  files = files.filter((file) => {
    const fullPath = join(dir, file);
    const relativePath = relative(ROOT, fullPath).replace(/\\/g, "/");

    return !ig.ignores(relativePath);
  });

  files.forEach((file, index) => {
    const fullPath = join(dir, file);
    const isLast = index === files.length - 1;
    const pointer = isLast ? "└── " : "├── ";

    console.log(prefix + pointer + file);

    if (statSync(fullPath).isDirectory()) {
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      generateTree(fullPath, newPrefix);
    }
  });
}

console.log(basename(ROOT));
generateTree(ROOT);