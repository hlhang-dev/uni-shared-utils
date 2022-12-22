import { UniAppManagement } from '../../management/UniAppManagement'

export const CheckMiniProgramUpdate: MethodDecorator = () => {
  UniAppManagement.doProgramUpdate()
}
