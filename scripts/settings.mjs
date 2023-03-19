import { MODULE_NAME } from "./constants.mjs";

const PLAY_END_COMBAT_SOUND = "play-end-combat-sound";
const PLAY_ROUND_START_SOUND = "play-round-start-sound";
const FORCE_NEXTUP_SOUND = "force-nextup-sound";
const VOLUME = "volume";

class Settings {
  register() {
    game.settings.register(MODULE_NAME, PLAY_END_COMBAT_SOUND, {
      name: "MCT.Config.EndCombatSound.Title",
      hint: "MCT.Config.EndCombatSound.Description",
      scope: "client",
      config: true,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_NAME, PLAY_ROUND_START_SOUND, {
      name: "MCT.Config.RoundStart.Title",
      hint: "MCT.Config.RoundStart.Description",
      scope: "client",
      config: true,
      type: Boolean,
      default: true,
    });

    game.settings.register(MODULE_NAME, FORCE_NEXTUP_SOUND, {
      name: "MCT.Config.ForceNextUp.Title",
      hint: "MCT.Config.ForceNextUp.Description",
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
  }

  get endCombatSound() {
    return this.getSetting(PLAY_END_COMBAT_SOUND);
  }
  set endCombatSound(value) {
    this.setSetting(PLAY_END_COMBAT_SOUND, value);
  }

  get roundStartSound() {
    return this.getSetting(PLAY_ROUND_START_SOUND);
  }
  set roundStartSound(value) {
    this.setSetting(PLAY_ROUND_START_SOUND, value);
  }

  get volume() {
    return this.getSetting(VOLUME);
  }
  set volume(value) {
    this.setSetting(VOLUME, value);
  }

  get forceNextUpSound() {
    return this.getSetting(FORCE_NEXTUP_SOUND);
  }
  set forceNextUpSound(value) {
    this.setSetting(FORCE_NEXTUP_SOUND, value);
  }

  getSetting(setting) {
    return game.settings.get(MODULE_NAME, setting);
  }

  setSetting(setting, value) {
    game.settings.set(MODULE_NAME, setting, value);
  }
}

export default new Settings();
