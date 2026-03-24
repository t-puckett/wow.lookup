import { create } from 'zustand'

interface UserState{
    region: string
    realm: string
    characterName: string
}

export const useUserStore = create<UserState>()(() => ({
    region: "",
    realm: "",
    characterName: ""
}))