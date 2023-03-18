import themes from "./themes.mjs";
import { chooseTheme } from "./macros.mjs";

Hooks.on("init", () => {
  foundry.utils.mergeObject(CONFIG.Combat.sounds, themes);
  game.macros.registerMacro("maru-combat-themes", chooseTheme);
});
