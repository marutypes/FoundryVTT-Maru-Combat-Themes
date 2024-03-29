import { getPlaylists } from "./sounds.mjs";
import { MODULE_NAME } from "./constants.mjs";
import { updateSelectOptions } from "./dom-util.mjs";

const PLAY_START_COMBAT_SOUND = "play-end-combat-sound";
const PLAY_END_COMBAT_SOUND = "play-end-combat-sound";
const PLAY_START_ROUND_SOUND = "play-round-start-sound";
const PLAY_NEXT_UP_SOUND = "force-nextup-sound";
const CURRENT_THEME = "current-theme";
const VOLUME = "volume";

const START_COMBAT_PLAYLIST = "start-combat-playlist";
const START_ROUND_PLAYLIST = "start-round-playlist";
const NEXT_UP_PLAYLIST = "next-up-playlist";
const END_COMBAT_PLAYLIST = "end-combat-playlist";

class Settings {
  init() {
    this.themeOptions = [
      ...Object.keys(CONFIG.Combat.sounds),
      "none",
      "custom",
    ];

    game.settings.register(MODULE_NAME, PLAY_START_COMBAT_SOUND, {
      name: "MCT.Config.PlayStartCombatSound.Title",
      hint: "MCT.Config.PlayStartCombatSound.Description",
      scope: "client",
      config: true,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_NAME, PLAY_START_ROUND_SOUND, {
      name: "MCT.Config.PlayRoundStart.Title",
      hint: "MCT.Config.PlayRoundStart.Description",
      scope: "client",
      config: true,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_NAME, PLAY_NEXT_UP_SOUND, {
      name: "MCT.Config.PlayNextUp.Title",
      hint: "MCT.Config.PlayNextUp.Description",
      scope: "client",
      config: true,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_NAME, PLAY_END_COMBAT_SOUND, {
      name: "MCT.Config.PlayEndCombatSound.Title",
      hint: "MCT.Config.PlayEndCombatSound.Description",
      scope: "client",
      config: true,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_NAME, VOLUME, {
      name: "MCT.Config.Volume.Title",
      hint: "MCT.Config.Volume.Description",
      scope: "client",
      config: true,
      type: Number,
      range: {
        min: 0,
        max: 1,
        step: 0.01,
      },
      default: 0.5,
    });

    game.settings.register(MODULE_NAME, CURRENT_THEME, {
      name: "MCT.Config.CurrentTheme.Title",
      hint: "MCT.Config.CurrentTheme.Description",
      scope: "world",
      config: true,
      type: String,
      choices: this.themeOptions,
      default: "none",
    });
  }

  ready() {
    this.playlists = getPlaylists();

    let playlistChoices = this.playlists.reduce((acc, playlist) => {
      acc[playlist.id] = playlist.name;
      return acc;
    }, {});

    game.settings.register(MODULE_NAME, START_COMBAT_PLAYLIST, {
      name: "MCT.Config.StartCombatPlayList.Title",
      hint: "MCT.Config.StartCombatPlayList.Description",
      scope: "world",
      config: true,
      type: String,
      choices: playlistChoices,
      default: "none",
      module: "my-module",
      restricted: true,
    });
    game.settings.register(MODULE_NAME, START_ROUND_PLAYLIST, {
      name: "MCT.Config.StartRoundPlayList.Title",
      hint: "MCT.Config.StartRoundPlayList.Description",
      scope: "world",
      config: true,
      type: String,
      choices: playlistChoices,
      default: "none",
      module: "my-module",
      restricted: true,
    });
    game.settings.register(MODULE_NAME, NEXT_UP_PLAYLIST, {
      name: "MCT.Config.NextUpPlayList.Title",
      hint: "MCT.Config.NextUpPlayList.Description",
      scope: "world",
      config: true,
      type: String,
      choices: playlistChoices,
      default: "none",
      module: "my-module",
      restricted: true,
    });
    game.settings.register(MODULE_NAME, END_COMBAT_PLAYLIST, {
      name: "MCT.Config.EndCombatPlayList.Title",
      hint: "MCT.Config.EndCombatPlayList.Description",
      scope: "world",
      config: true,
      type: String,
      choices: playlistChoices,
      default: "none",
      module: "my-module",
      restricted: true,
    });
  }

  renderSettingsConfig(html) {
    const startCombatPlaylistInput = html.find(
      `select[name="${MODULE_NAME}.${START_COMBAT_PLAYLIST}"]`
    );
    const startRoundPlaylistInput = html.find(
      `select[name="${MODULE_NAME}.${START_ROUND_PLAYLIST}"]`
    );
    const nextUpPlaylistInput = html.find(
      `select[name="${MODULE_NAME}.${NEXT_UP_PLAYLIST}"]`
    );
    const endCombatPlaylistInput = html.find(
      `select[name="${MODULE_NAME}.${END_COMBAT_PLAYLIST}"]`
    );

    const playlistSelects = [
      startCombatPlaylistInput,
      startRoundPlaylistInput,
      nextUpPlaylistInput,
      endCombatPlaylistInput,
    ];

    const themeInput = html.find(
      `select[name="${MODULE_NAME}.${CURRENT_THEME}"]`
    );

    const updatePlaylistSelects = () => {
      playlistSelects.forEach((select) => {
        updateSelectOptions(select, this.playlists);
      });
    };

    const updateFormVisibility = (theme) => {
      if (theme == "custom") {
        playlistSelects.forEach((select) => {
          select?.closest(".form-group")?.show();
        });

        updatePlaylistSelects();
      } else {
        playlistSelects.forEach((select) => {
          select?.closest(".form-group")?.hide();
        });
      }
    };

    themeInput.on("change", (event) => {
      this.playlists = getPlaylists();
      const newTheme = this.themeOptions[event.currentTarget.value];
      updateFormVisibility(newTheme);
    });

    themeInput.closest("form").on("submit", () => {
      this.playlists = getPlaylists();
      updateFormVisibility(this.currentTheme);
      updatePlaylistSelects();
    });

    playlistSelects.forEach((select) => {
      select.on("focus", () => {
        this.playlists = getPlaylists();
        updateSelectOptions(select, this.playlists);
      });
    });

    updateFormVisibility(this.currentTheme);
    updatePlaylistSelects();
  }

  get playStartCombatSound() {
    return this.getSetting(PLAY_END_COMBAT_SOUND);
  }

  get playStartRoundSound() {
    return this.getSetting(PLAY_START_ROUND_SOUND);
  }

  get playNextUpSound() {
    return this.getSetting(PLAY_NEXT_UP_SOUND);
  }

  get playEndCombatSound() {
    return this.getSetting(PLAY_END_COMBAT_SOUND);
  }

  get startCombatPlaylist() {
    return this.getSetting(START_COMBAT_PLAYLIST);
  }

  get startRoundPlaylist() {
    return this.getSetting(START_ROUND_PLAYLIST);
  }

  get nextUpPlaylist() {
    return this.getSetting(NEXT_UP_PLAYLIST);
  }

  get endCombatPlaylist() {
    return this.getSetting(END_COMBAT_PLAYLIST);
  }

  get currentTheme() {
    return this.themeOptions[this.getSetting(CURRENT_THEME)];
  }

  get volume() {
    return this.getSetting(VOLUME);
  }

  getSetting(setting) {
    return game.settings.get(MODULE_NAME, setting);
  }

  setSetting(setting, value) {
    game.settings.set(MODULE_NAME, setting, value);
  }
}

export default new Settings();
