import { Player } from './player';
export interface Game {
    id: string;
    players: Player[];
    winners?: Player[];
    startTime: Date;
    endTime?: Date;
}
