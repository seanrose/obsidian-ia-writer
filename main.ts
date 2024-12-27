import { App, Notice, Plugin, TFile } from "obsidian";
import { exec } from "child_process";
import * as path from "path";

/**
 * Plugin that enables opening the current Obsidian note in iA Writer.
 * Only works on macOS due to the use of the 'open' command.
 */
export default class OpenInIaWriterPlugin extends Plugin {
  async onload() {
    // Register the command in Obsidian's command palette
    this.addCommand({
      id: "open-current-note-in-ia-writer",
      name: "Open current note",
      checkCallback: (checking: boolean) => {
        // Only enable the command if there's an active file
        const activeFile = this.app.workspace.getActiveFile();
        if (checking) {
          return !!activeFile;
        }
        
        this.openCurrentNoteInIAWriter();
        return true;
      },
    });
  }

  /**
   * Opens the current note in iA Writer using macOS's 'open' command.
   * Shows a notice on success or failure.
   */
  private async openCurrentNoteInIAWriter() {
    const file = this.app.workspace.getActiveFile();
    if (!(file instanceof TFile)) {
      new Notice("No active file found.");
      return;
    }

    // Get the absolute path to the vault
    const vaultAbsolutePath =
      // @ts-expect-error: 'basePath' exists but is not typed in the API
      this.app.vault.adapter?.basePath ?? "";

    if (!vaultAbsolutePath) {
      new Notice("Could not determine vault path.");
      return;
    }

    // Combine the vault path with the relative path to get an absolute path
    const absoluteFilePath = path.join(vaultAbsolutePath, file.path);

    // Use the macOS `open -a "iA Writer" "<filepath>"` command
    exec(`open -a "iA Writer" "${absoluteFilePath}"`, (error) => {
      if (error) {
        new Notice(`Failed to open in iA Writer: ${error.message}`);
      } else {
        new Notice(`Opened ${file.name} in iA Writer`);
      }
    });
  }
}