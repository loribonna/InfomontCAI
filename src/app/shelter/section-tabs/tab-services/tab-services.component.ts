import { Component, ViewEncapsulation, Directive, Input, ChangeDetectionStrategy } from "@angular/core";
import { TabItemBase } from "../tab.base";
import { CacheService } from "src/app/cache.service";
import { ActivatedRoute } from "@angular/router";

interface ServiceTag {
    name: string;
    type: string;
    icon: string;
    hidden?: boolean;
    combined?: string;
}

interface ServiceEntry {
    serviceName: string;
    tags: ServiceTag[];
}

const serviceBaseList: ServiceEntry[] = [
    {
        serviceName: "pernottamento",
        tags: [
            { name: "camerate_da_4_posti", type: "number", icon: "" },
            { name: "camerate_da_6_posti", type: "number", icon: "" },
            { name: "posti_letto", type: "number", icon: "bed" },
            {
                name: "posti_letto_invernali",
                type: "number",
                icon: "snowflake"
            },
            { name: "tavolati", type: "number", icon: "", hidden: true },
            { name: "posti_totali", type: "number", icon: "", hidden: true },
            { name: "vendita_sacco_lenzuolo", type: "boolean", icon: "" }
        ]
    },
    {
        serviceName: "ristorazione",
        tags: [
            { name: "ristorante", type: "boolean", icon: "utensils" },
            { name: "accesso_alla_cucina", type: "boolean", icon: "user" }
        ]
    },
    {
        serviceName: "acqua",
        tags: [
            { name: "acqua_in_rifugio", type: "boolean", icon: "tint" },
            { name: "acqua_calda", type: "boolean", icon: "" }
        ]
    },
    {
        serviceName: "servizi_igenici",
        tags: [
            { name: "docce", type: "number", icon: "shower" },
            { name: "WC_in_camera", type: "number", icon: "" },
            { name: "WC_uso_comune", type: "number", icon: "" }
        ]
    },
    {
        serviceName: "elettricità",
        tags: [
            { name: "elettricità", type: "boolean", icon: "bolt" },
            { name: "punti_ricarica_camere", type: "number", icon: "" },
            { name: "punti_ricarica_spazi_comuni", type: "number", icon: "" }
        ]
    },
    {
        serviceName: "WIFI_e_GSM",
        tags: [
            { name: "WIFI", type: "boolean", icon: "wifi" },
            { name: "segnale_GSM", type: "boolean", icon: "signal" },
            {
                name: "gestore_telefonia_mobile",
                type: "string",
                icon: ""
            }
        ]
    },
    {
        serviceName: "accessibilità",
        tags: [
            {
                name: "accessibilità_ai_disabili",
                type: "boolean",
                icon: "wheelchair"
            },
            {
                name: "servizi_igienici_per_disabili",
                type: "boolean",
                icon: ""
            },
            {
                name: "accessibilità_famiglie_con_bambini",
                type: "boolean",
                icon: ""
            },
            {
                name: "accessibilità_macchina",
                type: "boolean",
                icon: "car"
            },
            {
                name: "ammissibilità_animali_domestici",
                type: "boolean",
                combined: "stanze_dedicate",
                icon: "paw"
            },
            { name: "stanze_dedicate", type: "number", icon: "" }
        ]
    },
    {
        serviceName: "servizi_aggiuntivi",
        tags: [
            { name: "pagamento_POS", type: "boolean", icon: "credit-card" },
            { name: "convenzioni", type: "string", icon: "heart" },
            {
                name: "richiesta_di_rifornire_il_rifugio",
                type: "boolean",
                icon: ""
            },
            { name: "presidio_culturale", type: "boolean", icon: "university" },
            {
                name: "attività_culturali/corsi_specifici",
                type: "boolean",
                icon: ""
            }
        ]
    }
];

function getServiceBaseEntry(service: string, entry: string) {
    const baseService = serviceBaseList.find(
        serv => serv.serviceName === service
    );
    return baseService && baseService.tags && baseService.tags.find(tag => tag.name === entry);
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
    _chunks: any[];
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
            const chunks = chunkArray(this.getBaseProperty(), SERVICE_COLUMNS);
            if (chunks && chunks.length > 0) {
                this._chunks = chunks;
            }
            return this._chunks;
        }
    }

    getServiceTags(service: ServiceEntry) {
        return service.tags;
    }

    getTagMetadata(service, tag): ServiceTag {
        const entry = getServiceBaseEntry(service.name || service.category, tag.key);
        return entry && !entry.hidden ? entry : null;
    }

    getServicesBatch(batchCount) {
        const batches = this._getChunks();
        return batches ? batches[batchCount] : [];
    }

    getColumnsRange() {
        return range(SERVICE_COLUMNS);
    }

    checkTagValue(tagMetadata: ServiceTag, tag) {
        if (tagMetadata.type === "boolean") {
            return tag && tag.value;
        } else {
            return true;
        }
    }

    getTagValue(tagMetadata: ServiceTag, tag) {
        if (!tagMetadata.hidden) {
            if (tagMetadata.type === "boolean") {
                return tag && tag.value ? "" : null;
            } else {
                return tag && tag.value ? ": " + tag.value : ": ---";
            }
        }
    }

    checkTags(service: any) {
        return service && service.tags && service.tags.length;
    }
}
