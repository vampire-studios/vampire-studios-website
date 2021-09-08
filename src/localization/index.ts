import { FluentBundle, FluentResource } from '@fluent/bundle'

import { createFluentVue } from 'fluent-vue'

const basePath = "../../public/res/locale/"

const codeToInfo: any = {
    en_US: {
        path: "en/us",
    },
    fr_FR: {
        path: "fr/fr",
        fallback: "en_US"
    }
}

import enUS from '../../public/res/locale/en/us.ftl';

let enBundle = new FluentBundle("en_US");

enBundle.addResource(new FluentResource(enUS));

export const fluentVue = createFluentVue({
    bundles: [enBundle]
})

async function loadLocale(code: string): Promise<FluentBundle[]> {
    const localeInfo = codeToInfo[code];

    const localeFile = (await import('../../public/res/locale/' + localeInfo.path + '.ftl')).default;

    const localeBundle = new FluentBundle(code.replace("_", "-"));

    const localeResource = new FluentResource(localeFile);

    localeBundle.addResource(localeResource);

    if (localeInfo.fallback) {
        return [localeBundle].concat(await loadLocale(localeInfo.fallback));
    } else {
        return [localeBundle]
    }
}

export function setLocale(code: string) {
    loadLocale(code).then(bundles => {
        fluentVue.bundles = bundles;
    })
};