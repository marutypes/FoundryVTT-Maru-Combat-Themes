import themes from "./themes.generated.mjs";
import { SOUND_TYPE } from "./constants.mjs";
import { chooseTheme } from "./macros.mjs";
import { playRandomCombatSound } from "./sounds.mjs";
import settings from "./settings.mjs";

Hooks.on("init", () => {
  foundry.utils.mergeObject(CONFIG.Combat.sounds, themes);

  settings.init();

  Macro.create(chooseTheme);
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
