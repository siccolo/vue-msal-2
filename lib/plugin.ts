'use strict';
import { Options, MSALBasic } from './src/types';
import { MSAL } from './src/main';
import { mixin } from "./mixin";
export const msalMixin = mixin;

export default class msalPlugin {
    static install(Vue: any, options: Options): void {
        Vue.prototype.$msal = new msalPlugin(options, Vue);
    }
    constructor(options: Options, Vue: any = undefined) {
        const msal = new MSAL(options);
        if (Vue && options.framework && options.framework.globalMixin) {
            Vue.mixin(mixin);
        }
        const exposed: MSALBasic = {
            data: msal.data,
            signIn() { msal.signIn(); },
            authenticatePopup() { msal.authenticatePopup(); },
            async authenticatePopupAsync() { await msal.authenticatePopupAsync(); },
            async signOut() { await msal.signOut(); },
            async logoutPopup() { await msal.logoutPopup(); },
            isAuthenticated() { return msal.isAuthenticated(); },
            async acquireToken(request, retries = 0) { return await msal.acquireToken(request, retries); },
            async msGraph(endpoints, batchUrl) { return await msal.msGraph(endpoints, batchUrl) },
            saveCustomData(key: string, data: any) { msal.saveCustomData(key, data); }
        };
        return exposed;
    }
}
