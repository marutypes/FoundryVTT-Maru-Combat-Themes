import settings from "./settings.mjs";
import { SOUND_TYPE } from "./constants.mjs";

export function playSoundFromTheme(theme, type, index = 0) {
  const themeObject = CONFIG.Combat.sounds[theme];
  if (
    themeObject &&
    themeObject[type] &&
    themeObject[type].hasOwnProperty(index)
  ) {
    AudioHelper.play(
      {
        src: themeObject[type][index],
        volume: settings.volume,
        autoplay: true,
        loop: false,
      },
      true
    );
  }
}

export function playRandomCombatSound(type) {
  const theme = settings.currentTheme;

  if (theme == "custom") {
    let playlist = null;
    switch (type) {
      case SOUND_TYPE.START_ENCOUNTER:
        playlist = settings.startCombatPlaylist;
        break;
      case SOUND_TYPE.START_ROUND:
        playlist = settings.startRoundPlaylist;
        break;
      case SOUND_TYPE.NEXT_UP:
        playlist = settings.nextUpPlaylist;
        break;
      case SOUND_TYPE.END_COMBAT:
        playlist = settings.endCombatPlaylist;
        break;
    }

    if (playlist != null) {
      playRandomPlaylistSound(playlist);
    }
  } else {
    const sounds = CONFIG.Combat.sounds[theme][type];

    if (sounds && Array.isArray(sounds) && sounds.length > 0) {
      const randomIndex = Math.floor(Math.random() * sounds.length);
      playSoundFromTheme(theme, type, randomIndex);
    }
  }
}

export function playRandomPlaylistSound(playlistName) {
  // Find the playlist object with the specified name
  const playlist = game.playlists.find((p) => p.name === playlistName);

  if (playlist) {
    // Select a random sound from the playlist
    const playlistArray = Array.from(playlist.sounds);

    if (playlistArray.length == 0) {
        console.error(`Playlist ${playlistName} is empty :<`);
        return;
    }
    const randomIndex = Math.floor(Math.random() * playlistArray.length);
    const selectedSound = playlistArray[randomIndex];

    // Play the selected sound using AudioHelper
    AudioHelper.play({
      src: selectedSound.path,
      volume: settings.volume,
      autoplay: true,
      loop: false,
    });
  } else {
    console.error(`Playlist not found: ${playlistName}`);
  }
}

export function getPlaylists() {
  if (game.playlists == null) {
    return [];
  }
  return game.playlists.map((p) => p.name);
}
