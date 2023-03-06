import { PageManagement } from '../management/PageManagement'

export class PageInit {

    private static _instance: PageInit

    public static getInstance() {
        if (!PageInit._instance) {
            PageInit._instance = new PageInit()
        }

        return PageInit._instance
    }

    init (tabBarPath: string[]) {
        PageManagement.tabBarPath = tabBarPath
    }
}
