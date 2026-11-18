import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

export type MissionStatus = 'active' | 'locked' | 'completed';

export type TrailMission = {
  id: string;
  title: string;
  reward: number;
  status: MissionStatus;
};

type TrailContextValue = {
  childName: string;
  setChildName: (name: string) => void;
  coins: number;
  missions: TrailMission[];
  completeMission: (missionId: string) => void;
};

const initialMissions: TrailMission[] = [
  {
    id: 'money-origin',
    title: 'De onde vem o dinheiro?',
    reward: 20,
    status: 'active',
  },
  {
    id: 'smart-choices',
    title: 'Escolhas inteligentes',
    reward: 20,
    status: 'locked',
  },
  {
    id: 'first-budget',
    title: 'Meu primeiro orçamento',
    reward: 20,
    status: 'locked',
  },
  {
    id: 'need-or-want',
    title: 'Preciso ou só quero?',
    reward: 20,
    status: 'locked',
  },
  {
    id: 'saving-dream',
    title: 'Guardando para um sonho',
    reward: 20,
    status: 'locked',
  },
];

const TrailContext = createContext<TrailContextValue>({
  childName: '',
  setChildName: () => {},
  coins: 0,
  missions: initialMissions,
  completeMission: () => {},
});

export function TrailProvider({ children }: PropsWithChildren) {
  const [childName, setChildNameState] = useState('');
  const [coins, setCoins] = useState(0);
  const [missions, setMissionState] = useState<TrailMission[]>(initialMissions);

  const setChildName = useCallback((name: string) => {
    setChildNameState(name.trim());
  }, []);

  const completeMission = useCallback(
    (missionId: string) => {
      const missionIndex = missions.findIndex((mission) => mission.id === missionId);
      if (missionIndex < 0 || missions[missionIndex].status !== 'active') {
        return;
      }

      setCoins((currentCoins) => currentCoins + missions[missionIndex].reward);
      setMissionState((previous) =>
        previous.map((mission, index) => {
          if (index === missionIndex) {
            return { ...mission, status: 'completed' };
          }
          if (index === missionIndex + 1) {
            return { ...mission, status: 'active' };
          }
          return mission;
        })
      );
    },
    [missions]
  );

  const value = useMemo(
    () => ({
      childName,
      setChildName,
      coins,
      missions,
      completeMission,
    }),
    [childName, setChildName, coins, missions, completeMission]
  );

  return <TrailContext.Provider value={value}>{children}</TrailContext.Provider>;
}

export function useTrail() {
  return useContext(TrailContext);
}
