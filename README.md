# Obsidian iA Writer Plugin

A plugin for [Obsidian](https://obsidian.md) that lets you open notes in [iA Writer](https://ia.net/writer). Uses iA Writer's [URL commands](https://ia.net/writer/support/help/url-commands) to seamlessly switch between apps.

## Features

- **Open current note** — command palette, ribbon icon, or right-click menu
- **New note in iA Writer** — creates a new document in the current folder's location
- **Context menus** — right-click a file in the sidebar or in the editor
- **Ribbon icon** — one-click access from the sidebar
- **Cross-platform** — works on macOS, iOS, and iPadOS (anywhere iA Writer supports URL commands)
- **Configurable** — custom library location name, new window preference, notice toggles

## Requirements

- iA Writer installed on your device
- Your Obsidian vault must be [added as a library location in iA Writer](https://ia.net/writer/support/library/cloud-storage)
- Obsidian v0.15.0 or higher

## Installation

### From Obsidian community plugins
(coming soon)

### Manual installation

1. Download the latest release from the [releases page](https://github.com/seanrose/obsidian-ia-writer/releases)
2. Extract `main.js` and `manifest.json` into your vault's plugins folder: `<vault>/.obsidian/plugins/ia-writer/`
3. Reload Obsidian
4. Enable the plugin in Settings > Community plugins

## Setup

1. In iA Writer, add your Obsidian vault folder as a Library Location ([instructions](https://ia.net/writer/support/library/cloud-storage))
2. The plugin uses your vault name as the library location name by default. If the name in iA Writer differs, update it in the plugin settings

## Usage

### Open a note in iA Writer
- **Command palette:** `Cmd/Ctrl + P` → "Open current note"
- **Ribbon icon:** Click the pencil icon in the left sidebar
- **File menu:** Right-click a file in the sidebar → "Open in iA Writer"
- **Editor menu:** Right-click in the editor → "Open in iA Writer"

### Create a new note
- **Command palette:** `Cmd/Ctrl + P` → "New note in iA Writer"

## Settings

| Setting | Description | Default |
|---------|-------------|---------|
| Library location name | The name of the iA Writer library location pointing to your vault | Vault name |
| Open in new window | Open files in a new iA Writer window (macOS only) | Off |
| Show notices | Show notifications when opening files | On |

![Obsidian iA Writer Plugin GIF](./demo.gif)

## Support

For bug reports and feature requests, please use the [GitHub issue tracker](https://github.com/seanrose/obsidian-ia-writer/issues).

## License

[MIT](LICENSE)
