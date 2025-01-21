import { IPlayer } from '@/interfaces/game'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const calculateRank = (player: IPlayer, players: IPlayer[]) => {
  return players.filter(p => p.totalScore > player.totalScore).length + 1
}