const SOUND_PATH = "/modules/combat-tracker-theme-pack/sounds/";

Hooks.on("init", () => {
  let themes = {
    "Guilty Gear Strive": createTheme(
      SOUND_PATH + "/ggstrive/",
      "COMBAT.Sounds.GGStrive"
    ),
    "BlazBlue Cross Tag Battle": createTheme(
      SOUND_PATH + "/blazblue/",
      "COMBAT.Sounds.BlazBlue"
    ),
  };

  foundry.utils.mergeObject(CONFIG.Combat.sounds, themes);
});

function createTheme(prefix, label, themeOptions = {}) {
  const {
    startCount = 1,
    nextCount = 1,
    yourTurnCount = 1,
    suffix = ".wav",
  } = themeOptions;

  const {
    startEncounter = filelist(prefix, "start", startCount, suffix),
    nextUp = filelist(prefix, "next", nextCount, suffix),
    yourTurn = filelist(prefix, "your-turn", yourTurnCount, suffix),
  } = themeOptions;

  return {
    label,
    startEncounter: startEncounter.map((path) => prefix + path),
    nextUp: nextUp.map((path) => prefix + path),
    yourTurn: yourTurn.map((path) => prefix + path),
  };
}

function filelist(prefix, name, count = 1, suffix = ".wav") {
  if (count == 1) {
    return [prefix + name + suffix];
  }
  return new Array(length).map((_value, index) => {
    return prefix + name + "-" + index + suffix;
  });
}
