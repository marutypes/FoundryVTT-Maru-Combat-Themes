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
    console.log(`Starting round ${combat.round}`);
    if (combat.round == 1) {
      console.log("its the first round");
      if (settings.playStartCombatSound) {
        console.log("Playing start encounter sound");
        playRandomCombatSound(SOUND_TYPE.START_ENCOUNTER);
      }
    } else {
      console.log("its not the first round");
      if (settings.playStartRoundSound) {
        console.log("Playing start round sound");
        playRandomCombatSound(SOUND_TYPE.START_ROUND);
      }
    }
  }

  if (changed.turn) {
    // This code will run when the turn changes
    const currentCombatant = combat.combatant;
    if (settings.playNextUpSound) {
      console.log("Playing next up sound");
      playRandomCombatSound(SOUND_TYPE.NEXT_UP);
    }
    console.log(`It is now ${currentCombatant.name}'s turn.`);
  }
});

Hooks.on("deleteCombat", () => {
  if (game.user.isGM == false) {
    return;
  }

  if (settings.currentTheme == "none") {
    return;
  }

  console.log(`Combat deleted`);
  if (settings.playEndCombatSound) {
    playRandomCombatSound(SOUND_TYPE.END_COMBAT);
  }
});
