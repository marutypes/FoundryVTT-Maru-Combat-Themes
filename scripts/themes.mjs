const SOUND_PATH = "/modules/maru-combat-themes/sounds/";

const themes = {
  "Guilty Gear Strive": createTheme(
    SOUND_PATH + "ggstrive/",
    "COMBAT.Sounds.GGStrive",
    { suffix: ".ogg", startCount: 3, yourTurnCount: 3 }
  ),
  "BlazBlue Cross Tag Battle": createTheme(
    SOUND_PATH + "blazblue/",
    "COMBAT.Sounds.BlazBlue",
    { startCount: 2, yourTurnCount: 2 }
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
    startEncounter,
    nextUp,
    yourTurn,
  };
}

function filelist(prefix, name, count = 1, suffix = ".wav") {
  return Array.from({length: count}).map((_value, index) => {
    return prefix + name + "-" + index + suffix;
  });
}
