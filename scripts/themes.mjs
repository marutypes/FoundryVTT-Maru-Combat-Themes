const SOUND_PATH = "/modules/maru-combat-themes/sounds/";

const themes = {
  "Guilty Gear Strive": createTheme(
    SOUND_PATH + "/ggstrive/",
    "COMBAT.Sounds.GGStrive",
    { suffix: ".ogg" }
  ),
  "BlazBlue Cross Tag Battle": createTheme(
    SOUND_PATH + "/blazblue/",
    "COMBAT.Sounds.BlazBlue"
  ),
};

export default themes;

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
