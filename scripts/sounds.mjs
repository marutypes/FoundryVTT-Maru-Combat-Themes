export function playCombatSound(theme, type, index = 0) {
  const themeObject = CONFIG.Combat.sounds[theme];
  if (themeObject && themeObject[type] && themeObject[type].hasOwnProperty(index)) {
    AudioHelper.play(
      {
        src: themeObject[type][index],
        volume: 0.8,
        autoplay: true,
        loop: false,
      },
      true
    );
  }
}

export function playRandomCombatSound(type) {
  let theme = game.settings.get("core", "combatTheme");
  let sounds = CONFIG.Combat.sounds[theme][type];

  if (sounds && Array.isArray(sounds) && sounds.length > 0) {
    const randomIndex = Math.floor(Math.random() * sounds.length);
    playCombatSound(theme, type, randomIndex);
  }
}
