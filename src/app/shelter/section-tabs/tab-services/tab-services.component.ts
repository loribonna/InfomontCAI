import { Component, ViewEncapsulation, Directive, Input, ChangeDetectionStrategy } from "@angular/core";
import { TabItemBase } from "../tab.base";
import { CacheService } from "src/app/cache.service";
import { ActivatedRoute } from "@angular/router";

interface ServiceTag {
    name: string;
    type: string;
    icon: string;
    combined?: string;
    enabled: boolean;
    alias?: string;
    iconColor?: string;
}

interface ServiceEntry {
    serviceName: string;
    tags: ServiceTag[];
}

const serviceBaseList: ServiceEntry[] = [
    {
        serviceName: "pernottamento",
        tags: [
            { name: "camerate_da_4_posti", type: "number", icon: "", enabled: false },
            { name: "camerate_da_6_posti", type: "number", icon: "", enabled: false },
            { name: "posti_letto", type: "number", icon: "bed", enabled: true },
            {
                name: "posti_letto_invernali",
                type: "number",
                icon: "snowflake",
                enabled: false
            },
            { name: "tavolati", type: "number", icon: "", enabled: false },
            { name: "posti_totali", type: "number", icon: "", enabled: false },
            { name: "vendita_sacco_lenzuolo", type: "boolean", icon: "box", enabled: true }
        ]
    },
    {
        serviceName: "ristorazione",
        tags: [
            { name: "ristorante", type: "boolean", icon: "utensils", enabled: true },
            { name: "accesso_alla_cucina", type: "boolean", icon: "utensil-spoon", enabled: true }
        ]
    },
    {
        serviceName: "acqua",
        tags: [
            { name: "acqua_in_rifugio", type: "boolean", icon: "tint", enabled: true },
            { name: "acqua_calda", type: "boolean", icon: "tint", iconColor: "red", enabled: true, alias: "Acqua calda in rifugio" }
        ]
    },
    {
        serviceName: "servizi_igenici",
        tags: [
            { name: "docce", type: "number", icon: "shower", enabled: true },
            { name: "WC_in_camera", type: "number", icon: "", enabled: false },
            { name: "WC_uso_comune", type: "number", icon: "", enabled: false }
        ]
    },
    {
        serviceName: "elettricità",
        tags: [
            { name: "elettricità", type: "boolean", icon: "bolt", enabled: true, alias: "Elettricità in rifugio" },
            { name: "punti_ricarica_camere", type: "number", icon: "plug", enabled: true, alias: "Punti ricarica", combined: 'punti_ricarica_spazi_comuni' },
            { name: "punti_ricarica_spazi_comuni", type: "number", icon: "", enabled: false }
        ]
    },
    {
        serviceName: "WIFI_e_GSM",
        tags: [
            { name: "WIFI", type: "boolean", icon: "wifi", enabled: true, alias: "WIFI disponibile" },
            { name: "segnale_GSM", type: "boolean", icon: "signal", enabled: true },
            {
                name: "gestore_telefonia_mobile",
                type: "string",
                icon: "",
                enabled: false
            }
        ]
    },
    {
        serviceName: "accessibilità",
        tags: [
            {
                name: "accessibilità_ai_disabili",
                type: "boolean",
                icon: "wheelchair",
                enabled: true,
                alias: "Accessibilità"
            },
            {
                name: "servizi_igienici_per_disabili",
                type: "boolean",
                icon: "",
                enabled: false
            },
            {
                name: "accessibilità_famiglie_con_bambini",
                type: "boolean",
                icon: "",
                enabled: false
            },
            {
                name: "accessibilità_macchina",
                type: "boolean",
                icon: "car",
                enabled: false
            },
            {
                name: "ammissibilità_animali_domestici",
                type: "boolean",
                icon: "paw",
                enabled: false
            },
            { name: "stanze_dedicate", type: "number", icon: "", enabled: false }
        ]
    },
    {
        serviceName: "servizi_aggiuntivi",
        tags: [
            { name: "pagamento_POS", type: "boolean", icon: "credit-card", enabled: true, alias: "Pagamento con carte" },
            { name: "convenzioni", type: "string", icon: "heart", enabled: false },
            {
                name: "richiesta_di_rifornire_il_rifugio",
                type: "boolean",
                icon: "",
                enabled: false
            },
            { name: "presidio_culturale", type: "boolean", icon: "university", enabled: false },
            {
                name: "attività_culturali/corsi_specifici",
                type: "boolean",
                icon: "star",
                enabled: false,
                alias: "Attività"
            }
        ]
    }
];

function getTagsToDisplayCount() {
    return serviceBaseList.reduce((acc, val) => {
        const tags = val.tags.filter(t => t.enabled).length;
        return acc + tags;
    }, 0);
}

function getServiceBaseEntry(service: string, entry: string) {
    const baseService = serviceBaseList.find(
        serv => serv.serviceName === service
    );
    return baseService && baseService.tags && baseService.tags.find(tag => tag.name === entry);
}

function getServiceBaseNameByTag(tagName: string) {
    const baseService = serviceBaseList.find(
        serv => {
            return serv.tags.find(tag => tag.name === tagName) ? true : false;
        }
    );
    return baseService && baseService.serviceName;
}

function getTagMetadataIfEnabled(service, tag) {
    const entry = getServiceBaseEntry(service.name || service.category, tag.key);
    return entry && entry.enabled ? entry : null;
}

const SERVICE_COLUMNS = 2;

function chunkArray(array: any[], nChunks: number) {
    if (!array) {
        return null;
    }
    const arr = array.slice();
    const chunkSize = Math.ceil(array.length / nChunks);
    const results = [];
    while (arr.length) {
        results.push(arr.splice(0, chunkSize));
    }
    return results;
}

function range(n: number) {
    return Array.from(Array(n).keys());
}

function checkTagValue(tagMetadata: ServiceTag, tag: any) {
    if(tag && tagMetadata.enabled) {
        if (tagMetadata.type === "boolean") {
            if (tag && typeof (tag.value) === "string") {
                const value = String(tag.value).toLowerCase();
                return value !== "no"
            }
            return tag && tag.value == true;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

@Component({
    selector: "app-tab-services",
    host: {
        "[class.service-container]": "true"
    },
    templateUrl: "./tab-services.component.html",
    styleUrls: ["./tab-services.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class TabServicesComponent extends TabItemBase {
    _chunks: ServiceEntry[][];
    constructor(
        protected route: ActivatedRoute,
        protected cache: CacheService
    ) {
        super(route, cache);
    }

    private _getChunks() {
        if (this._chunks && this._chunks.length > 0) {
            return this._chunks;
        } else {
            const chunks = chunkArray(serviceBaseList, this._getChunksNumber());
            if (chunks && chunks.length > 0) {
                this._chunks = chunks;
            }
            return this._chunks;
        }
    }

    private _getChunksNumber() {
        const services = this.getBaseProperty();
        if (services && Array.isArray(services)) {
            const tagCount = (<any[]>services).reduce((acc, val) => {
                const tags = val.tags && Array.isArray(val.tags)
                    ? val.tags.filter(t => getTagMetadataIfEnabled(val, t)).length
                    : 0;
                return acc + tags;
            }, 0);
            const tagsToDisplay = getTagsToDisplayCount();
            if (tagCount > tagsToDisplay / SERVICE_COLUMNS) {
                return SERVICE_COLUMNS
            } else {
                return 1;
            }
        } else {
            return 0;
        }
    }

    private _findCombinedValue(key: string) {
        const serviceName = getServiceBaseNameByTag(key);
        const data = this.getBaseProperty();
        if (serviceName && data && Array.isArray(data)) {
            const service = data.find(s => s.name === serviceName || s.category === serviceName);
            const tag = service.tags.find(t => t.key === key);
            return tag && tag.value ? tag.value : null;
        }
        return null;
    }

    getColumnsRange() {
        return range(this._getChunksNumber())
    }

    getServiceMetadataBatch(batchCount: number) {
        const batches = this._getChunks();
        return batches[batchCount];
    }

    getTagMetadataBatch(service: ServiceEntry) {
        return service.tags;
    }

    getTagValueFromMeta(serviceMetadata: ServiceEntry, tagMetadata: ServiceTag) {
        const data = this.getBaseProperty();
        const service = data.find(s => s.name === serviceMetadata.serviceName || s.category === serviceMetadata.serviceName);
        const tag = service && service.tags ? service.tags.find(t => t.key === tagMetadata.name) : null;

        return checkTagValue(tagMetadata, tag) ? tag : null;
    }

    getTagValue(tagMetadata: ServiceTag, tag) {
        if (tagMetadata.enabled) {
            if (tagMetadata.type === "boolean") {
                return tag && tag.value ? "" : null;
            } else {
                let value = tag ? tag.value : null;
                if (tagMetadata.combined) {
                    const combValue = this._findCombinedValue(tagMetadata.combined);
                    value = combValue ?
                        Number(combValue) && Number(value) ? Number(combValue) + Number(value) : value + " " + combValue
                        : value;
                }
                return value ? ": " + value : ": ---";
            }
        }
    }
}
