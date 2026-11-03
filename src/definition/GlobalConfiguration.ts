import TokenConstant from './token/TokenConstant'

/**
 * @author  heninghang
 * @package
 * @date  2023/4/28
 */
class GlobalConfiguration {
    public static tokenHeaderName: string = TokenConstant.ACCOUNT_AUTH_TOKEN_HEADER

    public static tokenHeaderPrefix: string = TokenConstant.ACCOUNT_AUTH_TOKEN_PREFIX

    public static themeColor?: string

    public static successParamStr: string = 'code'

    public static codeParamStr: string = 'code'

    public static serverMessageParamStr: string = 'message'
}

export {
    GlobalConfiguration
}
