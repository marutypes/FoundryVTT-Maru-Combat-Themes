import { SOUND_TYPE } from "./constants.mjs";
import { playRandomCombatSound } from "./sounds.mjs";
import settings from "./settings.mjs";

Hooks.on("init", () => {
  settings.init();
  log("Settings initialized");

  // force default foundry combat theme functionality off since we are taking over
  setTimeout(() => {
    game.settings.set("core", "combatTheme", "none", 100);
    log("Built-in combat theme overriden");
  }, 10);
});

Hooks.once("ready", () => {
  // make sure playlists are setup before finishing initializing our settings
  settings.ready();

  Hooks.on("renderSettingsConfig", (_app, html) => {
    settings.renderSettingsConfig(html);
  });

  Hooks.on("updateCombat", (combat, changed) => {
    if (settings.currentTheme == "none") {
      return;
    }

    if (game.user.isGM == false) {
      return;
    }

    if (changed.round) {
      // This code will run at the start of each round
      if (combat.round == 1) {
        if (settings.playStartCombatSound) {
          playRandomCombatSound(SOUND_TYPE.START_ENCOUNTER);
        }
      } else {
        if (settings.playStartRoundSound) {
          playRandomCombatSound(SOUND_TYPE.START_ROUND);
        }
      }
    }

    if (changed.turn) {
      // This code will run when the turn changes
      if (settings.playNextUpSound) {
        playRandomCombatSound(SOUND_TYPE.NEXT_UP);
      }
    }
  });

  Hooks.on("deleteCombat", () => {
    if (game.user.isGM == false) {
      return;
    }

    if (settings.currentTheme == "none") {
      return;
    }

    if (settings.playEndCombatSound) {
      playRandomCombatSound(SOUND_TYPE.END_COMBAT);
    }
  });

  log("Hooks installed");
});

function log(msg) {
  console.log("Maru's (Better) Combat Themes |", msg);
}
