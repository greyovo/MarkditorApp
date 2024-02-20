use tauri::{Manager, Runtime};
use window_shadows::set_shadow;
extern crate winreg;
// use std::env::current_exe;
// use std::io::{Error, ErrorKind};
// use winreg::{enums::*, RegKey};

pub fn set_window_shadow<R: Runtime>(app: &tauri::App<R>) {
    let window = app.get_window("main").unwrap();

    set_shadow(&window, true).expect("Unsupported platform!");
}

// #[tauri::command]
// pub fn set_default_open_win32() {
//     internal_set_default_open_win32().expect("Failed when setting default open method as Markditor")
// }

// // 设置 Windows 下的 Markdown 文件默认打开方式为本程序
// pub fn internal_set_default_open_win32() -> Result<(), Error> {
//     // 获取当前可执行文件的路径
//     let exe_path = current_exe()?;
//     let exe_file = exe_path
//         .file_name()
//         .ok_or(Error::new(ErrorKind::Other, "Failed to get file name"))?;

//     // 创建或打开HKEY_CLASSES_ROOT下的.markdown和.md键
//     let hkcr = RegKey::predef(HKEY_CLASSES_ROOT);
//     let (markdown_key, _) = hkcr.create_subkey_with_flags(".markdown", KEY_WRITE)?;
//     let (md_key, _) = hkcr.create_subkey_with_flags(".md", KEY_WRITE)?;

//     // 设置默认值，指向你的程序的ProgId
//     markdown_key.set_value("", &"Markditor")?;
//     md_key.set_value("", &"Markditor")?;

//     // 创建ProgId键并设置默认值，指向你的程序的可执行文件路径
//     let (progid_key, _disp) = hkcr.create_subkey_with_flags("Markditor", KEY_WRITE)?;

//     progid_key.set_value("", &exe_file)?;
//     // progid_key.set_value("DefaultIcon", &"path_to_your_icon.ico")?;

//     // 设置shell打开命令
//     let shell_open_key = progid_key.open_subkey_with_flags("shell", KEY_WRITE)?;
//     let shell_open_command_key = shell_open_key.open_subkey_with_flags("open", KEY_WRITE)?;
//     let shell_open_command = shell_open_command_key.open_subkey_with_flags("command", KEY_WRITE)?;
//     shell_open_command.set_value("", &format!("\"{:?}\" \"%1\"", exe_file))?;

//     println!("[Done] set_default_open_win32");

//     Ok(())
// }

// reg add HKEY_CLASSES_ROOT\.md /ve /d "Markditor.markdown" /f
// reg add "HKEY_CLASSES_ROOT\Markditor.markdown" /ve /d "Markdown File" /f
// reg add HKEY_CLASSES_ROOT\Markditor.markdown\DefaultIcon /ve /d "C:\Users\Grey\AppData\Local\Markditor\Markditor.exe" /f
// reg add HKEY_CLASSES_ROOT\Markditor.markdown\shell\open\command /ve /d "\"C:\Users\Grey\AppData\Local\Markditor\Markditor.exe\" \"%%1\"" /f
