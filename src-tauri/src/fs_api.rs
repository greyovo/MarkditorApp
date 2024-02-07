use std::fs;

#[tauri::command]
pub fn rename_dir(oldPath: &str, newPath: &str) {
    let _ = fs::rename(oldPath, newPath);
}
