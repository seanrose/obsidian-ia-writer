# Obsidian iA Writer Plugin

A simple plugin for [Obsidian](https://obsidian.md) that adds a command to open your current note in iA Writer. Perfect for when you need to switch to iA Writer's focused writing environment.

## What it does
- Adds a command "Open current note" to open the active note in iA Writer
    - Leverages [iA Writer's URL commands](https://ia.net/writer/support/help/url-commands) to do this.
- Provides feedback via notices when opening files or if errors occur

## Requirements

- macOS (the plugin uses macOS-specific commands)
- iA Writer must be installed on your system already
- Obsidian v0.15.0 or higher

## Installation

### From within Obsidian
(coming soon)

### Manual Installation

1. Download the latest release from the releases page
2. Extract the files into your vault's plugins folder: `<vault>/.obsidian/plugins/ia-writer/`
3. Reload Obsidian
4. Enable the plugin in Settings > Community plugins
5. Ensure your Obsidian vault is [added as a library location in iA Writer](https://ia.net/writer/support/library/cloud-storage?tab=mac)

## Usage

1. Open the note you want to edit in iA Writer
2. Use the command palette (Cmd + P) and search for "Open current note"
3. Hit enter
4. Your note will open in iA Writer

![Obsidian iA Writer Plugin GIF](./demo.gif)

## Upcoming Features

I've only built and tested MacOS support. Upcoming:

- Windows support
- iOS support
- Android support
- Support for other markdown editors (Bear, Cursor, etc)

## Support
For bug reports and feature requests, please use the [GitHub issue tracker](https://github.com/seanrose/obsidian-ia-writer/issues)

## License

[MIT License](LICENSE)
