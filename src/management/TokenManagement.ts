import TokenConstant from '../definition/token/TokenConstant'
import { UniAppManagement } from './UniAppManagement'

export class TokenManagement {

  private static _instance: TokenManagement

  public static getInstance() {
    if (!TokenManagement._instance) {
      TokenManagement._instance = new TokenManagement()
    }
    return TokenManagement._instance
  }

  public saveAccountToken(token: string) {
    UniAppManagement.setStorageSync(TokenConstant.ACCOUNT_AUTH_TOKEN_LABEL, token)
  }

  public getAccountToken(): string {
    return UniAppManagement.getStorageSync(TokenConstant.ACCOUNT_AUTH_TOKEN_LABEL)
  }

  public removeAccountToken() {
    uni.removeStorageSync(TokenConstant.ACCOUNT_AUTH_TOKEN_LABEL)
  }
}
