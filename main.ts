import { App, Menu, Notice, Plugin, PluginSettingTab, Setting, TFile, TFolder } from "obsidian";

interface IAWriterSettings {
	libraryLocationName: string;
	openInNewWindow: boolean;
	showNotices: boolean;
}

const DEFAULT_SETTINGS: IAWriterSettings = {
	libraryLocationName: "",
	openInNewWindow: false,
	showNotices: true,
};

export default class OpenInIaWriterPlugin extends Plugin {
	settings: IAWriterSettings;

	async onload() {
		await this.loadSettings();

		// Command: Open current note in iA Writer
		this.addCommand({
			id: "open-current-note-in-ia-writer",
			name: "Open current note",
			checkCallback: (checking: boolean) => {
				const activeFile = this.app.workspace.getActiveFile();
				if (checking) {
					return !!activeFile;
				}
				if (activeFile) {
					this.openInIAWriter(activeFile);
				}
				return true;
			},
		});

		// Command: Create new note in iA Writer
		this.addCommand({
			id: "new-note-in-ia-writer",
			name: "New note in iA Writer",
			callback: () => {
				this.newNoteInIAWriter();
			},
		});

		// File menu (right-click on file in sidebar)
		this.registerEvent(
			this.app.workspace.on("file-menu", (menu: Menu, file) => {
				if (file instanceof TFile) {
					menu.addItem((item) => {
						item.setTitle("Open in iA Writer")
							.setIcon("pencil")
							.onClick(() => {
								this.openInIAWriter(file);
							});
					});
				}
			})
		);

		// Editor menu (right-click in editor)
		this.registerEvent(
			this.app.workspace.on("editor-menu", (menu: Menu) => {
				const file = this.app.workspace.getActiveFile();
				if (file) {
					menu.addItem((item) => {
						item.setTitle("Open in iA Writer")
							.setIcon("pencil")
							.onClick(() => {
								this.openInIAWriter(file);
							});
					});
				}
			})
		);

		// Ribbon icon
		this.addRibbonIcon("pencil", "Open in iA Writer", () => {
			const file = this.app.workspace.getActiveFile();
			if (file) {
				this.openInIAWriter(file);
			} else {
				new Notice("No active file to open in iA Writer.");
			}
		});

		// Settings tab
		this.addSettingTab(new IAWriterSettingTab(this.app, this));
	}

	/**
	 * Returns the library location name to use in iA Writer URL commands.
	 * Uses the configured name if set, otherwise falls back to the vault name.
	 */
	private getLibraryLocationName(): string {
		return this.settings.libraryLocationName || this.app.vault.getName();
	}

	/**
	 * Builds an iA Writer URL for the given command and parameters.
	 */
	private buildIAWriterUrl(command: string, params: Record<string, string>): string {
		const searchParams = new URLSearchParams(params);
		return `ia-writer://${command}?${searchParams.toString()}`;
	}

	/**
	 * Opens the given file in iA Writer using the ia-writer:// URL scheme.
	 */
	private openInIAWriter(file: TFile) {
		const locationName = this.getLibraryLocationName();
		const path = `${locationName}:/${file.path}`;

		const params: Record<string, string> = { path };
		if (this.settings.openInNewWindow) {
			params["new-window"] = "true";
		}

		const url = this.buildIAWriterUrl("open", params);
		window.open(url);

		if (this.settings.showNotices) {
			new Notice(`Opened ${file.name} in iA Writer`);
		}
	}

	/**
	 * Creates a new note in iA Writer using the ia-writer:// URL scheme.
	 */
	private newNoteInIAWriter() {
		const locationName = this.getLibraryLocationName();

		// Determine the target path — use the active file's parent folder, or vault root
		const activeFile = this.app.workspace.getActiveFile();
		let folderPath = "";
		if (activeFile && activeFile.parent) {
			folderPath = activeFile.parent.path === "/" ? "" : activeFile.parent.path;
		}

		const path = folderPath
			? `${locationName}:/${folderPath}/`
			: `${locationName}:/`;

		const params: Record<string, string> = { path };
		if (this.settings.openInNewWindow) {
			params["new-window"] = "true";
		}

		const url = this.buildIAWriterUrl("new", params);
		window.open(url);

		if (this.settings.showNotices) {
			new Notice("Creating new note in iA Writer");
		}
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class IAWriterSettingTab extends PluginSettingTab {
	plugin: OpenInIaWriterPlugin;

	constructor(app: App, plugin: OpenInIaWriterPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName("Library location name")
			.setDesc(
				`The name of the library location in iA Writer that points to your vault. ` +
				`Defaults to your vault name ("${this.plugin.app.vault.getName()}") if left empty. ` +
				`This must match the location name shown in iA Writer's Library sidebar.`
			)
			.addText((text) =>
				text
					.setPlaceholder(this.plugin.app.vault.getName())
					.setValue(this.plugin.settings.libraryLocationName)
					.onChange(async (value) => {
						this.plugin.settings.libraryLocationName = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Open in new window")
			.setDesc("Open files in a new iA Writer window (macOS only).")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.openInNewWindow)
					.onChange(async (value) => {
						this.plugin.settings.openInNewWindow = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Show notices")
			.setDesc("Show a notification when opening files in iA Writer.")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.showNotices)
					.onChange(async (value) => {
						this.plugin.settings.showNotices = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
