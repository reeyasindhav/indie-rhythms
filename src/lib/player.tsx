import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type PlayerTrack = {
  slug: string;
  title: string;
  artist: string;
  cover: string;
};

type PlayerValue = {
  current: PlayerTrack | null;
  playing: boolean;
  play: (track: PlayerTrack) => void;
  pause: () => void;
  toggle: (track?: PlayerTrack) => void;
  stop: () => void;
};

const PlayerContext = createContext<PlayerValue | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<PlayerTrack | null>(null);
  const [playing, setPlaying] = useState(false);

  const play = useCallback((track: PlayerTrack) => {
    setCurrent(track);
    setPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setPlaying(false);
  }, []);

  const toggle = useCallback(
    (track?: PlayerTrack) => {
      if (track) {
        if (current?.slug === track.slug) {
          setPlaying((p) => !p);
        } else {
          setCurrent(track);
          setPlaying(true);
        }
      } else {
        setPlaying((p) => !p);
      }
    },
    [current],
  );

  const stop = useCallback(() => {
    setCurrent(null);
    setPlaying(false);
  }, []);

  const value = useMemo(
    () => ({ current, playing, play, pause, toggle, stop }),
    [current, playing, play, pause, toggle, stop],
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
}
