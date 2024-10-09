export interface TuristPoint {
    id?:number,
    name:string,
    latitude: number,
    longitude: number,
    address: string,
    accessible: boolean,
    entryPrice: number,
    type: string,
    tags: string[],
    transcript: TuristTranscript,
    images: TuristImage[],
    audio: TuristAudio,
    email?: string,
    telephone?: string,
    language: 'pt' | 'en',
    shouldContact: boolean,
    day1: string,
    day2: string,
    day3: string,
    day4: string,
    day5: string,
    day6: string,
    day7: string
}
export function EmptyTuristPoint(): TuristPoint {
    return {
        name:'',
        latitude: 0,
        longitude: 0,
        address: '',
        accessible: false,
        entryPrice: 0,
        type: '',
        tags: ['Arte'],
        transcript: {
            language: 'pt',
            duration: 0,
            text: ''
        },
        images: [{
            id: 'testId',
            credits: 'Credits to all',
        }],
        audio: {
            id: 'testId',
            language: 'pt',
            duration: 0
        },
        email: '',
        telephone: '',
        language: 'pt',
        shouldContact: false,
        day1: '1',
        day2: '2',
        day3: '3',
        day4: '4',
        day5: '5',
        day6: '6',
        day7: '7'
    }
}

export interface TuristImage {
    id: string
    credits: string | null
    description?: string
}

export interface TuristAudio {
    id: string
    language: 'pt' | 'en'
    duration: number | null
}

export interface TuristTranscript {
    language: 'pt' | 'en'
    duration: number | null
    text: string | null
}