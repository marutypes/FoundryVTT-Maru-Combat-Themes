export const chooseTheme = {
  name: "Choose Combat Theme",
  author: "Maru",
  type: "script",
  img: "icons/svg/sound.svg",
  command: () => {
    let soundThemes = {};
    for (let theme of Object.keys(CONFIG.Combat.sounds)) {
      soundThemes[theme] = {
        label: theme,
        callback: () => {
          game.settings.set("core", "combatTheme", theme);
          ui.notifications.info(`Combat theme set to ${theme}`);
        },
      };
    }

    new Dialog({
      title: "Select combat theme",
      content: "Choose a theme:",
      buttons: soundThemes,
    }).render(true);
  },
};
