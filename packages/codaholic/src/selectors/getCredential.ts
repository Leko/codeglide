import { State } from '../modules'

export default (state: State): string | null => state.user.accessToken
