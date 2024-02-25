import { NotImplementError } from "./errors";

const supportedBackends = ["electron", "tauri"]

type OSType = 'win32' | 'darwin' | 'linux'

export class EnvConstants {

  public static readonly CODE_LANGUAGES: string[] = ["mermaid", "abc", "apache",
    "js", "ts", "html",
    // common
    "properties", "apache", "bash", "c", "csharp", "cpp", "css", "coffeescript", "diff", "go", "xml", "http",
    "json", "java", "javascript", "kotlin", "less", "lua", "makefile", "markdown", "nginx", "objectivec", "php",
    "php-template", "perl", "plaintext", "python", "python-repl", "r", "ruby", "rust", "scss", "sql", "shell",
    "swift", "ini", "typescript", "vbnet", "yaml",
    "ada", "clojure", "dart", "erb", "fortran", "gradle", "haskell", "julia", "julia-repl", "lisp", "matlab",
    "pgsql", "powershell", "sql_more", "stata", "cmake", "mathematica",
    // ext
    "solidity", "yul"
  ];

  public static get BACKEND(): string {
    const backend = import.meta.env.VITE_BACKEND ?? "unknown"
    if (supportedBackends.includes(backend ?? "")) {
      return backend
    } else {
      throw new NotImplementError(`Unsupported backend: ${backend}.`)
    }
  }


  public static get isElectron(): boolean {
    return this.BACKEND === "electron"
  }

  public static get isTauri(): boolean {
    return this.BACKEND === "tauri"
  }

  public static readonly MAX_HISTORY_LENGTH = 10

}