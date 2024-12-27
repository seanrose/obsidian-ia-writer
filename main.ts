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

    // Read the file content
    const content = await this.app.vault.read(file);
    
    // Encode the content for the URL
    const encodedContent = encodeURIComponent(content);
    const encodedFileName = encodeURIComponent(file.name);
    
    // Create the iA Writer URL to create a new document
    const iaWriterUrl = `ia-writer://new?text=${encodedContent}&path=${encodedFileName}`;

    // Same opening logic as before...
    if (process.platform === 'darwin') {
      exec(`open "${iaWriterUrl}"`, (error) => {
        if (error) {
          new Notice(`Failed to open in iA Writer: ${error.message}`);
        } else {
          new Notice(`Opened ${file.name} in iA Writer`);
        }
      });
    } else {
      window.open(iaWriterUrl, '_blank');
      new Notice(`Attempted to open ${file.name} in iA Writer`);
    }
  }
}