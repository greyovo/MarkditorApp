// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::utils::set_window_shadow;
mod fs_api;
mod utils;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_cli::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_http::init())
        .setup(|app| {
            set_window_shadow(app);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![fs_api::rename_dir]) /* add event handlers here */
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
