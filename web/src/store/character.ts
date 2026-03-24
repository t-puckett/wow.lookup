import { create } from 'zustand'

interface CharacterState{
    region: string
    realm: string
    characterName: string
}

export const useCharacterStore = create<CharacterState>()(() => ({
    region: "",
    realm: "",
    characterName: ""
}))