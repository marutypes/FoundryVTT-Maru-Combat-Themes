import themes from "./themes.generated.mjs";
import { SOUND_TYPE } from "./constants.mjs";
import { chooseTheme } from "./macros.mjs";
import { playRandomCombatSound } from "./sounds.mjs";
import { userIdForActorId } from "./util.mjs";
import settings from "./settings.mjs";

Hooks.on("init", () => {
  foundry.utils.mergeObject(CONFIG.Combat.sounds, themes);

  settings.register();

  Macro.create(chooseTheme);
});

Hooks.on("updateCombat", (combat, changed) => {
  if (changed.round) {
    // This code will run at the start of each round
    console.log(`Starting round ${combat.round}`);
    if (settings.roundStartSound && combat.round != 1) {
      playRandomCombatSound(SOUND_TYPE.START_ROUND);
    }
  }

  if (changed.turn) {
    // This code will run when the turn changes
    const currentCombatant = combat.combatant;
    if (settings.forceNextUpSound) {
      playRandomCombatSound(SOUND_TYPE.NEXT_UP);
    }
    console.log(`It is now ${currentCombatant.name}'s turn.`);
  }
});

Hooks.on("deleteCombat", () => {
  console.log(`Combat deleted`);
  if (settings.endCombatSound) {
    playRandomCombatSound(SOUND_TYPE.END_COMBAT);
  }
});
