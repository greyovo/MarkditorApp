use std::fs;

#[tauri::command]
pub fn rename_dir(old_path: &str,new_path: &str) {
    let _ = fs::rename(old_path, new_path);
}
