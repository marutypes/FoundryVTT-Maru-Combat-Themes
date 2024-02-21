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
    let playlistId = null;
    switch (type) {
      case SOUND_TYPE.START_ENCOUNTER:
        playlistId = settings.startCombatPlaylist;
        break;
      case SOUND_TYPE.START_ROUND:
        playlistId = settings.startRoundPlaylist;
        break;
      case SOUND_TYPE.NEXT_UP:
        playlistId = settings.nextUpPlaylist;
        break;
      case SOUND_TYPE.END_COMBAT:
        playlistId = settings.endCombatPlaylist;
        break;
    }

    if (playlistId != null) {
      playRandomPlaylistSound(playlistId);
    }
  } else {
    const sounds = CONFIG.Combat.sounds[theme][type];

    if (sounds && Array.isArray(sounds) && sounds.length > 0) {
      const randomIndex = Math.floor(Math.random() * sounds.length);
      playSoundFromTheme(theme, type, randomIndex);
    }
  }
}

export function playRandomPlaylistSound(playlistId) {
  // Find the playlist object with the specified ID
  const playlist = game.playlists.contents.find((p) => p.id === playlistId);

  if (playlist) {
    // Select a random sound from the playlist
    const playlistArray = Array.from(playlist.sounds);

    if (playlistArray.length == 0) {
      console.error(`Playlist with ID ${playlistId} is empty :<`);
      return;
    }
    const randomIndex = Math.floor(Math.random() * playlistArray.length);
    const selectedSound = playlistArray[randomIndex];

    // Play the selected sound using AudioHelper
    AudioHelper.play(
      {
        src: selectedSound.path,
        volume: settings.volume,
        autoplay: true,
        loop: false,
      },
      true
    );
  } else {
    console.error(`Playlist not found with ID: ${playlistId}`);
  }
}

export function getPlaylists() {
  if (game.playlists == null) {
    return [];
  }
  // Return both name and ID for each playlist
  return game.playlists.map((p) => ({ name: p.name, id: p.id }));
}
