import { GlobalConfiguration } from '../definition/GlobalConfiguration'

export class UniInit {
    private static _instance: UniInit

    public static getInstance() {
        if (!UniInit._instance) {
            UniInit._instance = new UniInit()
        }
        return UniInit._instance
    }

    public get themeColor() {
        return GlobalConfiguration.themeColor
    }

    init(themeColor: string) {
        GlobalConfiguration.themeColor = themeColor
    }
}
